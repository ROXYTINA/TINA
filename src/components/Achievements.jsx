import { useState } from "react";
import { C } from "../theme";
import { SectionHeading } from "./UI";
import { motion } from "framer-motion";
import competitionimg from "../assets/img.png";

/*
  Badge images: Credly thumbnails have a lot of empty margin, so BADGE_ZOOM crops it.
  If you switch to full-size local images (public/badges/...), set BADGE_ZOOM = 1.
*/
const BADGE_ZOOM = 1.7;

const CATEGORIES = {
    badges: {
        title: "Digital Badges",
        command: "ls ~/achievements/badges",
        items: [
            {
                id: "9c7678c1-5819-4136-953e-b9df324509aa",
                image: "https://images.credly.com/images/7623fefd-ebbd-4d8f-a053-f41dca852d9e/linkedin_thumb_image.png",
                short: "GCP",
                title: "The Basics of Google Cloud Compute",
                issuer: "Google Cloud",
                date: "2026",
                description: "Skill badge for working with virtual machines, persistent disks and web servers using Compute Engine.",
                skills: ["Google Cloud", "Compute Engine", "Virtual Machines"]
            },
            {
                id: "3fcbd2ad-219b-4723-aad9-752a39580f5c",
                image: "https://images.credly.com/images/e51a8579-188d-4363-8ed1-12ad164ef57b/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Educate Introduction to Cloud 101",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Completed the Cloud Computing 101 training and assessment, building simple cloud applications in a virtual lab.",
                skills: ["AWS", "Cloud Fundamentals", "Core Services"]
            },
            {
                id: "4e5ead71-b999-4f2b-9a34-fef9af72019c",
                image: "https://images.credly.com/images/c2d44375-6567-495a-b868-d17828c62872/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Knowledge: Compute",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Knowledge of AWS compute concepts and services, with a focus on Amazon EC2.",
                skills: ["AWS", "Amazon EC2", "Cloud Compute"]
            },
            {
                id: "f12e555f-6e4d-4554-92a2-b66c845c17fb",
                image: "https://images.credly.com/images/478cdcb9-9b92-4893-9c95-617ad0f28257/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Knowledge: Security Champion",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Key AWS security concepts: the Shared Responsibility Model, IAM, Key Management Service, threat modeling and governance.",
                skills: ["AWS", "Cloud Security", "IAM"]
            }
        ]
    },
    achievements: {
        title: "Key Achievements",
        command: "ls ~/achievements/misc",
        items: [
            {
                id: "ach-1",
                rank: "TOP 10",
                image: competitionimg,
                title: "Techno Innovation Challenge Cambodia",
                date: "2025",
                description: "My team Skymate made it to the Top 10. Our project focused on an AI robot system that assists elderly people.",
                skills: ["AI", "Collaboration", "Competition"]
            }
        ]
    }
};

const dotGrid = "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)";

function Chip({ children }) {
    return (
        <span
            style={{
                fontFamily: C.mono,
                fontSize: "0.65rem",
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(255, 110, 180, 0.1)",
                color: C.pink,
                border: "1px solid rgba(255, 110, 180, 0.2)"
            }}
        >
      {children}
    </span>
    );
}

function StarFallback({ size = 56 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.pink} strokeWidth="1.3" opacity="0.7">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21L12 17.27L5.82 21L7 14.14l-5-4.87L8.91 8.26L12 2z" />
        </svg>
    );
}

/* ---------- Badge card: badge is the hero, text stays short ---------- */
function BadgeCard({ ach, index }) {
    const [failed, setFailed] = useState(false);
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ borderColor: C.pink }}
            style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* Stage */}
            <div
                style={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: `1px solid ${C.border}`,
                    backgroundImage: `radial-gradient(circle at 50% 55%, ${C.pinkGlow} 0%, transparent 65%), ${dotGrid}`,
                    backgroundSize: "100% 100%, 14px 14px"
                }}
            >
        <span style={{ position: "absolute", top: 12, left: 14, fontFamily: C.mono, fontSize: "0.7rem", color: C.pink, zIndex: 2 }}>
          {ach.short}
        </span>
                <span style={{ position: "absolute", top: 12, right: 14, fontFamily: C.mono, fontSize: "0.7rem", color: C.textDim, zIndex: 2 }}>
          {ach.date}
        </span>

                {ach.image && !failed ? (
                    <motion.img
                        src={ach.image}
                        alt={ach.title}
                        loading="lazy"
                        onError={() => setFailed(true)}
                        style={{
                            width: 200,
                            height: 200,
                            objectFit: "contain",
                            scale: BADGE_ZOOM,
                            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.55))"
                        }}
                        whileHover={{ scale: BADGE_ZOOM * 1.07, rotate: -3 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    />
                ) : (
                    <StarFallback />
                )}
            </div>

            {/* Body */}
            <div style={{ padding: "1.1rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                <h3 style={{ fontFamily: C.mono, fontSize: "0.95rem", color: C.pink, margin: 0, lineHeight: 1.35 }}>{ach.title}</h3>
                <div style={{ fontFamily: C.mono, fontSize: "0.72rem", color: C.text, fontWeight: 600 }}>{ach.issuer}</div>
                <p
                    style={{
                        fontSize: "0.8rem",
                        color: C.textMuted,
                        lineHeight: 1.55,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {ach.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto", paddingTop: "0.4rem" }}>
                    {ach.skills.slice(0, 3).map((s) => (
                        <Chip key={s}>{s}</Chip>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}

/* ---------- Spotlight card: photo + big rank stamp ---------- */
function SpotlightCard({ ach, index }) {
    const [failed, setFailed] = useState(false);
    const hasImg = ach.image && !failed;
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ borderColor: C.pink }}
            style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexWrap: "wrap"
            }}
        >
            {/* Photo */}
            <div
                style={{
                    position: "relative",
                    flex: "1 1 340px",
                    minHeight: 300,
                    background: `radial-gradient(circle at 50% 50%, ${C.pinkGlow} 0%, transparent 70%), rgba(255,255,255,0.02)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {hasImg ? (
                    <img
                        src={ach.image}
                        alt={ach.title}
                        loading="lazy"
                        onError={() => setFailed(true)}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    <StarFallback size={72} />
                )}

                {/* Fade so the stamp stays readable */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(10,10,20,0.85) 0%, rgba(10,10,20,0) 55%)",
                        pointerEvents: "none"
                    }}
                />

                {ach.rank && (
                    <div
                        style={{
                            position: "absolute",
                            left: 20,
                            bottom: 14,
                            fontFamily: C.mono,
                            fontWeight: 800,
                            fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            color: "transparent",
                            WebkitTextStroke: `2px ${C.pink}`
                        }}
                    >
                        {ach.rank}
                    </div>
                )}
            </div>

            {/* Text */}
            <div
                style={{
                    flex: "1 1 340px",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "0.9rem"
                }}
            >
                <div style={{ fontFamily: C.mono, fontSize: "0.75rem", color: C.textDim }}>{ach.date}</div>
                <h3 style={{ fontFamily: C.mono, fontSize: "1.35rem", color: C.pink, margin: 0, lineHeight: 1.3 }}>{ach.title}</h3>
                <p style={{ fontSize: "0.92rem", color: C.textMuted, lineHeight: 1.65, margin: 0 }}>{ach.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.3rem" }}>
                    {ach.skills.map((s) => (
                        <Chip key={s}>{s}</Chip>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}

/* ---------- Section ---------- */
export default function Achievements() {
    return (
        <section
            id="Achievements"
            style={{ padding: "clamp(4rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)", position: "relative", zIndex: 1 }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <SectionHeading
                    icon={
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke={C.pink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="7" />
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                        </svg>
                    }
                    command="$ cd ~/achievements && ls -F"
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
                    {Object.entries(CATEGORIES).map(([key, cat]) => {
                        const isBadge = key === "badges";
                        return (
                            <div key={key}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        flexWrap: "wrap",
                                        gap: "0.4rem 1rem",
                                        marginBottom: "1.75rem",
                                        borderBottom: `1px solid ${C.border}`,
                                        paddingBottom: "1rem"
                                    }}
                                >
                                    <h2 style={{ fontFamily: C.mono, fontSize: "1.5rem", color: C.pink, margin: 0 }}>{cat.title}</h2>
                                    <span style={{ fontFamily: C.mono, fontSize: "0.8rem", color: C.textDim }}>{cat.command}</span>
                                    <span style={{ fontFamily: C.mono, fontSize: "0.8rem", color: C.textDim, marginLeft: "auto" }}>total {cat.items.length}</span>
                                </div>

                                {isBadge ? (
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                                            gap: "1.25rem"
                                        }}
                                    >
                                        {cat.items.map((ach, i) => (
                                            <BadgeCard key={ach.id} ach={ach} index={i} />
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                        {cat.items.map((ach, i) => (
                                            <SpotlightCard key={ach.id} ach={ach} index={i} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}