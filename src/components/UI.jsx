import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { C } from "../theme";

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleClick = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          backgroundColor: C.pink,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="custom-cursor"
            initial={{ width: 0, height: 0, opacity: 0.5, x: ripple.x, y: ripple.y }}
            animate={{ width: 100, height: 100, opacity: 0, x: ripple.x - 50, y: ripple.y - 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              border: `2px solid ${C.pink}`,
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9998,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export const Cursor = () => (
  <span style={{
    display: "inline-block", width: 5, height: 5,
    background: C.pink, verticalAlign: "middle",
    animation: "blink 1s step-end infinite", marginLeft: 2,
  }} />
);

export const GridBg = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const connectionDist = 180;
    const mouseDist = 250;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist) {
          const force = (mouseDist - dist) / mouseDist;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 110, 180, ${0.1 + Math.random() * 0.1})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Lines with parallax
      const gridSpacing = 40;
      const offX = (mouseRef.current.x - width / 2) * 0.02;
      const offY = (mouseRef.current.y - height / 2) * 0.02;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 110, 180, 0.05)";
      ctx.lineWidth = 1;

      for (let x = offX % gridSpacing; x < width; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offY % gridSpacing; y < height; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Update and Draw Particles
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 110, 180, ${0.15 * (1 - dist / connectionDist)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // Mouse Glow
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        400
      );
      gradient.addColorStop(0, "rgba(255, 110, 180, 0.08)");
      gradient.addColorStop(1, "rgba(255, 110, 180, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: C.bg,
      }}
    />
  );
};

export const SectionHeading = ({ icon, command }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "3rem" }}
    >
    <span style={{ color: C.pink, fontSize: "1.3rem" }}>{icon}</span>
    <h2 style={{
      fontFamily: C.mono,
      fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
      fontWeight: 700,
      color: C.text,
      letterSpacing: "-0.02em",
    }}>
      {command}
    </h2>
  </motion.div>
);
