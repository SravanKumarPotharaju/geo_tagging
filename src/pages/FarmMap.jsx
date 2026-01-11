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
  Info
} from "lucide-react";

import { usePlants } from "../context/PlantsContext";
import { calculateBounds, latLngToGridPosition } from "../utils/mapUtils";

/* ---------------- PLANT MARKER ---------------- */
const PlantMarker = ({ plant, position, onClick, isSelected, scale }) => {
  // Dynamic sizing based on zoom level
  const size = scale > 3 ? 24 : scale > 2 ? 18 : 14;
  const isVisible = scale > 0.6; // Hide markers if zoomed out too far? No, better keep them.

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
      className="cursor-pointer group"
    >
      {/* Ripple/Pulse Effect for Selected/Active */}
      {isSelected && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"
          style={{ padding: size }}></span>
      )}

      {/* Marker Icon */}
      <div
        className={`relative rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isSelected
            ? "bg-green-600 text-white scale-125 ring-4 ring-green-100"
            : "bg-white text-green-600 hover:bg-green-50 hover:scale-110"
          }`}
        style={{ width: size, height: size }}
      >
        <div
          className="rounded-full bg-current"
          style={{ width: size * 0.4, height: size * 0.4 }}
        />
      </div>

      {/* Hover Tooltip (Enhanced) */}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none transition-all duration-200 ${scale > 1.5 || isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
        <div className="bg-gray-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-xl whitespace-nowrap border border-white/10 flex items-center gap-2">
          <Leaf size={10} className="text-green-400" />
          {plant.name}
        </div>
        {/* Arrow */}
        <div className="w-2 h-2 bg-gray-900/90 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
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

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp ring-1 ring-gray-900/5">
        {/* Header Image */}
        <div className="relative h-64 overflow-hidden group">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/90 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-green-400/50">
                Healthy
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                ID: {plant.plantId || plant.id.toString().slice(0, 6)}
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{plant.name}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-green-100 hover:bg-green-50/50 transition-colors group/card">
              <div className="flex items-center gap-2 text-gray-400 mb-2 group-hover/card:text-green-600 transition-colors">
                <Navigation size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">Coordinates</span>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-sm text-gray-700 flex justify-between">
                  <span>Lat</span>
                  <span className="font-semibold">{plant.latitude.toFixed(6)}</span>
                </p>
                <p className="font-mono text-sm text-gray-700 flex justify-between">
                  <span>Lng</span>
                  <span className="font-semibold">{plant.longitude.toFixed(6)}</span>
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group/card">
              <div className="flex items-center gap-2 text-gray-400 mb-2 group-hover/card:text-blue-600 transition-colors">
                <Calendar size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">Recorded</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(plant.uploadedAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(plant.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <button className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors shadow-lg shadow-gray-900/20 active:scale-[0.98] duration-200">
            View Full Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- MAIN FARM MAP ---------------- */
export const FarmMap = () => {
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
      <div className="relative flex-1 w-full bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-inner group">

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}>
        </div>

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
        />
      )}
    </div>
  );
};
