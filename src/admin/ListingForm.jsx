import { useState } from "react";
import { T } from "../utils/theme";
import { useResponsive } from "../hooks/useResponsive";
import { EMPTY, CATS, STATUSES, Field, inp } from "./adminConstants";
 
const ListingForm = ({ initial, onSave, onCancel }) => {
  const { isMobile } = useResponsive();
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [hlInput, setHlInput] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
 
  const addHighlight = () => {
    if (hlInput.trim()) {
      set("highlights", [...(form.highlights || []), hlInput.trim()]);
      setHlInput("");
    }
  };
  const removeHighlight = (i) => set("highlights", form.highlights.filter((_, j) => j !== i));
 
  return (
    <div style={{ background: "white", border: `1px solid ${T.border}`, padding: isMobile ? 24 : 40, borderTop: `3px solid ${T.gold}` }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: T.ink, marginBottom: 28 }}>
        {initial?.id ? "Edit Listing" : "New Listing"}
      </div>
 
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 28px" }}>
        <Field label="Property Title">
          <input {...inp()} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Asilia Serengeti Private Reserve" />
        </Field>
        <Field label="Subtitle / Tagline">
          <input {...inp()} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder="Where the wild never ends" />
        </Field>
        <Field label="Location">
          <input {...inp()} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Tanzania, East Africa" />
        </Field>
        <Field label="Category">
          <select {...inp()} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select {...inp()} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Investment Amount">
          <input {...inp()} value={form.investment} onChange={(e) => set("investment", e.target.value)} placeholder="$48M" />
        </Field>
        <Field label="Actual IRR (operating properties)">
          <input {...inp()} value={form.irr} onChange={(e) => set("irr", e.target.value)} placeholder="22.4%" />
        </Field>
        <Field label="Target IRR (development properties)">
          <input {...inp()} value={form.targetIrr} onChange={(e) => set("targetIrr", e.target.value)} placeholder="24.0%" />
        </Field>
        <Field label="Rooms / Keys">
          <input {...inp()} value={form.rooms} onChange={(e) => set("rooms", e.target.value)} placeholder="18 Tents" />
        </Field>
        <Field label="Opened / Opening Date">
          <input {...inp()} value={form.opening} onChange={(e) => set("opening", e.target.value)} placeholder="2021 or Q4 2026" />
        </Field>
      </div>
 
      <Field label="Hero Image URL">
        <input {...inp()} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://images.unsplash.com/..." />
        {form.image && (
          <img
            src={form.image}
            alt=""
            style={{ width: "100%", height: 180, objectFit: "cover", marginTop: 8, display: "block" }}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
      </Field>
 
      <Field label="Description">
        <textarea
          {...inp({ style: { minHeight: 110, resize: "vertical" } })}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Compelling investment narrative..."
        />
      </Field>
 
      <Field label="Key Highlights">
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input
            {...inp({ style: { flex: 1 } })}
            value={hlInput}
            onChange={(e) => setHlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
            placeholder="Add a highlight and press Enter"
          />
          <button
            onClick={addHighlight}
            style={{ background: T.slate, color: "white", border: "none", padding: "10px 18px", fontSize: 11, cursor: "pointer" }}
          >
            Add
          </button>
        </div>
        {(form.highlights || []).map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: T.warmWhite, marginBottom: 6, border: `1px solid ${T.border}` }}>
            <div style={{ width: 5, height: 5, background: T.gold, borderRadius: "50%" }} />
            <span style={{ flex: 1, fontSize: 13, color: T.inkSoft }}>{h}</span>
            <button onClick={() => removeHighlight(i)} style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
          </div>
        ))}
      </Field>
 
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <input
          type="checkbox"
          id="featured"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          style={{ width: 16, height: 16, accentColor: T.gold }}
        />
        <label htmlFor="featured" style={{ fontSize: 13, color: T.inkSoft, letterSpacing: "0.04em" }}>
          Feature this property (hero position in portfolio grid)
        </label>
      </div>
 
      <div style={{ display: "flex", gap: 14 }}>
        <button
          onClick={() => onSave(form)}
          style={{ background: T.gold, color: "white", border: "none", padding: "14px 36px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#a67c00")}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.gold)}
        >
          Save Listing
        </button>
        <button
          onClick={onCancel}
          style={{ background: "none", color: T.slate, border: `1px solid ${T.border}`, padding: "14px 28px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
 
export default ListingForm;