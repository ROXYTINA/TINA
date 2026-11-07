import { useState, useRef, useEffect } from "react";
import { C } from "../theme";
import { SectionHeading } from "./UI";
import { motion, AnimatePresence } from "framer-motion";
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
            },
            {
                id: "a51f5a3c-08be-44b4-9f5c-8fe76bdba315",
                image: "https://images.credly.com/images/b6050277-c769-4d17-8c77-3fa963830231/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Knowledge: Events and Workflows",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Knowledge of event-driven computing and AWS Serverless concepts with a focus on AWS Step Functions, Amazon EventBridge, Amazon SQS and Amazon SNS.",
                skills: ["AWS", "Serverless", "Events & Workflows"]
            },
            {
                id: "b25effc3-d81e-4af9-a028-5b6d6e6688f4",
                image: "https://images.credly.com/images/177492fb-f012-48b3-b01b-729f84ef9e2a/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Knowledge: Amazon ECS",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Earners of this badge have developed knowledge on Amazon Elastic Container Service (Amazon ECS) concepts and services.",
                skills: ["AWS", "Amazon ECS", "Containers"]
            },
            {
                id: "d4d22fe1-8315-423e-a699-b37d1fcc76c3",
                image: "https://images.credly.com/images/7cf036b0-c609-4378-a7be-9969e1dea7ab/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Knowledge: Cloud Essentials",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Earners of this badge have developed knowledge of foundational AWS Cloud concepts with a focus on AWS Compute, Storage, Networking and Database services, security, architecture, pricing, and support.",
                skills: ["AWS", "Cloud Essentials", "Core Services"]
            },
            {
                id: "80cdd47d-66d5-4e7c-b037-82dac4a92c24",
                image: "https://images.credly.com/images/635449f2-3a53-40b3-bf08-5af4fb95df61/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Knowledge: File Storage",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Earners of this badge have developed technical skills and knowledge of AWS storage services with a focus on Amazon Elastic File System (EFS) and Amazon FSx.",
                skills: ["AWS", "File Storage", "EFS"]
            },
            {
                id: "90d400e8-df3d-4dc7-8a42-ee4e2e4ab088",
                image: "https://images.credly.com/images/e1c202b1-bca1-469a-9149-127b4fe891d7/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Knowledge: Networking Core",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Earners of this badge have developed technical knowledge of AWS networking concepts and services with a focus on Amazon VPC, AWS Cloud WAN and Amazon Route 53.",
                skills: ["AWS", "Networking", "VPC"]
            },
            {
                id: "38ac965a-f195-4e1a-b9b3-4cae7c6b44a8",
                image: "https://images.credly.com/images/a08cf90b-9838-4f6c-82bd-8db85fb89dd5/linkedin_thumb_blob",
                short: "AWS",
                title: "AWS Educate Getting Started with Databases",
                issuer: "AWS Training and Certification",
                date: "2026",
                description: "Earners of this badge have completed the Getting Started with Databases training. They have demonstrated the ability to set up an Amazon Relational Database instance and use SQL commands.",
                skills: ["AWS", "Databases", "RDS", "SQL"]
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

/* ---------- Badge card: Slimmer and more compact ---------- */
function BadgeCard({ ach, index, isHovered, onHover }) {
    const [failed, setFailed] = useState(false);
    return (
        <motion.article
            onHoverStart={() => onHover(index)}
            onHoverEnd={() => onHover(null)}
            style={{
                background: C.surface,
                border: `1px solid ${isHovered ? C.pink : C.border}`,
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                width: 220,
                flexShrink: 0,
                position: "relative",
                transition: "border-color 0.3s ease",
            }}
        >
            {/* Stage */}
            <div
                style={{
                    position: "relative",
                    height: 140,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: `1px solid ${C.border}`,
                    backgroundImage: `radial-gradient(circle at 50% 55%, ${C.pinkGlow} 0%, transparent 65%), ${dotGrid}`,
                    backgroundSize: "100% 100%, 10px 10px"
                }}
            >
                <span style={{ position: "absolute", top: 8, left: 10, fontFamily: C.mono, fontSize: "0.6rem", color: C.pink, zIndex: 2 }}>
                    {ach.short}
                </span>
                
                {ach.image && !failed ? (
                    <motion.img
                        src={ach.image}
                        alt={ach.title}
                        loading="lazy"
                        onError={() => setFailed(true)}
                        style={{
                            width: 120,
                            height: 120,
                            objectFit: "contain",
                            scale: BADGE_ZOOM,
                            filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
                        }}
                        animate={isHovered ? { scale: BADGE_ZOOM * 1.1, rotate: -3 } : { scale: BADGE_ZOOM, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    />
                ) : (
                    <StarFallback size={40} />
                )}
            </div>

            {/* Body */}
            <div style={{ padding: "0.8rem", display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
                <h3 style={{ 
                    fontFamily: C.mono, 
                    fontSize: "0.8rem", 
                    color: C.pink, 
                    margin: 0, 
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    height: "2.1rem"
                }}>{ach.title}</h3>
                <div style={{ fontFamily: C.mono, fontSize: "0.65rem", color: C.textDim }}>{ach.issuer} • {ach.date}</div>
            </div>
        </motion.article>
    );
}

function BadgeSlider({ items }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const scrollRef = useRef(null);

    // Continuous scroll animation logic if needed, or just let users scroll
    // Let's implement a smooth horizontal scroll container
    
    return (
        <div style={{ position: "relative", width: "100%" }}>
            <div 
                ref={scrollRef}
                style={{ 
                    display: "flex", 
                    gap: "1.5rem", 
                    overflowX: "auto", 
                    padding: "1rem 0.5rem 2rem",
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none",  // IE 10+
                    WebkitOverflowScrolling: "touch"
                }}
                className="hide-scrollbar"
            >
                <style>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {items.map((ach, i) => (
                    <BadgeCard 
                        key={ach.id} 
                        ach={ach} 
                        index={i} 
                        isHovered={hoveredIndex === i}
                        onHover={setHoveredIndex}
                    />
                ))}
            </div>
            
            {/* Fade overlays */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, bottom: 0, width: 40,
                background: `linear-gradient(to right, ${C.bg}, transparent)`,
                pointerEvents: "none",
                zIndex: 2
            }} />
            <div style={{
                position: "absolute",
                top: 0, right: 0, bottom: 0, width: 40,
                background: `linear-gradient(to left, ${C.bg}, transparent)`,
                pointerEvents: "none",
                zIndex: 2
            }} />
        </div>
    );
}

/* ---------- Spotlight card: more compact version ---------- */
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
                flexWrap: "wrap",
                minHeight: 220
            }}
        >
            {/* Photo */}
            <div
                style={{
                    position: "relative",
                    flex: "1 1 280px",
                    minHeight: 200,
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
                    <StarFallback size={60} />
                )}

                {/* Fade so the stamp stays readable */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(10,10,20,0.8) 0%, rgba(10,10,20,0) 60%)",
                        pointerEvents: "none"
                    }}
                />

                {ach.rank && (
                    <div
                        style={{
                            position: "absolute",
                            left: 16,
                            bottom: 10,
                            fontFamily: C.mono,
                            fontWeight: 800,
                            fontSize: "clamp(2rem, 5vw, 3rem)",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            color: "transparent",
                            WebkitTextStroke: `1.5px ${C.pink}`
                        }}
                    >
                        {ach.rank}
                    </div>
                )}
            </div>

            {/* Text */}
            <div
                style={{
                    flex: "2 1 340px",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "0.6rem"
                }}
            >
                <div style={{ fontFamily: C.mono, fontSize: "0.7rem", color: C.textDim }}>{ach.date}</div>
                <h3 style={{ fontFamily: C.mono, fontSize: "1.1rem", color: C.pink, margin: 0, lineHeight: 1.3 }}>{ach.title}</h3>
                <p style={{ fontSize: "0.85rem", color: C.textMuted, lineHeight: 1.55, margin: 0 }}>{ach.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.2rem" }}>
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
            style={{ padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem)", position: "relative", zIndex: 1 }}
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

                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
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
                                    <>
                                        <BadgeSlider items={cat.items} />
                                        <div style={{ textAlign: "center", marginTop: "1rem" }}>
                                        <a
                                            href="https://www.credly.com/users/sreng-sopheakanha"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                fontFamily: C.mono,
                                                fontSize: "0.8rem",
                                                color: C.textMuted,
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 8,
                                                textDecoration: "none"
                                            }}
                                        >
                                            View all badges on Credly →
                                        </a>
                                    </div>
                                </>
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