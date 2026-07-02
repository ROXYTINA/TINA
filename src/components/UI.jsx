import { C } from "../theme";

export const Cursor = () => (
  <span style={{
    display: "inline-block", width: 8, height: 14,
    background: C.pink, verticalAlign: "middle",
    animation: "blink 1s step-end infinite", marginLeft: 2,
  }} />
);

export const GridBg = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage: `
      linear-gradient(rgba(255,110,180,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,110,180,0.04) 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  }} />
);

export const SectionHeading = ({ icon, command }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "3rem" }}>
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
  </div>
);
