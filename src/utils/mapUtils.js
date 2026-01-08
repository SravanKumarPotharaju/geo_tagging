export const calculateBounds = (plants) => {
  if (!plants.length) return null;

  const lats = plants.map(p => p.latitude);
  const lngs = plants.map(p => p.longitude);

  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
};
export const latLngToGridPosition = (plant, bounds) => {
  if (!bounds) return { x: 50, y: 50 };

  const { minLat, maxLat, minLng, maxLng } = bounds;

  // Single-plant case
  if (minLat === maxLat && minLng === maxLng) {
    return { x: 50, y: 50 };
  }

  // Raw normalized values
  let x =
    ((plant.longitude - minLng) / (maxLng - minLng)) * 100;

  let y =
    (1 - (plant.latitude - minLat) / (maxLat - minLat)) * 100;

  // ✅ ADD PADDING so markers stay inside grid
  const PADDING = 5; // percent

  x = Math.min(100 - PADDING, Math.max(PADDING, x));
  y = Math.min(100 - PADDING, Math.max(PADDING, y));

  console.log(" Grid position (padded):", { x, y });
  return { x, y };
};
