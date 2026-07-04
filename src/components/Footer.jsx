import { C } from "../theme";

export default function Footer() {
    return (
        <footer style={{
            padding: "3rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            background: "transparent",
        }}>
            {/* Name + title */}
            <div style={{
                fontFamily: C.mono, fontSize: "1rem", fontWeight: 700,
                color: C.text, marginBottom: "0.5rem",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
                <span style={{ color: C.pink }}>&lt;/&gt;</span>
                Sreng Sopheakanha
            </div>

            {/* Built with */}
            <div style={{
                fontFamily: C.mono, fontSize: "0.78rem",
                color: C.textMuted, marginBottom: "0.3rem",
            }}>
                Built with &lt;3 using Next.js, TypeScript &amp; Tailwind
            </div>

            {/* Copyright */}
            <div style={{
                fontFamily: C.mono, fontSize: "0.7rem",
                color: C.textDim,
            }}>
                © 2026 Sreng Sopheakanha. All rights reserved.
            </div>
        </footer>
    );
}