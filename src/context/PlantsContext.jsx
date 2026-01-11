import { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import { storageService } from "../services/storageService";

const PlantsContext = createContext(null);

export const PlantsProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load plants on mount
  useEffect(() => {
    loadPlants();
  }, []);

  // Save to localStorage whenever plants change
  useEffect(() => {
    if (plants.length > 0) {
      storageService.savePlants(plants);
    }
  }, [plants]);

  const loadPlants = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to load from localStorage first (instant load)
      const cachedPlants = storageService.loadPlants();
      if (cachedPlants.length > 0) {
        setPlants(cachedPlants);
      }

      // Then fetch from API to get latest data
      const response = await apiService.getPlantLocationData();

      if (response && response.data && Array.isArray(response.data)) {
        const formattedPlants = response.data.map((plant) => ({
          id: plant._id || plant.id || Date.now() + Math.random(),
          name: plant.imageName || plant.name || "Unknown Plant",
          imageName: plant.imageName || plant.name,
          imageUrl: plant.imageUrl || plant.image,
          latitude: parseFloat(plant.latitude),
          longitude: parseFloat(plant.longitude),
          uploadedAt: plant.uploadedAt || plant.createdAt || new Date().toISOString(),
        }));

        setPlants(formattedPlants);
        storageService.savePlants(formattedPlants);
        console.log("✅ Loaded plants from API:", formattedPlants.length);
      }
    } catch (err) {
      console.error("❌ Error loading plants:", err);
      setError(err.message);

      // Fallback to cached data if API fails
      const cachedPlants = storageService.loadPlants();
      if (cachedPlants.length > 0) {
        setPlants(cachedPlants);
        console.log("⚠️ Using cached plants due to API error");
      }
    } finally {
      setLoading(false);
    }
  };

  const addPlant = (plant) => {
    console.log("🌱 Adding plant to system:", plant);
    const normalizedPlant = {
      ...plant,
      name: plant.name || plant.imageName || "Plant Record",
      imageName: plant.imageName || plant.name || "Plant Record"
    };

    setPlants((prev) => {
      // Check for duplicates by name or coordinates
      const isDuplicate = prev.some(
        (p) =>
          p.imageName === normalizedPlant.imageName ||
          (Math.abs(p.latitude - normalizedPlant.latitude) < 0.000001 &&
            Math.abs(p.longitude - normalizedPlant.longitude) < 0.000001)
      );

      if (isDuplicate) {
        console.log("⚠️ Duplicate detected in context, skipping");
        return prev;
      }

      return [normalizedPlant, ...prev];
    });
  };

  const refreshPlants = () => {
    loadPlants();
  };

  return (
    <PlantsContext.Provider
      value={{
        plants,
        selectedPlant,
        setSelectedPlant,
        addPlant,
        refreshPlants,
        loading,
        error,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("usePlants must be used inside PlantsProvider");
  }
  return context;
};