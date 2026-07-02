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
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}
