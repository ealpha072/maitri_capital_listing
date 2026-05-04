import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toSlug } from "../utils/theme";
import { T } from "../utils/theme";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import PortfolioSection from "../components/PortfolioSection";
import { PhilosophySection, ProcessSection, Testimonial } from "../components/Sections";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ListingDetail from "../components/ListingDetail";

export const PublicSite = ({ listings }) => {
  const navigate = useNavigate();
  const portfolioRef = useRef(null);

  return (
    <div>
      <Nav
        onAdmin={() => navigate("/admin")}
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        adminMode={false}
      />
      <Hero onExplore={() => portfolioRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <StatsBar listings={listings} />
      <div ref={portfolioRef}>
        <PortfolioSection
          listings={listings}
          onSelect={(l) => navigate(`/maitri_capital_listing/${toSlug(l.title)}`)}
        />
      </div>
      <PhilosophySection />
      <ProcessSection />
      <Testimonial />
      <ContactSection />
      <Footer />
    </div>
  );
};

export const ListingDetailPage = ({ listings }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const listing = listings.find((l) => toSlug(l.title) === slug);

  if (!listing) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: T.cream, gap: 20 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, color: T.ink }}>Property not found</div>
        <button
          onClick={() => navigate("/")}
          style={{ background: T.gold, color: "white", border: "none", padding: "12px 32px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <>
      <Nav onAdmin={() => navigate("/admin")} onHome={() => navigate("/")} adminMode={false} />
      <ListingDetail
        listing={listing}
        onBack={() => {
          navigate("/maitri_capital_listing");
          setTimeout(() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }), 100);
        }}
      />
      <Footer />
    </>
  );
};
