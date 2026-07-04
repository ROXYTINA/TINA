import { useEffect, useState } from "react";
import { C, projects } from "../theme";
import { SectionHeading } from "./UI";
import { motion } from "framer-motion";

// Pull the top projects from your local file for the pinned grid section
const PINNED = projects.slice(0, 5);

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Fetches your public repositories sorted by most recently updated
    fetch("https://api.github.com/users/ROXYTINA/repos?sort=updated&per_page=50")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch live repos");
          return res.json();
        })

        .then((data) => {
          const formatted = data.map((repo) => ({
            name: repo.name,
            url: repo.html_url,
            lang: repo.language,
            langColor: getLanguageColor(repo.language),
            updated: new Date(repo.updated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          }));
          setRepos(formatted);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
  }, []);


  // Helper utility to match GitHub language values with sleek custom hex tags
  const getLanguageColor = (lang) => {
    if (!lang) return "#1E90FF";

    const normalized = lang.trim().toLowerCase();

    const colors = {
      typescript: "#1E90FF",
      javascript: "#F7DF1E",
      react: "#61DAFB",
      html: "#E34F26",
      css: "#1572B6",
      python: "#3776AB",
      go: "#00ADD8",
      java: "#ED8B00",
      dart: "#00B4AB",
      vue: "#41B883",
      nextjs: "#E53935",
      "next.js": "#E53935",
    };

    return colors[normalized] || "#9CA3AF";
  };


  return (
      <section
          style={{
            padding: "6rem 3rem",
            position: "relative",
            zIndex: 1
      }}>

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Terminal Header */}
          <SectionHeading
              icon={
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={C.pink}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>

                </svg>
              }
              command="$ ls -la ~/projects"
          />

          {/* Outer Dashboard Grid Layout */}
          <div
              className="projects-grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2.5rem",
                alignItems: "start"
          }}>
            {/* ── Sidebar: Repositories List (Live Streamed) ── */}
            <motion.div 
                className="projects-repo-list"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "column",
                  height: "720px",
                  width: "20rem",
                  flexShrink: 0
                }}>

              {/* Sidebar Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: `1px solid ${C.border}`,
                fontFamily: C.mono,
                fontSize: "0.76rem"
              }}>

                <span style={{
                  color: C.text,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: C.mono,
                }}>

                  <svg
                      aria-hidden="true"
                      height="16"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      fill="currentColor"
                      style={{ color: C.white, transform: "translateY(-1px)" }}
                  >
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                  </svg>
                  REPOSITORIES
                </span>

                <span style={{ color: C.textDim }}>{loading ? "..." : repos.length}</span>

              </div>

              {/* Scrollable Container */}
              <div style={{
                overflowY: "auto",
                flex: 1,
                padding: "0 1rem",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" }
              }}>
                {loading ? (
                    <div style={{
                      padding: "2rem 0",
                      color: C.textDim,
                      fontFamily: C.mono,
                      fontSize: "0.75rem",
                      textAlign: "center"
                    }}>
                      loading stream...
                    </div>
                ) : (
                    repos.map((r, i) => (
                        <motion.a
                            key={i}
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ 
                              x: 5, 
                              background: "rgba(255,110,180,0.03)",
                              paddingLeft: "0.5rem"
                            }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              display: "block",
                              textDecoration: "none",
                              padding: "0.75rem 0",
                              borderBottom: i < repos.length - 1 ? `1px solid ${C.border}` : "none",
                              cursor: "pointer",
                              transition: "background 0.2s ease",
                            }}
                        >
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 2
                          }}>

                            <div style={{
                              fontFamily: C.mono,
                              fontSize: "0.75rem",
                              color: C.pink, fontWeight: 600
                            }}>
                              {r.name}
                            </div>

                          </div>

                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontFamily: C.mono,
                            fontSize: "0.62rem"
                          }}>


                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5
                        }}>

                          <span style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: r.langColor,
                            display: "inline-block",
                          }} />

                          <span style={{color: C.white }}>{r.lang || "TypeScript"}</span>

                        </span>

                            <span style={{ color: C.textDim }}>•</span>
                            <span style={{ color: C.textDim }}>Updated {r.updated}</span>

                          </div>

                        </motion.a>
                    ))
                )}
              </div>
            </motion.div>

            {/* ── Main Content Block: Pinned Compact Grid ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ flex: 1, minWidth: "300px" }}
            >
              <div style={{
                fontFamily: C.mono,
                fontSize: "0.7rem",
                color: C.text,
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}>
                PINNED PROJECTS
              </div>

              {/* Grid display config scaled down from minmax 360px to 260px for smaller cards */}
              <div 
                  className="pinned-projects-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "1rem",
                    width: "100%",
                  }}>
                {PINNED.map((p, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        whileHover={{ 
                          y: -5,
                          scale: 1.02,
                          boxShadow: "0 10px 30px -15px rgba(255,110,180,0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          background: C.surface, 
                          border: `1px solid ${C.border}`,
                          borderRadius: 8, 
                          padding: "0.9rem",
                          display: "flex", 
                          flexDirection: "column", 
                          justifyContent: "space-between",
                          cursor: "pointer"
                        }}
                    >
                      <div>

                        {/* Card Top Title Row */}
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            marginBottom: "0.4rem",
                          }}>

                            <a
                                href={p.repoUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  fontFamily: C.mono,
                                  fontSize: "0.76rem",
                                  color: C.pink,
                                  fontWeight: 600,
                                  textDecoration: "none",
                                  transition: "color 0.2s",
                                }}
                                  onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                                  onMouseLeave={e => e.currentTarget.style.color = C.pink}
                                >
                                {p.name}
                          </a>
                        </div>

                        {/* Card Description text */}
                        <p style={{
                          fontSize: "0.74rem",
                          color: C.textMuted,
                          lineHeight: 1.5,
                          marginBottom: "0.6rem",
                        }}>
                          {p.desc}
                        </p>

                        {/* Technology chips styled with your pink glow theme */}
                        <div style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.3rem",
                          marginBottom: "0.6rem"
                        }}>

                          {p.tags.map((t) => (
                              <span key={t} style={{
                                fontFamily: C.mono,
                                fontSize: "0.6rem",
                                background: "rgba(255,110,180,0.07)",
                                color: C.pink,
                                border: "1px solid rgba(255,110,180,0.18)",
                                borderRadius: 3,
                                padding: "1px 5px",
                              }}>
                                {t}
                              </span>
                          ))}

                        </div>

                      </div>

                      {/* Bottom Stats & Trigger Row */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        fontFamily: C.mono,
                        fontSize: "0.70rem",
                        borderTop: `1px solid ${C.border}`,
                        paddingTop: "0.6rem",
                        marginTop: "0.4rem"
                      }}>
                        <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4
                        }}>

                          <span style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: p.langColor || C.pink,
                            display: "inline-block",
                          }} />

                          <span style={{ color: C.text }}>
                            {p.lang}
                          </span>

                        </span>

                        {p.demoUrl && (
                        <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              marginLeft: "auto",
                              background: `linear-gradient(135deg, ${C.pinkDim}, ${C.pink})`,
                              border: "none", cursor: "pointer",
                              textDecoration: "none",
                              padding: "2px 10px", borderRadius: 4,
                              fontFamily: C.mono, fontSize: "0.62rem", color: "#fff",
                              display: "inline-flex", alignItems: "center"
                            }}
                        >
                          Demo ↗
                        </a>
                        )}
                      </div>
                    </motion.div>
                ))}
              </div>

              {/* Bottom Footer Action */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{ textAlign: "center", marginTop: "1.5rem" }}
              >
                <a
                    href="https://github.com/ROXYTINA"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "transparent", border: "none", cursor: "pointer",
                      fontFamily: C.mono, fontSize: "0.8rem", color: C.textMuted,
                      display: "inline-flex", alignItems: "center", gap: 8,
                      textDecoration: "none"
                    }}
                >
                  View all repositories →
                </a>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>
  );
}