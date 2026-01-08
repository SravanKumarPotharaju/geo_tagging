import { useState } from "react";
import { cloudinaryService } from "../services/cloudinaryService";
import { apiService } from "../services/apiService";
import { usePlants } from "../context/PlantsContext";
import { useNotification } from "./useNotification";

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { addPlant } = usePlants();
  const { showSuccess, showError } = useNotification();

  const uploadFiles = async (files) => {
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        const cloudinaryResult = await cloudinaryService.uploadImage(file);
console.log("✅ Cloudinary upload:", cloudinaryResult.secure_url);

const locationResult = await apiService.extractLocation(
  file.name,
  cloudinaryResult.secure_url
);

console.log(" Raw location API response:", locationResult);

if (!locationResult || !locationResult.data) {
  console.error(" Location extraction failed");
  throw new Error("Location extraction failed");
}

const plant = {
  id: Date.now(),
  name: file.name,
  imageUrl: cloudinaryResult.secure_url,
  latitude: locationResult.latitude ?? locationResult.data?.latitude,
longitude: locationResult.longitude ?? locationResult.data?.longitude,

  uploadedAt: new Date().toISOString(),
};

console.log(" Adding plant to context:", plant);

addPlant(plant);


        showSuccess(`${file.name} uploaded`);
      } catch (err) {
        showError(`Failed: ${file.name}`);
      }
    }

    setUploading(false);
  };

  return { uploading, uploadFiles };
};
