"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Socials from "@/components/Socials";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      baseSize: number; // Added baseSize to maintain a minimum size
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulse: number;
    }[] = [];

    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

      for (let i = 0; i < particleCount; i++) {
        const baseSize = Math.random() * 2 + 1; // Increased minimum size to 1
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: baseSize,
          baseSize: baseSize, // Store the base size
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: `rgba(${Math.random() * 50 + 50}, ${
            Math.random() * 50 + 100
          }, ${Math.random() * 100 + 155}, ${Math.random() * 0.3 + 0.2})`,
          opacity: Math.random() * 0.5 + 0.2,
          pulse: Math.random() * 0.05, // Reduced pulse amount
        });
      }
    };

    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }

        // Pulsing effect with safety check to prevent negative radius
        const pulseFactor = Math.sin(Date.now() * 0.01) * particle.pulse;
        particle.size = Math.max(0.5, particle.baseSize + pulseFactor); // Ensure size is never below 0.5
        particle.opacity = Math.max(
          0.1,
          Math.min(0.8, particle.opacity + Math.sin(Date.now() * 0.005) * 0.01)
        );

        // Draw particle
        ctx.fillStyle = particle.color.replace(
          /[\d.]+\)$/,
          `${particle.opacity})`
        );
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = 0.1 * (1 - distance / 150);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="heading-xl mb-6">
              <span className="text-white">Hi, I'm </span>
              <span className="accent-gradient">Bassey Duke</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Software engineer with 5+ years of experience specializing in
              front-end and full-stack development. Building scalable
              applications and delivering innovative solutions that drive
              business impact.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#projects" className="btn-primary group">
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-10"></span>
              </Link>
              <Link href="#contact" className="btn-secondary group">
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-20"></span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Socials />
          </div>
        </div>
      </div>
    </section>
  );
}
