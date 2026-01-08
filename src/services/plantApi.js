export const extractLatLngFromImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://api.alumnx.com/api/hackathons/extract-latitude-longitude",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Latitude/Longitude extraction failed");
  }

  return response.json();
};
