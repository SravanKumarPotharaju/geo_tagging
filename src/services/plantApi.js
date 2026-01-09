export const fetchSavedPlants = async () => {
  const res = await fetch(
    "https://api.alumnx.com/api/hackathons/get-plant-location-data",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`API failed with status ${res.status}`);
  }

  return res.json();
};
