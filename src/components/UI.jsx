import { useState, useEffect, useMemo } from "react";
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cssX = useTransform(smoothX, (v) => `${v}px`);
  const cssY = useTransform(smoothY, (v) => `${v}px`);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          radial-gradient(circle at var(--x) var(--y), rgba(255,110,180,0.12) 0%, transparent 60%),
          linear-gradient(rgba(255,110,180,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,110,180,0.04) 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        // @ts-ignore
        "--x": cssX,
        "--y": cssY,
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
