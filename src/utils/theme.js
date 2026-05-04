export const T = {
  gold: "#BF9000", goldLight: "#D4AA33", goldMuted: "rgba(191,144,0,0.15)",
  slate: "#44546A", slateDark: "#2C3A4A", slateLight: "#6B7F96",
  cream: "#FAF8F4", warmWhite: "#F5F2EC", ink: "#1A1F26", inkSoft: "#3A4047",
  border: "rgba(191,144,0,0.22)",
};

export const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
