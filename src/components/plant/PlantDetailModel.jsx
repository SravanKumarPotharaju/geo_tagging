const PlantDetailModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[300]">
      <div className="bg-white rounded-2xl w-[95%] max-w-3xl shadow-2xl overflow-hidden">

        {/* IMAGE HEADER */}
        <div className="relative h-72">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow hover:bg-white"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold mb-1">
              {plant.name || "Plant"}
            </h2>
            <span className="inline-block bg-green-600 px-3 py-1 rounded-full text-sm">
              Active
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-6 space-y-5">

          {/* GPS INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <MapPin size={18} />
                <span className="font-semibold">GPS Coordinates</span>
              </div>
              <p className="text-sm text-gray-700">
                Latitude: <b>{plant.latitude.toFixed(6)}</b>
              </p>
              <p className="text-sm text-gray-700">
                Longitude: <b>{plant.longitude.toFixed(6)}</b>
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Calendar size={18} />
                <span className="font-semibold">Uploaded</span>
              </div>
              <p className="text-sm text-gray-700">
                {new Date(plant.uploadedAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(plant.uploadedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* IMAGE LINK */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Image size={18} className="text-purple-600" />
              <span className="font-semibold">Image Source</span>
            </div>
            <p className="text-sm truncate text-gray-700">
              {plant.imageUrl}
            </p>
            <a
              href={plant.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 text-sm hover:underline mt-1 inline-block"
            >
              Open original image
            </a>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-gray-50 border rounded-xl p-4">
            <h3 className="font-semibold mb-2">Plant Details</h3>
            <p className="text-sm text-gray-700">
              This plant was geo-tagged automatically using image metadata
              and plotted accurately on the farm grid. You can zoom in to
              inspect location precision and track crop placement visually.
            </p>
          </div>

          {/* ACTION */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
