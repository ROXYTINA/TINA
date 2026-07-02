import { C, experiences } from "../theme";
import { SectionHeading } from "./UI";

export default function Experience() {
  return (
    <section style={{
      padding: "6rem 3rem",
      background: "rgba(0,0,0,0.18)",
      position: "relative",
      zIndex: 1,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading icon="📋" command="$ git log --stat --oneline" />

        <div style={{ position: "relative" }}>
          {/* vertical timeline line */}
          <div style={{
            position: "absolute", left: 15, top: 0, bottom: 0,
            width: 1,
            background: `linear-gradient(${C.pink}, transparent)`,
          }} />

          {experiences.map((exp, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "2rem",
              marginBottom: "2.5rem",
              alignItems: "start",
            }}>
              {/* dot */}
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: C.bg, border: `2px solid ${C.pink}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1, boxShadow: `0 0 14px rgba(255,110,180,0.2)`,
                flexShrink: 0,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.pink }} />
              </div>

              {/* card */}
              <div style={{
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "1.4rem",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "start", marginBottom: "0.6rem",
                  flexWrap: "wrap", gap: "0.5rem",
                }}>
                  <div>
                    <div style={{
                      fontFamily: C.mono, fontSize: "0.67rem",
                      color: C.textDim, marginBottom: "0.3rem",
                    }}>
                      <span style={{ color: C.pink }}>HEAD -&gt; developer</span> · {exp.period}
                    </div>
                    <h3 style={{
                      fontFamily: C.mono, fontSize: "1rem",
                      fontWeight: 600, color: C.text,
                    }}>{exp.role}</h3>
                    <div style={{ color: C.pink, fontSize: "0.86rem", marginTop: "0.2rem" }}>
                      {exp.company}
                    </div>
                  </div>

                  <div style={{ fontFamily: C.mono, fontSize: "0.68rem", textAlign: "right" }}>
                    <div style={{ color: C.green }}>+{exp.add} insertions</div>
                    <div style={{ color: "#f87171" }}>-{exp.del} deletions</div>
                  </div>
                </div>

                <p style={{
                  color: C.textMuted, fontSize: "0.86rem",
                  lineHeight: 1.75, marginBottom: "1rem",
                }}>
                  {exp.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: C.mono, fontSize: "0.68rem",
                      background: "rgba(255,110,180,0.07)", color: C.pink,
                      border: "1px solid rgba(255,110,180,0.2)",
                      borderRadius: 4, padding: "2px 10px",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
