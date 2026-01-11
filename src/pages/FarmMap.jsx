import React, { useState, useMemo } from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  MapPin,
  X,
  Calendar,
  RefreshCw,
  Leaf,
  Navigation,
  Info,
  Droplets,
  Sun,
  Zap
} from "lucide-react";

import { usePlants } from "../context/PlantsContext";
import { calculateBounds, latLngToGridPosition } from "../utils/mapUtils";

/* ---------------- PLANT MARKER ---------------- */
/* ---------------- PLANT MARKER ---------------- */
const PlantMarker = ({ plant, position, onClick, isSelected, scale }) => {
  // Dynamic sizing based on zoom level
  const size = scale > 3 ? 24 : scale > 2 ? 18 : 14;

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
        zIndex: isSelected ? 50 : 10,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      className="cursor-pointer"
    >
      {/* Eye-catching Green Border Blinking/Ringing Effect */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded-full animate-ring-pulse"
          style={{ width: size, height: size }}
        />
      )}

      {/* Marker Icon */}
      <div
        className={`relative rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-2 ${isSelected
          ? "bg-white border-green-500 scale-125 z-50"
          : "bg-green-600 border-white/50 hover:bg-green-500 hover:scale-110"
          }`}
        style={{ width: size, height: size }}
      >
        <div
          className={`${isSelected ? 'bg-green-500' : 'bg-white'} rounded-full transition-colors`}
          style={{ width: size * 0.4, height: size * 0.4 }}
        />
      </div>
    </div>
  );
};

/* ---------------- PLANT DETAIL MODAL ---------------- */
const PlantDetailModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp ring-1 ring-gray-900/5">
        {/* Header Image */}
        <div className="relative h-72 overflow-hidden group">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 bg-black/20 hover:bg-black/40 text-white rounded-2xl backdrop-blur-md transition-all hover:rotate-90"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-0 left-0 p-8 text-white w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-green-500/90 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-green-400/50">
                Optimal Health
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-white/10">
                # {plant.plantId || plant.id.toString().slice(-6)}
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">{plant.name}</h2>
            <p className="text-white/60 text-xs font-medium mt-1">Last inspected: {new Date(plant.uploadedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-8 bg-white">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-green-50/50 border border-green-100/50 group/item transition-all hover:bg-green-100/50">
              <div className="flex items-center gap-2 text-green-600 mb-3">
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <Leaf size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Growth Stage</span>
              </div>
              <p className="text-xl font-black text-gray-900">Vegetative</p>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-green-500 h-full w-[65%] rounded-full"></div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 group/item transition-all hover:bg-blue-50">
              <div className="flex items-center gap-2 text-blue-600 mb-3">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Droplets size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Moisture</span>
              </div>
              <p className="text-xl font-black text-gray-900">72% <span className="text-xs text-blue-500 font-bold">(High)</span></p>
            </div>

            <div className="p-5 rounded-2xl bg-yellow-50/50 border border-yellow-100/50 group/item transition-all hover:bg-yellow-50">
              <div className="flex items-center gap-2 text-yellow-600 mb-3">
                <div className="p-1.5 bg-yellow-100 rounded-lg">
                  <Sun size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Sunlight</span>
              </div>
              <p className="text-xl font-black text-gray-900">9.2 <span className="text-xs text-yellow-600 font-bold">hrs/day</span></p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100/50 group/item transition-all hover:bg-purple-50">
              <div className="flex items-center gap-2 text-purple-600 mb-3">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <Zap size={16} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Yield Est.</span>
              </div>
              <p className="text-xl font-black text-gray-900">4.8 <span className="text-xs text-purple-600 font-bold">Tons/A</span></p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-900">Health Analysis</h4>
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase">Stable</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Based on recent multi-spectral imaging, this plant shows strong chlorophyll activity and no signs of pest infestation or nutrient deficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- MAIN FARM MAP ---------------- */
import { ROUTES } from "../utils/constants";

export const FarmMap = ({ onNavigate }) => {
  const { plants, selectedPlant, setSelectedPlant, loading, error, refreshPlants } = usePlants();
  const [currentScale, setCurrentScale] = useState(1);

  const bounds = useMemo(() => calculateBounds(plants), [plants]);

  return (
    <div className="h-[calc(100vh-theme(spacing.28))] flex flex-col gap-4">
      {/* HEADER & LEGEND BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="text-green-600" />
            Field Overview
          </h1>
          <p className="text-sm text-gray-500">Real-time crop monitoring system</p>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {/* Stats Item */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
              <Leaf size={16} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Active Plants</p>
              <p className="text-lg font-bold text-gray-900 leading-none">{plants.length}</p>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600 shadow-sm shadow-green-600/50"></span>
            <span>Healthy</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></span>
            <span>Attention</span>
          </div>

          <button
            onClick={refreshPlants}
            disabled={loading}
            className="ml-auto sm:ml-2 p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* MAP VISUALIZATION */}
      <div
        className="relative flex-1 w-full rounded-3xl border border-gray-200 overflow-hidden shadow-2xl bg-gray-900"
        style={{
          backgroundImage: 'url(/assets/farm-map-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Subtle Overlay to make markers pop */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {loading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <RefreshCw className="animate-spin text-green-600 mb-3" size={32} />
            <p className="text-gray-600 font-medium">Syncing field data...</p>
          </div>
        )}

        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-lg flex items-center gap-2">
            <Info size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && plants.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 z-10">
            <div className="p-6 bg-white rounded-full shadow-sm mb-4">
              <MapPin size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No Plants Mapped</h3>
            <p className="max-w-xs text-center text-sm mt-1">Start by uploading plant images to generate your field map.</p>
          </div>
        )}

        {/* Interactive Map */}
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={6}
          centerOnInit
          limitToBounds={false}
          onTransformed={(ref) => setCurrentScale(ref.state.scale)}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Floating Controls */}
              <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
                <div className="bg-white p-1.5 rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col gap-1">
                  <button onClick={() => zoomIn()} className="p-2 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors" title="Zoom In">
                    <ZoomIn size={18} />
                  </button>
                  <button onClick={() => zoomOut()} className="p-2 hover:bg-gray-50 rounded-lg text-gray-600 transition-colors" title="Zoom Out">
                    <ZoomOut size={18} />
                  </button>
                </div>
                <button onClick={() => resetTransform()} className="bg-white p-3.5 rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" title="Reset View">
                  <Maximize2 size={18} />
                </button>
              </div>

              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <div className="relative w-full h-full min-h-[500px]">
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
      </div>

      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onViewAnalysis={() => onNavigate(ROUTES.ANALYTICS)}
        />
      )}
    </div>
  );
};
