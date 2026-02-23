import { useState, useRef, useEffect } from "react";
import { PROJECTS } from "../constants/data.js";

export function PortfolioSection({ isMobile }) {
  const [expanded, setExpanded] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        padding: isMobile ? "16px 16px 50px" : "24px 20px 70px",
      }}
    >
      <h2
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: isMobile ? "2.5rem" : "3.5rem",
          color: "#e81919",
          marginBottom: isMobile ? "30px" : "50px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
          width: "100%",
          maxWidth: "1100px",
          textAlign: "left",
          paddingLeft: isMobile ? "16px" : "20px",
          paddingRight: isMobile ? "16px" : "20px",
          boxSizing: "border-box",
        }}
      >
        Portfolio.
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : "repeat(auto-fit, minmax(240px, 1fr))",
          gap: isMobile ? "14px" : "36px",
          maxWidth: "1100px",
          width: "100%",
          alignItems: "start",
        }}
      >
        {PROJECTS.map((project, idx) => (
          <div
            key={project.name}
            className="clickable portfolio-card"
            onClick={() =>
              setExpanded(expanded === project.name ? null : project.name)
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "start",
              gap: isMobile ? "8px" : "12px",
              padding: isMobile ? "20px 12px" : "30px 20px",
              borderRadius: "12px",
              background:
                expanded === project.name
                  ? "rgba(232,25,25,0.08)"
                  : "rgba(255,255,255,0.02)",
              border:
                expanded === project.name
                  ? "1px solid rgba(232,25,25,0.3)"
                  : "1px solid rgba(255,255,255,0.05)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              WebkitTapHighlightColor: "transparent",
              opacity: visible ? 1 : 0,
              animation: visible
                ? `portfolioCardIn 0.5s ease ${0.15 + idx * 0.12}s both`
                : "none",
            }}
          >
            <span
              className="portfolio-icon"
              style={{
                fontSize: isMobile ? "2.5rem" : "3.5rem",
                transition: "transform 0.2s ease, filter 0.2s ease",
                transform:
                  expanded === project.name ? "scale(1.1)" : "scale(1)",
              }}
            >
              {project.icon}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? "0.85rem" : "1rem",
                color: "#fff",
                letterSpacing: "1px",
              }}
            >
              {project.name}
            </span>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: isMobile ? "0.65rem" : "0.7rem",
                  color: "#e81919",
                  textDecoration: "none",
                  letterSpacing: "0.5px",
                }}
              >
                View project →
              </a>
            )}

            <div
              style={{
                maxHeight: expanded === project.name ? "400px" : "0",
                overflow: "hidden",
                transition:
                  "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                opacity: expanded === project.name ? 1 : 0,
                width: "100%",
              }}
            >
              <div
                style={{
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: isMobile ? "0.7rem" : "0.78rem",
                    color: "#aaa",
                    lineHeight: 1.7,
                    marginBottom: project.stack?.length ? "10px" : 0,
                  }}
                >
                  {project.description}
                </p>
                {project.stack && project.stack.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: isMobile ? "0.6rem" : "0.65rem",
                          color: "#e81919",
                          padding: "3px 8px",
                          border: "1px solid rgba(232,25,25,0.3)",
                          borderRadius: "20px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
