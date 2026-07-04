import { useState } from "react";
import emailjs from "@emailjs/browser";
import { C } from "../theme";
import { SectionHeading, Cursor } from "./UI";
import { motion } from "framer-motion";
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


    [7, (
        <>
            &nbsp;&nbsp;
            <span style={{ color: "#fbbf24" }}>"Telegram":</span>{" "}
            <a
                href="https://t.me/Da1nonlyRoxy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#a78bfa", textDecoration: "none" }}
            >
                "Da1nonlyRoxy"
            </a>
        </>
    )],



    [8, <>{"},"}</>],

  [9, (
      <>
        <span style={{ color: "#fbbf24" }}>"location":</span>{" "}
        <span style={{ color: "#a78bfa" }}>"Phnom Penh, Cambodia"</span>
      </>
  )],

  [10, <span style={{ color: "#94a3b8" }}>{"}"}</span>],

  [11, null],

  [12, (
      <span style={{ color: "#475569" }}>
      {"// Waiting for connection..."}
    </span>
  )],
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ loading: false, success: false, error: "Please fill all required fields." });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration missing in .env");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: "kanharoth12345@gmail.com",
        },
        publicKey
      );

      setStatus({ loading: false, success: true, error: null });
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus((s) => ({ ...s, success: false })), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus({ loading: false, success: false, error: err.message || "Failed to send message." });
    }
  };

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
                  stroke={C.pink}
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

        <div
            className="contact-grid"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem",
        }}>

          {/* ── contact_info.json ── */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -5, boxShadow: `0 15px 45px -10px rgba(167,139,250,0.15)` }}
            whileTap={{ scale: 0.995 }}
            style={{
                background: "#080814",
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "box-shadow 0.4s ease",
                display: "flex",
                flexDirection: "column",
                height: "27rem",
                width: "30rem",
                }}>
                    <div style={{
                      background: C.surface,
                        borderBottom: `1px solid ${C.border}`,
                        padding: "0.6rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,

                    }}>
                      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <span
                            key={c}
                            style={{
                                width: 11,
                                height: 11,
                                borderRadius: "50%",
                                background: c,
                                display: "inline-block"
                        }} />

                      ))}
                          <span style={{
                                marginLeft: "auto",
                                fontFamily: C.mono,
                                fontSize: "0.68rem",
                                color: C.text,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                          }}>
                            &lt;/&gt; contact_info.json
                          </span>

                    </div>

                <div
                    style={{
                        padding: "1.4rem",
                        fontFamily: C.mono,
                        fontSize: "0.78rem",
                        lineHeight: 2.1
                }}>

                  {JSON_LINES.map(([num, content], i) => (
                    <div
                        key={num || `empty-${i}`}
                        style={{
                            display: "flex",
                            gap: "1.2rem"
                        }}>

                      <span
                          style={{
                              color: C.textDim,
                              minWidth: 16,
                              textAlign: "right",
                              userSelect: "none"
                        }}>
                          {num}
                      </span>

                      <span>
                          {content}
                      </span>

                    </div>

                  ))}

                  <div
                      style={{
                          display: "flex",
                          gap: "1.2rem",
                          marginTop: "0.3rem"
                    }}>

                    <span
                        style={{
                            color: C.textDim,
                            minWidth: 16,
                            textAlign: "right",
                            userSelect: "none"
                    }}>13
                    </span>

                    <Cursor />

                  </div>

                </div>

          </motion.div>


          {/* ── sendMessage.ts ── */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: `0 15px 45px -10px rgba(255,110,180,0.15)` }}
            whileTap={{ scale: 0.995 }}
            style={{
                background: "#080814",
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "box-shadow 0.4s ease",
                display: "flex",
                flexDirection: "column"
            }}>

            <div
                style={{
                    background: C.surface,
                    borderBottom: `1px solid ${C.border}`,
                    padding: "0.6rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}>
                <span
                    style={{
                        color: C.cyan,
                        background: "rgba(167,139,250,0.1)",
                        border: "1px solid rgba(167,139,250,0.2)",
                        borderRadius: 3,
                        padding: "1px 6px",
                        fontFamily: C.mono,
                        fontSize: "0.65rem",
                    }}>
                    TS
                </span>

                <span
                    style={{
                        fontFamily: C.mono,
                        fontSize: "0.74rem",
                        color: C.text
                }}>
                    sendMessage.ts
                </span>

                <span
                    style={{
                        marginLeft: "auto",
                        width: 40,
                        height: 8,
                        background: C.pink,
                        display: "block",
                        borderRadius: 2,
                }} />
            </div>


            <div
                style={{
                    padding: "1rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
            }}>

              <div
                  style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                      padding: "1rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                  }}>


                {/* meta */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: C.mono,
                        fontSize: "0.67rem",
                        color: C.text,
                        marginBottom: "0.6rem",
                    }}>

                  <span
                      style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                  }}>

                    <span
                        style={{
                            color: C.pink,
                            fontSize: "1rem",
                    }}>
                        ✉
                    </span>
                      T0: SOPHEAKANHA
                  </span>

                </div>


                {/* name + email */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.7rem",
                        marginBottom: "0.7rem"
                }}>

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

                <div style={{
                    fontFamily: C.mono,
                    fontSize: "0.66rem",
                    color: C.textDim,
                    marginBottom: "0.9rem",
                    marginTop: "auto"
                }}>
                  {"// Protected by spam filters and rate limits"}
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={status.loading}
                  style={{
                  background: status.loading 
                    ? C.surface 
                    : `linear-gradient(135deg, ${C.pinkDim}, ${C.pink})`,
                      border: "none",
                      cursor: status.loading ? "not-allowed" : "pointer",
                      padding: "0.65rem 1.5rem",
                      borderRadius: 6,
                      fontFamily: C.mono,
                      fontSize: "0.76rem",
                      fontWeight: 700, color: "#fff",
                      letterSpacing: "0.1em",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      opacity: status.loading ? 0.7 : 1,
                      transition: "all 0.2s ease",
                      width: "11rem",
                }}>
                  {status.loading ? " SENDING..." : "▶ SEND MESSAGE"}
                </button>

                {status.success && (
                  <div style={{
                      marginTop: "1rem",
                      color: "#4ade80",
                      fontFamily: C.mono,
                      fontSize: "0.7rem"
                  }}>
                    ✓ Message sent successfully!
                  </div>
                )}

                {status.error && (
                  <div style={{ 
                    marginTop: "1rem",
                      color: "#f87171",
                      fontFamily: C.mono,
                      fontSize: "0.7rem"
                  }}>
                    ⚠ Error: {status.error}
                  </div>
                )}

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
