import { CONTACT_LINKS, CONTACT_EMAIL } from "../constants/data.js";

export function ContactSection({ isMobile }) {
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "40px 16px 30px" : "60px 20px 40px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <h2
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: isMobile ? "2.2rem" : "3rem",
          color: "#e81919",
          marginBottom: isMobile ? "16px" : "25px",
          marginLeft: isMobile ? "0" : "clamp(0px, 3vw, 40px)",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        Contact me!
      </h2>

      <div
        style={{
          background: "rgba(20,20,20,0.8)",
          borderRadius: "12px",
          padding: isMobile ? "20px 16px" : "25px clamp(15px, 3vw, 40px)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? "12px" : "20px",
          flexWrap: "wrap",
          maxWidth: "1000px",
          margin: "0 auto",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "10px" : "20px",
            justifyContent: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="clickable"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: isMobile ? "1.1rem" : "1.3rem",
                color: "#fff",
                background: "#c41616",
                padding: isMobile ? "8px 20px" : "10px 28px",
                borderRadius: "30px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                border: "2px solid #e81919",
                whiteSpace: "nowrap",
                WebkitTapHighlightColor: "transparent",
                flex: isMobile ? "1 1 calc(50% - 10px)" : "0 0 auto",
                textAlign: "center",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: isMobile ? "0.72rem" : "0.85rem",
            color: "#ddd",
            marginLeft: isMobile ? "0" : "auto",
            letterSpacing: "0.5px",
            textAlign: "center",
            width: isMobile ? "100%" : "auto",
            marginTop: isMobile ? "6px" : "0",
            wordBreak: "break-all",
            textDecoration: "none",
          }}
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  );
}
