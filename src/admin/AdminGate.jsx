import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

// ─── ADMIN GATE ───────────────────────────────────────────────────────────────
const AdminGate = ({ listings, onSave }) => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  if (!auth) return <AdminLogin onSuccess={() => setAuth(true)} />;

  return (
    <AdminDashboard
      listings={listings}
      onSave={onSave}
      onLogout={() => { setAuth(false); navigate("/"); }}
    />
  );
};

export default AdminGate;
