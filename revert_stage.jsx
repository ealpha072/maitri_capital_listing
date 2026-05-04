import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import emailjs from '@emailjs/browser'
import DEFAULT_LISTINGS from "./components/Property_Listings";
import banner_image from "./Assets/banner_image.avif"
import contact_section_banner from "./Assets/contact_section_banner.avif"

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  gold: "#BF9000", goldLight: "#D4AA33", goldMuted: "rgba(191,144,0,0.15)",
  slate: "#44546A", slateDark: "#2C3A4A", slateLight: "#6B7F96",
  cream: "#FAF8F4", warmWhite: "#F5F2EC", ink: "#1A1F26", inkSoft: "#3A4047",
  border: "rgba(191,144,0,0.22)",
};

const toSlug = (title) => 
  title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

// ─── RESPONSIVE HOOK ─────────────────────────────────────────────────────────
const useResponsive = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: w < 640, isTablet: w < 1024, w };
};

// ─── FONT INJECTION ───────────────────────────────────────────────────────────
const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${T.cream};color:${T.ink};font-family:'Jost',sans-serif;font-weight:300;overflow-x:hidden}
      input,textarea,select,button{font-family:'Jost',sans-serif}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
      @keyframes heroZoom{from{transform:scale(1.07)}to{transform:scale(1)}}
      @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top;opacity:1}50%{transform:scaleY(1);transform-origin:top;opacity:1}100%{transform:scaleY(1);transform-origin:bottom;opacity:0}}
      .fadeUp{animation:fadeUp 0.9s ease forwards}
      .fadeUp-1{animation:fadeUp 0.9s 0.1s ease both}
      .fadeUp-2{animation:fadeUp 0.9s 0.2s ease both}
      .fadeUp-3{animation:fadeUp 0.9s 0.3s ease both}
      .fadeUp-4{animation:fadeUp 0.9s 0.5s ease both}
      .fadeUp-5{animation:fadeUp 0.9s 0.7s ease both}

      /* ── Hamburger menu ── */
      .nav-menu-open { display: flex !important; }
      .hamburger-line { display:block; width:22px; height:1.5px; background:currentColor; transition: all 0.3s; }

      /* ── Admin table scroll ── */
      .admin-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

      /* ── Utility ── */
      .hide-mobile { display: block; }
      @media(max-width:639px){
        .hide-mobile { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

const ADMIN_PIN = "maitri2024";

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────
const useListings = () => {
  const [listings, setListings] = useState(DEFAULT_LISTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("maitri_listings");
        if (res?.value) {
          console.log(JSON.parse(res.value))
          const stored = JSON.parse(res.value);
          const storedIds = new Set(stored.map(l => l.id));
          const newDefaults = DEFAULT_LISTINGS.filter(l => !storedIds.has(l.id));
          const merged = [...stored, ...newDefaults];
          if (newDefaults.length > 0) {
            await window.storage.set("maitri_listings", JSON.stringify(merged));
          }
          setListings(merged);
        } else {
          setListings(DEFAULT_LISTINGS);
        }
      } catch (_) { }
      setLoaded(true);
    })();
  }, []);

  const save = useCallback(async (next) => {
    setListings(next);
    try { await window.storage.set("maitri_listings", JSON.stringify(next)); } catch (_) { }
  }, []);

  return { listings, save, loaded };
};

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false, center = false }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 14, marginBottom: 18,
    justifyContent: center ? "center" : "flex-start"
  }}>
    {!center && <div style={{ width: 32, height: 1, background: T.gold }} />}
    <span style={{
      fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase",
      color: T.gold, fontWeight: 400
    }}>{children}</span>
  </div>
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = ({ onAdmin, onHome, adminMode }) => {
  const { isTablet } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const textColor = scrolled ? T.slate : "rgba(255,255,255,0.75)";

  return (
    <>
      <nav 
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? `16px ${isTablet ? "24px" : "56px"}` : `26px ${isTablet ? "24px" : "56px"}`,
          background: scrolled || menuOpen ? "rgba(250,248,244,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled || menuOpen ? `1px solid ${T.border}` : "none",
          transition: "all 0.4s ease",
        }}
      >
        <button 
          onClick={() => { onHome(); setMenuOpen(false); }} 
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            textAlign: "left" 
          }}
        >
          <div 
            style={{
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: isTablet ? 18 : 21,
              color: scrolled || menuOpen ? T.slateDark : "white", 
              letterSpacing: "0.12em", 
              lineHeight: 1.2
            }}
          >
            Maitri Capital
          </div>
          <div 
            style={{ 
              fontSize: 8, 
              letterSpacing: "0.35em", 
              textTransform: "uppercase", 
              color: T.gold, 
              marginTop: 2 
              }}
          >
            Investment Portfolio
          </div>
        </button>

        {/* Desktop links */}
        {!isTablet && (
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {["Portfolio", "Philosophy", "Process", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontSize: 11, letterSpacing: "0.24em",
                textTransform: "uppercase", color: textColor, textDecoration: "none", transition: "color 0.3s"
              }}
                onMouseEnter={e => e.target.style.color = T.gold}
                onMouseLeave={e => e.target.style.color = textColor}>
                {l}
              </a>
            ))}
            <button onClick={onAdmin} style={{
              fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
              color: adminMode ? "white" : T.gold, border: `1px solid ${T.gold}`,
              background: adminMode ? T.gold : "transparent", padding: "9px 22px", cursor: "pointer", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = T.gold; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = adminMode ? T.gold : "transparent"; e.currentTarget.style.color = adminMode ? "white" : T.gold; }}>
              {adminMode ? "← Public View" : "Admin"}
            </button>
          </div>
        )}

        {/* Hamburger */}
        {isTablet && (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4, color: scrolled || menuOpen ? T.slateDark : "white" }}>
            <span className="hamburger-line" style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="hamburger-line" style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        )}
      </nav>

      {/* Mobile menu drawer */}
      {isTablet && menuOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 199, background: "rgba(250,248,244,0.98)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {["Portfolio", "Philosophy", "Process", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: T.slate, textDecoration: "none", padding: "16px 40px", display: "block" }}>
              {l}
            </a>
          ))}
          <div style={{ width: 40, height: 1, background: T.border, margin: "12px 0" }} />
          <button onClick={() => { onAdmin(); setMenuOpen(false); }} style={{
            fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
            color: T.gold, border: `1px solid ${T.gold}`, background: "transparent",
            padding: "12px 32px", cursor: "pointer",
          }}>
            {adminMode ? "← Public View" : "Admin"}
          </button>
        </div>
      )}
    </>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
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
        overflow: "hidden"
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
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4
        }}
      />
      <div
        style={{ 
          position: "relative", 
          zIndex: 2, 
          padding: isMobile ? "0 24px 60px" : isTablet ? "0 40px 70px" : "0 60px 90px", 
          maxWidth: 900 
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
          Where <em style={{ fontStyle: "italic", color: T.goldLight }}>Capital</em><br />Finds its Purpose
        </h1>
        <p
          style={{ 
            fontSize: isMobile ? 13 : 14, 
            lineHeight: 1.9, color: "rgba(255,255,255,0.65)", 
            maxWidth: 460, 
            letterSpacing: "0.03em", 
            marginBottom: isMobile ? 32 : 42 
          }}
        >
          A curated portfolio of world-class hospitality investments — each property chosen for its irreplaceable location, exceptional design, and enduring returns.
        </p>
        <div style={{ display: "flex", gap: isMobile ? 16 : 24, alignItems: "center", flexWrap: "wrap" }}>
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
              transition: "background 0.3s" 
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#a67c00"}
            onMouseLeave={e => e.currentTarget.style.background = T.gold}
          >
            Explore Portfolio
          </button>
          {!isMobile && (
            <a 
              href="#philosophy" 
              style={{ 
                fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", textDecoration: "none" 
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
            style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div 
            style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)", animation: "scrollLine 2s 2s ease infinite" }} 
          />
        </div>
      )}
    </div>
  );
};

// ─── STATS BAR ────────────────────────────────────────────────────────────────
const StatsBar = ({ listings }) => {
  const { isMobile } = useResponsive();
  const totalInvest = listings.reduce((a, l) => a + parseFloat(l.investment?.replace(/[$M]/g, "") || 0), 0);
  const stats = [
    { num: `$${totalInvest.toFixed(0)}M+`, label: "Total Investments" },
    { num: listings.length, label: "Properties in Africa" },
    { num: "5+", label: "Property Types" },
    { num: "2", label: "Countries" },
  ];
  return (
    <div style={{ background: T.slateDark, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", borderBottom: `1px solid rgba(191,144,0,0.15)` }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: isMobile ? "24px 16px" : "34px 20px", textAlign: "center",
          borderRight: isMobile ? (i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none") : (i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none"),
          borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 30 : 38, fontWeight: 300, color: T.gold, lineHeight: 1 }}>{s.num}</div>
          <div style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginTop: 8 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
};

// ─── PORTFOLIO CARD ───────────────────────────────────────────────────────────
const Card = ({ listing, onClick, featured, cols = 3 }) => {
  const [hov, setHov] = useState(false);
  const spanFull = featured && cols > 1;
  return (
    <div
      onClick={() => onClick(listing)} 
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: T.slateDark,
        gridColumn: spanFull ? (cols === 3 ? "1 / 3" : "1 / -1") : "auto",
      }}
    >
      <img
        src={listing.image}
        alt={listing.title}
        style={{
          width: "100%", height: featured ? (cols === 1 ? 320 : 520) : 300,
          objectFit: "cover",
          display: "block",
          transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hov ? "scale(1.05)" : "scale(1)"
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hov ? "linear-gradient(to top, rgba(26,31,38,0.92) 0%, rgba(26,31,38,0.3) 55%, rgba(191,144,0,0.04) 100%)" : "linear-gradient(to top, rgba(26,31,38,0.88) 0%, rgba(26,31,38,0.1) 50%, transparent 80%)",
          transition: "background 0.5s"
        }}
      />
      {hov && (
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 32,
            width: 38,
            height: 38,
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 16
          }}
        >
          ↗
        </div>
      )}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: cols === 1 ? 24 : 34 }}>
        <div style={{ display: "inline-block", fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, border: `1px solid rgba(191,144,0,0.5)`, padding: "5px 12px", marginBottom: 12 }}>
          {listing.category}{listing.featured ? " · Featured" : ""}
        </div>
        <h3
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: featured ? (cols === 1 ? 28 : 42) : 24, fontWeight: 300, color: "white", lineHeight: 1.15, marginBottom: 6 }}
        >
          {listing.title}
        </h3>
        <div
          style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 18 }}
        >
          {listing.location}
        </div>
        <div
          style={{ display: "flex", gap: 20, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)", opacity: hov ? 1 : 0, transform: hov ? "none" : "translateY(8px)", transition: "all 0.35s ease" }}
        >
          {
            listing.investment && <div><div style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>Investment</div><div style={{ fontSize: 13, color: "white", marginTop: 3 }}>{listing.investment}</div></div>
          }
          {
            (listing.irr || listing.targetIrr) && <div><div style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>{listing.irr ? "IRR" : "Target IRR"}</div><div style={{ fontSize: 13, color: T.goldLight, marginTop: 3 }}>{listing.irr || listing.targetIrr}</div></div>
          }
          <div>
            <div style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>Status</div><div style={{ fontSize: 13, color: "white", marginTop: 3 }}>{listing.status}</div>
          </div>
          {listing.deal && <div>
            <div style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>Deal Structure/Type</div><div style={{ fontSize: 13, color: "white", marginTop: 3 }}>{listing.deal}</div>
          </div>}
        </div>
      </div>
    </div>
  );
};

// ─── PORTFOLIO SECTION ────────────────────────────────────────────────────────
const PortfolioSection = ({ listings, onSelect }) => {
  const { isMobile, isTablet } = useResponsive();
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(listings.map(l => l.category)))];
  const filtered = filter === "All" ? listings : listings.filter(l => l.category === filter);
  const featured = filtered.find(l => l.featured) || filtered[0];
  const rest = filtered.filter(l => l.id !== featured?.id);

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="portfolio" style={{ padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 60px", background: T.cream }}>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: isMobile ? 36 : 56, gap: 20 }}>
        <div>
          <Eyebrow>Current Portfolio</Eyebrow>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,62px)", fontWeight: 300, color: T.ink, letterSpacing: "-0.01em" }}>
            Active <em style={{ fontStyle: "italic", color: T.slate }}>Investments</em>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              border: `1px solid ${filter === c ? T.slateDark : T.border}`,
              padding: isMobile ? "7px 12px" : "9px 18px", cursor: "pointer",
              background: filter === c ? T.slateDark : "transparent",
              color: filter === c ? "white" : T.slate, transition: "all 0.3s",
            }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {featured && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 2 }}>
          <Card listing={featured} onClick={onSelect} featured cols={cols} />
          {rest.map(l => <Card key={l.id} listing={l} onClick={onSelect} cols={cols} />)}
        </div>
      )}
    </section>
  );
};

// ─── PHILOSOPHY SECTION ───────────────────────────────────────────────────────
const PhilosophySection = () => {
  const { isMobile, isTablet } = useResponsive();
  return (
    <section id="philosophy" style={{ padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "110px 60px", background: T.warmWhite, display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isTablet ? 48 : 90, alignItems: "center" }}>
      <div style={{ position: "relative", height: isMobile ? 300 : isTablet ? 420 : 540, marginRight: isTablet ? 0 : 0 }}>
        <img src="https://images.unsplash.com/photo-1611519847235-d4794ac1ee2b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(68,84,106,0.1),rgba(191,144,0,0.07))" }} />
        <div style={{ position: "absolute", bottom: isMobile ? -16 : -26, right: isMobile ? 16 : -26, width: isMobile ? 80 : 112, height: isMobile ? 80 : 112, background: T.gold, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 26 : 34, fontWeight: 300, color: "white", lineHeight: 1 }}>10</div>
          <div style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Years</div>
        </div>
      </div>
      <div style={{ paddingTop: isMobile ? 28 : 0 }}>
        <Eyebrow>Our Approach</Eyebrow>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,4vw,58px)", fontWeight: 300, color: T.ink, lineHeight: 1.08, marginBottom: 22 }}>
          Investing in the <em style={{ fontStyle: "italic", color: T.slate }}>Exceptional</em>
        </h2>
        <p style={{ fontSize: isMobile ? 13 : 14, lineHeight: 2, color: T.inkSoft, marginBottom: 28, letterSpacing: "0.02em" }}>
          We believe the finest investments share a quality beyond financial return — a sense of place, of purpose, of meaning. Maitri Capital acquires and develops hospitality assets that stand apart.
        </p>
        {[["01", "Location Primacy", "Irreplaceable land in the world's most sought-after destinations — protected by geography, regulation, and scarcity."],
        ["02", "Design Excellence", "Architecture and interiors that define a category — commissioning the world's most distinguished creative voices."],
        ["03", "Operational Mastery", "Partnering with best-in-class operators who share our uncompromising standards for guest experience."]
        ].map(([n, t, d]) => (
          <div key={n} style={{ padding: "16px 0", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 18 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: T.gold, minWidth: 24, marginTop: 2 }}>{n}</span>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.slateDark, fontWeight: 400, marginBottom: 4 }}>{t}</div>
              <div style={{ fontSize: 13, color: T.slateLight, lineHeight: 1.75 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── STEP ITEM ────────────────────────────────────────────────────────────────
const StepItem = ({ n, t, d, i, cols }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "40px 28px",
        borderRight: cols === 4 && i < 3 ? `1px solid ${T.border}` : cols === 2 && i % 2 === 0 ? `1px solid ${T.border}` : "none",
        borderBottom: cols === 2 && i < 2 ? `1px solid ${T.border}` : cols === 1 && i < 3 ? `1px solid ${T.border}` : "none",
        background: hov ? T.warmWhite : "transparent",
        transition: "background 0.3s",
        borderTop: `2px solid ${hov ? T.gold : "transparent"}`,
        position: "relative"
      }}
    >
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: hov ? T.goldMuted : "rgba(191,144,0,0.1)", lineHeight: 1, marginBottom: 20, transition: "color 0.3s" }}>{n}</div>
      <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.slateDark, fontWeight: 400, marginBottom: 10 }}>{t}</div>
      <p style={{ fontSize: 13, lineHeight: 1.8, color: T.slateLight }}>{d}</p>
    </div>
  );
};

// ─── PROCESS SECTION ──────────────────────────────────────────────────────────
const ProcessSection = () => {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? 1 : isTablet ? 2 : 4;
  const steps = [
    ["01", "Discovery", "We source off-market opportunities through our global network — often years before a formal process begins."],
    ["02", "Due Diligence", "A rigorous 90-day process: site, operator, market, legal, and financial analysis by our in-house team."],
    ["03", "Structuring", "We design investment structures aligning incentives across developers, operators, and investors."],
    ["04", "Asset Management", "Active stewardship throughout the lifecycle — development through exit. Typically 7–12 year hold."],
  ];
  return (
    <section id="process" style={{ padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 60px", background: T.cream }}>
      <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
        <Eyebrow center>How We Work</Eyebrow>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,5vw,60px)", fontWeight: 300, color: T.ink }}>
          The <em style={{ fontStyle: "italic", color: T.slate }}>Investment</em> Journey
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, border: `1px solid ${T.border}` }}>
        {steps.map(([n, t, d], i) => (
          <StepItem key={n} n={n} t={t} d={d} i={i} cols={cols} />
        ))}
      </div>
    </section>
  );
};

// ─── TESTIMONIAL ─────────────────────────────────────────────────────────────
const Testimonial = () => {
  const { isMobile } = useResponsive();
  return (
    <section style={{ padding: isMobile ? "70px 24px" : "110px 60px", background: T.warmWhite, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 180 : 280, fontWeight: 300, color: "rgba(191,144,0,0.05)", lineHeight: 1, pointerEvents: "none" }}>"</div>
      <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,3vw,34px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.6, color: T.slateDark, maxWidth: 800, margin: "0 auto 32px", position: "relative", zIndex: 1 }}>
        "Maitri's ability to identify properties that transcend typical hospitality investment — where the asset itself is the story — is genuinely rare. Our returns have been exceptional, but the experience of owning these places is what endures."
      </blockquote>
      <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold }}>James Whitmore</div>
      <div style={{ fontSize: 12, color: T.slateLight, marginTop: 6, letterSpacing: "0.1em" }}>Managing Partner, Vantage Family Office · LP since 2018</div>
    </section>
  );
};

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
const ContactSection = () => {
  const { isMobile, isTablet } = useResponsive();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", organisation: "", appetite: "" });
  const setField = (k, v) => setFields(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!fields.firstName || !fields.email) {
      setError("Please fill in your name and email.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        "service_mkj0mmi",       // ← replace
        "template_1c2q8i6",      // ← replace
        {
          from_name: `${fields.firstName} ${fields.lastName}`,
          from_email: fields.email,
          organisation: fields.organisation,
          appetite: fields.appetite,
          to_email: "ealpha072@gmail.com",
        },
        "gKyFyznUSIuJksJ36"        // ← replace
      );
      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };
  
  return (
    <section id="contact" style={{ background: T.slateDark, display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", minHeight: isTablet ? "auto" : 560 }}>
      {/* Image — banner on mobile, full height on desktop */}
      <div style={{ position: "relative", overflow: "hidden", height: isTablet ? (isMobile ? 220 : 300) : "auto" }}>
        <img src={contact_section_banner} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: isTablet ? "linear-gradient(to bottom,transparent,rgba(44,58,74,0.7))" : "linear-gradient(to right,transparent,rgba(44,58,74,0.55))" }} />
      </div>
      <div style={{ padding: isMobile ? "52px 24px" : isTablet ? "60px 40px" : "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow>Join Us</Eyebrow>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 300, color: "white", lineHeight: 1.1, marginBottom: 18 }}>
          Begin the <em style={{ fontStyle: "italic", color: T.goldLight }}>Conversation</em>
        </h2>
        <p style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.48)", marginBottom: 36, letterSpacing: "0.02em" }}>
          Maitri Capital works with a select group of family offices, institutions, and high-net-worth individuals who share our conviction that exceptional hospitality assets represent one of the world's most compelling investment opportunities.
        </p>
        {sent ? (
          <div style={{ border: `1px solid ${T.gold}`, padding: 28, color: T.goldLight, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic" }}>
            Thank you. We will be in touch shortly.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              {[["First Name", "firstName", "James"], ["Last Name", "lastName", "Whitmore"]].map(([l, k, p]) => (
                <div key={k}>
                  <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: 6 }}>{l}</div>
                  <input 
                    value={fields[k]} 
                    onChange={e => setField(k, e.target.value)} 
                    placeholder={p}
                    style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "11px 14px", fontSize: 13, outline: "none" }}
                    onFocus={e => e.target.style.borderColor = T.gold}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} 
                    required
                  />
                </div>
              ))}
            </div>
            {[["Email", "email", "james@familyoffice.com"], ["Organisation", "organisation", "Vantage Family Office"], ["Investment Appetite", "appetite", "e.g. $5M–$25M"]].map(([l, k, p]) => (
              <div key={k}>
                <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: 6 }}>{l}</div>
                <input value={fields[k]} onChange={e => setField(k, e.target.value)} placeholder={p}
                  style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "11px 14px", fontSize: 13, outline: "none" }}
                  onFocus={e => e.target.style.borderColor = T.gold}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
            ))}
            {error && (
              <div style={{ fontSize: 12, color: "#e05050", letterSpacing: "0.05em" }}>{error}</div>
            )}
            <button onClick={handleSubmit} disabled={sending}
              style={{ background: sending ? "#a67c00" : T.gold, color: "white", border: "none", padding: 15, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", marginTop: 8, transition: "background 0.3s", opacity: sending ? 0.8 : 1 }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#a67c00"; }}
              onMouseLeave={e => { if (!sending) e.currentTarget.style.background = T.gold; }}>
              {sending ? "Sending..." : "Request Introduction"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const { isMobile, isTablet } = useResponsive();
  return (
    <footer style={{ background: T.ink, padding: isMobile ? "48px 24px 28px" : isTablet ? "52px 32px 32px" : "60px 60px 36px" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? 36 : 40, marginBottom: 44, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "white", letterSpacing: "0.1em", marginBottom: 4 }}>Maitri Capital</div>
          <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, marginBottom: 14 }}>Hospitality Investment</div>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.32)", maxWidth: 240 }}>Curating extraordinary hospitality investments for discerning investors worldwide since 2016.</p>
        </div>
        {[
          {
            title: "Portfolio",
            links: [
              { label: "Safari Lodge", href: "" },
              { label: "Coastal Resorts", href: "" },
              { label: "Urban Hotels", href: "" },
            ]
          },
          {
            title: "Firm",
            links: [
              { label: "About Maitri", href: "https://www.maitricapital.com" },
              { label: "Our Team", href: "https://www.maitricapital.com/team" },
              { label: "Our Services", href: "https://www.maitricapital.com/coreservices" },
            ]
          },
          {
            title: "Connect",
            links: [
              { label: "Nairobi HQ", href: "https://maps.app.goo.gl/qkU2QLs8B2QdPdUH7" },
              { label: "investor@maitricapital.com", href: "mailto:investor@maitricapital.com" },
            ]
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, marginBottom: 18 }}>{title}</div>
            {links.map(({ label, href }) =>
              href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
                  style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.36)", marginBottom: 9, letterSpacing: "0.03em", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = T.gold}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.36)"}>
                  {label}
                </a>
              ) : (
                <div key={label} style={{ fontSize: 13, color: "rgba(255,255,255,0.36)", marginBottom: 9, letterSpacing: "0.03em" }}>{label}</div>
              )
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 12 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>© 2026 Maitri Capital. All rights reserved.</div>
        <div style={{ display: "flex", gap: isMobile ? 16 : 24, flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Use"].map(l => (
            <span key={l} style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ─── LISTING DETAIL PAGE ──────────────────────────────────────────────────────
const ListingDetail = ({ listing, onBack }) => {
  const { isMobile, isTablet } = useResponsive();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: T.cream, minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: isMobile ? "55vh" : "70vh", minHeight: isMobile ? 380 : 500, overflow: "hidden" }}>
        <img src={listing.image} alt={listing.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.03)", animation: "heroZoom 12s ease-out forwards" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,31,38,0.88) 0%, rgba(26,31,38,0.2) 60%, transparent 100%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: isMobile ? 80 : 100, left: isMobile ? 20 : 60, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: isMobile ? "8px 16px" : "10px 22px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(8px)", transition: "background 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
          ← Back
        </button>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "0 20px 36px" : "0 60px 56px" }} className="fadeUp-1">
          <div style={{ display: "inline-block", fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, border: `1px solid rgba(191,144,0,0.5)`, padding: "5px 12px", marginBottom: 12 }}>{listing.category} · {listing.status}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "clamp(30px,8vw,48px)" : "clamp(40px,6vw,76px)", fontWeight: 300, color: "white", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 8 }}>{listing.title}</h1>
          {listing.subtitle && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: isMobile ? 16 : 22, color: T.goldLight }}>{listing.subtitle}</p>}
          <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 8 }}>{listing.location}</div>
        </div>
      </div>

      {/* Key Metrics Bar */}
      <div style={{ background: T.slateDark, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : `repeat(${[listing.investment, listing.irr || listing.targetIrr, listing.rooms, listing.opening].filter(Boolean).length}, 1fr)` }}>
        {[
          listing.investment && { label: "Investment", val: listing.investment },
          (listing.irr || listing.targetIrr) && { label: listing.irr ? "IRR" : "Target IRR", val: listing.irr || listing.targetIrr, gold: true },
          listing.rooms && { label: "Rooms / Keys", val: listing.rooms },
          listing.opening && { label: listing.status === "Development" ? "Opening" : "Opened", val: listing.opening },
        ].filter(Boolean).map((m, i, arr) => (
          <div key={i} style={{
            padding: isMobile ? "20px 16px" : "26px 24px", textAlign: "center",
            borderRight: isMobile ? (i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none") : (i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none"),
            borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 24 : 32, fontWeight: 300, color: m.gold ? T.gold : "white", lineHeight: 1 }}>{m.val}</div>
            <div style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 6 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: isMobile ? "52px 20px" : isTablet ? "64px 32px" : "90px 60px", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 360px", gap: isTablet ? 40 : 80, maxWidth: 1280, margin: "0 auto" }}>
        <div>
          <Eyebrow>Overview</Eyebrow>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 30 : 38, fontWeight: 300, color: T.ink, marginBottom: 24, lineHeight: 1.1 }}>The Investment Case</h2>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 2, color: T.inkSoft, letterSpacing: "0.02em", marginBottom: 44 }}>{listing.description}</p>

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
          {/* Highlights */}
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
          {/* CTA */}
          <div style={{ background: T.slateDark, padding: isMobile ? 24 : 36 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, color: "white", marginBottom: 10, lineHeight: 1.2 }}>Request Investment Memo</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>Access full financials, legal structure, and operator agreements.</p>
            <button 
              onClick={() => {
                onBack();
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
              style={{ width: "100%", background: T.gold, border: "none", color: "white", padding: 15, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#a67c00"}
              onMouseLeave={e => e.currentTarget.style.background = T.gold}>
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingDetailPage = ({ listings }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => toSlug(l.title) === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!listing) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: T.cream, gap: 20 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, color: T.ink }}>Property not found</div>
      <button onClick={() => navigate("/")} style={{ background: T.gold, color: "white", border: "none", padding: "12px 32px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}>
        Back to Portfolio
      </button>
    </div>
  );

  return (
    <>
      <Nav onAdmin={() => navigate("/admin")} onHome={() => navigate("/")} adminMode={false} />
      <ListingDetail listing={listing} onBack={() => { navigate("/"); setTimeout(() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }), 100); }} />
      <Footer />
    </>
  );
};

// ─── ADMIN — LOGIN ────────────────────────────────────────────────────────────
const AdminLogin = ({ onSuccess }) => {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);
  const submit = () => {
    if (pin === ADMIN_PIN) { onSuccess(); setErr(false); }
    else { setErr(true); setPin(""); }
  };
  return (
    <div style={{ minHeight: "100vh", background: T.slateDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 380, padding: 56, border: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "white", marginBottom: 6, letterSpacing: "0.06em" }}>Maitri Capital</div>
        <div style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: 40 }}>Admin Access</div>
        <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Access PIN</div>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="••••••••"
          style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: `1px solid ${err ? "#e05" : "rgba(255,255,255,0.1)"}`, color: "white", padding: "13px 16px", fontSize: 14, outline: "none", marginBottom: 8 }} />
        {err && <div style={{ fontSize: 11, color: "#e05", marginBottom: 16, letterSpacing: "0.1em" }}>Incorrect PIN. Please try again.</div>}
        <button onClick={submit} style={{ width: "100%", background: T.gold, border: "none", color: "white", padding: 15, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", marginTop: 12, transition: "background 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#a67c00"}
          onMouseLeave={e => e.currentTarget.style.background = T.gold}>
          Enter
        </button>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 20, textAlign: "center" }}>Demo PIN: maitri2024</div>
      </div>
    </div>
  );
};

// ─── ADMIN — FORM ─────────────────────────────────────────────────────────────
const EMPTY = { id: "", title: "", subtitle: "", location: "", category: "Safari", status: "Operating", investment: "", irr: "", targetIrr: "", rooms: "", opening: "", featured: false, description: "", highlights: [], image: "", galleryImages: [] };
const CATS = ["Safari", "Coastal", "Mountain", "Desert", "Urban", "Island"];
const STATUSES = ["Operating", "Development", "Stabilising", "Divested"];

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: T.slateLight, marginBottom: 7 }}>{label}</div>
    {children}
  </div>
);

const inp = (extra = {}) => ({
  style: { width: "100%", background: T.warmWhite, border: `1px solid ${T.border}`, color: T.ink, padding: "10px 13px", fontSize: 13, outline: "none", fontFamily: "'Jost', sans-serif", ...extra.style },
  onFocus: e => e.target.style.borderColor = T.gold,
  onBlur: e => e.target.style.borderColor = T.border,
  ...extra,
});

const ListingForm = ({ initial, onSave, onCancel }) => {
  const { isMobile } = useResponsive();
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [hlInput, setHlInput] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addHighlight = () => {
    if (hlInput.trim()) { set("highlights", [...(form.highlights || []), hlInput.trim()]); setHlInput(""); }
  };
  const removeHighlight = (i) => set("highlights", form.highlights.filter((_, j) => j !== i));

  return (
    <div style={{ background: "white", border: `1px solid ${T.border}`, padding: isMobile ? 24 : 40, borderTop: `3px solid ${T.gold}` }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: T.ink, marginBottom: 28 }}>
        {initial?.id ? "Edit Listing" : "New Listing"}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 28px" }}>
        <Field label="Property Title">
          <input {...inp()} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Asilia Serengeti Private Reserve" />
        </Field>
        <Field label="Subtitle / Tagline">
          <input {...inp()} value={form.subtitle} onChange={e => set("subtitle", e.target.value)} placeholder="Where the wild never ends" />
        </Field>
        <Field label="Location">
          <input {...inp()} value={form.location} onChange={e => set("location", e.target.value)} placeholder="Tanzania, East Africa" />
        </Field>
        <Field label="Category">
          <select {...inp()} value={form.category} onChange={e => set("category", e.target.value)}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select {...inp()} value={form.status} onChange={e => set("status", e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Investment Amount">
          <input {...inp()} value={form.investment} onChange={e => set("investment", e.target.value)} placeholder="$48M" />
        </Field>
        <Field label="Actual IRR (operating properties)">
          <input {...inp()} value={form.irr} onChange={e => set("irr", e.target.value)} placeholder="22.4%" />
        </Field>
        <Field label="Target IRR (development properties)">
          <input {...inp()} value={form.targetIrr} onChange={e => set("targetIrr", e.target.value)} placeholder="24.0%" />
        </Field>
        <Field label="Rooms / Keys">
          <input {...inp()} value={form.rooms} onChange={e => set("rooms", e.target.value)} placeholder="18 Tents" />
        </Field>
        <Field label="Opened / Opening Date">
          <input {...inp()} value={form.opening} onChange={e => set("opening", e.target.value)} placeholder="2021 or Q4 2026" />
        </Field>
      </div>

      <Field label="Hero Image URL">
        <input {...inp()} value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://images.unsplash.com/..." />
        {form.image && <img src={form.image} alt="" style={{ width: "100%", height: 180, objectFit: "cover", marginTop: 8, display: "block" }} onError={e => e.target.style.display = "none"} />}
      </Field>

      <Field label="Description">
        <textarea {...inp({ style: { minHeight: 110, resize: "vertical" } })} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Compelling investment narrative..." />
      </Field>

      <Field label="Key Highlights">
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input {...inp({ style: { flex: 1 } })} value={hlInput} onChange={e => setHlInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addHighlight())} placeholder="Add a highlight and press Enter" />
          <button onClick={addHighlight} style={{ background: T.slate, color: "white", border: "none", padding: "10px 18px", fontSize: 11, cursor: "pointer" }}>Add</button>
        </div>
        {(form.highlights || []).map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: T.warmWhite, marginBottom: 6, border: `1px solid ${T.border}` }}>
            <div style={{ width: 5, height: 5, background: T.gold, borderRadius: "50%" }} />
            <span style={{ flex: 1, fontSize: 13, color: T.inkSoft }}>{h}</span>
            <button onClick={() => removeHighlight(i)} style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
          </div>
        ))}
      </Field>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <input type="checkbox" id="featured" checked={form.featured} onChange={e => set("featured", e.target.checked)} style={{ width: 16, height: 16, accentColor: T.gold }} />
        <label htmlFor="featured" style={{ fontSize: 13, color: T.inkSoft, letterSpacing: "0.04em" }}>Feature this property (hero position in portfolio grid)</label>
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        <button onClick={() => onSave(form)} style={{ background: T.gold, color: "white", border: "none", padding: "14px 36px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.background = "#a67c00"}
          onMouseLeave={e => e.currentTarget.style.background = T.gold}>
          Save Listing
        </button>
        <button onClick={onCancel} style={{ background: "none", color: T.slate, border: `1px solid ${T.border}`, padding: "14px 28px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ listings, onSave, onLogout }) => {
  const { isMobile, isTablet } = useResponsive();
  const [editing, setEditing] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);

  const handleSave = (form) => {
    const isNew = !form.id || form.id === "";
    const entry = isNew ? { ...form, id: Date.now().toString() } : form;
    const next = isNew ? [...listings, entry] : listings.map(l => l.id === entry.id ? entry : l);
    onSave(next);
    setEditing(null);
  };

  const handleDelete = (id) => {
    onSave(listings.filter(l => l.id !== id));
    setDelConfirm(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      {/* Admin Nav */}
      <div style={{ background: T.slateDark, padding: `0 ${isMobile ? "20px" : "56px"}`, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${T.gold}` }}>
        <div style={{ padding: "18px 0" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 18 : 22, color: "white", letterSpacing: "0.1em" }}>Maitri Capital</div>
          <div style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold }}>Admin Dashboard</div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {!isMobile && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>{listings.length} Listings</div>}
          <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", padding: "7px 16px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Sign Out</button>
        </div>
      </div>

      <div style={{ padding: isMobile ? "32px 20px" : isTablet ? "40px 32px" : "52px 56px" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: 36, gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 42, fontWeight: 300, color: T.ink }}>
              Investment <em style={{ fontStyle: "italic", color: T.slate }}>Listings</em>
            </h1>
            <p style={{ fontSize: 13, color: T.slateLight, marginTop: 5 }}>Create, edit, and manage portfolio properties</p>
          </div>
          {!editing && (
            <button onClick={() => setEditing("new")} style={{ background: T.gold, color: "white", border: "none", padding: "13px 28px", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
              + Add New Listing
            </button>
          )}
        </div>

        {/* Form */}
        {editing && (
          <div style={{ marginBottom: 40 }}>
            <ListingForm
              initial={editing === "new" ? EMPTY : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}

        {/* Table — scrollable on mobile */}
        <div className="admin-table-wrap" style={{ border: `1px solid ${T.border}` }}>
          {/* Table Header */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(180px,2fr) minmax(80px,1fr) 110px" : "2.5fr 1.2fr 1fr 1fr 1fr 130px", background: T.slateDark, padding: "12px 16px", minWidth: isMobile ? 400 : "auto" }}>
            {(isMobile ? ["Property", "Status", "Actions"] : ["Property", "Location", "Category", "Investment", "Status", "Actions"]).map(h => (
              <div key={h} style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{h}</div>
            ))}
          </div>

          {listings.length === 0 && (
            <div style={{ padding: "48px 16px", textAlign: "center", color: T.slateLight, fontStyle: "italic" }}>No listings yet. Add your first property above.</div>
          )}

          {listings.map((l, i) => (
            <div key={l.id}>
              {delConfirm === l.id && (
                <div style={{ background: "#fff5f5", borderBottom: `1px solid #fcc`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: T.ink }}>Delete <strong>{l.title}</strong>? This cannot be undone.</span>
                  <button onClick={() => handleDelete(l.id)} style={{ background: "#c00", color: "white", border: "none", padding: "6px 16px", fontSize: 11, cursor: "pointer" }}>Delete</button>
                  <button onClick={() => setDelConfirm(null)} style={{ background: "none", border: `1px solid ${T.border}`, padding: "6px 14px", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(180px,2fr) minmax(80px,1fr) 110px" : "2.5fr 1.2fr 1fr 1fr 1fr 130px", padding: "14px 16px", alignItems: "center", borderBottom: i < listings.length - 1 ? `1px solid ${T.border}` : "none", background: i % 2 === 0 ? "white" : T.cream, minWidth: isMobile ? 400 : "auto", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.warmWhite}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "white" : T.cream}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={l.image} alt="" style={{ width: 44, height: 34, objectFit: "cover", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
                  <div>
                    <div style={{ fontSize: 12, color: T.ink, fontWeight: 400, lineHeight: 1.3 }}>{l.title}</div>
                    {l.featured && <div style={{ fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: T.gold, marginTop: 2 }}>Featured</div>}
                    {isMobile && <div style={{ fontSize: 11, color: T.slateLight, marginTop: 2 }}>{l.location}</div>}
                  </div>
                </div>
                {!isMobile && <div style={{ fontSize: 12, color: T.slateLight }}>{l.location}</div>}
                {!isMobile && <div style={{ fontSize: 12, color: T.inkSoft }}>{l.category}</div>}
                {!isMobile && <div style={{ fontSize: 12, color: T.inkSoft }}>{l.investment || "—"}</div>}
                <div>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 8px",
                    background: l.status === "Operating" ? "rgba(0,150,80,0.1)" : l.status === "Development" ? T.goldMuted : "rgba(68,84,106,0.1)",
                    color: l.status === "Operating" ? "#007a40" : l.status === "Development" ? T.gold : T.slate,
                  }}>{isMobile ? l.status.slice(0, 3) : l.status}</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setEditing(l)} style={{ background: "none", border: `1px solid ${T.border}`, color: T.slate, padding: "5px 12px", fontSize: 10, cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.slate; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = T.slate; }}>
                    Edit
                  </button>
                  <button onClick={() => setDelConfirm(l.id)} style={{ background: "none", border: "1px solid rgba(200,0,0,0.2)", color: "#c00", padding: "5px 9px", fontSize: 10, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#c00"; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#c00"; }}>
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats summary */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 1, marginTop: 24, background: T.border }}>
          {[
            { label: "Total Listings", val: listings.length },
            { label: "Operating", val: listings.filter(l => l.status === "Operating").length },
            { label: "In Development", val: listings.filter(l => l.status === "Development").length },
            { label: "Featured", val: listings.filter(l => l.featured).length },
          ].map(s => (
            <div key={s.label} style={{ background: T.warmWhite, padding: "20px 24px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, color: T.gold }}>{s.val}</div>
              <div style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: T.slateLight, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminGate = ({ listings, onSave }) => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  if (!auth) return <AdminLogin onSuccess={() => setAuth(true)} />;

  return (
    <AdminDashboard
      listings={listings}
      onSave={onSave}
      onLogout={() => { setAuth(false); navigate("/"); }}
    />
  );
};

// ─── PUBLIC SITE ──────────────────────────────────────────────────────────────
const PublicSite = ({ listings }) => {
  const navigate = useNavigate();
  const portfolioRef = useRef(null);

  return (
    <div>
      <Nav onAdmin={() => navigate("/admin")} onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })} adminMode={false} />
      <Hero onExplore={() => portfolioRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <StatsBar listings={listings} />
      <div ref={portfolioRef}>
        <PortfolioSection listings={listings} onSelect={(l) => navigate(`/maitri_capital_listing/${toSlug(l.title)}`)} />
      </div>
      <PhilosophySection />
      <ProcessSection />
      <Testimonial />
      <ContactSection />
      <Footer />
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const { listings, save, loaded } = useListings();

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: T.slateDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: T.gold, letterSpacing: "0.2em" }}>Maitri Capital</div>
    </div>
  );

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/maitri_capital_listing" element={<PublicSite listings={listings} />} />
        <Route path="/maitri_capital_listing/:slug" element={<ListingDetailPage listings={listings} />} />
        <Route path="/admin" element={<AdminGate listings={listings} onSave={save} />} />
      </Routes>
    </>
  );
}