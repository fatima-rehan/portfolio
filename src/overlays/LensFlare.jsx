export function LensFlare({ isMobile }) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: isMobile ? "-10%" : "-20%",
            left: isMobile ? "-20%" : "-10%",
            width: isMobile ? "70vw" : "50vw",
            height: isMobile ? "80vh" : "120vh",
            background:
              "radial-gradient(ellipse at center, rgba(255,60,20,0.35) 0%, rgba(255,120,0,0.15) 30%, rgba(255,80,0,0.05) 60%, transparent 80%)",
            filter: "blur(40px)",
            animation: "lensFlareFloat 12s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "-5%",
            width: isMobile ? "50vw" : "30vw",
            height: "60vh",
            background:
              "radial-gradient(ellipse at center, rgba(255,200,50,0.2) 0%, rgba(255,120,0,0.08) 50%, transparent 80%)",
            filter: "blur(60px)",
            animation: "lensFlareFloat2 15s ease-in-out infinite",
          }}
        />
      </div>
    );
  }