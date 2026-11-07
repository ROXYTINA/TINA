import { useState, useEffect } from "react";
import { C } from "../theme";
import { SectionHeading } from "./UI";
import { motion, AnimatePresence } from "framer-motion";
import competitionimg from "../assets/img.png";
import { FiExternalLink, FiAward, FiX } from "react-icons/fi";
import { FaAws, FaGoogle } from "react-icons/fa6";

const BADGES = [
  {
    id: "9c7678c1-5819-4136-953e-b9df324509aa",
    image: "https://images.credly.com/images/7623fefd-ebbd-4d8f-a053-f41dca852d9e/linkedin_thumb_image.png",
    provider: "GCP",
    title: "Google Cloud Compute",
    subtitle: "Compute Engine & Virtual Machines",
    date: "2026",
    color: "#4285F4"
  },
  {
    id: "3fcbd2ad-219b-4723-aad9-752a39580f5c",
    image: "https://images.credly.com/images/e51a8579-188d-4363-8ed1-12ad164ef57b/linkedin_thumb_blob",
    provider: "AWS",
    title: "Cloud 101 Introduction",
    subtitle: "Cloud Fundamentals & Core Services",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "4e5ead71-b999-4f2b-9a34-fef9af72019c",
    image: "https://images.credly.com/images/c2d44375-6567-495a-b868-d17828c62872/linkedin_thumb_blob",
    provider: "AWS",
    title: "Knowledge: Compute",
    subtitle: "EC2, Auto Scaling & Load Balancing",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "f12e555f-6e4d-4554-92a2-b66c845c17fb",
    image: "https://images.credly.com/images/478cdcb9-9b92-4893-9c95-617ad0f28257/linkedin_thumb_blob",
    provider: "AWS",
    title: "Security Champion",
    subtitle: "IAM, Governance & Threat Modeling",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "a51f5a3c-08be-44b4-9f5c-8fe76bdba315",
    image: "https://images.credly.com/images/b6050277-c769-4d17-8c77-3fa963830231/linkedin_thumb_blob",
    provider: "AWS",
    title: "Events & Workflows",
    subtitle: "EventBridge, Step Functions & SQS",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "b25effc3-d81e-4af9-a028-5b6d6e6688f4",
    image: "https://images.credly.com/images/177492fb-f012-48b3-b01b-729f84ef9e2a/linkedin_thumb_blob",
    provider: "AWS",
    title: "Knowledge: Amazon ECS",
    subtitle: "Containers & Fargate Orchestration",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "d4d22fe1-8315-423e-a699-b37d1fcc76c3",
    image: "https://images.credly.com/images/7cf036b0-c609-4378-a7be-9969e1dea7ab/linkedin_thumb_blob",
    provider: "AWS",
    title: "Cloud Essentials",
    subtitle: "Architecture, Pricing & Security",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "80cdd47d-66d5-4e7c-b037-82dac4a92c24",
    image: "https://images.credly.com/images/635449f2-3a53-40b3-bf08-5af4fb95df61/linkedin_thumb_blob",
    provider: "AWS",
    title: "Knowledge: File Storage",
    subtitle: "Amazon EFS & Distributed FSx",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "90d400e8-df3d-4dc7-8a42-ee4e2e4ab088",
    image: "https://images.credly.com/images/e1c202b1-bca1-469a-9149-127b4fe891d7/linkedin_thumb_blob",
    provider: "AWS",
    title: "Networking Core",
    subtitle: "VPC, Route 53 & Subnets",
    date: "2026",
    color: "#FF9900"
  },
  {
    id: "38ac965a-f195-4e1a-b9b3-4cae7c6b44a8",
    image: "https://images.credly.com/images/a08cf90b-9838-4f6c-82bd-8db85fb89dd5/linkedin_thumb_blob",
    provider: "AWS",
    title: "Getting Started Databases",
    subtitle: "Amazon RDS & Relational SQL",
    date: "2026",
    color: "#FF9900"
  }
];

const ACHIEVEMENT = {
  rank: "TOP 10",
  title: "Techno Innovation Challenge Cambodia",
  subtitle: "National Finalist • 2025",
  team: "Team Skymate",
  description:
    "Engineered an intelligent assistive robotics system using AI computer vision to monitor, assist, and safeguard elderly individuals living independently.",
  image: competitionimg,
  tags: ["Assistive AI", "Computer Vision", "IoT Robotics"]
};

// Gentle floating animation variants with unique timing for each item
const floatAnimation = (index) => ({
  animate: {
    y: [-6, 6, -6],
    rotate: [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1, index % 2 === 0 ? -1 : 1],
    transition: {
      duration: 3.4 + (index % 4) * 0.4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: (index % 3) * 0.3
    }
  }
});

function FloatingBadge({ badge, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const credlyUrl = `https://www.credly.com/badges/${badge.id}`;

  return (
    <motion.div
      variants={floatAnimation(index)}
      animate="animate"
      style={{ position: "relative" }}
    >
      <motion.a
        href={credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          scale: 1.05,
          y: -10,
          transition: { type: "spring", stiffness: 400, damping: 20 }
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "1.35rem 1rem 1.15rem",
          borderRadius: 20,
          background: isHovered
            ? "rgba(26, 26, 46, 0.85)"
            : "rgba(26, 26, 46, 0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${isHovered ? C.pink : "rgba(255, 255, 255, 0.08)"}`,
          boxShadow: isHovered
            ? `0 16px 36px rgba(0, 0, 0, 0.45), 0 0 24px ${C.pinkGlow}`
            : "0 8px 24px rgba(0, 0, 0, 0.25)",
          textDecoration: "none",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          height: "100%"
        }}
      >
        {/* Ambient glow behind badge */}
        <div
          style={{
            position: "absolute",
            top: "24%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 115,
            height: 115,
            borderRadius: "50%",
            background: isHovered ? C.pinkGlow : `${badge.color}18`,
            filter: "blur(22px)",
            pointerEvents: "none",
            transition: "all 0.3s ease"
          }}
        />

        {/* Floating badge image */}
        <div
          style={{
            position: "relative",
            width: 120,
            height: 120,
            marginBottom: "0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <motion.img
            src={badge.image}
            alt={badge.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              scale: 1.38,
              filter: isHovered
                ? "drop-shadow(0 12px 20px rgba(0,0,0,0.65))"
                : "drop-shadow(0 5px 12px rgba(0,0,0,0.45))"
            }}
            animate={isHovered ? { scale: 1.48 } : { scale: 1.38 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>

        {/* Provider pill tag */}
        <div
          style={{
            fontFamily: C.mono,
            fontSize: "0.64rem",
            color: badge.color,
            background: "rgba(0,0,0,0.35)",
            border: `1px solid ${badge.color}40`,
            borderRadius: 12,
            padding: "2px 8px",
            marginBottom: "0.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: 4
          }}
        >
          {badge.provider === "AWS" ? <FaAws size={12} /> : <FaGoogle size={11} />}
          <span style={{ fontWeight: 600 }}>{badge.provider}</span>
          <span style={{ color: C.textDim }}>•</span>
          <span style={{ color: C.textDim }}>{badge.date}</span>
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: C.mono,
            fontSize: "0.86rem",
            fontWeight: 700,
            color: isHovered ? C.white : C.pink,
            margin: "0 0 0.3rem 0",
            lineHeight: 1.3,
            transition: "color 0.2s"
          }}
        >
          {badge.title}
        </h4>

        {/* Subtitle / summary */}
        <p
          style={{
            fontFamily: C.mono,
            fontSize: "0.7rem",
            color: C.textMuted,
            margin: 0,
            lineHeight: 1.35
          }}
        >
          {badge.subtitle}
        </p>

        {/* Direct verify indicator */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
          style={{
            marginTop: "0.75rem",
            fontFamily: C.mono,
            fontSize: "0.68rem",
            color: C.pink,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontWeight: 600
          }}
        >
          <span>Verify on Credly</span>
          <FiExternalLink size={11} />
        </motion.div>
      </motion.a>

      {/* Floating shadow beneath */}
      <div
        style={{
          width: "72%",
          height: 8,
          margin: "8px auto 0",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
          filter: "blur(3px)"
        }}
      />
    </motion.div>
  );
}

export default function Achievements() {
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setPhotoOpen(false);
    };
    if (photoOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [photoOpen]);

  return (
    <section
      id="Achievements"
      style={{
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Terminal Header */}
        <SectionHeading
          icon={
            <svg
              width="32"
              height="32"
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
          command="$ ls -la ~/achievements"
        />

        {/* Floating Badges Grid */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "1.75rem",
              flexWrap: "wrap",
              gap: 8
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: C.mono,
                  fontSize: "1.2rem",
                  color: C.pink,
                  margin: 0
                }}
              >
                Digital Badges
              </h3>
              <span style={{ fontFamily: C.mono, fontSize: "0.75rem", color: C.textDim }}>
                Verified cloud certifications floating in orbit
              </span>
            </div>

            <a
              href="https://www.credly.com/users/sreng-sopheakanha"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: C.mono,
                fontSize: "0.75rem",
                color: C.textDim,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.pink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textDim)}
            >
              View all on Credly <FiExternalLink size={12} />
            </a>
          </div>

          {/* Grid of floating badge pods */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
              gap: "1.75rem 1.35rem",
              alignItems: "start"
            }}
          >
            {BADGES.map((badge, index) => (
              <FloatingBadge key={badge.id} badge={badge} index={index} />
            ))}
          </div>
        </div>

        {/* Key Achievement Floating Spotlight */}
        <div>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontFamily: C.mono,
                fontSize: "1.2rem",
                color: C.pink,
                margin: 0
              }}
            >
              Key Achievement
            </h3>
            <span style={{ fontFamily: C.mono, fontSize: "0.75rem", color: C.textDim }}>
              Competition honors & robotics innovation
            </span>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: C.pink }}
            transition={{ duration: 0.35 }}
            style={{
              background: "rgba(26, 26, 46, 0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              flexWrap: "wrap",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              transition: "border-color 0.3s ease"
            }}
          >
            {/* Image Thumbnail */}
            <div
              style={{
                position: "relative",
                flex: "1 1 260px",
                minHeight: 200,
                cursor: "pointer",
                overflow: "hidden"
              }}
              onClick={() => setPhotoOpen(true)}
            >
              <img
                src={ACHIEVEMENT.image}
                alt={ACHIEVEMENT.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(13,13,26,0.85) 0%, transparent 60%)",
                  pointerEvents: "none"
                }}
              />

              {/* Floating Rank Stamp */}
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  bottom: 12,
                  fontFamily: C.mono,
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  lineHeight: 1,
                  color: "transparent",
                  WebkitTextStroke: `1.5px ${C.pink}`,
                  textShadow: `0 0 16px ${C.pinkGlow}`
                }}
              >
                {ACHIEVEMENT.rank}
              </div>
            </div>

            {/* Content Details */}
            <div
              style={{
                flex: "2 1 320px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "0.6rem"
              }}
            >
              <div
                style={{
                  fontFamily: C.mono,
                  fontSize: "0.72rem",
                  color: C.green,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <FiAward size={13} />
                <span>{ACHIEVEMENT.subtitle}</span>
                <span style={{ color: C.textDim }}>•</span>
                <span style={{ color: C.cyan }}>{ACHIEVEMENT.team}</span>
              </div>

              <h4
                style={{
                  fontFamily: C.mono,
                  fontSize: "1.15rem",
                  color: C.white,
                  margin: 0,
                  lineHeight: 1.3
                }}
              >
                {ACHIEVEMENT.title}
              </h4>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: C.textMuted,
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {ACHIEVEMENT.description}
              </p>

              {/* Simple Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem" }}>
                {ACHIEVEMENT.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: C.mono,
                      fontSize: "0.68rem",
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: "rgba(255, 110, 180, 0.1)",
                      color: C.pink,
                      border: "1px solid rgba(255, 110, 180, 0.2)"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Simple Image Modal */}
      <AnimatePresence>
        {photoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhotoOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(8, 8, 18, 0.9)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem"
            }}
          >
            <div style={{ position: "relative", maxWidth: 840, width: "100%" }}>
              <button
                onClick={() => setPhotoOpen(false)}
                style={{
                  position: "absolute",
                  top: -40,
                  right: 0,
                  background: "transparent",
                  border: "none",
                  color: C.white,
                  cursor: "pointer"
                }}
              >
                <FiX size={24} />
              </button>
              <img
                src={ACHIEVEMENT.image}
                alt={ACHIEVEMENT.title}
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: 12,
                  border: `1px solid ${C.pinkBorder}`
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
