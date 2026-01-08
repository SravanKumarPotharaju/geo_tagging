import React from "react";
import {
  Upload,
  MapPin,
  Package,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { usePlants } from "../context/PlantsContext";

import { ROUTES } from "../utils/constants";

export const Dashboard = ({ onNavigate }) => {
  const { plants } = usePlants();

  
  const totalPlants = plants.length;

  const uploadedToday = plants.filter((plant) => {
    const today = new Date().toDateString();
    return new Date(plant.uploadedAt).toDateString() === today;
  }).length;

  const avgLatitude =
    plants.length > 0
      ? plants.reduce((sum, p) => sum + p.latitude, 0) / plants.length
      : 0;

  const recentPlants = plants.slice(0, 5);

  const statCards = [
    {
      icon: Package,
      label: "Total Plants",
      value: totalPlants,
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      icon: Upload,
      label: "Uploaded Today",
      value: uploadedToday,
      color: "bg-green-500",
      trend: "+5%",
    },
    {
      icon: MapPin,
      label: "Avg Latitude",
      value: avgLatitude.toFixed(4),
      color: "bg-purple-500",
      trend: "—",
    },
    {
      icon: TrendingUp,
      label: "Farm Coverage",
      value: "85%",
      color: "bg-orange-500",
      trend: "+3%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Farmer! 🌾</h1>
        <p className="text-green-100 mb-4">
          Manage your farm efficiently with real-time crop tracking and insights
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            icon={Upload}
            onClick={() => onNavigate(ROUTES.UPLOAD)}
          >
            Upload New Plants
          </Button>
          <Button
            variant="outline"
            icon={MapPin}
            onClick={() => onNavigate(ROUTES.MAP)}
            className="bg-white/10 border-white text-white hover:bg-white/20"
          >
            View Farm Map
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {stat.trend} from last week
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Recent Uploads" className="lg:col-span-2">
          {recentPlants.length > 0 ? (
            <div className="space-y-3">
              {recentPlants.map((plant) => (
                <div
                  key={plant.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onNavigate(ROUTES.INVENTORY)}
                >
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 truncate">
                      {plant.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {plant.latitude.toFixed(4)},{" "}
                      {plant.longitude.toFixed(4)}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(plant.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                icon={ArrowRight}
                onClick={() => onNavigate(ROUTES.INVENTORY)}
                className="w-full"
              >
                View All Plants
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-600">No plants uploaded yet</p>
              <Button
                variant="primary"
                size="sm"
                icon={Upload}
                onClick={() => onNavigate(ROUTES.UPLOAD)}
                className="mt-4"
              >
                Upload Your First Plant
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
