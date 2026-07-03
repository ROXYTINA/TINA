import { useState, useEffect } from "react";
import {C, LAYOUT} from "../theme";
import { Cursor } from "./UI";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";


const FULL_NAME = "Sopheakanha";

const MODULES = ["REACT", "NEXT.JS", "NODE.JS", "TYPESCRIPT", "JAVA", "SPRING", "SQL", "JAVASCRIPT", "DOCKER", "GIT", "GRAPHQL"];
const CODE_LINES = [
  [1, "comment", "// Welcome to my workspace"],
  [2, "code", null],
  [3, "blank", ""],
  [4, "code", null],
  [5, "code", null],
  [6, "code", null],
  [7, "attr", "name"],
  [8, "attr", "role"],
  [9, "attr", "level"],
  [10, "attr", "passion"],
  [11, "close", null],
  [12, "code", null],
  [13, "code", null],
];



function CodeLine({ num, type, extra }) {
  const dim = { color: C.textDim };
  const purple = { color: "#a78bfa" };
  const green = { color: "#86efac" };
  const yellow = { color: C.yellow };
  const pink = { color: C.pink };
  const cyan = { color: C.cyan };

  const content = {

    comment: <span style={dim}>// Welcome to my workspace</span>,
    blank: <span />,
    code: (() => {
      if (num === 2) return <><span style={purple}>import</span>{" { "}<span style={cyan}>Developer</span>{" } "}<span style={purple}>from</span> <span style={green}>'./Cambodia'</span>;</>;
      if (num === 4) return <><span style={purple}>const</span> <span style={cyan}>Portfolio</span> = () =&gt; {"{"}</>;
      if (num === 5) return <>&nbsp;&nbsp;<span style={purple}>return</span> (</>;
      if (num === 6) return <>&nbsp;&nbsp;&nbsp;&nbsp;<span style={pink}>&lt;Developer</span></>;
      if (num === 11) return <>&nbsp;&nbsp;);</>;
      if (num === 12) return <>{"};"};</>;
      return null;
    })(),

    attr: (
        <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={green}>{extra}</span>=
          <span style={yellow}>
      {
        extra === "name"    ? '"Sopheakanha"'                  :
          extra === "role"    ? '"Full Stack Engineer"'           :
              extra === "passion" ? '"Engineering Beyond Boundaries"' :
                  extra === "level"   ? '"Beginner"'                        : '""'}
    </span>
        </>
    ),
    close: <>&nbsp;&nbsp;&nbsp;&nbsp;<span style={pink}>/&gt;</span></>,
  }[type];

  return (
      <div style={{
        display: "flex",
        gap: "1.2rem",
        lineHeight: 1.9,
        fontSize: "1.6rem"
      }}>

      <span style={
        {
          color: C.textDim,
          minWidth: 15,
          textAlign: "right",
          userSelect: "none",
          fontSize: "0.8rem"}
      }>
        {num}
      </span>

      <span style={
        {
          fontFamily: C.mono,
          fontSize: "0.75rem",
        }
      }>
        {content}
      </span>

    </div>
  );

}

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [state, setState] = useState();
  const [clickedBtn, setClickedBtn] = useState(null);

  const handleClick = (id, target) => {
    setClickedBtn(id);

    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
    });

    setTimeout(() => setClickedBtn(null), 200);
  };

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= FULL_NAME.length) { setTyped(FULL_NAME.slice(0, i)); i++; }
      else clearInterval(t);
    }, 110);
    return () => clearInterval(t);
  }, []);

  return (
      <section 
          className="hero-section"
          style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
        width: "100%",
        margin: 0,
        maxWidth: "none",
        padding: "2rem 5rem",
        position: "relative",
        zIndex: 1,
      }}>

        <div 
            className="hero-grid"
            style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          maxWidth: 1200,
          gap: "3rem",
          alignItems: "center"
        }}>
          {/* ── LEFT ── */}
        <div style={{
          animation: "fadeInUp 0.8s ease forwards",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}>

        {/* Kernel badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 8,
          background: "rgba(255,110,180,0.08)",
          border: `1px solid ${C.pinkBorder}`,
          borderRadius: 4,
          padding: "4px 12px",
          fontFamily: C.mono,
          fontSize: "0.68rem",
          color: C.pink,
          letterSpacing: "0.1em",
        }}>

          <span style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: C.pink,
            display: "inline-block",
            animation: "blink 1.5s ease infinite",
          }} />
          SYSTEM.KERNEL :: v0.0.1
        </div>


        {/* Name */}
          <motion.h1 
              className="hero-name"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
            fontSize: "3.5rem",
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
              Hello, I'm
          <br />

            <span 
                className="hero-name-typed"
                style={{
              background: `linear-gradient(135deg, ${C.pink}, ${C.white})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "4rem",
              display: "block",
              textAlign: "left",
            }}>
              {typed}
            </span>

          {typed.length < FULL_NAME.length && <Cursor />}

        </motion.h1>


        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: C.mono,
            fontSize: "0.88rem",
            color: C.pink,
            marginBottom: "0.5rem"
          }}>
          &lt;Engineer /&gt; Beginner Full Stack Engineer.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            color: C.textMuted,
            lineHeight: 1.75,
            marginBottom: "2rem",
            maxWidth: 460,
            fontSize: "0.93rem"
          }}>
          Specializing in designing and building interacted and interesting systems and applications.
          Passionate about creating innovative solutions that push the boundaries of technology and enhance user experiences.
        </motion.p>


        {/* Buttons */}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap"
          }}>

          {/*<button style={{*/}
          {/*  background: `linear-gradient(135deg, ${C.pinkDim}, ${C.pink})`,*/}
          {/*  border: "none", cursor: "pointer", padding: "0.65rem 1.5rem",*/}
          {/*  borderRadius: 6, fontFamily: C.mono, fontSize: "0.8rem", color: "#fff",*/}
          {/*  display: "flex", alignItems: "center", gap: 8,*/}
          {/*}}>*/}
          {/*  ▶ Initialize OS*/}
          {/*</button>*/}

          <button
              onClick={() => window.open("https://github.com/ROXYTINA", "_blank")}
              style={{
                background: "rgba(255,110,180,0.06)",
                border: `1px solid ${C.pinkBorder}`,
                cursor: "pointer",
                padding: "0.65rem 1.5rem",
                borderRadius: 6,
                fontFamily: C.mono,
                fontSize: "0.8rem",
                color: C.text,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
          >
            <FaGithub size={18} />
            Check MY GitHub
          </button>

        </motion.div>

        {/* Modules */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap"
          }}>

          <span style={{
            fontFamily: C.mono,
            fontSize: "0.64rem",
            color: C.white,
            letterSpacing: "0.08em"
          }}>
            LOADED_MODULES:
          </span>


          {MODULES.map((m) => (
            <span key={m} style={{
              fontFamily: C.mono,
              fontSize: "0.62rem",
              color: C.textMuted,
              border: `1px solid ${C.pinkDim}`,
              borderRadius: 3,
              padding: "2px 8px",
            }}>{m}</span>
          ))}


        </motion.div>
      </div>


      {/* ── RIGHT — VS Code editor ── */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ 
          y: -8,
          boxShadow: `0 20px 80px rgba(255,110,180,0.15)`,
        }}
        style={{
        zIndex: 2
      }}>

        <div style={{
          background: "#080814",
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: `0 0 60px rgba(255,110,180,0.08)`,
          transition: "box-shadow 0.4s ease",
        }}>

          {/* Title bar */}
          <div style={{
            background: C.surface,
            borderBottom: `1px solid ${C.border}`,
            padding: "0.6rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}>

            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} style={{
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
              fontSize: "0.7rem",
              color: C.textDim,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <span style={{ color: C.pink }}>●</span> portfolio.tsx
            </span>

          </div>


          {/* Code */}
          <div style={{
            padding: "1.2rem 1.2rem 0.3rem"
          }}>
            {CODE_LINES.map(([num, type, extra]) => (

              <CodeLine key={num} num={num} type={type} extra={extra} />

            ))}

          </div>


          {/* Editor buttons */}
          <div style={{
            padding: "1rem 1.4rem 1.4rem",
            display: "flex",
            gap: "1rem"
          }}>

            <button
                onClick={() => handleClick("about", "About")}
                style={{
                  background: `linear-gradient(135deg, ${C.pinkDim}, ${C.pink})`,
                  border: "none",
                  cursor: "pointer",
                  padding: "0.55rem 1.2rem",
                  borderRadius: 6,
                  fontFamily: C.mono,
                  fontSize: "0.76rem",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,

                  // 👇 ANIMATION PART
                  transform: clickedBtn === "about" ? "scale(0.92)" : "scale(1)",
                  boxShadow:
                      clickedBtn === "about"
                          ? "0 0 20px rgba(244,114,182,0.8)"
                          : "0 0 0px rgba(0,0,0,0)",

                  transition: "all 0.15s ease",
                }}
            >
              ▶ Run Profile
            </button>

            <button
                onClick={() => handleClick("projects", "Projects")}
                style={{
                  background: "transparent",
                  border: `1px solid ${C.border}`,
                  cursor: "pointer",
                  padding: "0.55rem 1.2rem",
                  borderRadius: 6,
                  fontFamily: C.mono,
                  fontSize: "0.76rem",
                  color: C.textMuted,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,

                  transform: clickedBtn === "projects" ? "scale(0.92)" : "scale(1)",
                  boxShadow:
                      clickedBtn === "projects"
                          ? `0 0 15px ${C.pink}`
                          : "none",

                  transition: "all 0.15s ease",
                }}
            >
              📁 View Projects
            </button>

          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
}
