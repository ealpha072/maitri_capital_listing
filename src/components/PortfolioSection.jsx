import { useState } from "react";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";
import { Eyebrow } from "./Eyebrow";

export const Card = ({ listing, onClick, featured, cols = 3 }) => {
  const {isMobile, isTablet} = useResponsive()
  const [hov, setHov] = useState(isMobile || isTablet);
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
          width: "100%",
          height: featured ? (cols === 1 ? 320 : 520) : 300,
          objectFit: "cover",
          display: "block",
          transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hov ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hov
            ? "linear-gradient(to top, rgba(26,31,38,0.92) 0%, rgba(26,31,38,0.3) 55%, rgba(191,144,0,0.04) 100%)"
            : "linear-gradient(to top, rgba(26,31,38,0.88) 0%, rgba(26,31,38,0.1) 50%, transparent 80%)",
          transition: "background 0.5s",
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
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: cols === 1 ? 24 : 34
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 8,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: T.gold,
            border: "1px solid rgba(191,144,0,0.5)",
            padding: "5px 12px",
            marginBottom: 12
          }}
        >
          {listing.category}{listing.featured ? " · Featured" : ""}
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: featured ? (cols === 1 ? 28 : 42) : 24,
            fontWeight: 300,
            color: "white",
            lineHeight: 1.15,
            marginBottom: 6
          }}
        >
          {listing.title}
        </h3>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)", marginBottom: 18
          }}
        >
          {listing.location}
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            opacity: hov ? 1 : 0,
            transform: hov ? "none" : "translateY(8px)",
            transition: "all 0.35s ease",
          }}
        >
          {listing.investment && (
            <div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)"
                }}
              >
                Investment
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "white",
                  marginTop: 3
                }}
              >
                Price on Application
              </div>
            </div>
          )}
          
          {listing.rooms && (
            <div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)"
                }}
              >
                Rooms/Keys
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: T.goldLight,
                  marginTop: 3
                }}
              >
                {listing.rooms}
              </div>
            </div>
          )}
          <div>
            <div
              style={{
                fontSize: 8,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.32)"
              }}
            >
              Status
            </div>
            <div
              style={{
                fontSize: 13,
                color: "white",
                marginTop: 3
              }}
            >
              {listing.status}
            </div>
          </div>
          {listing.deal && (
            <div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)"
                }}
              >
                Deal Structure/Type
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "white",
                  marginTop: 3
                }}
              >
                {listing.deal}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({ listings, onSelect }) => {
  const { isMobile, isTablet } = useResponsive();
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(listings.map((l) => l.category)))];
  const filtered = filter === "All" ? listings : listings.filter((l) => l.category === filter);
  const featured = filtered.find((l) => l.featured) || filtered[0];
  const rest = filtered.filter((l) => l.id !== featured?.id);
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section
      id="portfolio"
      style={{
        padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 60px",
        background: T.cream
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          marginBottom: isMobile ? 36 : 56,
          gap: 20
        }}
      >
        <div>
          <Eyebrow>Current Portfolio</Eyebrow>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px,5vw,62px)",
              fontWeight: 300,
              color: T.ink,
              letterSpacing: "-0.01em"
            }}
          >
            Active <em style={{ fontStyle: "italic", color: T.slate }}>Opportunities</em>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap"
          }}
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: `1px solid ${filter === c ? T.slateDark : T.border}`,
                padding: isMobile ? "7px 12px" : "9px 18px", cursor: "pointer",
                background: filter === c ? T.slateDark : "transparent",
                color: filter === c ? "white" : T.slate, transition: "all 0.3s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {featured && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols},1fr)`,
            gap: 2
          }}
        >
          <Card
            listing={featured}
            onClick={onSelect}
            featured
            cols={cols}
          />
          {rest.map((l) => (
            <Card
              key={l.id}
              listing={l}
              onClick={onSelect}
              cols={cols}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
