import React, { useState, useMemo } from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Camera,
  MapPin,
  X,
  Calendar,
  RefreshCw,
} from "lucide-react";

import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { usePlants } from "../context/PlantsContext";
import { calculateBounds, latLngToGridPosition } from "../utils/mapUtils";

/* ---------------- PLANT MARKER ---------------- */
const PlantMarker = ({ plant, position, onClick, isSelected, scale }) => {
  const size = scale > 2 ? 16 : scale > 1.5 ? 14 : 12;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(plant);
      }}
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isSelected ? 100 : 50,
      }}
      className="cursor-pointer group"
    >
      {/* pulse animation */}
      <div
        className={`absolute inset-0 rounded-full animate-ping opacity-50 ${
          isSelected ? "bg-blue-500" : "bg-green-500"
        }`}
        style={{
          width: size * 2.5,
          height: size * 2.5,
          left: -size * 0.75,
          top: -size * 0.75,
        }}
      />

      {/* marker dot */}
      <div
        className={`relative rounded-full border-2 border-white shadow-lg transition-all group-hover:scale-125 ${
          isSelected ? "bg-blue-600" : "bg-green-600"
        }`}
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-30"></div>
      </div>

      {/* tooltip on hover (only when zoomed) */}
      {scale > 1.5 && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs shadow-xl">
            <div className="font-semibold">{plant.name}</div>
            <div className="text-gray-300 text-[10px]">
              {plant.latitude.toFixed(4)}, {plant.longitude.toFixed(4)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- PLANT DETAIL MODAL ---------------- */
const PlantDetailModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-slideUp">
        {/* Image Header */}
        <div className="relative h-72">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <X size={20} className="text-gray-800" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{plant.name}</h2>
            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* GPS Location */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <MapPin size={20} />
              <span className="font-semibold">GPS Location</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Latitude:</span>
                <span className="font-mono font-semibold text-gray-900">
                  {plant.latitude.toFixed(6)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Longitude:</span>
                <span className="font-mono font-semibold text-gray-900">
                  {plant.longitude.toFixed(6)}
                </span>
              </div>
            </div>
          </div>

          {/* Upload Date */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 mb-3">
              <Calendar size={20} />
              <span className="font-semibold">Upload Information</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Uploaded on:</p>
              <p className="text-base font-semibold text-gray-900">
                {new Date(plant.uploadedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(plant.uploadedAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl"
          >
            Close Details
          </button>
        </div>
      </div>

      {/* Animations */}
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

/* ---------------- MAIN FARM MAP ---------------- */
export const FarmMap = () => {
  const { plants, selectedPlant, setSelectedPlant, loading, error, refreshPlants } = usePlants();
  const [currentScale, setCurrentScale] = useState(1);

  const bounds = useMemo(() => calculateBounds(plants), [plants]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farm Map</h1>
          <p className="text-gray-600">
            Interactive crop visualization • {plants.length} plants tracked
          </p>
        </div>
        
        {/* Refresh Button */}
        <Button
          onClick={refreshPlants}
          disabled={loading}
          size="sm"
          variant="outline"
          icon={RefreshCw}
          className={loading ? "animate-spin" : ""}
        >
          Refresh
        </Button>
      </div>

      <Card>
        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
            <div className="text-center">
              <RefreshCw className="animate-spin mx-auto mb-2 text-green-600" size={32} />
              <p className="text-gray-600">Loading plants...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            ⚠️ {error}
          </div>
        )}

        {/* MAP CONTAINER */}
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden border-2 border-green-400 bg-green-50">
          {/* FIXED GRID (STATIC) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <pattern
                id="minor"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0L0 0 0 20"
                  fill="none"
                  stroke="rgba(34,197,94,0.15)"
                  strokeWidth="0.5"
                />
              </pattern>
              <pattern
                id="major"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M60 0L0 0 0 60"
                  fill="none"
                  stroke="rgba(34,197,94,0.35)"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#minor)" />
            <rect width="100%" height="100%" fill="url(#major)" />
          </svg>

          {/* ZOOMABLE LAYER */}
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={5}
            wheel={{ step: 0.2 }}
            doubleClick={{ disabled: true }}
            panning={{ velocityDisabled: true }}
            onTransformed={(ref) => {
              const scale = ref.state.scale;
              if (Math.abs(scale - currentScale) > 0.01) {
                setCurrentScale(scale);
              }
            }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* TOOLBAR */}
                <div className="absolute top-3 right-3 z-50 flex gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                  <Button size="sm" onClick={() => zoomIn()}>
                    <ZoomIn size={16} />
                  </Button>
                  <Button size="sm" onClick={() => zoomOut()}>
                    <ZoomOut size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => resetTransform(0, "easeOut")}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>

                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                  contentStyle={{ width: "100%", height: "100%" }}
                >
                  <div className="absolute inset-0 z-10">
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
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>

          {/* LEGEND */}
          <div className="absolute top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 text-sm border border-gray-200">
            <div className="font-bold flex items-center gap-2 mb-3 text-gray-800">
              <MapPin size={18} className="text-green-600" />
              Map Legend
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Total Plants</span>
                <span className="font-bold text-green-700 text-lg">
                  {plants.length}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-600">Current Zoom</span>
                <span className="font-mono text-sm text-gray-700">
                  {(currentScale * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Active Plant</span>
              </div>
            </div>
          </div>

          {/* EMPTY STATE */}
          {plants.length === 0 && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-gray-500">
              <Camera size={64} className="mb-4 text-gray-400" />
              <p className="text-lg font-medium">No plants uploaded yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Upload plant images to see them on the map
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* MODAL */}
      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
};