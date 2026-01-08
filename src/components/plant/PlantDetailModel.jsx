import { X } from "lucide-react";

export const PlantDetailModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[420px] p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>

        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <h2 className="text-xl font-bold mb-3">{plant.name}</h2>

        <div className="text-sm text-gray-700 space-y-1">
          <p><b>Latitude:</b> {plant.latitude}</p>
          <p><b>Longitude:</b> {plant.longitude}</p>
          <p>
            <b>Uploaded:</b>{" "}
            {new Date(plant.uploadedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
