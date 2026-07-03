import { useState, useEffect } from "react";
import { C } from "../theme";
import { motion, useScroll, useSpring } from "framer-motion";

const NAV_ITEMS = [
  {
    id: "Home",
    icon: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? C.pink : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
    ),
  },
  {
    id: "About",
    icon: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? C.pink : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
    ),
  },
  {
    id: "Skills",
    icon: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? C.pink : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
    ),
  },
  // {
  //   id: "Experience",
  //   icon: (active) => (
  //       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? C.pink : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //         <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
  //         <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  //       </svg>
  //   ),
  // },
  {
    id: "Projects",
    icon: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? C.pink : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
    ),
  },
  {
    id: "Contact",
    icon: (active) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? C.pink : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
    ),
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("Home");
  const [tooltip, setTooltip] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActive(id); },
          { root: null, rootMargin: "-50% 0px -45% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
      <div 
          className="sidebar-nav"
          style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}>
        {/* Scroll Progress Indicator */}
        <motion.div
            className="scroll-progress-indicator"
            style={{
              position: "absolute",
              right: -10,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom, transparent, ${C.pink}, transparent)`,
              scaleY,
              transformOrigin: "top",
              borderRadius: 2,
              opacity: 0.6
            }}
        />
        {NAV_ITEMS.map(({ id, icon }, i) => {
          const isActive = active === id;
          const isFirst = i === 0;
          const isLast = i === NAV_ITEMS.length - 1;

          return (
              <div 
                  className="nav-item-container"
                  key={id} 
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >

                {/* Line above dot (not for first) */}
                {!isFirst && (
                    <div 
                        className="nav-line"
                        style={{
                      width: 1,
                      height: 28,
                      background: isActive
                          ? `linear-gradient(to bottom, rgba(255,110,180,0.15), ${C.pink})`
                          : `linear-gradient(to bottom, rgba(255,110,180,0.08), rgba(255,110,180,0.15))`,
                      transition: "background 0.3s",
                    }} />
                )}

                {/* Node */}
                <div style={{ position: "relative" }}>
                  {/* Tooltip */}
                  {tooltip === id && (
                      <div 
                          className="tooltip"
                          style={{
                        position: "absolute",
                        right: "calc(100% + 14px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(13,13,26,0.95)",
                        border: `1px solid ${isActive ? C.pink : C.border}`,
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontFamily: C.mono,
                        fontSize: "0.7rem",
                        color: isActive ? C.pink : C.textMuted,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        boxShadow: isActive ? `0 0 10px rgba(255,110,180,0.2)` : "none",
                      }}>
                        {id}
                        {/* Arrow */}
                        <div style={{
                          position: "absolute",
                          right: -5,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 0, height: 0,
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          borderLeft: `5px solid ${isActive ? C.pink : C.border}`,
                        }} />
                      </div>
                  )}

                  {/* Outer dashed ring — only for active */}
                  {isActive && (
                      <div style={{
                        position: "absolute",
                        inset: -8,
                        borderRadius: "50%",
                        border: `1.5px dashed rgba(255,110,180,0.5)`,
                        animation: "spin 8s linear infinite",
                        pointerEvents: "none",
                      }} />
                  )}

                  {/* Glow ring — only for active */}
                  {isActive && (
                      <div style={{
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        background: "rgba(255,110,180,0.08)",
                        border: `1px solid rgba(255,110,180,0.3)`,
                        pointerEvents: "none",
                      }} />
                  )}

                  {/* Main button */}
                  <button
                      onClick={() => handleClick(id)}
                      onMouseEnter={() => setTooltip(id)}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        width: isActive ? 44 : 34,
                        height: isActive ? 44 : 34,
                        borderRadius: "50%",
                        border: `1.5px solid ${isActive ? C.pink : "rgba(255,110,180,0.2)"}`,
                        background: isActive
                            ? "rgba(255,110,180,0.12)"
                            : "rgba(13,13,26,0.8)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? C.pink : C.textDim,
                        boxShadow: isActive
                            ? `0 0 16px rgba(255,110,180,0.35), 0 0 4px rgba(255,110,180,0.2)`
                            : "none",
                        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                        position: "relative",
                        zIndex: 1,
                        backdropFilter: "blur(8px)",
                      }}
                  >
                    {icon(isActive)}
                  </button>
                </div>

                {/* Line below dot (not for last) */}
                {!isLast && (
                    <div 
                        className="nav-line"
                        style={{
                      width: 1,
                      height: 28,
                      background: isActive
                          ? `linear-gradient(to bottom, ${C.pink}, rgba(255,110,180,0.15))`
                          : `linear-gradient(to bottom, rgba(255,110,180,0.15), rgba(255,110,180,0.08))`,
                      transition: "background 0.3s",
                    }} />
                )}
              </div>
          );
        })}
      </div>
  );
}