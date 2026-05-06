import { T } from "../utils/theme";

export const ADMIN_PIN = "maitri2024";

export const EMPTY = {
  id: "",
  title: "",
  subtitle: "",
  location: "",
  category: "Safari",
  status: "Operating",
  investment: "",
  irr: "",
  targetIrr: "",
  rooms: "",
  opening: "",
  featured: false,
  description: "",
  highlights: [],
  image: "",
  galleryImages: [],
};

export const CATS = ["Safari", "Coastal", "Mountain", "Desert", "Urban", "Island"];
export const STATUSES = ["Operating", "Development", "Stabilising", "Divested"];

export const Field = ({ label, children }) => (
  <div style={{ marginBottom: 18 }}>
    <div
      style={{
        fontSize: 9,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: T.slateLight,
        marginBottom: 7
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

export const inp = (extra = {}) => ({
  style: {
    width: "100%",
    background: T.warmWhite,
    border: `1px solid ${T.border}`,
    color: T.ink,
    padding: "10px 13px",
    fontSize: 13,
    outline: "none",
    fontFamily: "'Jost', sans-serif", ...extra.style,
  },
  onFocus: (e) => (e.target.style.borderColor = T.gold),
  onBlur: (e) => (e.target.style.borderColor = T.border),
  ...extra,
});