import { C } from "../theme";
import { SectionHeading, Cursor } from "./UI";
import profileImg from "../assets/me.JPG";

const STATS = [
  {
    icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    color: "#60a5fa",
    label: "PROJECTS",
    val: "10+",
    unit: "DEP",
  },
  {
    icon: (
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
          <path d="M18 8H4v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-6z" />
          <path d="M18 10h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1" />
        </svg>
    ),
    color: "#fb923c",
    label: "CAFFEINE",
    val: (
        <svg
            width="34"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: 'block' }}
        >
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
        </svg>
    ),
    unit: "ml",
  },
];

const PROFILE_ROWS = [
  { label: "OPERATOR", value: "SRENG SOPHEAKANHA", color: C.pink },
  { label: "ROLE",     value: "FULL_STACK_ENGINEER", color: C.cyan },
  { label: "EDUCATION", value: "INSTITUTE OF TECHNOLOGY OF CAMBODIA", color: C.pinkDim },
  { label: "LOCATION", value: "PHNOM PENH, CAMBODIA", color: C.green },
  { label: "YEAR", value: "4", color: C.yellow },

];

const LOG_ENTRIES = [
  {
    cmd: "whoami",
    out: "Full Stack Engineer specializing in distributed systems, real-time architecture, and high-performance web applications. Building scalable, production-grade solutions that demand clean architecture and real delivery.",
  },
  {
    cmd: "cat mission.txt",
    out: "Translating complex business requirements into robust technical solutions. Currently focused on Microservices, Real-time Systems, and AI Integration.",
  },
];



export default function About() {
  return (
      <section style={{
        padding: "6rem 3rem",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto"
        }}>
          <SectionHeading icon="▶_" command="# About.system" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "start"
          }}>

              {/* ── Profile card ── */}
              <div
                  className="profile-card"
                  style={{
                      background: "linear-gradient(145deg, #181a20, #111216)",
                      border: `1px solid rgba(255, 110, 180, 0.15)`,
                      borderRadius: 16,
                      padding: "2rem 1.8rem",
                      boxSizing: "border-box",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px 2px rgba(255, 110, 180, 0.12)`,
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}


                  onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = C.pink;
                      e.currentTarget.style.boxShadow = `0 15px 45px -10px rgba(0, 0, 0, 0.8), 0 0 40px 4px rgba(255, 110, 180, 0.25)`;
                  }}


                  onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255, 110, 180, 0.15)";
                      e.currentTarget.style.boxShadow = `0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px 2px rgba(255, 110, 180, 0.12)`;
                  }}
              >
                  {/* Decorative Top Accent Line to make it pop */}
                  <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: `linear-gradient(90deg, transparent, ${C.pink}, ${C.cyan}, transparent)`
                  }} />

                  {/* Avatar Section */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                      <div style={{ position: "relative", width: 120, height: 120 }}>

                          <img
                              src={profileImg}
                              alt="Operator Avatar"
                              className="avatar-image"
                              style={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: "50%",
                                  border: `2px solid ${C.pink}`,
                                  objectFit: "cover",
                                  background: "#080814",
                                  boxShadow: `0 0 25px rgba(255,110,180,0.3)`,
                                  display: "block",
                                  filter: "grayscale(100%)",
                                  transition: "filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s ease",
                              }}
                              onMouseEnter={(e) => {
                                  e.currentTarget.style.filter = "grayscale(0%)";
                                  e.currentTarget.style.transform = "scale(1.03)";
                              }}
                              onMouseLeave={(e) => {
                                  e.currentTarget.style.filter = "grayscale(100%)";
                                  e.currentTarget.style.transform = "scale(1)";
                              }}
                          />

                          {/* Rotating dashed ring */}
                          <div style={{
                              position: "absolute", inset: -10, borderRadius: "50%",
                              border: `1px dashed ${C.pinkBorder}`,
                              animation: "spin 14s linear infinite",
                              pointerEvents: "none",
                              opacity: 0.6
                          }} />
                      </div>
                  </div>

                  {/* Rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      {PROFILE_ROWS.map(({ label, value, color }) => (
                          <div key={label} style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "0.85rem 0",
                              borderBottom: `1px solid rgba(255, 255, 255, 0.04)`,
                              fontFamily: C.mono,
                              fontSize: "0.75rem",
                          }}>
                              <span style={{
                                  color: "#4b5563",
                                  fontWeight: "600",
                                  letterSpacing: "0.08em"
                              }}>
                                {label}
                              </span>

                              <span style={{
                                  color,
                                  fontWeight: 600,
                                  letterSpacing: "0.02em",
                                  textShadow: color === C.pink || color === C.cyan ? `0 0 10px ${color}40` : "none" // Subtle glowing text
                              }}>
                                {value}
                              </span>

                          </div>
                      ))}

                      {/* Status Row */}
                      <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.85rem 0 0.2rem 0",
                          fontFamily: C.mono,
                          fontSize: "0.75rem",
                      }}>
                          <span style={{
                              color: "#4b5563",
                              fontWeight: "600",
                              letterSpacing: "0.08em"
                          }}>
                            STATUS
                          </span>

                          <span style={{
                              background: "rgba(74,222,128,0.06)",
                              color: C.green,
                              border: `1px solid rgba(74,222,128,0.3)`,
                              borderRadius: 5,
                              padding: "3px 12px",
                              fontSize: "0.68rem",
                              fontWeight: "700",
                              letterSpacing: "0.06em",
                              boxShadow: "0 0 10px rgba(74,222,128,0.15)" // Glow effect for status badge
                          }}>
                            LEARNING
                          </span>
                      </div>
                  </div>

              </div>

              {/* ── Right column ── */}
              <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem"
              }}>

                  {/* Terminal log */}
                  <div
                      style={{
                          background: "linear-gradient(145deg, #181a20, #111216)",
                          border: `1px solid rgba(255, 110, 180, 0.12)`,
                          borderRadius: 16,
                          overflow: "hidden",
                          position: "relative",
                          boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px 2px rgba(255, 110, 180, 0.08)`,
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.borderColor = "rgba(255, 110, 180, 0.25)";
                          e.currentTarget.style.boxShadow = `0 15px 45px -10px rgba(0, 0, 0, 0.8), 0 0 40px 4px rgba(255, 110, 180, 0.15)`;
                      }}
                      onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.borderColor = "rgba(255, 110, 180, 0.12)";
                          e.currentTarget.style.boxShadow = `0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px 2px rgba(255, 110, 180, 0.08)`;
                      }}
                  >
                      {/* Top accent border line to mimic the profile card theme */}
                      <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                          background: `linear-gradient(90deg, transparent, ${C.pink}, transparent)`
                      }} />

                      <div style={{
                          background: "rgba(24, 26, 32, 0.6)",
                          borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
                          padding: "0.7rem 1.2rem",
                          fontFamily: C.mono,
                          fontSize: "0.74rem",
                          color: C.textDim,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                      }}>
                          <span style={{ color: C.pink }}>▶_</span> user_profile.log
                      </div>

                      <div style={{
                          padding: "1.4rem",
                          fontFamily: C.mono,
                          fontSize: "0.8rem",
                          lineHeight: 1.85
                      }}>
                          {LOG_ENTRIES.map((entry, i) => (
                              <div key={i} style={{ marginBottom: "1rem" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                      <span style={{ color: C.pink }}>→</span>
                                      <span style={{ color: C.cyan, textShadow: `0 0 10px ${C.cyan}30` }}>{entry.cmd}</span>
                                  </div>

                                  <div style={{
                                      color: C.textMuted,
                                      marginLeft: "1.4rem",
                                      marginTop: "0.4rem",
                                      borderLeft: `2px solid rgba(255, 255, 255, 0.06)`,
                                      paddingLeft: "0.9rem",
                                      lineHeight: 1.75,
                                      fontSize: "0.77rem",
                                  }}>
                                      {entry.out}
                                  </div>
                              </div>
                          ))}
                          <Cursor />
                      </div>
                  </div>

                  {/* Stats Grid Layout styled matching image_fc831e.png */}
                  <div
                      style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "1.2rem",
                      }}
                  >
                      {STATS.map(({ icon, label, val, unit, color }) => (
                          <div
                              key={label}
                              className="stat-card"
                              style={{
                                  background: "linear-gradient(145deg, #181a20, #111216)",
                                  border: `1px solid rgba(255, 255, 255, 0.04)`,
                                  borderRadius: 16,
                                  padding: "1.3rem 1.5rem",
                                  boxSizing: "border-box",
                                  position: "relative",
                                  overflow: "hidden",
                                  boxShadow: `0 10px 35px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.2)`,
                                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                              }}
                              onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = "translateY(-4px)";
                                  e.currentTarget.style.borderColor = color || "rgba(255, 255, 255, 0.15)";
                                  e.currentTarget.style.boxShadow = `0 15px 45px -10px rgba(0, 0, 0, 0.7), 0 0 30px ${color || "#fff"}15`;
                              }}
                              onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "translateY(0)";
                                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.04)";
                                  e.currentTarget.style.boxShadow = `0 10px 35px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.2)`;
                              }}
                          >
                              {/* Subtle Top Accent on each Stat card matching its color theme */}
                              <div style={{
                                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                                  background: `linear-gradient(90deg, transparent, ${color || C.pink}, transparent)`,
                                  opacity: 0.6
                              }} />

                              {/* Top Row */}
                              <div
                                  style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: ".8rem",
                                      marginBottom: "0.8rem",
                                  }}
                              >
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                      {icon}
                                  </div>

                                  <div
                                      style={{
                                          fontFamily: C.mono,
                                          fontSize: "0.80rem",
                                          color: "#4b5563",
                                          fontWeight: "600",
                                          letterSpacing: "0.06em",
                                      }}
                                  >
                                      {label}
                                  </div>
                              </div>

                              {/* Bottom Row */}
                              <div
                                  style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: ".5rem",
                                  }}
                              >
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "1.6rem",
                                        fontWeight: 700,
                                        color: "#fff",
                                        lineHeight: 1,
                                        textShadow: `0 0 15px rgba(255, 255, 255, 0.05)`,
                                    }}
                                >
                                  {val}
                                </span>

                                  <span
                                      style={{
                                          color: "#4b5563",
                                          fontFamily: C.mono,
                                          fontSize: "0.85rem",
                                          fontWeight: "600",
                                          transform: typeof val !== "string" ? "translateY(2px)" : "none",
                                      }}
                                  >
                                  {unit}
                                </span>


                              </div>

                          </div>
                      ))}
                  </div>

              </div>
          </div>
        </div>
      </section>
  );
}