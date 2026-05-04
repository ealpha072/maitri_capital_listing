import { useState } from "react";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";
import { EMPTY } from "./adminConstants";
import ListingForm from "./ListingForm";
 
const AdminDashboard = ({ listings, onSave, onLogout }) => {
  const { isMobile, isTablet } = useResponsive();
  const [editing, setEditing] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
 
  const handleSave = (form) => {
    const isNew = !form.id || form.id === "";
    const entry = isNew ? { ...form, id: Date.now().toString() } : form;
    const next = isNew ? [...listings, entry] : listings.map((l) => (l.id === entry.id ? entry : l));
    onSave(next);
    setEditing(null);
  };
 
  const handleDelete = (id) => {
    onSave(listings.filter((l) => l.id !== id));
    setDelConfirm(null);
  };
 
  const summaryStats = [
    { label: "Total Listings",  val: listings.length },
    { label: "Operating",       val: listings.filter((l) => l.status === "Operating").length },
    { label: "In Development",  val: listings.filter((l) => l.status === "Development").length },
    { label: "Featured",        val: listings.filter((l) => l.featured).length },
  ];
 
  const tableColumns = isMobile
    ? "minmax(180px,2fr) minmax(80px,1fr) 110px"
    : "2.5fr 1.2fr 1fr 1fr 1fr 130px";
 
  const tableHeaders = isMobile
    ? ["Property", "Status", "Actions"]
    : ["Property", "Location", "Category", "Investment", "Status", "Actions"];
 
  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
 
      {/* Admin Nav */}
      <div style={{ background: T.slateDark, padding: `0 ${isMobile ? "20px" : "56px"}`, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${T.gold}` }}>
        <div style={{ padding: "18px 0" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 18 : 22, color: "white", letterSpacing: "0.1em" }}>
            Maitri Capital
          </div>
          <div style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: T.gold }}>
            Admin Dashboard
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {!isMobile && (
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>
              {listings.length} Listings
            </div>
          )}
          <button
            onClick={onLogout}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", padding: "7px 16px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Sign Out
          </button>
        </div>
      </div>
 
      <div style={{ padding: isMobile ? "32px 20px" : isTablet ? "40px 32px" : "52px 56px" }}>
 
        {/* Header */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: 36, gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 42, fontWeight: 300, color: T.ink }}>
              Investment <em style={{ fontStyle: "italic", color: T.slate }}>Listings</em>
            </h1>
            <p style={{ fontSize: 13, color: T.slateLight, marginTop: 5 }}>
              Create, edit, and manage portfolio properties
            </p>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing("new")}
              style={{ background: T.gold, color: "white", border: "none", padding: "13px 28px", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              + Add New Listing
            </button>
          )}
        </div>
 
        {/* Form */}
        {editing && (
          <div style={{ marginBottom: 40 }}>
            <ListingForm
              initial={editing === "new" ? EMPTY : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}
 
        {/* Table */}
        <div className="admin-table-wrap" style={{ border: `1px solid ${T.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: tableColumns, background: T.slateDark, padding: "12px 16px", minWidth: isMobile ? 400 : "auto" }}>
            {tableHeaders.map((h) => (
              <div key={h} style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                {h}
              </div>
            ))}
          </div>
 
          {listings.length === 0 && (
            <div style={{ padding: "48px 16px", textAlign: "center", color: T.slateLight, fontStyle: "italic" }}>
              No listings yet. Add your first property above.
            </div>
          )}
 
          {listings.map((l, i) => (
            <div key={l.id}>
              {delConfirm === l.id && (
                <div style={{ background: "#fff5f5", borderBottom: "1px solid #fcc", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: T.ink }}>
                    Delete <strong>{l.title}</strong>? This cannot be undone.
                  </span>
                  <button onClick={() => handleDelete(l.id)} style={{ background: "#c00", color: "white", border: "none", padding: "6px 16px", fontSize: 11, cursor: "pointer" }}>
                    Delete
                  </button>
                  <button onClick={() => setDelConfirm(null)} style={{ background: "none", border: `1px solid ${T.border}`, padding: "6px 14px", fontSize: 11, cursor: "pointer" }}>
                    Cancel
                  </button>
                </div>
              )}
 
              <div
                style={{ display: "grid", gridTemplateColumns: tableColumns, padding: "14px 16px", alignItems: "center", borderBottom: i < listings.length - 1 ? `1px solid ${T.border}` : "none", background: i % 2 === 0 ? "white" : T.cream, minWidth: isMobile ? 400 : "auto", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.warmWhite)}
                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "white" : T.cream)}
              >
                {/* Property */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={l.image} alt="" style={{ width: 44, height: 34, objectFit: "cover", flexShrink: 0 }} onError={(e) => (e.target.style.display = "none")} />
                  <div>
                    <div style={{ fontSize: 12, color: T.ink, fontWeight: 400, lineHeight: 1.3 }}>{l.title}</div>
                    {l.featured && <div style={{ fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: T.gold, marginTop: 2 }}>Featured</div>}
                    {isMobile && <div style={{ fontSize: 11, color: T.slateLight, marginTop: 2 }}>{l.location}</div>}
                  </div>
                </div>
 
                {!isMobile && <div style={{ fontSize: 12, color: T.slateLight }}>{l.location}</div>}
                {!isMobile && <div style={{ fontSize: 12, color: T.inkSoft }}>{l.category}</div>}
                {!isMobile && <div style={{ fontSize: 12, color: T.inkSoft }}>{l.investment || "—"}</div>}
 
                {/* Status badge */}
                <div>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 8px",
                    background: l.status === "Operating" ? "rgba(0,150,80,0.1)" : l.status === "Development" ? T.goldMuted : "rgba(68,84,106,0.1)",
                    color: l.status === "Operating" ? "#007a40" : l.status === "Development" ? T.gold : T.slate,
                  }}>
                    {isMobile ? l.status.slice(0, 3) : l.status}
                  </span>
                </div>
 
                {/* Actions */}
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => setEditing(l)}
                    style={{ background: "none", border: `1px solid ${T.border}`, color: T.slate, padding: "5px 12px", fontSize: 10, cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = T.slate; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = T.slate; }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDelConfirm(l.id)}
                    style={{ background: "none", border: "1px solid rgba(200,0,0,0.2)", color: "#c00", padding: "5px 9px", fontSize: 10, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#c00"; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#c00"; }}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 1, marginTop: 24, background: T.border }}>
          {summaryStats.map((s) => (
            <div key={s.label} style={{ background: T.warmWhite, padding: "20px 24px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, color: T.gold }}>{s.val}</div>
              <div style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: T.slateLight, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
 
      </div>
    </div>
  );
};
 
export default AdminDashboard;