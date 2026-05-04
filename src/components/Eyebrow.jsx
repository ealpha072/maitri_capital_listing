import { T } from "../utils/theme";

export const Eyebrow = ({ children, center = false }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 18,
      justifyContent: center ? "center" : "flex-start",
    }}
  >
    {!center && <div style={{ width: 32, height: 1, background: T.gold }} />}
    <span
      style={{
        fontSize: 9,
        letterSpacing: "0.42em",
        textTransform: "uppercase",
        color: T.gold,
        fontWeight: 400,
      }}
    >
      {children}
    </span>
  </div>
);
