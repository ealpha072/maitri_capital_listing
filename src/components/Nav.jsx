import { useState, useEffect } from "react";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";

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
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 200,
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
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
            Opportunities Portfolio
          </div>
        </button>

        {/* Desktop links */}
        {!isTablet && (
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 36 
            }}
          >
            {["Portfolio", "Philosophy", "Process", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{ 
                  fontSize: 11, 
                  letterSpacing: "0.24em", 
                  textTransform: "uppercase", 
                  color: textColor, 
                  textDecoration: "none", 
                  transition: "color 0.3s" 
                }}
                onMouseEnter={(e) => (e.target.style.color = T.gold)}
                onMouseLeave={(e) => (e.target.style.color = textColor)}
              >
                {l}
              </a>
            ))}
            {/* 
            // UNCOMMENT TO ENABLE ADMIN PANEL
            <button
              onClick={onAdmin}
              style={{ 
                fontSize: 10, 
                letterSpacing: "0.28em", 
                textTransform: "uppercase", 
                color: adminMode ? "white" : T.gold, 
                border: `1px solid ${T.gold}`, 
                background: adminMode ? T.gold : "transparent", 
                padding: "9px 22px", 
                cursor: "pointer", 
                transition: "all 0.3s" 
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.gold; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = adminMode ? T.gold : "transparent"; e.currentTarget.style.color = adminMode ? "white" : T.gold; }}
            >
              {adminMode ? "← Public View" : "Admin"}
            </button>
            */}
          </div>
        )}

        {/* Hamburger */}
        {isTablet && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{ 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              display: "flex", 
              flexDirection: "column", 
              gap: 5, 
              padding: 4, 
              color: scrolled || menuOpen ? T.slateDark : "white" 
            }}
          >
            <span 
              className="hamburger-line" 
              style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span 
              className="hamburger-line" 
              style={{ opacity: menuOpen ? 0 : 1 }} 
            />
            <span 
              className="hamburger-line" 
              style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} 
            />
          </button>
        )}
      </nav>

      {/* Mobile menu drawer */}
      {isTablet && menuOpen && (
        <div 
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 199, 
            background: "rgba(250,248,244,0.98)", 
            backdropFilter: "blur(16px)", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 8 
          }}
        >
          {["Portfolio", "Philosophy", "Process", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ 
                fontSize: 13, 
                letterSpacing: "0.3em", 
                textTransform: "uppercase", 
                color: T.slate, 
                textDecoration: "none", 
                padding: "16px 40px", 
                display: "block" 
              }}
            >
              {l}
            </a>
          ))}
          <div 
            style={{ 
              width: 40, 
              height: 1, 
              background: T.border, 
              margin: "12px 0" 
            }} 
          />
          <button
            onClick={() => { onAdmin(); setMenuOpen(false); }}
            style={{ 
              fontSize: 10, 
              letterSpacing: "0.28em", 
              textTransform: "uppercase", 
              color: T.gold, 
              border: `1px solid ${T.gold}`, 
              background: "transparent", 
              padding: "12px 32px", 
              cursor: "pointer" 
            }}
          >
            {adminMode ? "← Public View" : "Admin"}
          </button>
        </div>
      )}
    </>
  );
};

export default Nav;