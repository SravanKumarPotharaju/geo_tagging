import { usePlants } from "../context/PlantsContext";


const UploadPlants = () => {
  const { uploadPlantImage } = usePlants();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadPlantImage(file);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-green-600 file:text-white
                   hover:file:bg-green-700"
      />
    </div>
  );
};

export default UploadPlants;
