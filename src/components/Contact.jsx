import { useState } from "react";
import { C } from "../theme";
import { SectionHeading, Cursor } from "./UI";
const JSON_LINES = [
  [1, <span style={{ color: "#94a3b8" }}>{"{"}</span>],

  [2, (
      <>
        <span style={{ color: "#fbbf24" }}>"status":</span>{" "}
        <span style={{ color: "#4ade80" }}>"open_to_work"</span>,
      </>
  )],

  [3, (
      <>
        <span style={{ color: "#fbbf24" }}>"email":</span>{" "}
        <a
            href="https://mail.google.com/mail/?view=cm&to=kanharoth12345@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#a78bfa", textDecoration: "none" }}
        >
          kanharoth12345@gmail.com
        </a>,
      </>
  )],

  [4, (
      <>
        <span style={{ color: "#fbbf24" }}>"socials":</span> {"{"}
      </>
  )],

  [5, (
      <>
        &nbsp;&nbsp;
        <span style={{ color: "#fbbf24" }}>"github":</span>{" "}
        <a
            href="https://github.com/ROXYTINA"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#a78bfa", textDecoration: "none" }}
        >
          "ROXYTINA"
        </a>,
      </>
  )],

  [6, (
      <>
        &nbsp;&nbsp;
        <span style={{ color: "#fbbf24" }}>"linkedin":</span>{" "}
        <a
            href="https://www.linkedin.com/in/sreng-sopheakanha-58a5b2296/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#a78bfa", textDecoration: "none" }}
        >
          "sreng-sopheakanha"
        </a>
      </>
  )],

  [7, <>{"},"}</>],

  [8, (
      <>
        <span style={{ color: "#fbbf24" }}>"location":</span>{" "}
        <span style={{ color: "#a78bfa" }}>"Phnom Penh, Cambodia"</span>
      </>
  )],

  [9, <span style={{ color: "#94a3b8" }}>{"}"}</span>],

  [10, null],

  [11, (
      <span style={{ color: "#475569" }}>
      {"// Waiting for connection..."}
    </span>
  )],
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputStyle = {
    width: "100%",
    background: "#080814",
    border: `1px solid ${C.border}`,
    borderRadius: 5,
    padding: "0.48rem 0.7rem",
    fontFamily: C.mono,
    fontSize: "0.76rem",
    color: C.text,
    outline: "none",
  };

  const labelStyle = {
    fontFamily: C.mono,
    fontSize: "0.6rem",
    color: C.textDim,
    letterSpacing: "0.1em",
    marginBottom: 4,
    display: "block",
  };

  return (
    <section style={{
      padding: "6rem 3rem",
      position: "relative",
      zIndex: 1,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading
            icon={
              <svg
                  aria-hidden="true"
                  height="35"
                  viewBox="0 0 24 24"
                  version="1.1"
                  width="35"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: "translateY(-1px)" }}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
            command="$ ./contact.exe"
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem"
        }}>

          {/* ── contact_info.json ── */}
          <div style={{
            background: "#080814", border: `1px solid ${C.border}`,
            borderRadius: 10, overflow: "hidden",
          }}>
            <div style={{
              background: C.surface, borderBottom: `1px solid ${C.border}`,
              padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: 8,
            }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
              <span style={{
                marginLeft: "auto", fontFamily: C.mono, fontSize: "0.68rem",
                color: C.textDim, display: "flex", alignItems: "center", gap: 6,
              }}>
                &lt;/&gt; contact_info.json
              </span>
            </div>
            <div style={{ padding: "1.4rem", fontFamily: C.mono, fontSize: "0.78rem", lineHeight: 2.1 }}>
              {JSON_LINES.map(([num, content], i) => (
                <div key={i} style={{ display: "flex", gap: "1.2rem" }}>
                  <span style={{ color: C.textDim, minWidth: 16, textAlign: "right", userSelect: "none" }}>{num}</span>
                  <span>{content}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "1.2rem", marginTop: "0.3rem" }}>
                <span style={{ color: C.textDim, minWidth: 16, textAlign: "right", userSelect: "none" }}>12</span>
                <Cursor />
              </div>
            </div>
          </div>

          {/* ── sendMessage.ts ── */}
          <div style={{
            background: "#080814", border: `1px solid ${C.border}`,
            borderRadius: 10, overflow: "hidden",
          }}>
            <div style={{
              background: C.surface, borderBottom: `1px solid ${C.border}`,
              padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{
                color: C.cyan, background: "rgba(167,139,250,0.1)",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: 3, padding: "1px 6px",
                fontFamily: C.mono, fontSize: "0.65rem",
              }}>TS</span>
              <span style={{ fontFamily: C.mono, fontSize: "0.74rem", color: C.text }}>sendMessage.ts</span>
              <span style={{ color: C.textDim, fontSize: "0.74rem" }}>×</span>
              <span style={{
                marginLeft: "auto", width: 30, height: 2,
                background: C.pink, display: "block", borderRadius: 2,
              }} />
            </div>

            <div style={{ padding: "1rem" }}>
              <div style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: "1rem",
              }}>
                {/* meta */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontFamily: C.mono, fontSize: "0.67rem", color: C.textDim, marginBottom: "0.6rem",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: C.pink }}>✉</span> mail.compose
                  </span>
                  <span>secure channel</span>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontFamily: C.mono, fontSize: "0.66rem", color: C.textDim, marginBottom: "0.9rem",
                }}>
                  <span>to: sopheakanha@dev.kh</span>
                  <span>response: within 24h</span>
                </div>

                {/* name + email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginBottom: "0.7rem" }}>
                  <div>
                    <label style={labelStyle}>NAME</label>
                    <input style={inputStyle} placeholder="Your Name" value={form.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input style={inputStyle} placeholder="your@email.com" value={form.email} onChange={set("email")} />
                  </div>
                </div>

                {/* subject */}
                <div style={{ marginBottom: "0.7rem" }}>
                  <label style={labelStyle}>SUBJECT</label>
                  <input style={inputStyle} placeholder="Project inquiry / Collaboration" value={form.subject} onChange={set("subject")} />
                </div>

                {/* message */}
                <div style={{ marginBottom: "0.7rem" }}>
                  <label style={labelStyle}>MESSAGE</label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project, timeline, and goals..."
                    value={form.message}
                    onChange={set("message")}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div style={{ fontFamily: C.mono, fontSize: "0.66rem", color: C.textDim, marginBottom: "0.9rem" }}>
                  {"// Protected by spam filters and rate limits"}
                </div>

                <button style={{
                  background: `linear-gradient(135deg, ${C.pinkDim}, ${C.pink})`,
                  border: "none", cursor: "pointer",
                  padding: "0.65rem 1.5rem", borderRadius: 6,
                  fontFamily: C.mono, fontSize: "0.76rem",
                  fontWeight: 700, color: "#fff", letterSpacing: "0.1em",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  ▶ SEND MESSAGE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
