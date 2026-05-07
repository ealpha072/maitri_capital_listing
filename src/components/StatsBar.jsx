import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";

const StatsBar = ({ listings }) => {
  const { isMobile } = useResponsive();
  const stats = [
    { num: `$50M+`, label: "Assets Under Advisory" },
    { num: listings.length, label: "Active Opportunities" },
    { num: "3+", label: "Property Types" },
    { num: "2", label: "Countries" },
  ];

  return (
    <div
      style={{
        background: T.slateDark,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
        borderBottom: "1px solid rgba(191,144,0,0.15)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            padding: isMobile ? "24px 16px" : "34px 20px",
            textAlign: "center",
            borderRight: isMobile
              ? i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none"
              : i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            borderBottom: isMobile && i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}
        >
          <div 
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: isMobile ? 30 : 38, 
              fontWeight: 300, 
              color: T.gold, lineHeight: 1 
            }}
          >
            {s.num}
          </div>
          <div 
            style={{ 
              fontSize: 8, 
              letterSpacing: "0.28em", 
              textTransform: "uppercase", 
              color: "rgba(255,255,255,0.38)", marginTop: 8 
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
