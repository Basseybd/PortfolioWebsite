"use client";

import { useEffect, useRef } from "react";

export type OrbState = "idle" | "typing" | "thinking" | "done";

const ENERGY: Record<OrbState, number> = { idle: 0.08, typing: 0.5, thinking: 1, done: 0.25 };

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// A liquid chrome sphere, like a drop of mercury or an Arco lamp shade.
// It reflects a simple studio: bright sky, a dark horizon, graphite below.
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
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 1.7; a *= 0.5; }
  return v;
}

vec3 env(vec3 d) {
  float y = d.y;
  vec3 sky = mix(vec3(0.60, 0.64, 0.66), vec3(0.97, 0.98, 0.98), smoothstep(0.0, 0.85, y));
  vec3 ground = mix(vec3(0.10, 0.10, 0.11), vec3(0.42, 0.44, 0.46), smoothstep(-0.05, -0.9, y));
  vec3 c = y > 0.0 ? sky : ground;
  c = mix(c, vec3(0.07, 0.06, 0.05), exp(-abs(y) * 22.0) * 0.85);
  // Two softboxes give the chrome its highlights.
  c += vec3(1.0) * smoothstep(0.32, 0.0, length(d.xy - vec2(-0.48, 0.58))) * 0.9;
  c += vec3(0.9, 0.93, 0.95) * smoothstep(0.18, 0.0, length(d.xy - vec2(0.62, 0.34))) * 0.45;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * r) / min(r.x, r.y);
  float d = length(uv);
  float ang = atan(uv.y, uv.x);

  float wob = fbm(vec2(cos(ang), sin(ang)) * 1.4 + t * (0.2 + 0.7 * e));
  float rad = 0.30 + 0.006 * sin(ang * 3.0 + t * 0.6) + (0.008 + 0.045 * e) * (wob - 0.5);
  float body = smoothstep(rad, rad - 0.006, d);

  vec2 p = uv / rad;
  float z = sqrt(max(0.0, 1.0 - dot(p, p)));
  vec3 n = normalize(vec3(p, z));
  float amt = 0.12 + 0.55 * e;
  vec2 q = p * 2.0 + vec2(t * 0.22, -t * 0.17);
  n = normalize(n + vec3(fbm(q) - 0.5, fbm(q + 7.3) - 0.5, 0.0) * amt);

  vec3 rf = reflect(vec3(0.0, 0.0, -1.0), n);
  vec3 col = env(rf);
  float fres = pow(1.0 - z, 2.5);
  col = mix(col, vec3(0.83, 0.85, 0.86), fres * 0.35);

  // Soft contact shadow under the sphere.
  float sy = uv.y + rad * 1.06;
  float shadow = exp(-sy * sy / 0.0009) * exp(-uv.x * uv.x / (rad * rad * 0.55)) * 0.45;

  float alpha = max(body, shadow * (1.0 - body));
  vec3 outc = mix(vec3(0.20, 0.21, 0.22), col, body);
  gl_FragColor = vec4(outc, alpha);
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
