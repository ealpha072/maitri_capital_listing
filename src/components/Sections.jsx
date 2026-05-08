import { useState } from "react";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";
import { Eyebrow } from "./Eyebrow";

export const PhilosophySection = () => {
  const { isMobile, isTablet } = useResponsive();
  return (
    <section
      id="philosophy"
      style={{
        padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "110px 60px",
        background: T.warmWhite,
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
        gap: isTablet ? 48 : 90,
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          height: isMobile ? 300 : isTablet ? 420 : 540
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1611519847235-d4794ac1ee2b?q=80&w=1074&auto=format&fit=crop"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg,rgba(68,84,106,0.1),rgba(191,144,0,0.07))"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? -16 : -26,
            right: isMobile ? 16 : -26,
            width: isMobile ? 80 : 112,
            height: isMobile ? 80 : 112,
            background: T.gold,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 26 : 34,
              fontWeight: 300,
              color: "white",
              lineHeight: 1
            }}
          >
            10
          </div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginTop: 4
            }}
          >
            Years
          </div>
        </div>
      </div>

      <div style={{ paddingTop: isMobile ? 28 : 0 }}>
        <Eyebrow>Our Approach</Eyebrow>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4vw,58px)",
            fontWeight: 300,
            color: T.ink,
            lineHeight: 1.08,
            marginBottom: 22
          }}
        >
          Investing in the <em style={{ fontStyle: "italic", color: T.slate }}>Exceptional</em>
        </h2>
        <p
          style={{
            fontSize: isMobile ? 13 : 14,
            lineHeight: 2,
            color: T.inkSoft,
            marginBottom: 28,
            letterSpacing: "0.02em"
          }}
        >
          We believe the finest investments share a quality beyond financial return — a sense of place, of purpose, of meaning. Maitri Capital acquires and develops hospitality assets that stand apart.
        </p>
        {[
          ["01", "Location Primacy", "Irreplaceable land in the world's most sought-after destinations — protected by geography, regulation, and scarcity."],
          ["02", "Design Excellence", "Architecture and interiors that define a category — commissioning the world's most distinguished creative voices."],
          ["03", "Operational Mastery", "Partnering with best-in-class operators who share our uncompromising standards for guest experience."],
        ].map(([n, t, d]) => (
          <div
            key={n}
            style={{
              padding: "16px 0",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              gap: 18
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13, color: T.gold,
                minWidth: 24,
                marginTop: 2
              }}
            >
              {n}
            </span>
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: T.slateDark,
                  fontWeight: 400,
                   marginBottom: 4

                }}
              >
                {t}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: T.slateLight,
                  lineHeight: 1.75
                }}
              >
                {d}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const StepItem = ({ n, t, d, i, cols }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "40px 28px",
        borderRight: cols === 4 && i < 3 ? `1px solid ${T.border}` :
        cols === 2 && i % 2 === 0 ? `1px solid ${T.border}` : "none",
        borderBottom: cols === 2 && i < 2 ? `1px solid ${T.border}` :
        cols === 1 && i < 3 ? `1px solid ${T.border}` : "none",
        background: hov ? T.warmWhite : "transparent",
        transition: "background 0.3s",
        borderTop: `2px solid ${hov ? T.gold : "transparent"}`,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 52,
          fontWeight: 300,
          color: hov ? T.goldMuted : "rgba(191,144,0,0.1)",
          lineHeight: 1,
          marginBottom: 20,
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
          marginBottom: 10
        }}
      >
        {t}
      </div>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.8,
          color: T.slateLight
        }}
      >
        {d}
      </p>
    </div>
  );
};

export const ProcessSection = () => {
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? 1 : isTablet ? 2 : 4;
  const steps = [
    ["01", "Discovery", "We source off-market opportunities through our global network — often years before a formal process begins."],
    ["02", "Due Diligence", "A rigorous 90-day process: site, operator, market, legal, and financial analysis by our in-house team."],
    ["03", "Structuring", "We design investment structures aligning incentives across developers, operators, and investors."],
    ["04", "Transaction Execution", "We coordinate the final stages of the investment process — supporting negotiations, documentation, investor coordination, and closing to ensure seamless transaction completion.."],
  ];

  return (
    <section
      id="process"
      style={{
        padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 60px",
        background: T.cream
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: isMobile ? 40 : 64
        }}
      >
        <Eyebrow center>How We Work</Eyebrow>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,5vw,60px)",
            fontWeight: 300,
            color: T.ink
          }}
        >
          The <em style={{ fontStyle: "italic", color: T.slate }}>Investment</em> Journey
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols},1fr)`,
          border: `1px solid ${T.border}`
        }}
      >
        {steps.map(([n, t, d], i) => (
          <StepItem
            key={n}
            n={n}
            t={t}
            d={d}
            i={i}
            cols={cols}
          />
        ))}
      </div>
    </section>
  );
};

export const Testimonial = () => {
  const { isMobile } = useResponsive();
  return (
    <section
      style={{
        padding: isMobile ? "70px 24px" : "110px 60px",
        background: T.warmWhite,
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: isMobile ? 180 : 280,
          fontWeight: 300,
          color: "rgba(191,144,0,0.05)",
          lineHeight: 1,
          pointerEvents: "none"
        }}
      >
        "
      </div>
      <blockquote
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px,3vw,34px)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.6,
          color: T.slateDark,
          maxWidth: 800,
          margin: "0 auto 32px",
          position: "relative",
          zIndex: 1
        }}
      >
        "Maitri's ability to identify properties that transcend typical hospitality investment — where the asset itself is the story — is genuinely rare. Our returns have been exceptional, but the experience of owning these places is what endures."
      </blockquote>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: T.gold
        }}
      >
        James Whitmore
      </div>
      <div
        style={{
          fontSize: 12,
          color: T.slateLight,
          marginTop: 6,
          letterSpacing: "0.1em"
        }}
      >
        Managing Partner, Vantage Family Office · LP since 2018
      </div>
    </section>
  );
};