import { useState, useRef } from "react";
import { SAMPLE_VIDEOS } from "../constants/data.js";

export function VideoVault({ onBack, isMobile }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const touchStartX = useRef(0);
  const videoRef = useRef(null);

  const goToVideo = (next) => {
    setSlideKey((k) => k + 1);
    setCurrentVideo(next);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0)
        goToVideo((currentVideo + 1) % SAMPLE_VIDEOS.length);
      else
        goToVideo(
          (currentVideo - 1 + SAMPLE_VIDEOS.length) % SAMPLE_VIDEOS.length
        );
    }
  };

  const videoData = SAMPLE_VIDEOS[currentVideo];
  const hasVideo = videoData.src;

  return (
    <div
      style={{
        minHeight: "100vh",
        minHeight: "100svh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 2,
        animation: "vaultPageIn 0.5s ease forwards",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "16px" : "20px 30px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            color: "#e81919",
          }}
        >
          Video vault.
        </h2>
        <div
          className="clickable"
          onClick={onBack}
          style={{
            width: "36px",
            height: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
            padding: "6px",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span
            style={{
              display: "block",
              width: "100%",
              height: "2px",
              background: "#e81919",
            }}
          />
          <span
            style={{
              display: "block",
              width: "100%",
              height: "2px",
              background: "#e81919",
            }}
          />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "12px" : "20px",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            position: "relative",
            background: "linear-gradient(180deg, #1e1e1e 0%, #141414 30%, #1a1a1a 100%)",
            borderRadius: isMobile ? "10px" : "14px",
            padding: isMobile ? "16px" : "30px",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)",
            border: "1.5px solid #2a2a2a",
            maxWidth: "700px",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: isMobile ? "-18px" : "-24px",
              left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? "50px" : "70px",
              height: isMobile ? "26px" : "34px",
              background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
              borderRadius: "6px 6px 0 0",
              border: "1.5px solid #333",
              borderBottom: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: isMobile ? "34px" : "48px",
                height: isMobile ? "14px" : "18px",
                background: "#050505",
                borderRadius: "3px",
                border: "1px solid #444",
              }}
            />
          </div>

          {!isMobile && (
            <div
              style={{
                position: "absolute",
                top: "-16px",
                right: "30px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #444, #666, #444, #666, #444)",
                border: "2px solid #555",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "3px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "2px",
                  height: "7px",
                  background: "#e81919",
                  borderRadius: "1px",
                }}
              />
            </div>
          )}

          <div
            style={{
              background: videoData.color || "#1a1a2e",
              aspectRatio: "16/9",
              borderRadius: "3px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              border: "2px solid #111",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)",
            }}
          >
            {hasVideo ? (
              <video
                ref={videoRef}
                key={currentVideo}
                src={videoData.src}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <>
                <span
                  key={`icon-${slideKey}`}
                  style={{
                    fontSize: isMobile ? "2rem" : "3rem",
                    marginBottom: "10px",
                    position: "relative",
                    zIndex: 1,
                    animation: "vaultSlideIn 0.35s ease forwards",
                  }}
                >
                  🎬
                </span>
                <span
                  key={`title-${slideKey}`}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: isMobile ? "0.75rem" : "1rem",
                    color: "#ccc",
                    textAlign: "center",
                    padding: "0 16px",
                    position: "relative",
                    zIndex: 1,
                    animation: "vaultSlideIn 0.35s ease 0.08s both",
                  }}
                >
                  {videoData.title}
                </span>
              </>
            )}

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {hasVideo && (
              <span
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#fff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                  zIndex: 3,
                }}
              >
                {videoData.title}
              </span>
            )}
            {isPlaying && (
              <>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    display: "flex",
                    gap: "3px",
                    alignItems: "flex-end",
                    zIndex: 3,
                  }}
                >
                  {[0, 1, 2, 3].map((b) => (
                    <div
                      key={b}
                      style={{
                        width: "4px",
                        background: "#e81919",
                        animation: `audioBar 0.5s ease ${b * 0.1}s infinite alternate`,
                        height: "10px",
                        borderRadius: "1px",
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    animation: "blink 1s infinite",
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#e81919",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.7rem",
                      color: "#e81919",
                    }}
                  >
                    REC
                  </span>
                </div>
              </>
            )}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem",
                color: "rgba(255,255,255,0.35)",
                zIndex: 3,
              }}
            >
              00:{isPlaying ? "04" : "00"}:12
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: isMobile ? "30px" : "40px",
            marginTop: isMobile ? "24px" : "30px",
            alignItems: "center",
          }}
        >
          <div
            className="clickable"
            onClick={() =>
              goToVideo(
                (currentVideo - 1 + SAMPLE_VIDEOS.length) % SAMPLE_VIDEOS.length
              )
            }
            style={{
              fontSize: isMobile ? "2rem" : "2.5rem",
              color: "#fff",
              opacity: 0.8,
              userSelect: "none",
              padding: "8px",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            «
          </div>

          <div
            className="clickable"
            onClick={handlePlayPause}
            style={{
              width: isMobile ? "44px" : "50px",
              height: isMobile ? "44px" : "50px",
              borderRadius: "50%",
              background: "#e81919",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(232,25,25,0.4)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginLeft: isPlaying ? 0 : "3px",
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </span>
          </div>

          <div
            className="clickable"
            onClick={() =>
              goToVideo((currentVideo + 1) % SAMPLE_VIDEOS.length)
            }
            style={{
              fontSize: isMobile ? "2rem" : "2.5rem",
              color: "#fff",
              opacity: 0.8,
              userSelect: "none",
              padding: "8px",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            »
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            color: "#555",
            marginTop: "12px",
            letterSpacing: "2px",
          }}
        >
          {currentVideo + 1} / {SAMPLE_VIDEOS.length}
        </div>

        {isMobile && (
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "#444",
              marginTop: "16px",
              letterSpacing: "1px",
            }}
          >
            swipe to navigate
          </div>
        )}
      </div>
    </div>
  );
}
