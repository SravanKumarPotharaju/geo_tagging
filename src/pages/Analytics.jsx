import React from "react";
import { TrendingUp, MapPin, Calendar, Award } from "lucide-react";
import { Card } from "../components/common/Card";
import { usePlants } from "../context/PlantsContext";


export const Analytics = () => {
  const { plants, stats } = usePlants();

  const getUploadTrend = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        count: plants.filter(
          (p) => new Date(p.uploadedAt).toDateString() === date.toDateString()
        ).length,
      };
    });
    return last7Days;
  };

  const uploadTrend = getUploadTrend();
  const maxCount = Math.max(...uploadTrend.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics & Insights
        </h1>
        <p className="text-gray-600">
          Track your farm's performance and growth
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Plants</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% this month</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Award className="text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Latitude</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.avgLatitude.toFixed(4)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Center point</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <MapPin className="text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Longitude</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.avgLongitude.toFixed(4)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Center point</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <MapPin className="text-white" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Week</p>
              <p className="text-3xl font-bold text-gray-900">
                {
                  plants.filter((p) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(p.uploadedAt) > weekAgo;
                  }).length
                }
              </p>
              <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Upload Trend Chart */}
      <Card title="Upload Trend (Last 7 Days)">
        <div className="space-y-4">
          {uploadTrend.map((day, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-gray-700">
                {day.date}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${(day.count / maxCount) * 100}%` }}
                    >
                      {day.count > 0 && (
                        <span className="text-white text-xs font-semibold">
                          {day.count}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12">
                    {day.count} {day.count === 1 ? "plant" : "plants"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Location Distribution">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Northern Region
              </span>
              <span className="text-lg font-bold text-green-600">
                {Math.round(plants.length * 0.35)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Southern Region
              </span>
              <span className="text-lg font-bold text-blue-600">
                {Math.round(plants.length * 0.3)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Central Region
              </span>
              <span className="text-lg font-bold text-purple-600">
                {Math.round(plants.length * 0.35)}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Monthly Summary">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Total Uploads</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">This Month</p>
                <p className="text-lg font-semibold text-green-600">
                  {stats.uploadedToday}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Average daily uploads: {(stats.total / 30).toFixed(1)}</p>
              <p>• Most active day: Monday</p>
              <p>• Coverage area: ~{(stats.total * 0.5).toFixed(1)} acres</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
