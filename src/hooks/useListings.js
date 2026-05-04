import { useState, useEffect, useCallback } from "react";
import DEFAULT_LISTINGS from "../components/Property_Listings";

export const useListings = () => {
  const [listings, setListings] = useState(DEFAULT_LISTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("maitri_listings");
        if (res?.value) {
          const stored = JSON.parse(res.value);
          const storedIds = new Set(stored.map((l) => l.id));
          const newDefaults = DEFAULT_LISTINGS.filter((l) => !storedIds.has(l.id));
          const merged = [...stored, ...newDefaults];
          if (newDefaults.length > 0) {
            await window.storage.set("maitri_listings", JSON.stringify(merged));
          }
          setListings(merged);
        } else {
          setListings(DEFAULT_LISTINGS);
        }
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  const save = useCallback(async (next) => {
    setListings(next);
    try {
      await window.storage.set("maitri_listings", JSON.stringify(next));
    } catch (_) {}
  }, []);

  return { listings, save, loaded };
};
