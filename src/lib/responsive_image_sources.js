export const responsiveImageSources = {
  "/assets/images/mana-azizsoltani-professional-portrait.webp": { width: 1254, height: 1250 },
  "/assets/photos/fab333_madrid/fab_madrid_day5.webp": { width: 2048, height: 2048 },
  "/assets/photos/fab333_madrid/fab_val_day2.webp": { width: 2048, height: 2048 },
  "/assets/photos/fab333_reunion_group.webp": { width: 1024, height: 768 },
  "/assets/photos/fab333_2026_2.webp": { width: 2200, height: 1650 },
  "/assets/photos/fab333_2026_tea.webp": { width: 2200, height: 2933 },
  "/assets/photos/fab333_paella.webp": { width: 2200, height: 1650 }
};

export function responsiveVariantPath(src, width) {
  const relative = src.replace(/^\/assets\//, "").replace(/\.webp$/i, "");
  return `/assets/responsive/${relative}-${width}w.webp`;
}
