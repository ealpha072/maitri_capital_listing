import { useState } from "react";
import { T } from "../utils/theme";
import { ADMIN_PIN } from "./adminConstants";
 
const AdminLogin = ({ onSuccess }) => {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);
 
  const submit = () => {
    if (pin === ADMIN_PIN) { onSuccess(); setErr(false); }
    else { setErr(true); setPin(""); }
  };
 
  return (
    <div style={{ minHeight: "100vh", background: T.slateDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 380, padding: 56, border: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "white", marginBottom: 6, letterSpacing: "0.06em" }}>
          Maitri Capital
        </div>
        <div style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: 40 }}>
          Admin Access
        </div>
        <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
          Access PIN
        </div>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="••••••••"
          style={{
            width: "100%", background: "rgba(255,255,255,0.06)",
            border: `1px solid ${err ? "#e05" : "rgba(255,255,255,0.1)"}`,
            color: "white", padding: "13px 16px", fontSize: 14, outline: "none", marginBottom: 8,
          }}
        />
        {err && (
          <div style={{ fontSize: 11, color: "#e05", marginBottom: 16, letterSpacing: "0.1em" }}>
            Incorrect PIN. Please try again.
          </div>
        )}
        <button
          onClick={submit}
          style={{ width: "100%", background: T.gold, border: "none", color: "white", padding: 15, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", marginTop: 12, transition: "background 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#a67c00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.gold)}
        >
          Enter
        </button>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 20, textAlign: "center" }}>
          Demo PIN: maitri2024
        </div>
      </div>
    </div>
  );
};
 
export default AdminLogin;