import { ABOUT_LINES } from "../constants/data.js";

export function AboutSection({ isMobile }) {
  return (
    <section
      id="about"
      style={{
        minHeight: isMobile ? "auto" : "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        padding: isMobile ? "32px 16px" : "40px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          gap: isMobile ? "30px" : "clamp(40px, 8vw, 120px)",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        <div style={{ flex: "1 1 300px", maxWidth: isMobile ? "100%" : "500px", width: "100%" }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: isMobile ? "2.2rem" : "3rem",
              color: "#fff",
              letterSpacing: "6px",
              marginBottom: isMobile ? "20px" : "30px",
              textAlign: isMobile ? "center" : "right",
            }}
          >
            ABOUT
          </h2>
          <div
            style={{
              height: isMobile ? "250px" : "320px",
              overflow: "hidden",
              position: "relative",
              maskImage:
                "linear-gradient(transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <div
              style={{
                animation: "creditRoll 12s linear infinite",
                textAlign: isMobile ? "center" : "right",
              }}
            >
              {[...ABOUT_LINES, ...ABOUT_LINES].map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: isMobile ? "0.85rem" : "1.1rem",
                    color: line === "" ? "transparent" : "#d4d4d4",
                    margin: isMobile ? "6px 0" : "8px 0",
                    letterSpacing: isMobile ? "1px" : "2px",
                    lineHeight: 1.6,
                  }}
                >
                  {line || "\u00A0"}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: isMobile ? "12px" : "20px",
            flex: "0 0 auto",
            justifyContent: "center",
          }}
        >
          {[
            { src: "/images/gallery/fatima.JPG", rotation: 2 },
            { src: "/images/gallery/fatima2.JPG", rotation: -1.5 },
          ].map((photo, i) => (
            <div
              key={i}
              style={{
                background: "#e8e4e0",
                padding: isMobile ? "8px 8px 28px 8px" : "12px 12px 40px 12px",
                boxShadow:
                  "8px 8px 24px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.3)",
                transform: `rotate(${photo.rotation}deg)`,
                transition: "transform 0.4s ease",
                width: isMobile ? "140px" : "220px",
              }}
            >
              <img
                src={photo.src}
                alt="Fatima"
                style={{
                  width: "100%",
                  height: isMobile ? "130px" : "200px",
                  objectFit: "cover",
                  borderRadius: "2px",
                  display: "block",
                  filter: "sepia(0.2) contrast(1.1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}