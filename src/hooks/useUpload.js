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
          showError(`duplicate image: ${file.name}`);
          continue;
        }

        console.log("📤 Uploading to Cloudinary:", file.name);
        const cloudinaryResult = await cloudinaryService.uploadImage(file);

        // ✅ Check for duplicate by Cloudinary URL
        const isDuplicateByUrl = plants.some(
          (plant) => plant.imageUrl === cloudinaryResult.secure_url
        );

        if (isDuplicateByUrl) {
          showError(`duplicate image: ${file.name}`);
          continue;
        }

        console.log("📍 Extracting GPS coordinates...");
        const locationResult = await apiService.extractLocation(
          file.name,
          cloudinaryResult.secure_url
        );

        if (!locationResult || !locationResult.data) {
          throw new Error("No GPS data found in image");
        }

        const { latitude, longitude } = locationResult.data;

        // ✅ Check for duplicate by coordinates
        const isDuplicateByLocation = plants.some(
          (p) =>
            Math.abs(p.latitude - latitude) < 0.000001 &&
            Math.abs(p.longitude - longitude) < 0.000001
        );

        if (isDuplicateByLocation) {
          showError(`duplicate image: ${file.name} (location exists)`);
          continue;
        }

        const saveResult = await apiService.savePlantData({
          imageName: file.name,
          imageUrl: cloudinaryResult.secure_url,
          latitude,
          longitude,
        });

        const plantData = {
          id: saveResult.data?._id || Date.now() + Math.random(),
          name: file.name,
          imageName: file.name,
          imageUrl: cloudinaryResult.secure_url,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          uploadedAt: saveResult.data?.uploadedAt || new Date().toISOString(),
        };

        addPlant(plantData);
        showSuccess(`Uploaded successfully: ${file.name}`);
      } catch (err) {
        showError(`Upload failed: ${file.name} - ${err.message}`);
      }
    }

    setUploading(false);
  };

  return { uploading, uploadFiles };
};