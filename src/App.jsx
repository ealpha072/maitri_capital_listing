import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import { PublicSite, ListingDetailPage } from "./pages/PublicSite";
import AdminGate from "./admin/AdminGate";
import { useListings } from "./hooks/useListings";
import { T } from "./utils/theme";

export default function App() {
  const { listings, save, loaded } = useListings();

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: T.slateDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: T.gold, letterSpacing: "0.2em" }}>
          Maitri Capital
        </div>
      </div>
    );
  }

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
