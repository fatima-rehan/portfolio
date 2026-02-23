import { useState, useCallback } from "react";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { useSilverCursor } from "../hooks/useSilverCursor.js";
import { FilmGrain } from "../overlays/FilmGrain.jsx";
import { BackgroundStatic } from "../overlays/BackgroundStatic.jsx";
import { ScanLines } from "../overlays/ScanLines.jsx";
import { LensFlare } from "../overlays/LensFlare.jsx";
import { HeroSection } from "../sections/HeroSection.jsx";
import { AboutSection } from "../sections/AboutSection.jsx";
import { GallerySection } from "../sections/GallerySection.jsx";
import { VideoVault } from "../sections/VideoVault.jsx";
import { PortfolioSection } from "../sections/PortfolioSection.jsx";
import { ContactSection } from "../sections/ContactSection.jsx";

export default function FatimaRehanPortfolio() {
  const [page, setPage] = useState("main");
  const isMobile = useIsMobile();

  useSilverCursor(isMobile);

  const navigateTo = useCallback((target) => {
    if (target === "vault") {
      setPage("vault");
      return;
    }
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;1,700&family=Space+Mono:wght@400;700&display=swap');

        body {
          font-family: 'Space Mono', system-ui, sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-text-size-adjust: 100%; }
        body {
          background: #0a0a0a;
          color: #fff;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: transparent;
        }
        ::selection { background: rgba(232,25,25,0.4); color: #fff; }
        html, body { overscroll-behavior: none; }

        @keyframes lensFlareFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
          50% { transform: translate(30px, 20px) rotate(5deg); opacity: 1; }
        }
        @keyframes lensFlareFloat2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          50% { transform: translate(-20px, 30px); opacity: 0.9; }
        }
        @keyframes textFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes creditRoll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes audioBar {
          from { height: 4px; }
          to { height: 18px; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes vaultSlideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes vaultPageIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes portfolioCardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes loadingBarFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #e81919; }

        .gallery-frame:hover .gallery-caption {
          opacity: 1 !important;
        }

        .hero-nav-icon:active .hero-icon-inner {
          transform: scale(0.9) !important;
        }

        .portfolio-card:active .portfolio-icon {
          transform: scale(0.9) !important;
        }

        @media (hover: hover) {
          .portfolio-card:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(232,25,25,0.15);
            background: rgba(255,255,255,0.04) !important;
            border-color: rgba(232,25,25,0.2) !important;
          }
          .portfolio-card:hover .portfolio-icon {
            transform: scale(1.15) rotate(-3deg) !important;
            filter: brightness(1.2) drop-shadow(0 0 6px rgba(255,255,255,0.2));
          }
        }
      `}</style>

      <FilmGrain isMobile={isMobile} />
      <BackgroundStatic isMobile={isMobile} />
      <ScanLines />
      <LensFlare isMobile={isMobile} />

      <div style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a" }}>
        {page === "vault" ? (
          <VideoVault onBack={() => setPage("main")} isMobile={isMobile} />
        ) : (
          <>
            <HeroSection onNavigate={navigateTo} isMobile={isMobile} />
            <AboutSection isMobile={isMobile} />
            <GallerySection onOpenVault={() => setPage("vault")} isMobile={isMobile} />
            <PortfolioSection isMobile={isMobile} />
            <ContactSection isMobile={isMobile} />
          </>
        )}
      </div>
    </>
  );
}
