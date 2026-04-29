/**
 * HeroCanvas.jsx — animated canvas background for the homepage hero section.
 *
 * WHY REACT (not .astro)?
 * Canvas animations require imperative DOM access (canvas.getContext, requestAnimationFrame,
 * addEventListener for mouse interaction). None of that is expressible in Astro template
 * syntax. This component is hydrated with client:load in index.astro.
 *
 * WHAT IT RENDERS:
 *   - A full-bleed <canvas> behind the hero text
 *   - Flowing sigmoid curves with brand gradient colours
 *   - Small floating particles that drift upward
 *   - Subtle mouse-parallax: particles drift toward the cursor
 *
 * PERFORMANCE NOTES:
 *   - Uses requestAnimationFrame; cancelled on unmount to prevent memory leaks
 *   - Canvas is resized on window resize with debounce to avoid layout thrashing
 *   - Opacity / alpha compositing is the only blend operation (GPU-friendly)
 */

import { useEffect, useRef } from 'react';

// Brand palette — oklch values converted to CSS colour strings the canvas API accepts.
// (canvas 2D uses CSS colour strings; oklch is supported in modern browsers.)
const CURVE_COLORS = [
  'oklch(0.55 0.18 250 / 0.18)', // blue-ish
  'oklch(0.50 0.20 290 / 0.14)', // purple
  'oklch(0.55 0.18 195 / 0.16)', // cyan
  'oklch(0.58 0.15 160 / 0.13)', // green
];

const PARTICLE_COLOR_LIGHT = 'oklch(0.40 0.12 250 / 0.25)';
const PARTICLE_COLOR_DARK  = 'oklch(0.75 0.12 250 / 0.20)';

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let animId = null;
    let mouse = { x: 0.5, y: 0.5 }; // normalised 0–1

    // ── Particle pool ──────────────────────────────────────────────────────
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => spawnParticle(null, null));

    function spawnParticle(forceX, forceY) {
      return {
        x: forceX ?? Math.random(),   // normalised 0–1
        y: forceY ?? Math.random(),
        size: 1.5 + Math.random() * 2.5,
        speed: 0.00015 + Math.random() * 0.0002,
        drift: (Math.random() - 0.5) * 0.0001,
        opacity: 0.3 + Math.random() * 0.5,
        life: Math.random(), // 0–1 age fraction
      };
    }

    // ── Sigmoid curve drawing ──────────────────────────────────────────────
    function drawCurves(t) {
      CURVE_COLORS.forEach((color, i) => {
        const phase = t * 0.0003 + i * 1.4;
        const amplitude = height * (0.12 + i * 0.04);
        const yBase = height * (0.3 + i * 0.12);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5 + i * 0.5;

        for (let px = 0; px <= width; px += 3) {
          // Map pixel to normalised x in [-6, 6] range for sigmoid
          const nx = (px / width) * 12 - 6;
          const ny = sigmoid(nx - Math.sin(phase) * 1.5) * amplitude;
          const y = yBase + ny - amplitude / 2;

          if (px === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();
      });
    }

    // ── Particle drawing ───────────────────────────────────────────────────
    function isDark() {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function drawParticles() {
      const color = isDark() ? PARTICLE_COLOR_DARK : PARTICLE_COLOR_LIGHT;
      particles.forEach((p) => {
        // Update position
        p.y -= p.speed;
        // Gentle mouse attraction: nudge toward cursor
        p.x += (mouse.x - p.x) * 0.00008 + p.drift;
        p.life += p.speed * 2;

        // Recycle off-screen particles
        if (p.y < -0.02 || p.life > 1) {
          Object.assign(p, spawnParticle(Math.random(), 1.02));
        }

        const px = p.x * width;
        const py = p.y * height;
        const alpha = Math.sin(p.life * Math.PI) * p.opacity;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('/ 0.', `/ ${(parseFloat(color.match(/0\.\d+/)?.[0] ?? '0.25') * alpha).toFixed(2)}`);
        ctx.fill();
      });
    }

    // ── Resize ─────────────────────────────────────────────────────────────
    function resize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect ? rect.width : window.innerWidth;
      height = rect ? rect.height : window.innerHeight;
      // devicePixelRatio scaling for sharp rendering on HiDPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }

    // ── Animation loop ─────────────────────────────────────────────────────
    function frame(t) {
      ctx.clearRect(0, 0, width, height);
      drawCurves(t);
      drawParticles();
      animId = requestAnimationFrame(frame);
    }

    // ── Mouse tracking ─────────────────────────────────────────────────────
    function onMouseMove(e) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    }

    // ── Resize debounce ────────────────────────────────────────────────────
    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    }

    resize();
    animId = requestAnimationFrame(frame);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true" // decorative — no meaningful content for screen readers
    />
  );
}
