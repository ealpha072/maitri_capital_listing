import { useState, useEffect, useRef, useCallback } from "react";
import BANNER_IMAGE from "./src/Assets/image.png"

// USE THIS BANNER IMAGE AS AN ALTERNATIVE
// https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1800&q=80
// 

const DEFAULT_LISTINGS = [
    { 
        id: "1", 
        title: "Project Maasai", 
        subtitle: "Where the wild never ends", 
        location: "Kenya, Tanzania, East Africa", 
        category: "Safari", 
        status: "Operating", 
        deal:"Full exit",
        investment: "$48M", 
        irr: "22.4%", 
        targetIrr: "", 
        rooms: "30+ Tents", 
        opening: "2021", 
        featured: true, 
        description: "A family-owned, ultra-luxury safari hospitality platform operating a curated portfolio of high-end tented camps across East Africa’s premier wildlife ecosystems.The business specializes in delivering “wild luxury” experiences, combining five-star accommodation, personalized service (including private butlers), and premium-guided wildlife experiences within exclusive or low-density conservation areas. The platform currently operates: One flagship property in Kenya’s Maasai Mara ecosystem, located within a private conservancy enabling differentiated access (e.g., off-road driving, night safaris) Two complementary properties in Tanzania’s Serengeti, including a permanent camp in the northern migration corridor and a semi-mobile camp designed to track wildlife movements seasonally.", 
        highlights: ["Exclusive wilderness destinations", "Market Leader in Luxury Tourism", "Multi-award Winner", "Highly profitable and cash flow positive"], image: "https://images.unsplash.com/photo-1518459384564-ecfd8e80721f?q=80&w=1148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        galleryImages: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80","https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"] 
    },
    { 
        id: "2", 
        title: "Project Manjaro", 
        subtitle: "Solitude, perfected", 
        location: "Kenya, East Africa", 
        category: "Safari", 
        status: "Operating", 
        deal:"Equity : Debt",
        investment: "$62M", 
        irr: "19.1%", 
        targetIrr: "", 
        rooms: "11 Tents", 
        opening: "2022", 
        featured: false, 
        description: "A heritage luxury safari operator with a multi-generational legacy in East Africa, the business delivers high-end, conservation-led safari experiences within a privately managed conservancy in the Maasai Mara ecosystem. The company operates a low-density, high-yield model centered on a flagship camp and private residences, offering immersive, fully guided wildlife experiences supported by strong in-house guiding expertise and personalized service. Revenue is driven by all-inclusive nightly rates targeting affluent international travelers, with differentiation anchored in its legacy brand, deep conservation integration, and community engagement, positioning the platform within the growing global demand for sustainable, purpose-driven luxury tourism.", 
        highlights: ["Phenomenal and exclusive wilderness destinations", "Market Leader in Luxury Tourism", "Dedication to Sustainability", "Highly profitable and cashflow positive"], 
        image: "https://images.unsplash.com/photo-1538209647246-bb82d2e4b372?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        galleryImages: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"] 
    },
    { 
        id: "3", 
        title: "Project Bahati", 
        subtitle: "Stylish and vibrant", 
        location: "Kenya, East Africa", 
        category: "Hotel", 
        status: "Operating", 
        deal:"Sale and Leaseback",
        investment: "$31M", 
        irr: "", 
        targetIrr: "24.0%", 
        rooms: "110+ Keys", 
        opening: "Operating", 
        featured: false, 
        description: "A boutique hospitality property located in Nairobi, the business operates as an intimate, design-led hotel catering to both business and leisure travelers seeking a quiet, upscale alternative to large-format city hotels. The property offers a limited number of well-appointed rooms, personalized service, and curated amenities, positioning itself within the mid- to upper-tier urban accommodation segment. Revenue is driven by short-stay bookings, corporate clients, and repeat domestic and international guests, with differentiation anchored in its tranquil setting, individualized guest experience, and niche positioning within Nairobi’s competitive hospitality market.", 
        highlights: ["Modern 4-star hotel with recent CAPEX investment", "Compelling real estate play with replacement-cost advantages", "Sits in a high-demand corporate and NGO corridor", "Outperforms competitors in room-night generation"], 
        image: "https://plus.unsplash.com/premium_photo-1733317260639-6fb8eb703c78?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        galleryImages: [] 
    },
    { 
        id: "4", 
        title: "Project Nexus", 
        subtitle: "Executive Ease", 
        location: "Kenya, East Africa", 
        category: "Hotel", 
        status: "Operating", 
        deal:"Full exit",
        investment: "$27M", 
        irr: "17.8%", 
        targetIrr: "", 
        rooms: "160 Keys", 
        opening: "2023", 
        featured: false, 
        description: "A business-oriented urban hotel operating under the internationally affiliated Sarovar Hotels & Resorts portfolio, the property is located in Nairobi and caters primarily to corporate travelers, diplomats, and short-stay international guests. The hotel offers a full-service hospitality model, including multiple room categories, conference and meeting facilities, food and beverage outlets, and wellness amenities, positioning it within the mid- to upper-midscale segment of the city’s accommodation market. Revenue is driven by corporate bookings, conferences and events, and steady business travel demand, with differentiation anchored in its recognized brand affiliation, central location, and integrated service offering suited to Nairobi’s role as a regional commercial and diplomatic hub.", 
        highlights: [" Strategic Locations in Established Commercial Districts", "Portfolio includes two operating business hotels", "Strong financial performance with projected EBITDA margins of ~35–37%"], 
        image: "https://images.unsplash.com/photo-1710168867585-9a74109dae6a?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        galleryImages: [] 
    },
    { 
        id: "5", 
        title: "Project Atlas", 
        subtitle: "Conservation as investment thesis", 
        location: "Kenya, East Africa", 
        category: "Hotel", 
        status: "Development", 
        deal:"Completion Finance",
        investment: "$38M", 
        irr: "20.5%", 
        targetIrr: "", 
        rooms: "82 Keys", 
        opening: "-", 
        featured: false, 
        description: "Project Atlas represents a hospitality development opportunity to deliver a professionally operated urban hotel within a major East African capital city. The project will deliver an 82-key mid-scale hotel and serviced apartment offering, designed to serve corporatetravelers, consultants, development agencies and international organizations operating within the city’s commercial district. An international hotel operator and brand have been identified, with discussions currently underway to finalise the management agreement. The redevelopment incorporates modern building systems and operational efficiencies designed to improve energy and water efficiency compared with traditional hospitality developments.", 
        highlights: ["Initial construction works have commenced", "Diversified Accommodation Offering", "International hotel operator and brand identified", "Cost-efficient development at approximately USD 130k per key"], 
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        galleryImages: [] 
    },
    { 
        id: "6", 
        title: "Project Johari", 
        subtitle: "Present-day performance with clear forward momentum", 
        location: "Kenya, Coastline", 
        category: "Coastal", 
        status: "Operating", 
        deal:"Full exit",
        investment: "$48M", 
        irr: "22.4%", 
        targetIrr: "", 
        rooms: "10 Rooms", 
        opening: "2021", 
        featured: false, 
        description: "a thriving boutique beachfront hotel, renowned for its design, privacy, and sustainability. With fewer than 10 rooms, positioned within a protected marine area along Kenya's pristine coastline, this coastal gem offers rare intimacy and scale.The property combines strong present-day performance with clear forward momentum—with professionally developed expansion plans included in the sale, offering a viable pathway to scale in one of Africa's most promising luxury tourism corridors.", 
        highlights: ["Prime beachfront location", "Award-Winning Eco-Luxury", "Intimate, Expandable Concept", "Diversified Revenue Streams"], image: "https://plus.unsplash.com/premium_photo-1726994886511-eb161ab1c4bc?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        galleryImages: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80","https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"] 
    },
    { 
        id: "7", 
        title: "Project Ilora", 
        subtitle: "Maasai Mara unfolded", 
        location: "Kenya, Maasai Mara", 
        category: "Safari", 
        status: "Operating", 
        deal:"Full Exit",
        investment: "$62M", 
        irr: "19.1%", 
        targetIrr: "", 
        rooms: "14 Tents", 
        opening: "2022", 
        featured: false, 
        description: "A rare investment opportunity in a prime 30-acre property with 14 luxury tents (600+sq feet, offering 360- degree views and expansion potential. Has spa, gym, pool, sky deck, photo lounge, curio, reception, and multiple dining venues. Located just 10 minutes from the migration crossing and Olkiombo Airstrip, providing year-round, immersive wildlife experiences—closer than most competitors. Guests enjoy premium activities like star beds, stargazing, and bush movies, bush walks, 7 course meals, enhancing their connection to nature and Maasai culture.", 
        highlights: [" Direct access to the Great Migration", "Sustainability Appeal with Eco-friendly camps", " Peak migration periods bring full occupancy and potential for higher average daily rates "], 
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        galleryImages: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"] 
    },
    { 
        id: "8", 
        title: "Project Nexus", 
        subtitle: "Executive Ease", 
        location: "Kenya, East Africa", 
        category: "Hotel", 
        status: "Operating", 
        deal:"Full exit",
        investment: "$27M", 
        irr: "17.8%", 
        targetIrr: "", 
        rooms: "160 Keys", 
        opening: "2023", 
        featured: false, 
        description: "A business-oriented urban hotel operating under the internationally affiliated Sarovar Hotels & Resorts portfolio, the property is located in Nairobi and caters primarily to corporate travelers, diplomats, and short-stay international guests. The hotel offers a full-service hospitality model, including multiple room categories, conference and meeting facilities, food and beverage outlets, and wellness amenities, positioning it within the mid- to upper-midscale segment of the city’s accommodation market. Revenue is driven by corporate bookings, conferences and events, and steady business travel demand, with differentiation anchored in its recognized brand affiliation, central location, and integrated service offering suited to Nairobi’s role as a regional commercial and diplomatic hub.", 
        highlights: [" Strategic Locations in Established Commercial Districts", "Portfolio includes two operating business hotels", "Strong financial performance with projected EBITDA margins of ~35–37%"], 
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=80", 
        galleryImages: [] 
    },
];

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  gold: "#BF9000", goldLight: "#D4AA33", goldMuted: "rgba(191,144,0,0.15)",
  slate: "#44546A", slateDark: "#2C3A4A", slateLight: "#6B7F96",
  cream: "#FAF8F4", warmWhite: "#F5F2EC", ink: "#1A1F26", inkSoft: "#3A4047",
  border: "rgba(191,144,0,0.22)",
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
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  const save = useCallback(async (next) => {
    setListings(next);
    try { await window.storage.set("maitri_listings", JSON.stringify(next)); } catch (_) {}
  }, []);

  return { listings, save, loaded };
};

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false, center = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18,
    justifyContent: center ? "center" : "flex-start" }}>
    {!center && <div style={{ width: 32, height: 1, background: T.gold }} />}
    <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase",
      color: T.gold, fontWeight: 400 }}>{children}</span>
  </div>
);

const Serif = ({ children, style = {} }) => (
  <span style={{ fontFamily: "'Cormorant Garamond', serif", ...style }}>{children}</span>
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = ({ onAdmin, onHome, scrolled, adminMode }) => (
  <nav style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: scrolled ? "16px 56px" : "26px 56px",
    background: scrolled ? "rgba(250,248,244,0.96)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? `1px solid ${T.border}` : "none",
    transition: "all 0.4s ease",
  }}>
    <button onClick={onHome} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21,
        color: scrolled ? T.slateDark : "white", letterSpacing: "0.12em", lineHeight: 1.2 }}>
        Maitri Capital
      </div>
      <div style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase",
        color: T.gold, marginTop: 2 }}>Investment Portfolio</div>
    </button>
    <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
      {["Portfolio", "Philosophy", "Process", "Contact"].map(l => (
        <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 11, letterSpacing: "0.24em",
          textTransform: "uppercase", color: scrolled ? T.slate : "rgba(255,255,255,0.75)",
          textDecoration: "none", transition: "color 0.3s" }}
          onMouseEnter={e => e.target.style.color = T.gold}
          onMouseLeave={e => e.target.style.color = scrolled ? T.slate : "rgba(255,255,255,0.75)"}>
          {l}
        </a>
      ))}
      <button onClick={onAdmin} style={{
        fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
        color: adminMode ? "white" : T.gold,
        border: `1px solid ${T.gold}`,
        background: adminMode ? T.gold : "transparent",
        padding: "9px 22px", cursor: "pointer", transition: "all 0.3s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = T.gold; e.currentTarget.style.color = "white"; }}
        onMouseLeave={e => { e.currentTarget.style.background = adminMode ? T.gold : "transparent"; e.currentTarget.style.color = adminMode ? "white" : T.gold; }}>
        {adminMode ? "← Public View" : "Admin"}
      </button>
    </div>
  </nav>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = ({ onExplore }) => (
  <div 
    style={{ 
      position: "relative", 
      height: "100vh", 
      minHeight: 700, 
      display: "flex", 
      alignItems: "flex-end", 
      overflow: "hidden" 
    }}
  >
    <div 
      style={{
      position: "absolute", inset: 0,
      background: `linear-gradient(160deg, rgba(68,84,106,0.72) 0%, rgba(26,31,38,0.55) 60%, rgba(191,144,0,0.1) 100%), url(https://images.unsplash.com/photo-1620693778087-2bced33a4a06?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center/cover`,
      animation: "heroZoom 14s ease-out forwards",
      }} 
    />
    <div 
      style={{ 
        position: "absolute", 
        inset: 0, 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", 
        opacity: 0.4 
      }} 
    />
    <div 
      style={{ position: "relative", zIndex: 2, padding: "0 60px 90px", maxWidth: 900 }} 
      className="fadeUp-1"
    >
      <Eyebrow light>Maitri Capital — Est. 2016</Eyebrow>
      <h1 
        style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: "clamp(52px,7vw,96px)", 
          fontWeight: 300, 
          color: "white", 
          lineHeight: 1.0, 
          letterSpacing: "-0.01em", 
          marginBottom: 26 
        }}
      >
        Where <em style={{ fontStyle: "italic", color: T.goldLight }}>Capital</em><br />Finds its Purpose
      </h1>
      <p 
        style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.65)", maxWidth: 460, letterSpacing: "0.03em", marginBottom: 42 }}>
        A curated portfolio of world-class hospitality investments — each property chosen for its irreplaceable location, exceptional design, and enduring returns.
      </p>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <button onClick={onExplore} style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", background: T.gold, color: "white", border: "none", padding: "16px 40px", cursor: "pointer", transition: "background 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#a67c00"}
          onMouseLeave={e => e.currentTarget.style.background = T.gold}>
          Explore Portfolio
        </button>
        <a href="#philosophy" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
          Our Philosophy →
        </a>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 40, right: 60, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }} className="fadeUp-5">
      <span style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", writingMode: "vertical-rl" }}>Scroll</span>
      <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)", animation: "scrollLine 2s 2s ease infinite" }} />
    </div>
  </div>
);

// ─── STATS BAR ────────────────────────────────────────────────────────────────
const StatsBar = ({ listings }) => {
  const totalInvest = listings.reduce((a, l) => a + parseFloat(l.investment?.replace(/[$M]/g, "") || 0), 0);
  const avgIrr = listings.filter(l => l.irr).reduce((a, l, _, arr) => a + parseFloat(l.irr) / arr.length, 0);
  const stats = [
    { num: `$${totalInvest.toFixed(0)}M+`, label: "Total Investments" },
    { num: listings.length, label: "Properties Worldwide" },
    { num: `${avgIrr.toFixed(1)}%`, label: "Avg. Annual Return" },
    { num: "12", label: "Countries" },
  ];
  return (
    <div style={{ background: T.slateDark, display: "flex", borderBottom: `1px solid rgba(191,144,0,0.15)` }}>
      {stats.map((s, i) => (
        <div key={i} style={{ flex: 1, padding: "34px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 300, color: T.gold, lineHeight: 1 }}>{s.num}</div>
          <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginTop: 8 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
};

// ─── PORTFOLIO CARD ───────────────────────────────────────────────────────────
const Card = ({ listing, onClick, featured }) => {
  const [hov, setHov] = useState(false);
  return (
    <div 
      onClick={() => onClick(listing)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        cursor: "pointer", 
        background: T.slateDark,
        gridColumn: featured ? "1 / 3" : "auto" 
      }}
    >
      <img 
        src={listing.image} 
        alt={listing.title} 
        style={{ width: "100%", height: featured ? 560 : 340, 
        objectFit: "cover", 
        display: "block", 
        transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)", 
        transform: hov ? "scale(1.05)" : "scale(1)" }} 
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
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 34 }}>
        <div style={{ display: "inline-block", fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, border: `1px solid rgba(191,144,0,0.5)`, padding: "5px 12px", marginBottom: 12 }}>
          {listing.category}{listing.featured ? " · Featured" : ""}
        </div>
        <h3 
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: featured ? 42 : 26, fontWeight: 300, color: "white", lineHeight: 1.15, marginBottom: 6 }}
        >
          {listing.title}
        </h3>
        <div 
          style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 18 }}
        >
          {listing.location}
        </div>
        <div 
          style={{ display: "flex", gap: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)", opacity: hov ? 1 : 0, transform: hov ? "none" : "translateY(8px)", transition: "all 0.35s ease" }}
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
          <div>
            <div style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>Deal Structure/Type</div><div style={{ fontSize: 13, color: "white", marginTop: 3 }}>{listing.deal}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PORTFOLIO SECTION ────────────────────────────────────────────────────────
const PortfolioSection = ({ listings, onSelect }) => {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(listings.map(l => l.category)))];
  const filtered = filter === "All" ? listings : listings.filter(l => l.category === filter);
  console.log("filtered listings:", filtered.length, filtered.map(l => l.title));
  const featured = filtered.find(l => l.featured) || filtered[0];
  const rest = filtered.filter(l => l.id !== featured?.id);

  return (
    <section id="portfolio" style={{ padding: "100px 60px", background: T.cream }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
        <div>
          <Eyebrow>Current Portfolio</Eyebrow>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 300, color: T.ink, letterSpacing: "-0.01em" }}>
            Active <em style={{ fontStyle: "italic", color: T.slate }}>Investments</em>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
              border: `1px solid ${filter === c ? T.slateDark : T.border}`,
              padding: "9px 18px", cursor: "pointer",
              background: filter === c ? T.slateDark : "transparent",
              color: filter === c ? "white" : T.slate, transition: "all 0.3s",
            }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {featured && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
          <Card listing={featured} onClick={onSelect} featured />
          {rest.map(l => <Card key={l.id} listing={l} onClick={onSelect} />)}
        </div>
      )}
    </section>
  );
};

// ─── PHILOSOPHY SECTION ───────────────────────────────────────────────────────
const PhilosophySection = () => (
  <section id="philosophy" style={{ padding: "110px 60px", background: T.warmWhite, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 90, alignItems: "center" }}>
    <div style={{ position: "relative", height: 540 }}>
      <img src="https://images.unsplash.com/photo-1611519847235-d4794ac1ee2b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(68,84,106,0.1),rgba(191,144,0,0.07))" }} />
      <div style={{ position: "absolute", bottom: -26, right: -26, width: 112, height: 112, background: T.gold, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, color: "white", lineHeight: 1 }}>10</div>
        <div style={{ fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: 4 }}>Years</div>
      </div>
    </div>
    <div>
      <Eyebrow>Our Approach</Eyebrow>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,4vw,58px)", fontWeight: 300, color: T.ink, lineHeight: 1.08, marginBottom: 28 }}>
        Investing in the <em style={{ fontStyle: "italic", color: T.slate }}>Exceptional</em>
      </h2>
      <p style={{ fontSize: 14, lineHeight: 2, color: T.inkSoft, marginBottom: 36, letterSpacing: "0.02em" }}>
        We believe the finest investments share a quality beyond financial return — a sense of place, of purpose, of meaning. Maitri Capital acquires and develops hospitality assets that stand apart.
      </p>
      {[["01","Location Primacy","Irreplaceable land in the world's most sought-after destinations — protected by geography, regulation, and scarcity."],
        ["02","Design Excellence","Architecture and interiors that define a category — commissioning the world's most distinguished creative voices."],
        ["03","Operational Mastery","Partnering with best-in-class operators who share our uncompromising standards for guest experience."]
      ].map(([n, t, d]) => (
        <div key={n} style={{ padding: "18px 0", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 18 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: T.gold, minWidth: 24, marginTop: 2 }}>{n}</span>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.slateDark, fontWeight: 400, marginBottom: 5 }}>{t}</div>
            <div style={{ fontSize: 13, color: T.slateLight, lineHeight: 1.75 }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── STEP ITEM ────────────────────────────────────────────────────────────────
const StepItem = ({ n, t, d, i, T }) => {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "48px 32px",
        borderRight: i < 3 ? `1px solid ${T.border}` : "none",
        background: hov ? T.warmWhite : "transparent",
        transition: "background 0.3s",
        borderTop: `2px solid ${hov ? T.gold : "transparent"}`,
        position: "relative"
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 60,
          fontWeight: 300,
          color: hov ? T.goldMuted : "rgba(191,144,0,0.1)",
          lineHeight: 1,
          marginBottom: 24,
          transition: "color 0.3s"
        }}
      >
        {n}
      </div>

      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: T.slateDark,
          fontWeight: 400,
          marginBottom: 12
        }}
      >
        {t}
      </div>

      <p style={{ fontSize: 13, lineHeight: 1.8, color: T.slateLight }}>
        {d}
      </p>
    </div>
  );
};

// ─── PROCESS SECTION ──────────────────────────────────────────────────────────
const ProcessSection = () => {
  const steps = [
    ["01","Discovery","We source off-market opportunities through our global network — often years before a formal process begins."],
    ["02","Due Diligence","A rigorous 90-day process: site, operator, market, legal, and financial analysis by our in-house team."],
    ["03","Structuring","We design investment structures aligning incentives across developers, operators, and investors."],
    ["04","Asset Management","Active stewardship throughout the lifecycle — development through exit. Typically 7–12 year hold."],
  ];
  return (
    <section id="process" style={{ padding: "100px 60px", background: T.cream }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Eyebrow center>How We Work</Eyebrow>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,60px)", fontWeight: 300, color: T.ink }}>
          The <em style={{ fontStyle: "italic", color: T.slate }}>Investment</em> Journey
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: `1px solid ${T.border}` }}>
        {steps.map(([n, t, d], i) => (
          <StepItem key={n} n={n} t={t} d={d} i={i} T={T} />
        ))}
      </div>
    </section>
  );
};

// ─── TESTIMONIAL ─────────────────────────────────────────────────────────────
const Testimonial = () => (
  <section style={{ padding: "110px 60px", background: T.warmWhite, textAlign: "center", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: 280, fontWeight: 300, color: "rgba(191,144,0,0.05)", lineHeight: 1, pointerEvents: "none" }}>"</div>
    <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,3vw,36px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.55, color: T.slateDark, maxWidth: 800, margin: "0 auto 36px", position: "relative", zIndex: 1 }}>
      "Maitri's ability to identify properties that transcend typical hospitality investment — where the asset itself is the story — is genuinely rare. Our returns have been exceptional, but the experience of owning these places is what endures."
    </blockquote>
    <div style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold }}>James Whitmore</div>
    <div style={{ fontSize: 12, color: T.slateLight, marginTop: 6, letterSpacing: "0.1em" }}>Managing Partner, Vantage Family Office · LP since 2018</div>
  </section>
);

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
const ContactSection = () => {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ background: T.slateDark, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 560 }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=900&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent,rgba(44,58,74,0.55))" }} />
      </div>
      <div style={{ padding: "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow>Join Us</Eyebrow>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 300, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
          Begin the <em style={{ fontStyle: "italic", color: T.goldLight }}>Conversation</em>
        </h2>
        <p style={{ fontSize: 13, lineHeight: 1.95, color: "rgba(255,255,255,0.48)", marginBottom: 40, letterSpacing: "0.02em" }}>
          Maitri Capital works with a select group of family offices, institutions, and high-net-worth individuals who share our conviction that exceptional hospitality assets represent one of the world's most compelling investment opportunities.
        </p>
        {sent ? (
          <div style={{ border: `1px solid ${T.gold}`, padding: 28, color: T.goldLight, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic" }}>
            Thank you. We will be in touch shortly.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 380 }}>
            {[["First Name","James"],["Email","james@familyoffice.com"],["Organisation","Vantage Family Office"],["Investment Appetite","e.g. $5M–$25M"]].map(([l, p]) => (
              <div key={l}>
                <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginBottom: 6 }}>{l}</div>
                <input placeholder={p} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "11px 14px", fontSize: 13, outline: "none" }}
                  onFocus={e => e.target.style.borderColor = T.gold}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
            ))}
            <button onClick={() => setSent(true)} style={{ background: T.gold, color: "white", border: "none", padding: 15, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", marginTop: 8, transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#a67c00"}
              onMouseLeave={e => e.currentTarget.style.background = T.gold}>
              Request Introduction
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: T.ink, padding: "60px 60px 36px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 52, marginBottom: 52, paddingBottom: 52, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "white", letterSpacing: "0.1em", marginBottom: 4 }}>Maitri Capital</div>
        <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, marginBottom: 16 }}>Hospitality Investment</div>
        <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.32)", maxWidth: 240 }}>Curating extraordinary hospitality investments for discerning investors worldwide since 2016.</p>
      </div>
      {[["Portfolio",["Safari Lodges","Coastal Resorts","Mountain Retreats","Desert Sanctuaries"]],
        ["Firm",["About Maitri","Investment Philosophy","Our Team","Investor Relations"]],
        ["Connect",["Nairobi HQ","London Office","Singapore Office","investor@maitricapital.com"]]
      ].map(([title, links]) => (
        <div key={title}>
          <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, marginBottom: 20 }}>{title}</div>
          {links.map(l => <div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.36)", marginBottom: 10, letterSpacing: "0.03em" }}>{l}</div>)}
        </div>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>© 2026 Maitri Capital. All rights reserved.</div>
      <div style={{ display: "flex", gap: 24 }}>
        {["Privacy Policy","Terms of Use","Regulatory Disclosures"].map(l => (
          <span key={l} style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>{l}</span>
        ))}
      </div>
    </div>
  </footer>
);

// ─── LISTING DETAIL PAGE ──────────────────────────────────────────────────────
const ListingDetail = ({ listing, onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: T.cream, minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "70vh", minHeight: 500, overflow: "hidden" }}>
        <img src={listing.image} alt={listing.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.03)", animation: "heroZoom 12s ease-out forwards" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,31,38,0.85) 0%, rgba(26,31,38,0.2) 60%, transparent 100%)" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 100, left: 60, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 22px", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", backdropFilter: "blur(8px)", transition: "background 0.3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
          ← All Properties
        </button>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 60px 56px" }} className="fadeUp-1">
          <div style={{ display: "inline-block", fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold, border: `1px solid rgba(191,144,0,0.5)`, padding: "5px 12px", marginBottom: 14 }}>{listing.category} · {listing.status}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,6vw,76px)", fontWeight: 300, color: "white", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 10 }}>{listing.title}</h1>
          {listing.subtitle && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: T.goldLight }}>{listing.subtitle}</p>}
          <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 10 }}>{listing.location}</div>
        </div>
      </div>

      {/* Key Metrics Bar */}
      <div style={{ background: T.slateDark, display: "flex" }}>
        {[
          listing.investment && { label: "Investment", val: listing.investment },
          (listing.irr || listing.targetIrr) && { label: listing.irr ? "IRR" : "Target IRR", val: listing.irr || listing.targetIrr, gold: true },
          listing.rooms && { label: "Rooms / Keys", val: listing.rooms },
          listing.opening && { label: listing.status === "Development" ? "Opening" : "Opened", val: listing.opening },
        ].filter(Boolean).map((m, i, arr) => (
          <div key={i} style={{ flex: 1, padding: "28px 24px", textAlign: "center", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: m.gold ? T.gold : "white", lineHeight: 1 }}>{m.val}</div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 7 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "90px 60px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 90, maxWidth: 1300, margin: "0 auto" }}>
        <div>
          <Eyebrow>Overview</Eyebrow>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: T.ink, marginBottom: 28, lineHeight: 1.1 }}>The Investment Case</h2>
          <p style={{ fontSize: 15, lineHeight: 2, color: T.inkSoft, letterSpacing: "0.02em", marginBottom: 48 }}>{listing.description}</p>

          {listing.galleryImages?.length > 0 && (
            <>
              <div style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: T.gold, marginBottom: 20 }}>Gallery</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                {listing.galleryImages.map((img, i) => (
                  <img key={i} src={img} alt="" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          {/* Highlights */}
          {listing.highlights?.length > 0 && (
            <div style={{ background: T.warmWhite, padding: 36, marginBottom: 28, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: 22 }}>Key Highlights</div>
              {listing.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 14, marginBottom: 14, borderBottom: i < listing.highlights.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ width: 6, height: 6, background: T.gold, borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.65 }}>{h}</div>
                </div>
              ))}
            </div>
          )}
          {/* CTA */}
          <div style={{ background: T.slateDark, padding: 36 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, color: "white", marginBottom: 12, lineHeight: 1.2 }}>Request Investment Memo</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 28 }}>Access full financials, legal structure, and operator agreements.</p>
            <button style={{ width: "100%", background: T.gold, border: "none", color: "white", padding: 16, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
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
const CATS = ["Safari","Coastal","Mountain","Desert","Urban","Island"];
const STATUSES = ["Operating","Development","Stabilising","Divested"];

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
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [hlInput, setHlInput] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addHighlight = () => {
    if (hlInput.trim()) { set("highlights", [...(form.highlights || []), hlInput.trim()]); setHlInput(""); }
  };
  const removeHighlight = (i) => set("highlights", form.highlights.filter((_, j) => j !== i));

  return (
    <div style={{ background: "white", border: `1px solid ${T.border}`, padding: 40, borderTop: `3px solid ${T.gold}` }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: T.ink, marginBottom: 32 }}>
        {initial?.id ? "Edit Listing" : "New Listing"}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
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
  const [editing, setEditing] = useState(null); // null | "new" | listing
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
      <div style={{ background: T.slateDark, padding: "0 56px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${T.gold}` }}>
        <div style={{ padding: "20px 0" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "white", letterSpacing: "0.1em" }}>Maitri Capital</div>
          <div style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold }}>Admin Dashboard</div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>{listings.length} Listings</div>
          <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", padding: "8px 20px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer" }}>Sign Out</button>
        </div>
      </div>

      <div style={{ padding: "56px 56px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: T.ink }}>
              Investment <em style={{ fontStyle: "italic", color: T.slate }}>Listings</em>
            </h1>
            <p style={{ fontSize: 13, color: T.slateLight, marginTop: 6 }}>Create, edit, and manage portfolio properties</p>
          </div>
          {!editing && (
            <button onClick={() => setEditing("new")} style={{ background: T.gold, color: "white", border: "none", padding: "14px 32px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              + Add New Listing
            </button>
          )}
        </div>

        {/* Form */}
        {editing && (
          <div style={{ marginBottom: 44 }}>
            <ListingForm
              initial={editing === "new" ? EMPTY : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}

        {/* Table */}
        <div style={{ border: `1px solid ${T.border}`, overflow: "hidden" }}>
          {/* Table Header */}
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.2fr 1fr 1fr 1fr 140px", background: T.slateDark, padding: "13px 20px" }}>
            {["Property","Location","Category","Investment","Status","Actions"].map(h => (
              <div key={h} style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{h}</div>
            ))}
          </div>

          {listings.length === 0 && (
            <div style={{ padding: "56px 20px", textAlign: "center", color: T.slateLight, fontStyle: "italic" }}>No listings yet. Add your first property above.</div>
          )}

          {listings.map((l, i) => (
            <div key={l.id}>
              {delConfirm === l.id && (
                <div style={{ background: "#fff5f5", borderBottom: `1px solid #fcc`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 13, color: T.ink }}>Delete <strong>{l.title}</strong>? This cannot be undone.</span>
                  <button onClick={() => handleDelete(l.id)} style={{ background: "#c00", color: "white", border: "none", padding: "7px 18px", fontSize: 11, cursor: "pointer" }}>Delete</button>
                  <button onClick={() => setDelConfirm(null)} style={{ background: "none", border: `1px solid ${T.border}`, padding: "7px 18px", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.2fr 1fr 1fr 1fr 140px", padding: "16px 20px", alignItems: "center", borderBottom: i < listings.length - 1 ? `1px solid ${T.border}` : "none", background: i % 2 === 0 ? "white" : T.cream, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.warmWhite}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "white" : T.cream}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img src={l.image} alt="" style={{ width: 52, height: 40, objectFit: "cover", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
                  <div>
                    <div style={{ fontSize: 13, color: T.ink, fontWeight: 400, lineHeight: 1.3 }}>{l.title}</div>
                    {l.featured && <div style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, marginTop: 3 }}>Featured</div>}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: T.slateLight }}>{l.location}</div>
                <div style={{ fontSize: 12, color: T.inkSoft }}>{l.category}</div>
                <div style={{ fontSize: 12, color: T.inkSoft }}>{l.investment || "—"}</div>
                <div>
                  <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 10px",
                    background: l.status === "Operating" ? "rgba(0,150,80,0.1)" : l.status === "Development" ? T.goldMuted : "rgba(68,84,106,0.1)",
                    color: l.status === "Operating" ? "#007a40" : l.status === "Development" ? T.gold : T.slate,
                  }}>{l.status}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setEditing(l)} style={{ background: "none", border: `1px solid ${T.border}`, color: T.slate, padding: "6px 14px", fontSize: 10, cursor: "pointer", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.slate; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = T.slate; }}>
                    Edit
                  </button>
                  <button onClick={() => setDelConfirm(l.id)} style={{ background: "none", border: "1px solid rgba(200,0,0,0.2)", color: "#c00", padding: "6px 10px", fontSize: 10, cursor: "pointer", transition: "all 0.2s" }}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, marginTop: 28, background: T.border }}>
          {[
            { label: "Total Listings", val: listings.length },
            { label: "Operating", val: listings.filter(l => l.status === "Operating").length },
            { label: "In Development", val: listings.filter(l => l.status === "Development").length },
            { label: "Featured", val: listings.filter(l => l.featured).length },
          ].map(s => (
            <div key={s.label} style={{ background: T.warmWhite, padding: "22px 28px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, color: T.gold }}>{s.val}</div>
              <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: T.slateLight, marginTop: 5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PUBLIC SITE ──────────────────────────────────────────────────────────────
const PublicSite = ({ listings, onSelectListing, onAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div>
      <Nav scrolled={scrolled} onAdmin={onAdmin} onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })} adminMode={false} />
      <Hero onExplore={() => portfolioRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <StatsBar listings={listings} />
      <div ref={portfolioRef}>
        <PortfolioSection listings={listings} onSelect={onSelectListing} />
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
  // view: "public" | "detail" | "admin-login" | "admin"
  const [view, setView] = useState("public");
  const [selectedListing, setSelectedListing] = useState(null);
  const [adminAuth, setAdminAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: T.slateDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: T.gold, letterSpacing: "0.2em" }}>Maitri Capital</div>
    </div>
  );

  // ── Admin flow ──
  if (view === "admin-login") return (
    <>
      <GlobalStyles />
      <AdminLogin onSuccess={() => { setAdminAuth(true); setView("admin"); }} />
    </>
  );

  if (view === "admin") return (
    <>
      <GlobalStyles />
      <AdminDashboard
        listings={listings}
        onSave={save}
        onLogout={() => { setAdminAuth(false); setView("public"); }}
      />
    </>
  );

  // ── Detail page ──
  if (view === "detail" && selectedListing) return (
    <>
      <GlobalStyles />
      <Nav scrolled={scrolled} onAdmin={() => setView(adminAuth ? "admin" : "admin-login")} onHome={() => { setView("public"); window.scrollTo(0, 0); }} adminMode={false} />
      <ListingDetail listing={selectedListing} onBack={() => { setView("public"); setTimeout(() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }), 100); }} />
      <Footer />
    </>
  );

  // ── Public site ──
  return (
    <>
      <GlobalStyles />
      <PublicSite
        listings={listings}
        onSelectListing={(l) => { setSelectedListing(l); setView("detail"); window.scrollTo(0, 0); }}
        onAdmin={() => setView(adminAuth ? "admin" : "admin-login")}
      />
    </>
  );
}
