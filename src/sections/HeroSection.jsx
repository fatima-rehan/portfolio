import { useState, useEffect } from "react";
import SilverIcon from "../shared/SilverIcon.jsx";

export function HeroSection({ onNavigate, isMobile }) {
  const [nameSettled, setNameSettled] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);
  const [iconsVisible, setIconsVisible] = useState([false, false, false, false]);
  const [flashCount, setFlashCount] = useState(0);
  const [activeIcon, setActiveIcon] = useState(null);

  const fonts = [
    "'Playfair Display', serif",
    "'Dancing Script', cursive",
    "'Bebas Neue', sans-serif",
    "'Dancing Script', cursive",
  ];

  useEffect(() => {
    if (flashCount < 8) {
      const timer = setTimeout(() => {
        setFontIndex((prev) => (prev + 1) % fonts.length);
        setFlashCount((c) => c + 1);
      }, 200 + flashCount * 50);
      return () => clearTimeout(timer);
    } else {
      setFontIndex(3);
      setNameSettled(true);
    }
  }, [flashCount]);

  useEffect(() => {
    if (nameSettled) {
      iconsVisible.forEach((_, i) => {
        setTimeout(() => {
          setIconsVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 300 + i * 200);
      });
    }
  }, [nameSettled]);

  const icons = [
    { label: "resume", target: "about", url: "/Fatima_Rehan_Resume.pdf" },
    { label: "gallery", target: "gallery" },
    { label: "portfolio", target: "portfolio" },
    { label: "contact", target: "contact" },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        padding: isMobile ? "20px 16px" : "0",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px" }}>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? "clamp(3rem, 16vw, 5rem)" : "clamp(4rem, 10vw, 8rem)",
            color: "#e81919",
            margin: 0,
            lineHeight: 0.9,
            textShadow: "0 0 30px rgba(232,25,25,0.3)",
            animation: nameSettled ? "none" : "textFlicker 0.1s infinite",
          }}
        >
          Fatima
        </h1>
        <h1
          style={{
            fontFamily: nameSettled ? "'Dancing Script', cursive" : fonts[fontIndex],
            fontSize: isMobile ? "clamp(2.2rem, 12vw, 4rem)" : "clamp(3rem, 8vw, 6.5rem)",
            color: "#e81919",
            margin: 0,
            marginLeft: isMobile ? "30px" : "60px",
            lineHeight: 1,
            textShadow: "0 0 30px rgba(232,25,25,0.3)",
            transition: nameSettled ? "all 0.5s ease" : "none",
            position: "relative",
          }}
        >
          Rehan.
          {nameSettled && (
            <svg
              viewBox="0 0 70 80"
              style={{
                position: "absolute",
                top: isMobile ? "-35px" : "-55px",
                right: isMobile ? "-30px" : "-50px",
                width: isMobile ? "30px" : "50px",
                height: isMobile ? "42px" : "70px",
                opacity: 0,
                animation: "fadeInUp 0.5s ease forwards 0.3s",
              }}
            >
              <path
                d="M10 5 Q 55 10 50 55"
                stroke="#e81919"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M42 48 L50 58 L56 47"
                stroke="#e81919"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: isMobile ? "140px" : "180px",
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? "280px" : "none",
        }}
      >
        {!nameSettled ? (
          <div
            className="loading-bar-track"
            style={{
              width: isMobile ? "120px" : "180px",
              height: "4px",
              borderRadius: "2px",
              background: "rgba(168,168,168,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              className="loading-bar-fill"
              style={{
                height: "100%",
                width: 0,
                borderRadius: "2px",
                background: "#a8a8a8",
                animation: "loadingBarFill 3s ease-out forwards",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, auto)",
              gap: isMobile ? "24px 16px" : "clamp(30px, 6vw, 80px)",
              justifyItems: "center",
              alignItems: "flex-end",
            }}
          >
        {icons.map((item, i) => {
          const isActive = isMobile && activeIcon === item.label;
          return (
          <div
            key={item.label}
            className="clickable hero-nav-icon"
            onClick={() => {
              if (isMobile) {
                setActiveIcon(item.label);
                setTimeout(() => {
                  setActiveIcon((current) =>
                    current === item.label ? null : current
                  );
                }, 150);
              }
              if (item.url) {
                window.open(item.url, "_blank");
              } else {
                onNavigate(item.target);
              }
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              opacity: iconsVisible[i] ? 1 : 0,
              transform: iconsVisible[i]
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.5)",
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              padding: isMobile ? "10px" : "0",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <div
              className="hero-icon-inner"
              style={{
                width: isMobile ? "56px" : "70px",
                height: isMobile ? "56px" : "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                transform: isActive ? "scale(0.9)" : "scale(1)",
                filter: isActive
                  ? "brightness(1.25) drop-shadow(0 0 10px rgba(255,255,255,0.35))"
                  : "none",
              }}
              {...(!isMobile ? {
                onMouseEnter: (e) => {
                  e.currentTarget.style.transform = "scale(1.2) rotate(-5deg)";
                  e.currentTarget.style.filter = "brightness(1.3) drop-shadow(0 0 8px rgba(255,255,255,0.3))";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0)";
                  e.currentTarget.style.filter = "none";
                },
              } : {})}
            >
              <SilverIcon name={item.label} size={isMobile ? 42 : 54} />
            </div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.7rem" : "0.8rem",
                color: "#ccc",
                letterSpacing: "1px",
              }}
            >
              {item.label}
            </span>
          </div>
        );})}
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "20px" : "30px",
          opacity: nameSettled ? 0.5 : 0,
          transition: "opacity 1s ease 1s",
          animation: "bounce 2s ease infinite",
        }}
      >
        <span style={{ color: "#666", fontSize: "1.5rem" }}>⌄</span>
      </div>
    </section>
  );
}