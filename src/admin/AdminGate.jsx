import { useState } from "react";
import { useListingsContext } from "../context/ListingsContext";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

// ─── ADMIN GATE ───────────────────────────────────────────────────────────────
const AdminGate = () => {
  const { listings, save:onSave } = useListingsContext();
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  if (!auth) return <AdminLogin onSuccess={() => setAuth(true)} />;

  return (
    <AdminDashboard
      listings={listings}
      onSave={onSave}
      onLogout={() => { setAuth(false); navigate("/maitri_capital_listing"); }}
    />
  );
};

export default AdminGate;