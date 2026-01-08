// import { useState } from "react";
// // import { extractLatLngFromImage } from "../services/plantApi";

// export const usePlants = () => {
//   const [plants, setPlants] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState(null);

//   // ✅ WRITE YOUR FUNCTION HERE
//   const uploadPlantImage = async (file) => {
//     try {
//       const data = await extractLatLngFromImage(file);

//       const newPlant = {
//         id: Date.now(),
//         name: file.name,
//         latitude: data.latitude,
//         longitude: data.longitude,
//         imageUrl: URL.createObjectURL(file),
//         uploadedAt: new Date().toISOString(),
//       };

//       setPlants((prev) => [...prev, newPlant]);
//     } catch (error) {
//       console.error("Failed to upload plant image:", error);
//       alert("Image upload failed. Please try another image.");
//     }
//   };

//   return {
//     plants,
//     selectedPlant,
//     setSelectedPlant,
//     uploadPlantImage, // 
//   };
// };
// import { useState } from "react";

// export const usePlants = () => {
//   const [plants, setPlants] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState(null);

//   // ✅ Single responsibility: update state
//   const addPlant = (plant) => {
//     setPlants((prev) => [...prev, plant]);
//   };

//   return {
//     plants,
//     selectedPlant,
//     setSelectedPlant,
//     addPlant, // 👈 used by useUpload
//   };
// };
