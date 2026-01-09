import { CONFIG } from "../config/config";

export const apiService = {
  async extractLocation(imageName, imageUrl) {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/extract-latitude-longitude`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailId: CONFIG.USER_EMAIL,
          imageName,
          imageUrl,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to extract location");
    return await response.json();
  },

  async savePlantData(plantData) {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/save-plant-location-data`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailId: CONFIG.USER_EMAIL,
          ...plantData,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to save plant data");
    return await response.json();
  },

  async getPlantLocationData() {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/get-plant-location-data`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailId: CONFIG.USER_EMAIL,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch plant data");
    return await response.json();
  },
};