import { useRef, useEffect } from "react";
import { GALLERY_IMAGES } from "../constants/data.js";
import SilverIcon from "../shared/SilverIcon.jsx";

const FRAME_WIDTH_MOBILE = 200;
const FRAME_WIDTH_DESKTOP = 300;

export function GallerySection({ onOpenVault, isMobile }) {
  const scrollRef = useRef(null);
  const userScrollingRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const speed = isMobile ? 0.3 : 0.5;
    const maxScroll = el.scrollWidth / 2;
    const scroll = () => {
      if (!userScrollingRef.current) {
        const current = el.scrollLeft;
        let next = current + speed;
        if (next >= maxScroll) next = next % maxScroll;
        el.scrollLeft = next;
      }
      requestAnimationFrame(scroll);
    };
    const id = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(id);
  }, [isMobile]);

  const scrollBy = (delta) => {
    const el = scrollRef.current;
    if (!el) return;
    userScrollingRef.current = true;
    const step = isMobile ? FRAME_WIDTH_MOBILE : FRAME_WIDTH_DESKTOP;
    el.scrollBy({ left: delta * step, behavior: "smooth" });
    setTimeout(() => {
      userScrollingRef.current = false;
    }, 800);
  };

  const pauseAutoScroll = () => {
    userScrollingRef.current = true;
  };
  const resumeAutoScroll = () => {
    setTimeout(() => {
      userScrollingRef.current = false;
    }, 400);
  };

  return (
    <section
      id="gallery"
      style={{
        minHeight: isMobile ? "auto" : "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        padding: isMobile ? "24px 0 8px" : "28px 0 12px",
      }}
    >
      <h2
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: isMobile ? "2.5rem" : "3.5rem",
          color: "#e81919",
          marginLeft: isMobile ? "16px" : "clamp(20px, 5vw, 80px)",
          marginBottom: isMobile ? "20px" : "30px",
        }}
      >
        Gallery.
      </h2>

      <div style={{ position: "relative" }}>
        <div
          className="clickable gallery-arrow gallery-arrow-left"
          onClick={() => scrollBy(-1)}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            width: isMobile ? "36px" : "44px",
            height: isMobile ? "36px" : "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "0 8px 8px 0",
            color: "#e81919",
            fontSize: isMobile ? "1.2rem" : "1.5rem",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ‹
        </div>
        <div
          ref={scrollRef}
          className="gallery-strip"
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScroll}
          onTouchCancel={resumeAutoScroll}
          onMouseDown={pauseAutoScroll}
          onMouseUp={resumeAutoScroll}
          onMouseLeave={resumeAutoScroll}
          style={{
            display: "flex",
            width: "100vw",
            overflowX: "auto",
            overflowY: "hidden",
            background: "#000",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES].map(
            (img, i) => {
              const fw = isMobile ? 200 : 300;
              const fh = isMobile ? 180 : 270;
              const sp = isMobile ? 12 : 16;
              const sh = isMobile ? 5 : 6;
              const sg = isMobile ? 8 : 10;
              const imgH = fh - sp * 2 - (isMobile ? 12 : 16);
              return (
                <div
                  key={i}
                  style={{
                    flex: `0 0 ${fw}px`,
                    height: fh,
                    background: "#0a0a0a",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    borderLeft: "1px solid #1a1a1a",
                    borderRight: "1px solid #1a1a1a",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: sp,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: sg,
                    }}
                  >
                    {Array.from({ length: Math.floor(fw / (sh + sg)) }).map((_, j) => (
                      <div
                        key={j}
                        style={{
                          width: sh,
                          height: sh * 0.7,
                          borderRadius: 2,
                        background: "#fff",
                        border: "1px solid #ddd",
                        }}
                      />
                    ))}
                  </div>

                  <div
                    className="gallery-frame"
                    style={{
                      width: `calc(100% - ${isMobile ? 16 : 24}px)`,
                      height: imgH,
                      borderRadius: isMobile ? 2 : 3,
                      border: "1px solid #333",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      filter: "saturate(0.85) contrast(1.1)",
                      position: "relative",
                    }}
                  >
                    {img.src ? (
                      <img
                        src={img.src}
                        alt={img.caption}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: img.color
                            ? `linear-gradient(135deg, ${img.color}, ${img.color}88)`
                            : "#333",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: isMobile ? "2rem" : "3rem",
                        }}
                      >
                        {["✊", "🔬", "🎓", "🏅", "💻"][i % 5]}
                      </div>
                    )}
                    <span
                      className="gallery-caption"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: isMobile ? "0.55rem" : "0.65rem",
                        color: "#fff",
                        textAlign: "center",
                        padding: "6px 8px",
                        background: "rgba(0,0,0,0.7)",
                        letterSpacing: "0.5px",
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                        pointerEvents: "none",
                      }}
                    >
                      {img.caption}
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: sp,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: sg,
                    }}
                  >
                    {Array.from({ length: Math.floor(fw / (sh + sg)) }).map((_, j) => (
                      <div
                        key={j}
                        style={{
                          width: sh,
                          height: sh * 0.7,
                          borderRadius: 2,
                        background: "#fff",
                        border: "1px solid #ddd",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div
          className="clickable gallery-arrow gallery-arrow-right"
          onClick={() => scrollBy(1)}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            width: isMobile ? "36px" : "44px",
            height: isMobile ? "36px" : "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "8px 0 0 8px",
            color: "#e81919",
            fontSize: isMobile ? "1.2rem" : "1.5rem",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ›
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          padding: isMobile ? "24px 16px" : "30px clamp(20px, 5vw, 80px)",
        }}
      >
        <div
          className="clickable gallery-vault-btn"
          onClick={onOpenVault}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: isMobile ? "12px" : "0",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <SilverIcon name="vault" size={isMobile ? 44 : 54} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              color: "#999",
              letterSpacing: "1px",
            }}
          >
            videos vault
          </span>
        </div>
      </div>
    </section>
  );
}