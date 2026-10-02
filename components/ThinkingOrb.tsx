"use client";

import { useEffect, useRef } from "react";

export type OrbState = "idle" | "typing" | "thinking" | "done";

const ENERGY: Record<OrbState, number> = { idle: 0.08, typing: 0.5, thinking: 1, done: 0.25 };

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;
uniform float t;
uniform float e;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 3.1; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * r) / min(r.x, r.y);
  float d = length(uv);
  float a = atan(uv.y, uv.x);

  // Morphing silhouette: calm when idle, restless when thinking.
  float wob = fbm(vec2(cos(a), sin(a)) * 1.3 + t * (0.25 + 0.6 * e));
  float rad = 0.31 + 0.018 * sin(a * 3.0 + t * 0.7) + (0.02 + 0.06 * e) * (wob - 0.5);
  float body = smoothstep(rad, rad - 0.01, d);

  // Liquid interior: warm plasma swirling inside a lit glass sphere.
  vec2 q = uv * 2.2;
  float s = fbm(q + vec2(t * 0.18, -t * 0.12));
  float s2 = fbm(q * 1.5 - vec2(s * 2.0) + vec2(-t * 0.1, t * 0.16));
  vec3 deep = vec3(0.55, 0.19, 0.06);
  vec3 ember = vec3(0.886, 0.514, 0.306);
  vec3 glow = vec3(1.0, 0.78, 0.55);
  vec3 bone = vec3(0.98, 0.95, 0.91);
  vec3 col = mix(deep, ember, smoothstep(0.2, 0.7, s2));
  col = mix(col, glow, smoothstep(0.55, 0.9, s2) * (0.5 + 0.5 * e));
  col = mix(col, bone, pow(smoothstep(0.5, 0.95, s), 2.0) * (0.35 + 0.4 * e));

  // Sphere lighting: bright core, darker limb, a soft specular highlight.
  float z = sqrt(max(0.0, 1.0 - pow(d / rad, 2.0)));
  col *= 0.55 + 0.6 * z;
  float spec = pow(smoothstep(0.17, 0.0, length(uv - vec2(-0.1, 0.12))), 2.0) * 0.55;
  col += spec * bone;
  float rim = smoothstep(rad - 0.035, rad, d) * body;
  col = mix(col, glow, rim * 0.55);

  // Halo breathes with energy.
  float halo = exp(-max(d - rad, 0.0) * (9.0 - 4.0 * e)) * (0.22 + 0.4 * e) * (1.0 - body);

  float alpha = max(body, halo);
  gl_FragColor = vec4(mix(ember * 1.05, col, body), alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export default function ThinkingOrb({ state }: { state: OrbState }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef(ENERGY.idle);

  useEffect(() => {
    target.current = ENERGY[state];
  }, [state]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: true });
    if (!gl) return;
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uE = gl.getUniformLocation(prog, "e");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    let last = performance.now();
    let time = 12;
    let energy = target.current;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uR, w, h);
      gl.uniform1f(uT, time);
      gl.uniform1f(uE, energy);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      energy += (target.current - energy) * Math.min(1, dt * 3);
      time += dt * (0.5 + 2.2 * energy);
      draw();
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduce) {
        draw();
        return;
      }
      if (visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full" />;
}
