import { useEffect } from "react";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";
import { Eyebrow } from "./Eyebrow";

const ListingDetail = ({ listing, onBack }) => {
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const metrics = [
    listing.investment && { label: "Investment", val: listing.investment },
    (listing.irr || listing.targetIrr) && { label: listing.irr ? "IRR" : "Target IRR", val: listing.irr || listing.targetIrr, gold: true },
    listing.rooms && { label: "Rooms / Keys", val: listing.rooms },
    listing.opening && { label: listing.status === "Development" ? "Opening" : "Opened", val: listing.opening },
  ].filter(Boolean);

  return (
    <div style={{ background: T.cream, minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: isMobile ? "55vh" : "70vh", minHeight: isMobile ? 380 : 500, overflow: "hidden" }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.03)", animation: "heroZoom 12s ease-out forwards" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,31,38,0.88) 0%, rgba(26,31,38,0.2) 60%, transparent 100%)" }} />
        <button
          onClick={onBack}
          style={{ position: "absolute", top: isMobile ? 80 : 100, left: isMobile ? 20 : 60, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: isMobile ? "8px 16px" : "10px 22px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(8px)", transition: "background 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        >
          ← Back
        </button>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "0 20px 36px" : "0 60px 56px" }} className="fadeUp-1">
          <div style={{ display: "inline-block", fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, border: "1px solid rgba(191,144,0,0.5)", padding: "5px 12px", marginBottom: 12 }}>
            {listing.category} · {listing.status}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "clamp(30px,8vw,48px)" : "clamp(40px,6vw,76px)", fontWeight: 300, color: "white", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 8 }}>
            {listing.title}
          </h1>
          {listing.subtitle && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: isMobile ? 16 : 22, color: T.goldLight }}>
              {listing.subtitle}
            </p>
          )}
          <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 8 }}>
            {listing.location}
          </div>
        </div>
      </div>

      {/* Key Metrics Bar */}
      <div style={{ background: T.slateDark, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : `repeat(${metrics.length},1fr)` }}>
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              padding: isMobile ? "20px 16px" : "26px 24px",
              textAlign: "center",
              borderRight: isMobile ? (i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none") : (i < metrics.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none"),
              borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 24 : 32, fontWeight: 300, color: m.gold ? T.gold : "white", lineHeight: 1 }}>
              {m.val}
            </div>
            <div style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: isMobile ? "52px 20px" : isTablet ? "64px 32px" : "90px 60px", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 360px", gap: isTablet ? 40 : 80, maxWidth: 1280, margin: "0 auto" }}>
        <div>
          <Eyebrow>Overview</Eyebrow>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 30 : 38, fontWeight: 300, color: T.ink, marginBottom: 24, lineHeight: 1.1 }}>
            The Investment Case
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 2, color: T.inkSoft, letterSpacing: "0.02em", marginBottom: 44 }}>
            {listing.description}
          </p>

          {listing.galleryImages?.length > 0 && (
            <>
              <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: T.gold, marginBottom: 18 }}>Gallery</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 4 }}>
                {listing.galleryImages.map((img, i) => (
                  <img key={i} src={img} alt="" style={{ width: "100%", height: isMobile ? 200 : 260, objectFit: "cover", display: "block" }} />
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          {listing.highlights?.length > 0 && (
            <div style={{ background: T.warmWhite, padding: isMobile ? 24 : 36, marginBottom: 24, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: 20 }}>Key Highlights</div>
              {listing.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 12, marginBottom: 12, borderBottom: i < listing.highlights.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ width: 6, height: 6, background: T.gold, borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.65 }}>{h}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ background: T.slateDark, padding: isMobile ? 24 : 36 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, color: "white", marginBottom: 10, lineHeight: 1.2 }}>
              Request Investment Memo
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
              Access full financials, legal structure, and operator agreements.
            </p>
            <button
              onClick={()=>{
                onBack();
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
              style={{ width: "100%", background: T.gold, border: "none", color: "white", padding: 15, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#a67c00")}
              onMouseLeave={(e) => (e.currentTarget.style.background = T.gold)}
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
