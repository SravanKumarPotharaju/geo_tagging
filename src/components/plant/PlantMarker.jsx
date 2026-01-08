// import React from "react";
// import { MapPin } from "lucide-react";

// export const PlantMarker = ({ plant, position, onClick }) => {
//   return (
//     <div
//       className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
//       style={{ left: `${position.x}%`, top: `${position.y}%` }}
//       onClick={() => onClick(plant)}
//     >
//       <div className="relative">
//         <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
//           <MapPin size={20} className="text-white" />
//         </div>

//         {/* Tooltip */}
//         <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
//           <div className="bg-gray-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap">
//             <div className="font-semibold">
//               {plant.imageName.substring(0, 25)}...
//             </div>
//             <div className="text-gray-300">
//               {plant.latitude.toFixed(4)}, {plant.longitude.toFixed(4)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const PlantMarker = ({ plant, position, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        absolute z-50
        w-6 h-6
        bg-green-700
        rounded-full
        shadow-lg
        cursor-pointer
        hover:scale-125
        hover:ring-4
        hover:ring-green-300
        transition
      "
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      title={plant.name}
    />
  );
};
