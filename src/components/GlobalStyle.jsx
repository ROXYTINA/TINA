import { useEffect } from "react";
import { C } from "../theme";

export default function GlobalStyle() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: ${C.bg};
        color: ${C.text};
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
        cursor: none;
      }
      a, button, [role="button"], input, textarea, select {
        cursor: none !important;
      }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: ${C.bg}; }
      ::-webkit-scrollbar-thumb { background: ${C.pinkDim}; border-radius: 3px; }
      a { text-decoration: none; color: inherit; }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes pulsedot {
        0%,100%{box-shadow:0 0 0 0 rgba(255,110,180,0.5)}
        70%{box-shadow:0 0 0 8px rgba(255,110,180,0)}
      }
      @media (max-width: 900px) {
        .projects-grid {
          grid-template-columns: 1fr !important;
        }
      }
      @media (max-width: 768px) {
        body {
            padding-bottom: 70px !important;
        }
        section {
          padding: 3rem 1.5rem !important;
        }
        .hero-section {
          padding: 6rem 1.5rem 3rem !important;
        }
        .hero-grid {
          grid-template-columns: 1fr !important;
        }
        .about-grid, .contact-grid {
          grid-template-columns: 1fr !important;
        }
        .sidebar-nav {
          right: 0 !important;
          left: 0 !important;
          bottom: 0 !important;
          top: auto !important;
          width: 100% !important;
          height: 70px !important;
          flex-direction: row !important;
          justify-content: space-around !important;
          background: rgba(13, 13, 26, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          border-top: 1px solid ${C.border} !important;
          padding: 0 1rem !important;
          transform: none !important;
          border-radius: 0 !important;
        }
        .nav-item-container {
          flex-direction: row !important;
        }
        .nav-line {
          display: none !important;
        }
        .sidebar-nav .tooltip {
            display: none !important;
        }
        .skill-sphere-container {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1/1 !important;
        }
        .skill-sphere-canvas {
            width: 100% !important;
            height: 100% !important;
        }
        .projects-repo-list {
            height: 400px !important;
            width: 100% !important;
        }
        .pinned-projects-grid {
            grid-template-columns: 1fr !important;
        }
        .scroll-progress-indicator {
            display: none !important;
        }
        .custom-cursor {
            display: none !important;
        }
        body, a, button, [role="button"], input, textarea, select {
            cursor: auto !important;
        }
      }
      @media (max-width: 480px) {
        body {
            padding-bottom: 60px !important;
        }
        .hero-name {
            font-size: 2.5rem !important;
        }
        .hero-name-typed {
            font-size: 3rem !important;
        }
        .sidebar-nav {
            height: 60px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}
