import React, { useEffect } from "react";
import {
  Upload,
  Map as MapIcon,
  Package,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CloudUpload,
  ChevronRight
} from "lucide-react";
import { usePlants } from "../context/PlantsContext";
import { ROUTES } from "../utils/constants";

const StatCard = ({ icon: Icon, label, value, trend, color, trendUp }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.03] transition-transform group-hover:scale-110 ${color}`}></div>
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color.replace('bg-', 'bg-').replace('-500', '-50')} ${color.replace('bg-', 'text-').replace('-500', '-600')} shadow-sm transition-transform group-hover:scale-110`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'} uppercase tracking-wider border ${trendUp ? 'border-green-100' : 'border-gray-100'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
  </div>
);

export const Dashboard = ({ onNavigate }) => {
  const { plants, loading, refreshPlants } = usePlants();

  useEffect(() => {
    refreshPlants();
  }, []);

  const totalPlants = plants.length;
  const uploadedToday = plants.filter((plant) => {
    const today = new Date().toDateString();
    return new Date(plant.uploadedAt).toDateString() === today;
  }).length;

  const recentPlants = plants.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Welcome Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gray-900 p-8 md:p-12 text-white shadow-2xl shadow-gray-900/20">
        {/* Abstract Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -ml-24 -mb-24"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <ShieldCheck size={14} />
              Field Monitoring Active
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-[1.1]">
              Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Green Agriculture</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Precisely track your crop health and spatial distribution with an integrated IoT and Geotagging platform.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => onNavigate(ROUTES.UPLOAD)}
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold transition-all hover:bg-green-50 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5 flex items-center gap-2"
              >
                <CloudUpload size={20} />
                Upload New Data
              </button>
              <button
                onClick={() => onNavigate(ROUTES.MAP)}
                className="px-8 py-4 bg-gray-800 text-white rounded-2xl font-bold transition-all hover:bg-gray-700 hover:scale-[1.02] active:scale-[0.98] border border-gray-700 flex items-center gap-2"
              >
                <MapIcon size={20} />
                Live Map View
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="w-64 h-64 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-[3rem] rotate-12 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <Package size={120} className="text-green-500 opacity-50 -rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Snapshot */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Platform Analytics</h2>
          <button
            onClick={() => onNavigate(ROUTES.ANALYTICS)}
            className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1 transition-colors"
          >
            Deep Insights <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Package}
            label="Tracked Plants"
            value={totalPlants}
            trend="+12%"
            trendUp={true}
            color="bg-blue-500"
          />
          <StatCard
            icon={Calendar}
            label="New Today"
            value={uploadedToday}
            trend="Fresh"
            trendUp={true}
            color="bg-green-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Health Index"
            value="94.2%"
            trend="+1.2%"
            trendUp={true}
            color="bg-emerald-500"
          />
          <StatCard
            icon={MapIcon}
            label="Map Coverage"
            value="88.5%"
            trend="Optimal"
            trendUp={true}
            color="bg-purple-500"
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Uploads */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Recent Plant Records</h3>
              <button onClick={() => onNavigate(ROUTES.INVENTORY)} className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">See All</button>
            </div>
            <div className="p-2">
              {recentPlants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recentPlants.map((plant) => (
                    <div
                      key={plant.id}
                      onClick={() => onNavigate(ROUTES.INVENTORY)}
                      className="p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-100 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                          <img src={plant.imageUrl} alt={plant.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{plant.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapIcon size={10} />
                            {plant.latitude.toFixed(3)}, {plant.longitude.toFixed(3)}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <CloudUpload size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium">Ready for your first data input</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Actions / Tips */}
        <aside className="space-y-6">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl shadow-green-600/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2">Farmer Tip</h4>
              <p className="text-green-100 text-sm leading-relaxed mb-6">
                Sync your data more frequently to get accurate vegetation indices and health alerts.
              </p>
              <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold hover:bg-white/30 transition-all active:scale-95 border border-white/10 uppercase tracking-widest">
                Learn More
              </button>
            </div>
            <Package size={80} className="absolute -bottom-4 -right-4 text-white opacity-10 transition-transform group-hover:rotate-12" />
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Help Center</h4>
            <div className="space-y-3">
              {['Platform Guide', 'API Documentation', 'Community Support'].map((item) => (
                <button key={item} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-600 group">
                  {item}
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};