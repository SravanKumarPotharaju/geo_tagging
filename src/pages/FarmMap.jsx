// // import React from "react";
// // import {
// //   TransformWrapper,
// //   TransformComponent,
// // } from "react-zoom-pan-pinch";
// // import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

// // import { Card } from "../components/common/Card";
// // import { Button } from "../components/common/Button";
// // import { usePlants } from "../hooks/usePlants";
// // import { PlantMarker } from "../components/plant/PlantMarker";

// // export const FarmMap = () => {
// //   const { plants, setSelectedPlant } = usePlants();

// //   return (
// //     <div className="space-y-4">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-2xl font-bold text-gray-900">Farm Map</h1>
// //         <p className="text-gray-600">
// //           Interactive visualization of your crop locations
// //         </p>
// //       </div>

// //       <Card>
// //         <TransformWrapper
// //           initialScale={1}
// //           minScale={0.5}
// //           maxScale={4}
// //           wheel={{ step: 0.15 }}
// //           panning={{ velocityDisabled: true }}
// //         >
// //           {({ zoomIn, zoomOut, resetTransform }) => (
// //             <>
// //               {/* Toolbar */}
// //               <div className="flex gap-2 mb-3">
// //                 <Button size="sm" icon={ZoomIn} onClick={zoomIn}>
// //                   Zoom In
// //                 </Button>
// //                 <Button size="sm" icon={ZoomOut} onClick={zoomOut}>
// //                   Zoom Out
// //                 </Button>
// //                 <Button size="sm" icon={Maximize2} onClick={resetTransform}>
// //                   Reset
// //                 </Button>
// //               </div>

// //               <TransformComponent>
// //                 {/* MAP CONTAINER */}
// //                 <div className="relative w-full h-[600px] bg-green-100 border-2 border-green-300 rounded-lg overflow-hidden">

// //                   {/* GRID */}
// //                   <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
// //                     {Array.from({ length: 100 }).map((_, i) => (
// //                       <div
// //                         key={i}
// //                         className="border border-green-300/40"
// //                       />
// //                     ))}
// //                   </div>

// //                   {/* PLANT MARKERS */}
// //                   {plants.map((plant) => (
// //                     <PlantMarker
// //                       key={plant.id}
// //                       plant={plant}
// //                       onClick={() => setSelectedPlant(plant)}
// //                     />
// //                   ))}

// //                   {/* LEGEND */}
// //                   <div className="absolute top-4 left-4 bg-white rounded-lg shadow p-3 text-sm">
// //                     <p className="font-semibold">Map Legend</p>
// //                     <div className="flex items-center gap-2 mt-1">
// //                       <span className="w-3 h-3 bg-green-600 rounded-full" />
// //                       Plant Location
// //                     </div>
// //                     <p className="mt-2">
// //                       Total Plants: <b>{plants.length}</b>
// //                     </p>
// //                   </div>
// //                 </div>
// //               </TransformComponent>
// //             </>
// //           )}
// //         </TransformWrapper>
// //       </Card>
// //     </div>
// //   );
// // };



















// import React from "react";
// import {
//   TransformWrapper,
//   TransformComponent,
// } from "react-zoom-pan-pinch";
// import { ZoomIn, ZoomOut, Maximize2, Camera } from "lucide-react";

// import { Card } from "../components/common/Card";
// import { Button } from "../components/common/Button";
// import { usePlants } from "../context/PlantsContext";
// import { PlantMarker } from "../components/plant/PlantMarker";
// import { PlantDetailModal } from "../components/plant/PlantDetailModal";
// import {
//   calculateBounds,
//   latLngToGridPosition,
// } from "../utils/mapUtils";

// export const FarmMap = () => {
//   const { plants, selectedPlant, setSelectedPlant } = usePlants();
//   const bounds = calculateBounds(plants);

//   return (
//     <div className="space-y-4">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Farm Map</h1>
//         <p className="text-gray-600">
//           Interactive visualization of your crop locations
//         </p>
//       </div>

//       <Card>
//         <TransformWrapper
//           initialScale={1}
//           minScale={0.5}
//           maxScale={4}
//           wheel={{ step: 0.15 }}
//           doubleClick={{ disabled: true }}
//           panning={{ velocityDisabled: true }}
//         >
//           {({ zoomIn, zoomOut, resetTransform }) => (
//             <>
//               {/* TOOLBAR */}
//               <div className="flex gap-2 mb-3">
//                 <Button size="sm" icon={ZoomIn} onClick={zoomIn}>
//                   Zoom In
//                 </Button>
//                 <Button size="sm" icon={ZoomOut} onClick={zoomOut}>
//                   Zoom Out
//                 </Button>
//                 <Button size="sm" icon={Maximize2} onClick={resetTransform}>
//                   Reset
//                 </Button>
//               </div>

//               {/* MAP */}
//               <TransformComponent
//                 wrapperStyle={{ width: "100%", height: "600px" }}
//                 contentStyle={{ width: "100%", height: "100%" }}
//               >
//                 <div className="relative w-full h-full bg-green-100 border-2 border-green-600 rounded-lg overflow-hidden">

//                   {/* GRID */}
//                   <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 z-0 pointer-events-none">
//                     {Array.from({ length: 100 }).map((_, i) => (
//                       <div
//                         key={i}
//                         className="border border-green-600/60"
//                       />
//                     ))}
//                   </div>

//                   {/* PLANTS */}
//                   {plants.map((plant) => {
//                     const position = latLngToGridPosition(plant, bounds);
//                     return (
//                       <PlantMarker
//                         key={plant.id}
//                         plant={plant}
//                         position={position}
//                         onClick={() => setSelectedPlant(plant)}
//                       />
//                     );
//                   })}

//                   {/* LEGEND */}
//                   <div className="absolute top-4 left-4 z-50 bg-white rounded-lg shadow p-3 text-sm">
//                     <p className="font-semibold">Map Legend</p>
//                     <p>
//                       Total Plants: <b>{plants.length}</b>
//                     </p>
//                   </div>
//                 </div>
//               </TransformComponent>
//             </>
//           )}
//         </TransformWrapper>

//         {/* EMPTY STATE */}
//         {plants.length === 0 && (
//           <div className="text-center py-20">
//             <Camera className="mx-auto text-gray-400 mb-4" size={64} />
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No Plants to Display
//             </h3>
//             <p className="text-gray-600">
//               Upload some plant images to see them on the map
//             </p>
//           </div>
//         )}
//       </Card>

//       {/* PLANT DETAILS MODAL */}
//       {selectedPlant && (
//         <PlantDetailModal
//           plant={selectedPlant}
//           onClose={() => setSelectedPlant(null)}
//         />
//       )}
//     </div>
//   );
// };






























import React, { useState, useMemo } from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize2, Camera, MapPin, Calendar, X, Droplet, Sun, Image } from "lucide-react";

import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { usePlants } from "../context/PlantsContext";
import { calculateBounds, latLngToGridPosition } from "../utils/mapUtils";

// Get grid cell from position
const getGridCell = (position) => {
  const col = Math.floor(position.x / 10);
  const row = Math.floor(position.y / 10);
  return { row, col, key: `${row}-${col}` };
};

// Enhanced Plant Marker Component
const PlantMarker = ({ plant, position, onClick, isSelected, scale }) => {
  const markerSize = scale > 2 ? 12 : scale > 1.5 ? 10 : 8;
  
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(plant);
      }}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: isSelected ? 100 : 50,
      }}
      className="group"
    >
      {/* Pulse animation */}
      <div 
        className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
          isSelected ? 'bg-blue-500' : 'bg-green-500'
        }`} 
        style={{ 
          width: markerSize * 2, 
          height: markerSize * 2, 
          left: -markerSize/2, 
          top: -markerSize/2 
        }}
      ></div>
      
      {/* Marker dot */}
      <div 
        className={`relative rounded-full border-2 shadow-lg transition-all duration-200 group-hover:scale-150 ${
          isSelected 
            ? 'border-white bg-blue-600' 
            : 'border-white bg-green-600'
        }`}
        style={{ width: markerSize, height: markerSize }}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-30"></div>
      </div>

      {/* Hover tooltip - only show when zoomed in */}
      {scale > 1.5 && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl">
            <div className="font-semibold">{plant.name || plant.imageName}</div>
            <div className="text-gray-300 text-[10px]">
              {plant.latitude.toFixed(4)}, {plant.longitude.toFixed(4)}
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

// Grid Cell Highlight Component
const GridCellHighlight = ({ gridCell, plantsInCell, onClick }) => {
  if (!gridCell || plantsInCell.length === 0) return null;

  return (
    <div
      onClick={onClick}
      className="absolute bg-green-500/10 border-2 border-green-500/40 hover:bg-green-500/20 transition-all cursor-pointer group"
      style={{
        left: `${gridCell.col * 10}%`,
        top: `${gridCell.row * 10}%`,
        width: '10%',
        height: '10%',
        zIndex: 10,
      }}
    >
      <div className="absolute top-1 right-1 bg-green-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
        {plantsInCell.length}
      </div>
    </div>
  );
};

// Enhanced Plant Detail Modal
const PlantDetailModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200] animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Header with Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={plant.imageUrl}
            alt={plant.name || plant.imageName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <X size={24} className="text-gray-800" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{plant.name || plant.imageName}</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Primary Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-3">
                <MapPin size={20} />
                <span className="font-semibold">GPS Location</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Latitude:</span>
                  <span className="font-mono font-semibold text-gray-900">{plant.latitude.toFixed(6)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Longitude:</span>
                  <span className="font-mono font-semibold text-gray-900">{plant.longitude.toFixed(6)}</span>
                </div>
              </div>
            </div>

            {/* Upload Date */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-3">
                <Calendar size={20} />
                <span className="font-semibold">Upload Date</span>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(plant.uploadedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(plant.uploadedAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Image Info */}
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Image size={18} className="text-purple-600" />
              <span className="font-semibold text-gray-900">Image Details</span>
            </div>
            <p className="text-sm text-gray-700 truncate">{plant.imageName}</p>
            <a
              href={plant.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-600 hover:underline mt-1 inline-block"
            >
              View Original Image
            </a>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Plant Information</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              This plant was uploaded on {new Date(plant.uploadedAt).toLocaleDateString()} and is currently active. 
              The GPS coordinates place it at the specified location on your farm. Regular monitoring and maintenance are recommended for optimal growth.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      {/* Add animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Main FarmMap Component
export const FarmMap = () => {
  const { plants, selectedPlant, setSelectedPlant } = usePlants();
  const [currentScale, setCurrentScale] = useState(1);
  
  const bounds = useMemo(() => calculateBounds(plants), [plants]);

  // Group plants by grid cell
  const plantsByGrid = useMemo(() => {
    const groups = {};
    plants.forEach(plant => {
      const position = latLngToGridPosition(plant, bounds);
      const cell = getGridCell(position);
      if (!groups[cell.key]) {
        groups[cell.key] = { cell, plants: [], position };
      }
      groups[cell.key].plants.push({ ...plant, position });
    });
    return groups;
  }, [plants, bounds]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Farm Map</h1>
        <p className="text-gray-600">
          Interactive visualization of your crop locations • {plants.length} plants tracked
        </p>
      </div>

      <Card>
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          wheel={{ step: 0.15 }}
          doubleClick={{ disabled: true }}
          panning={{ velocityDisabled: true }}
          onZoom={(ref) => setCurrentScale(ref.state.scale)}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* TOOLBAR */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    icon={ZoomIn} 
                    onClick={() => zoomIn()}
                  >
                    Zoom In
                  </Button>
                  <Button 
                    size="sm" 
                    icon={ZoomOut} 
                    onClick={() => zoomOut()}
                  >
                    Zoom Out
                  </Button>
                  <Button 
                    size="sm" 
                    icon={Maximize2}
                    variant="secondary"
                    onClick={() => resetTransform()}
                  >
                    Reset
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg font-medium">
                    Zoom: {(currentScale * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* MAP */}
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "600px" }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <div className="relative w-full h-[600px] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-400 rounded-lg overflow-hidden shadow-inner">

                  {/* PROFESSIONAL GRID */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                      <pattern id="majorGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path 
                          d="M 60 0 L 0 0 0 60" 
                          fill="none" 
                          stroke="rgba(34, 197, 94, 0.25)" 
                          strokeWidth="1.5"
                        />
                      </pattern>
                      <pattern id="minorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path 
                          d="M 20 0 L 0 0 0 20" 
                          fill="none" 
                          stroke="rgba(34, 197, 94, 0.1)" 
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#minorGrid)" />
                    <rect width="100%" height="100%" fill="url(#majorGrid)" />
                  </svg>

                  {/* GRID CELL HIGHLIGHTS - Show when zoomed in */}
                  {currentScale > 1.2 && Object.values(plantsByGrid).map(({ cell, plants: cellPlants }) => (
                    <GridCellHighlight
                      key={cell.key}
                      gridCell={cell}
                      plantsInCell={cellPlants}
                      onClick={() => {
                        // If only one plant in cell, select it directly
                        if (cellPlants.length === 1) {
                          setSelectedPlant(cellPlants[0]);
                        }
                      }}
                    />
                  ))}

                  {/* PLANT MARKERS */}
                  {plants.map((plant) => {
                    const position = latLngToGridPosition(plant, bounds);
                    return (
                      <PlantMarker
                        key={plant.id}
                        plant={plant}
                        position={position}
                        onClick={setSelectedPlant}
                        isSelected={selectedPlant?.id === plant.id}
                        scale={currentScale}
                      />
                    );
                  })}

                  {/* ENHANCED LEGEND */}
                  <div className="absolute top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 text-sm border border-gray-200 max-w-xs">
                    <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <MapPin size={18} className="text-green-600" />
                      Map Legend
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <span className="text-gray-700">Plant Location</span>
                      </div>
                      {selectedPlant && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-600 rounded-full border border-white shadow"></div>
                          <span className="text-gray-700">Selected Plant</span>
                        </div>
                      )}
                      {currentScale > 1.2 && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500/20 border border-green-500/40 rounded"></div>
                          <span className="text-gray-700">Grid Cluster</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total Plants:</span>
                        <span className="font-bold text-green-600 text-lg">{plants.length}</span>
                      </div>
                      {currentScale > 1.5 && (
                        <div className="mt-1 text-xs text-gray-500">
                          Zoom {currentScale.toFixed(1)}x
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Compass indicator */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs font-bold text-red-600">N</div>
                      </div>
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
                        <path d="M 50 10 L 55 45 L 50 40 L 45 45 Z" fill="#dc2626"/>
                        <path d="M 50 90 L 55 55 L 50 60 L 45 55 Z" fill="#6b7280"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        {/* EMPTY STATE */}
        {plants.length === 0 && (
          <div className="text-center py-20">
            <Camera className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Plants to Display
            </h3>
            <p className="text-gray-600">
              Upload some plant images to see them on the map
            </p>
          </div>
        )}
      </Card>

      {/* PLANT DETAILS MODAL */}
      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
};