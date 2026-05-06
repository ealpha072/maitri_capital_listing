import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";

const Footer = () => {
  const { isMobile, isTablet } = useResponsive();

  const footerLinks = [
    {
      title: "Portfolio",
      links: [
        { label: "Safari Lodge", href: "" },
        { label: "Coastal Resorts", href: "" },
        { label: "Urban Hotels", href: "" },
      ],
    },
    {
      title: "Firm",
      links: [
        { label: "About Maitri", href: "https://www.maitricapital.com" },
        { label: "Our Team", href: "https://www.maitricapital.com/team" },
        { label: "Our Services", href: "https://www.maitricapital.com/coreservices" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Nairobi HQ", href: "https://maps.app.goo.gl/qkU2QLs8B2QdPdUH7" },
        { label: "investor@maitricapital.com", href: "mailto:investor@maitricapital.com" },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: T.ink,
        padding: isMobile ? "48px 24px 28px" : isTablet ? "52px 32px 32px" : "60px 60px 36px"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? 36 : 40,
          marginBottom: 44,
          paddingBottom: 44,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              color: "white",
              letterSpacing: "0.1em",
              marginBottom: 4
            }}
          >
            Maitri Capital
          </div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: T.gold,
              marginBottom: 14
            }}
          >
            Hospitality Investment
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.32)",
              maxWidth: 240
            }}
          >
            Curating extraordinary hospitality investments for discerning investors worldwide since 2016.
          </p>
        </div>

        {footerLinks.map(({ title, links }) => (
          <div key={title}>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: 18
              }}
            >
              {title}
            </div>
            {links.map(({ label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.36)",
                    marginBottom: 9,
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    transition: "color 0.3s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.36)")}
                >
                  {label}
                </a>
              ) : (
                <div
                  key={label}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.36)",
                    marginBottom: 9,
                    letterSpacing: "0.03em"
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: 12
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.1em"
          }}
        >
          © 2026 Maitri Capital. All rights reserved.
        </div>
        <div
          style={{
            display: "flex",
            gap: isMobile ? 16 : 24,
            flexWrap: "wrap"
          }}
        >
          {["Privacy Policy", "Terms of Use"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.08em"
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
