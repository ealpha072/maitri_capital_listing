import { useState } from "react";
import emailjs from "@emailjs/browser";
import contact_section_banner from "../assets/contact_section_banner.avif";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";
import { Eyebrow } from "./Eyebrow";

const ContactSection = () => {
  const { isMobile, isTablet } = useResponsive();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", organisation: "", appetite: "" });
  const setField = (k, v) => setFields((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!fields.firstName || !fields.email) {
      setError("Please fill in your name and email.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        "service_mkj0mmi",
        "template_1c2q8i6",
        {
          from_name: `${fields.firstName} ${fields.lastName}`,
          from_email: fields.email,
          organisation: fields.organisation,
          appetite: fields.appetite,
          to_email: "ealpha072@gmail.com",
        },
        "gKyFyznUSIuJksJ36"
      );
      setSent(true);
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    padding: "11px 14px",
    fontSize: 13,
    outline: "none",
  };

  return (
    <section
      id="contact"
      style={{
        background: T.slateDark,
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
        minHeight: isTablet ? "auto" : 560,
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: isTablet ? (isMobile ? 220 : 300) : "auto"
        }}
      >
        <img
          src={contact_section_banner}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.65)",
            display: "block"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isTablet ? "linear-gradient(to bottom,transparent,rgba(44,58,74,0.7))" :
            "linear-gradient(to right,transparent,rgba(44,58,74,0.55))"
          }}
        />
      </div>

      <div
        style={{
          padding: isMobile ? "52px 24px" :
          isTablet ? "60px 40px" : "80px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Eyebrow>Join Us</Eyebrow>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px,4vw,50px)",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 18
          }}
        >
          Begin the <em style={{ fontStyle: "italic", color: T.goldLight }}>Conversation</em>
        </h2>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.48)",
            marginBottom: 36,
            letterSpacing: "0.02em"
          }}
        >
          Maitri Capital works with a select group of family offices, institutions, and high-net-worth individuals who share our conviction that exceptional hospitality assets represent one of the world's most compelling investment opportunities.
        </p>

        {sent ?
          (
            <div
              style={{
                border: `1px solid ${T.gold}`,
                padding: 28,
                color: T.goldLight,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20, fontStyle: "italic"
              }}
            >
              Thank you. We will be in touch shortly.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                maxWidth: 420
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 14
                }}
              >
                {[["First Name", "firstName", "James"], ["Last Name", "lastName", "Whitmore"]].map(([l, k, p]) => (
                  <div key={k}>
                    <div
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.32)",
                        marginBottom: 6
                      }}
                    >
                      {l}
                    </div>
                    <input
                      value={fields[k]}
                      onChange={(e) => setField(k, e.target.value)}
                      placeholder={p}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = T.gold)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      required
                    />
                  </div>
                ))}
              </div>
              {[["Email", "email", "james@familyoffice.com"], ["Organisation", "organisation", "Vantage Family Office"], ["Investment Appetite", "appetite", "e.g. $5M–$25M"]].map(([l, k, p]) => (
                <div key={k}>
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.32)",
                      marginBottom: 6
                    }}
                  >
                    {l}
                  </div>
                  <input
                    value={fields[k]}
                    onChange={(e) => setField(k, e.target.value)}
                    placeholder={p}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = T.gold)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              ))}
              {error &&
                <div
                  style={{
                    fontSize: 12,
                    color: "#e05050",
                    letterSpacing: "0.05em"
                  }}
                >
                  {error}
                </div>}
              <button
                onClick={handleSubmit}
                disabled={sending}
                style={{
                  background: sending ? "#a67c00" : T.gold,
                  color: "white",
                  border: "none",
                  padding: 15,
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  cursor: sending ? "not-allowed" : "pointer",
                  marginTop: 8,
                  transition: "background 0.3s",
                  opacity: sending ? 0.8 : 1
                }}
                onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = "#a67c00"; }}
                onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = T.gold; }}
              >
                {sending ? "Sending..." : "Request Introduction"}
              </button>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default ContactSection;
