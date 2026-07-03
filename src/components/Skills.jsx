import { useEffect, useRef, useState, useCallback } from "react";
import { C } from "../theme";
import { SectionHeading } from "./UI";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "React",       color: "#61DAFB", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js",     color: "#FFFFFF", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { name: "TypeScript",  color: "#3178C6", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Node.js",     color: "#339933", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Spring Boot", color: "#6DB33F", icon: "https://cdn.simpleicons.org/springboot/6DB33F" },
  { name: "PostgreSQL",  color: "#4169E1", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB",     color: "#47A248", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Docker",      color: "#2496ED", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "GraphQL",     color: "#E10098", icon: "https://cdn.simpleicons.org/graphql/E10098" },
  { name: "Tailwind CSS",color: "#06B6D4", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Git",         color: "#F05032", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "JavaScript",  color: "#F7DF1E", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },

  // Languages & Tools
  { name: "Java",        color: "#ED8B00", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},
  { name: "MySQL",       color: "#4479A1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},
  { name: "JetBrains",   color: "#FF318C", icon: "https://cdn.simpleicons.org/jetbrains/FF318C" },
  { name: "NestJS",      color: "#E0234E", icon: "https://cdn.simpleicons.org/nestjs/E0234E" },
  { name: "Python",      color: "#3776AB", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "SQLite",      color: "#003B57", icon: "https://cdn.simpleicons.org/sqlite/003B57" },
  { name: "C",           color: "#A8B9CC", icon: "https://cdn.simpleicons.org/c/A8B9CC" },
  { name: "C++",         color: "#00599C", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
  { name: "HTML5",       color: "#E34F26", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "Flutter",     color: "#02569B", icon: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "Ubuntu",      color: "#E95420", icon: "https://cdn.simpleicons.org/ubuntu/E95420" },
  { name: "Rust",        color: "#FFFFFF", icon: "https://cdn.simpleicons.org/rust/FFFFFF" },
];


function fibonacciSphere(n) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}


function geodesicMesh(R, subdivisions = 3) {
  const t = (1 + Math.sqrt(5)) / 2;
  const verts = [
    [-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],
    [0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],
    [t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1],
  ].map(([x,y,z]) => {
    const len = Math.sqrt(x*x+y*y+z*z);
    return [x/len*R, y/len*R, z/len*R];
  });

  const faces = [
    [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
    [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
    [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
    [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
  ];

  const midCache = {};
  const getMid = (a, b, vs) => {
    const key = Math.min(a,b)*1000+Math.max(a,b);
    if (midCache[key] !== undefined) return midCache[key];
    const [ax,ay,az] = vs[a], [bx,by,bz] = vs[b];
    const len = Math.sqrt((ax+bx)**2+(ay+by)**2+(az+bz)**2);
    vs.push([(ax+bx)/len*R,(ay+by)/len*R,(az+bz)/len*R]);
    midCache[key] = vs.length-1;
    return vs.length-1;
  };

  let fs = faces;
  const vs = [...verts];
  for (let s = 0; s < subdivisions; s++) {
    const newFs = [];
    for (const [a,b,c] of fs) {
      const ab = getMid(a,b,vs), bc = getMid(b,c,vs), ca = getMid(c,a,vs);
      newFs.push([a,ab,ca],[b,bc,ab],[c,ca,bc],[ab,bc,ca]);
    }
    fs = newFs;
  }
  return { vertices: vs, faces: fs };
}

const BASE_PTS = fibonacciSphere(SKILLS.length);

// --- ENLARGED SPHERE CONFIGURATIONS ---
const SPHERE_R = 250;
const CANVAS_SIZE = 740;
const HALF_CANVAS = CANVAS_SIZE / 2;
const MESH = geodesicMesh(SPHERE_R, 2);


function rotatePoint(pt, ax, ay) {
  const [x, y, z] = Array.isArray(pt) ? pt : [pt.x, pt.y, pt.z];
  const cosX = Math.cos(ax), sinX = Math.sin(ax);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;
  const cosY = Math.cos(ay), sinY = Math.sin(ay);
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;
  return { x: x2, y: y1, z: z2 };
}


function project(pt, fov = 1000) { // Slightly increased FOV to match the bigger scale
  const d = fov / (fov - pt.z);
  return { sx: pt.x * d, sy: pt.y * d, depth: d, z: pt.z };
}


function SkillSphere() {
  const ICON_OFFSET = 45;

  const rotRef = useRef({ x: 0.25, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef(null);
  const lastTime = useRef(null);
  const animRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const [hovered, setHovered] = useState(null);

  const getItems = useCallback(() => {
    const { x: ax, y: ay } = rotRef.current;
    return SKILLS.map((skill, i) => {
      const bp = BASE_PTS[i];
      const scale = 1 + ICON_OFFSET / SPHERE_R;
      const outerPt = { x: bp.x * SPHERE_R * scale, y: bp.y * SPHERE_R * scale, z: bp.z * SPHERE_R * scale };
      const rp = rotatePoint(outerPt, ax, ay);
      const proj = project(rp);
      const normZ = (rp.z / (SPHERE_R * scale) + 1) / 2;
      return { ...skill, ...proj, normZ, rz: rp.z };
    }).sort((a, b) => a.rz - b.rz);
  }, []);

  const getMeshLines = useCallback(() => {
    const { x: ax, y: ay } = rotRef.current;
    return MESH.faces.map(([ai, bi, ci]) => {
      const va = MESH.vertices[ai], vb = MESH.vertices[bi], vc = MESH.vertices[ci];
      const ra = rotatePoint(va, ax, ay);
      const rb = rotatePoint(vb, ax, ay);
      const rc = rotatePoint(vc, ax, ay);
      const avgZ = (ra.z + rb.z + rc.z) / 3;
      const pa = project(ra), pb = project(rb), pc = project(rc);
      return { pa, pb, pc, avgZ };
    }).filter(f => f.avgZ > -SPHERE_R * 0.6);
  }, []);

  useEffect(() => {
    const FRICTION = 0.85;
    const AUTO_SPEED = 0.007;
    let lastTs = 0;

    const loop = (ts) => {
      lastTs = ts;

      if (!dragging.current) {
        // If the user threw it, add their throw velocity, then quickly bleed it out
        velRef.current.x *= FRICTION;
        velRef.current.y *= FRICTION;

        // Direct, forced frame step acceleration
        rotRef.current.x += velRef.current.x;
        rotRef.current.y += velRef.current.y + AUTO_SPEED;

        // Prevent upside-down flipping
        rotRef.current.x = Math.max(-Math.PI * 0.48, Math.min(Math.PI * 0.48, rotRef.current.x));
      }

      // Force React to repaint the canvas instantly
      setFrame(f => f + 1);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);


  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = performance.now();
    velRef.current = { x: 0, y: 0 };
  };
  const onPointerMove = (e) => {
    if (!dragging.current || !lastPos.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);
    velRef.current.y = (dx / dt) * 0.1;
    velRef.current.x = (dy / dt) * 0.1;
    rotRef.current.y += dx * 0.008;
    rotRef.current.x += dy * 0.008;
    rotRef.current.x = Math.max(-Math.PI * 0.48, Math.min(Math.PI * 0.48, rotRef.current.x));
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;
  };
  const onPointerUp = () => { dragging.current = false; lastPos.current = null; };

  const items = getItems();
  const meshFaces = getMeshLines();

  return (
      <div 
          className="skill-sphere-container"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
            className="skill-sphere-canvas"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{
              width: CANVAS_SIZE, height: CANVAS_SIZE,
              position: "relative",
              cursor: dragging.current ? "grabbing" : "grab",
              userSelect: "none",
              touchAction: "none",
            }}
        >
          <svg
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                overflow: "visible",
                pointerEvents: "none",
              }}
              viewBox={`-${HALF_CANVAS} -${HALF_CANVAS} ${CANVAS_SIZE} ${CANVAS_SIZE}`}
          >
            <defs>
              <radialGradient id="sphereDark" cx="45%" cy="38%" r="62%">
                <stop offset="0%"   stopColor="rgba(28,14,22,0.92)" />
                <stop offset="70%"  stopColor="rgba(12,5,10,0.97)" />
                <stop offset="100%" stopColor="rgba(5,2,5,1)" />
              </radialGradient>
              <radialGradient id="rimGlow" cx="50%" cy="50%" r="50%">
                <stop offset="75%"  stopColor="rgba(255,110,180,0)" />
                <stop offset="100%" stopColor="rgba(255,110,180,0.18)" />
              </radialGradient>
              <radialGradient id="specular" cx="35%" cy="28%" r="45%">
                <stop offset="0%"   stopColor="rgba(255,200,230,0.07)" />
                <stop offset="100%" stopColor="rgba(255,110,180,0)" />
              </radialGradient>
            </defs>

            <circle cx={0} cy={0} r={SPHERE_R} fill="url(#sphereDark)" />

            {meshFaces.map(({ pa, pb, pc, avgZ }, i) => {
              const t = (avgZ / SPHERE_R + 1) / 2;
              const alpha = t * t * 0.22;
              return (
                  <g key={i}>
                    <line x1={pa.sx} y1={pa.sy} x2={pb.sx} y2={pb.sy}
                          stroke={`rgba(255,110,180,${alpha})`} strokeWidth={0.5} />
                    <line x1={pb.sx} y1={pb.sy} x2={pc.sx} y2={pc.sy}
                          stroke={`rgba(255,110,180,${alpha})`} strokeWidth={0.5} />
                    <line x1={pc.sx} y1={pc.sy} x2={pa.sx} y2={pa.sy}
                          stroke={`rgba(255,110,180,${alpha})`} strokeWidth={0.5} />
                  </g>
              );
            })}

            <circle cx={0} cy={0} r={SPHERE_R} fill="url(#rimGlow)" />
            <circle cx={0} cy={0} r={SPHERE_R} fill="url(#specular)" />
            <circle cx={0} cy={0} r={SPHERE_R}
                    fill="none" stroke="rgba(255,110,180,0.3)" strokeWidth={1} />
          </svg>

          {items.map(({ name, color, icon, sx, sy, normZ, rz, depth }) => {
            const isFront = rz > -20;
            const isVisible = rz > -(SPHERE_R * 1.1);
            if (!isVisible) return null;

            const baseSize = 36 + normZ * 28;
            const isHovered = hovered === name;
            const opacity = Math.pow(Math.max(0, normZ), 0.6);

            return (
                <motion.div
                    key={name}
                    onMouseEnter={() => isFront && setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={isFront ? { scale: 1.15 } : {}}
                    whileTap={isFront ? { scale: 0.95 } : {}}
                    style={{
                      position: "absolute",
                      left: "50%", top: "50%",
                      transform: `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px))`,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 4,
                      opacity,
                      pointerEvents: isFront ? "auto" : "none",
                      zIndex: Math.round(normZ * 100),
                      willChange: "transform, opacity",
                      transition: "opacity 0.05s",
                    }}
                >
                  <div style={{
                    width: baseSize,
                    height: baseSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    filter: isHovered
                        ? `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}88) brightness(1.3)`
                        : `brightness(${0.35 + normZ * 0.75}) ${normZ < 0.4 ? "blur(0.4px)" : ""}`,
                    transition: "filter 0.2s",
                  }}>
                    <img
                        src={icon}
                        alt={name}
                        draggable={false}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                    />
                  </div>

                  {normZ > 0.38 && (
                      <span style={{
                        fontFamily: C.mono,
                        fontSize: `${Math.max(0.54, normZ * 0.76)}rem`,
                        fontWeight: normZ > 0.7 ? 600 : 400,
                        color: isHovered ? color : normZ > 0.65 ? "#d1d5db" : C.textDim,
                        whiteSpace: "nowrap",
                        textShadow: isHovered ? `0 0 12px ${color}` : "none",
                        letterSpacing: "0.03em",
                        transition: "color 0.2s",
                        pointerEvents: "none",
                      }}>
                  {name}
                </span>
                  )}
                </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            marginTop: "0.5rem",
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${C.border}`,
            borderRadius: 50, padding: "0.45rem 1.5rem",
            fontFamily: C.mono, fontSize: "0.74rem", color: C.textMuted,
          }}>
          <span style={{ fontSize: "1rem" }}>⊕</span>
          Drag to explore skills universe
        </motion.div>
      </div>
  );
}

export default function Skills() {
  return (
      <section style={{ padding: "6rem 3rem", position: "relative", zIndex: 1 }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ maxWidth: 1400, margin: "0 auto" }}
          >
          <SectionHeading
              icon={
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={C.pink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              }
              command="# Skills.json"
          />
          <SkillSphere />

        </motion.div>
      </section>
  );
}