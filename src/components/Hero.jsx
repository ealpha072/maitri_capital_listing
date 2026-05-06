import banner_image from "../assets/banner_image.avif";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";
import { Eyebrow } from "./Eyebrow";

const Hero = ({ onExplore }) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        minHeight: isMobile ? 600 : 700,
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, rgba(68,84,106,0.72) 0%, rgba(26,31,38,0.55) 60%, rgba(191,144,0,0.1) 100%), url(${banner_image}) center/cover`,
          animation: "heroZoom 14s ease-out forwards",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.4,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: isMobile ? "0 24px 60px" : isTablet ? "0 40px 70px" : "0 60px 90px",
          maxWidth: 900,
        }}
        className="fadeUp-1"
      >
        <Eyebrow light>Maitri Capital — Est. 2016</Eyebrow>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? "clamp(40px,10vw,60px)" : "clamp(52px,7vw,96px)",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: 22,
          }}
        >
          Where <em style={{ fontStyle: "italic", color: T.goldLight }}>Capital</em>
          <br />
          Finds its Purpose
        </h1>
        <p
          style={{
            fontSize: isMobile ? 13 : 14,
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 460,
            letterSpacing: "0.03em",
            marginBottom: isMobile ? 32 : 42,
          }}
        >
          A curated portfolio of world-class hospitality investments — each property chosen for its
          irreplaceable location, exceptional design, and enduring returns.
        </p>
        <div 
          style={{ 
            display: "flex", 
            gap: isMobile ? 16 : 24, 
            alignItems: "center", 
            flexWrap: "wrap" 
          }}
        >
          <button
            onClick={onExplore}
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              background: T.gold,
              color: "white",
              border: "none",
              padding: isMobile ? "14px 28px" : "16px 40px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a67c00")}
            onMouseLeave={(e) => (e.currentTarget.style.background = T.gold)}
          >
            Explore Portfolio
          </button>
          {!isMobile && (
            <a
              href="#philosophy"
              style={{ 
                fontSize: 10, 
                letterSpacing: "0.3em", 
                textTransform: "uppercase", 
                color: "rgba(255,255,255,0.65)", 
                textDecoration: "none" 
              }}
            >
              Our Philosophy →
            </a>
          )}
        </div>
      </div>

      {!isMobile && (
        <div
          style={{ 
            position: "absolute", 
            bottom: 40, 
            right: 60, 
            zIndex: 2, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: 10 
          }}
          className="fadeUp-5"
        >
          <span 
            style={{ 
              fontSize: 9, 
              letterSpacing: "0.35em", 
              textTransform: "uppercase", 
              color: "rgba(255,255,255,0.35)", 
              writingMode: "vertical-rl" 
            }}
          >
            Scroll
          </span>
          <div
            style={{ 
              width: 1, 
              height: 48, 
              background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)", 
              animation: "scrollLine 2s 2s ease infinite" 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
