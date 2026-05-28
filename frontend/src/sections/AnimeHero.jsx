import React, { useEffect, useRef } from "react";

/**
 * AnimeHero — pure-canvas anime-style animated background.
 * Effects:
 *  - Radial speed lines emanating from center (anime "action" lines)
 *  - Pulsing concentric rings
 *  - Floating particles + connecting constellation lines
 *  - Slow rotating geometric polygons
 *  - Scan-line flicker
 */
export default function AnimeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0;
    let raf;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
    }));

    // Anime speed lines (radial)
    const speedLines = Array.from({ length: 36 }, (_, i) => ({
      angle: (i / 36) * Math.PI * 2,
      offset: Math.random() * 200,
      length: 80 + Math.random() * 160,
      speed: 0.6 + Math.random() * 1.2,
    }));

    // Polygons
    const polygons = [
      { x: 0.78, y: 0.32, sides: 6, r: 110, rot: 0, vr: 0.0015, color: "rgba(0,240,255,0.15)" },
      { x: 0.85, y: 0.72, sides: 3, r: 70,  rot: 0.4, vr: -0.0020, color: "rgba(0,255,102,0.18)" },
      { x: 0.65, y: 0.85, sides: 4, r: 50,  rot: 0.8, vr: 0.0025, color: "rgba(0,240,255,0.10)" },
    ];

    let t = 0;
    const draw = () => {
      t += 1;
      // Soft background gradient wash
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.78;
      const cy = h * 0.5;

      // 1. Radial speed lines (anime action lines)
      ctx.save();
      ctx.translate(cx, cy);
      speedLines.forEach((s) => {
        const startR = 140 + ((t * s.speed + s.offset) % 320);
        const endR = startR + s.length;
        const a = Math.max(0, 0.35 - (startR - 140) / 360);
        ctx.strokeStyle = `rgba(0, 240, 255, ${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(s.angle) * startR, Math.sin(s.angle) * startR);
        ctx.lineTo(Math.cos(s.angle) * endR, Math.sin(s.angle) * endR);
        ctx.stroke();
      });
      ctx.restore();

      // 2. Pulsing concentric rings
      for (let i = 0; i < 4; i++) {
        const pulse = (t * 0.6 + i * 80) % 320;
        const r = 60 + pulse;
        const a = Math.max(0, 0.25 - pulse / 320 * 0.25);
        ctx.strokeStyle = `rgba(0, 240, 255, ${a})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Central glowing orb
      const orbR = 14 + Math.sin(t * 0.05) * 3;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbR * 5);
      grd.addColorStop(0, "rgba(0, 240, 255, 0.6)");
      grd.addColorStop(0.4, "rgba(0, 255, 102, 0.18)");
      grd.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, orbR * 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(0, 240, 255, 0.95)";
      ctx.beginPath();
      ctx.arc(cx, cy, orbR, 0, Math.PI * 2);
      ctx.fill();

      // 3. Rotating polygons
      polygons.forEach((p) => {
        p.rot += p.vr;
        const px = p.x * w;
        const py = p.y * h;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rot);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        for (let i = 0; i <= p.sides; i++) {
          const a = (i / p.sides) * Math.PI * 2;
          const x = Math.cos(a) * p.r;
          const y = Math.sin(a) * p.r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      // 4. Particles + constellation lines
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = "rgba(0, 240, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const alpha = 0.18 * (1 - d2 / 9000);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 5. Scan lines (horizontal flicker)
      const scanY = (t * 1.5) % h;
      const scanGrd = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrd.addColorStop(0, "rgba(0, 240, 255, 0)");
      scanGrd.addColorStop(0.5, "rgba(0, 240, 255, 0.06)");
      scanGrd.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 30, w, 60);

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="anime-hero-canvas"
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
