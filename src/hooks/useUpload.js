import { useState } from "react";
import { cloudinaryService } from "../services/cloudinaryService";
import { apiService } from "../services/apiService";
import { usePlants } from "../context/PlantsContext";
import { useNotification } from "./useNotification";

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { plants, addPlant } = usePlants();
  const { showSuccess, showError } = useNotification();

  const uploadFiles = async (files) => {
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        // ✅ Check for duplicate by filename
        const isDuplicateByName = plants.some(
          (plant) => plant.imageName === file.name || plant.name === file.name
        );

        if (isDuplicateByName) {
          showError(`❌ "${file.name}" already uploaded (duplicate filename)`);
          continue;
        }

        console.log("📤 Uploading to Cloudinary:", file.name);
        const cloudinaryResult = await cloudinaryService.uploadImage(file);
        console.log("✅ Cloudinary upload:", cloudinaryResult.secure_url);

        // ✅ Check for duplicate by Cloudinary URL
        const isDuplicateByUrl = plants.some(
          (plant) => plant.imageUrl === cloudinaryResult.secure_url
        );

        if (isDuplicateByUrl) {
          showError(`❌ "${file.name}" already exists (same image)`);
          continue;
        }

        console.log("📍 Extracting GPS coordinates...");
        const locationResult = await apiService.extractLocation(
          file.name,
          cloudinaryResult.secure_url
        );

        console.log("🗺️ Raw location API response:", locationResult);

        if (!locationResult || !locationResult.data) {
          console.error("❌ Location extraction failed");
          throw new Error("No GPS data found in image");
        }

        const { latitude, longitude } = locationResult.data;

        // ✅ Check for duplicate by coordinates (same location)
        const isDuplicateByLocation = plants.some(
          (plant) =>
            Math.abs(plant.latitude - latitude) < 0.00001 &&
            Math.abs(plant.longitude - longitude) < 0.00001
        );

        if (isDuplicateByLocation) {
          showError(`❌ Plant at this location already exists`);
          continue;
        }

        console.log("💾 Saving plant data to backend...");
        const saveResult = await apiService.savePlantData({
          imageName: file.name,
          imageUrl: cloudinaryResult.secure_url,
          latitude,
          longitude,
        });

        const plant = {
          id: saveResult.data?._id || Date.now() + Math.random(),
          name: file.name,
          imageName: file.name,
          imageUrl: cloudinaryResult.secure_url,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          uploadedAt: saveResult.data?.uploadedAt || new Date().toISOString(),
        };

        console.log("🌱 Adding plant to context:", plant);
        addPlant(plant);

        showSuccess(`✅ ${file.name} uploaded successfully`);
      } catch (err) {
        console.error(` Upload failed for ${file.name}:`, err);
        showError(` Failed: ${file.name} - ${err.message}`);
      }
    }

    setUploading(false);
  };

  return { uploading, uploadFiles };
};