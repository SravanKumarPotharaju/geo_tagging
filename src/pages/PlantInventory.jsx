import React, { useState } from "react";
import { Search, Filter, Download, Trash2 } from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { PlantCard } from "../components/plant/PlantCard";
import { PlantDetailModal } from "../components/plant/PlantDetailModal";
import { usePlants } from "../context/PlantsContext";

import { useNotification } from "../hooks/useNotification";
import { sortPlants, exportToJSON, exportToCSV } from "../utils/helpers";

export const PlantInventory = () => {
  const {
    plants,
    deletePlant,
    sortBy,
    setSortBy,
    setSelectedPlant,
    selectedPlant,
  } = usePlants();
  const { showSuccess } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredPlants = plants.filter((plant) => {
    const searchStr = searchQuery.toLowerCase();
    const nameMatch = plant.name?.toLowerCase().includes(searchStr);
    const imageNameMatch = plant.imageName?.toLowerCase().includes(searchStr);
    const idMatch = plant.id?.toString().includes(searchStr);
    return nameMatch || imageNameMatch || idMatch;
  });

  const sortedPlants = sortPlants(filteredPlants, sortBy);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this plant?")) {
      deletePlant(id);
      showSuccess("Plant deleted successfully");
    }
  };

  const handleExportJSON = () => {
    exportToJSON(plants, "farm-plants");
    showSuccess("Data exported as JSON");
  };

  const handleExportCSV = () => {
    exportToCSV(plants);
    showSuccess("Data exported as CSV");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plant Inventory
          </h1>
          <p className="text-gray-600">
            Manage and organize your crop collection
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="date">Upload Date</option>
                <option value="name">Name</option>
                <option value="latitude">Latitude</option>
                <option value="longitude">Longitude</option>
              </select>
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportJSON}
            >
              JSON
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportCSV}
            >
              CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Plants</p>
          <p className="text-2xl font-bold text-gray-900">{plants.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Filtered</p>
          <p className="text-2xl font-bold text-gray-900">
            {sortedPlants.length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">This Week</p>
          <p className="text-2xl font-bold text-gray-900">
            {
              plants.filter((p) => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(p.uploadedAt) > weekAgo;
              }).length
            }
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Today</p>
          <p className="text-2xl font-bold text-gray-900">
            {
              plants.filter(
                (p) =>
                  new Date(p.uploadedAt).toDateString() ===
                  new Date().toDateString()
              ).length
            }
          </p>
        </Card>
      </div>

      {/* Plant Grid */}
      {sortedPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onDelete={handleDelete}
              onClick={() => setSelectedPlant(plant)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <Trash2 className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchQuery ? "No plants found" : "No plants yet"}
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try a different search term"
                : "Upload some plants to get started"}
            </p>
          </div>
        </Card>
      )}

      <PlantDetailModal
        plant={selectedPlant}
        isOpen={!!selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
    </div>
  );
};
