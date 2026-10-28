import { useEffect } from "react";
import { C } from "../theme";
import { SectionHeading } from "./UI";
import { motion } from "framer-motion";

const CATEGORIES = {
  badges: {
    title: "Digital Badges",
    command: "ls -la ~/achievements/badges",
    items: [
      {
        id: "9c7678c1-5819-4136-953e-b9df324509aa",
        title: "The Basics of Google Cloud Compute",
        issuer: "Google Cloud",
        date: "2024",
        description: "Covers the fundamental concepts of cloud computing and how to use Google Cloud services to build and deploy applications.",
        skills: ["Google Cloud", "Cloud Computing", "Compute Engine", "Infrastructure"]
      },
      {
        id: "3fcbd2ad-219b-4723-aad9-752a39580f5c",
        title: "AWS Educate Introduction to Cloud 101",
        issuer: "Amazon Web Services (AWS)",
        date: "2023",
        description: "Foundational knowledge of cloud computing, including AWS services, security, architecture, pricing, and support.",
        skills: ["AWS", "Cloud Fundamentals", "Cloud Security", "AWS Educate"]
      }
    ]
  },
  certificates: {
    title: "Certificates",
    command: "ls -la ~/achievements/certs",
    items: [
      {
        id: "cert-1",
        title: "Full Stack Web Development",
        issuer: "Online Learning Platform",
        date: "2023",
        description: "Professional certification covering end-to-end web application development using modern stacks.",
        skills: ["React", "Node.js", "MongoDB", "Express"]
      }
    ]
  },
  achievements: {
    title: "Key Achievements",
    command: "ls -la ~/achievements/misc",
    items: [
      {
        id: "ach-1",
        title: "Open Source Contributor",
        issuer: "GitHub Community",
        date: "2024",
        description: "Actively contributed to various open-source projects, improving documentation and fixing bugs.",
        skills: ["Git", "Collaboration", "Code Review"]
      }
    ]
  }
};

export default function Achievements() {
  useEffect(() => {
    // Load Credly script if it's not already there
    const scriptId = "credly-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.async = true;
      script.src = "//cdn.credly.com/assets/utilities/embed.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section
      id="Achievements"
      style={{
        padding: "6rem 3rem",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          }
          command="$ cd ~/achievements && ls -F"
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <div key={key}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem", 
                marginBottom: "2rem",
                borderBottom: `1px solid ${C.border}`,
                paddingBottom: "1rem"
              }}>
                <h2 style={{ 
                  fontFamily: C.mono, 
                  fontSize: "1.5rem", 
                  color: C.pink,
                  margin: 0
                }}>
                  {cat.title}
                </h2>
                <span style={{ 
                  fontFamily: C.mono, 
                  fontSize: "0.8rem", 
                  color: C.textDim 
                }}>
                  {cat.command}
                </span>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "2rem",
                width: "100%"
              }}>
                {cat.items.map((ach, i) => (
                  <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    {/* Terminal-like Header for the Card */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      borderBottom: `1px solid ${C.border}`,
                      paddingBottom: "0.75rem",
                      marginBottom: "0.5rem"
                    }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
                      <span style={{
                        fontFamily: C.mono,
                        fontSize: "0.7rem",
                        color: C.textDim,
                        marginLeft: "auto",
                        letterSpacing: "0.05em"
                      }}>
                        {ach.date}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                      {/* Badge Embed or Icon Section */}
                      <div style={{
                        flexShrink: 0,
                        width: 150,
                        height: key === 'badges' ? 270 : 150,
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: 8,
                        border: `1px solid ${C.border}`,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {key === 'badges' ? (
                          <div
                            data-iframe-width="150"
                            data-iframe-height="270"
                            data-share-badge-id={ach.id}
                            data-share-badge-host="https://www.credly.com"
                          ></div>
                        ) : (
                          <div style={{ 
                            textAlign: "center",
                            color: C.pink,
                            opacity: 0.5
                          }}>
                            {key === 'certificates' ? (
                              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 15l-2 5l2 2l2-2l-2-5z" />
                                <path d="M15 7a3 3 0 1 1-6 0a3 3 0 0 1 6 0z" />
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                              </svg>
                            ) : (
                              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21L12 17.27L5.82 21L7 14.14l-5-4.87L8.91 8.26L12 2z" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Details Section */}
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <h3 style={{
                          fontFamily: C.mono,
                          fontSize: "1.1rem",
                          color: C.pink,
                          marginBottom: "0.5rem",
                          lineHeight: 1.3
                        }}>
                          {ach.title}
                        </h3>
                        <div style={{
                          fontSize: "0.8rem",
                          color: C.text,
                          fontWeight: 600,
                          marginBottom: "0.8rem",
                          fontFamily: C.mono
                        }}>
                          {ach.issuer}
                        </div>
                        <p style={{
                          fontSize: "0.85rem",
                          color: C.textMuted,
                          lineHeight: 1.6,
                          marginBottom: "1.2rem"
                        }}>
                          {ach.description}
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                          {ach.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                fontFamily: C.mono,
                                fontSize: "0.65rem",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                background: "rgba(255, 110, 180, 0.1)",
                                color: C.pink,
                                border: `1px solid rgba(255, 110, 180, 0.2)`
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Decorative Glow */}
                    <div style={{
                      position: "absolute",
                      bottom: "-20%",
                      right: "-10%",
                      width: "40%",
                      height: "40%",
                      background: `radial-gradient(circle, ${C.pinkGlow} 0%, transparent 70%)`,
                      pointerEvents: "none",
                      zIndex: 0
                    }} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
