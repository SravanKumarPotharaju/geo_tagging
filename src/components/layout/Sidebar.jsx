import React from "react";
import { Home, Upload, Map, Package, BarChart3, X } from "lucide-react";
import { ROUTES } from "../../utils/constants";

export const Sidebar = ({ currentPage, onNavigate, isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", route: ROUTES.DASHBOARD },
    { icon: Map, label: "Farm Map", route: ROUTES.MAP },
    { icon: Upload, label: "Upload Plant", route: ROUTES.UPLOAD },
    { icon: Package, label: "Inventory", route: ROUTES.INVENTORY },
    { icon: BarChart3, label: "Analytics", route: ROUTES.ANALYTICS },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-100 w-72 z-50 transform transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-600/20">
              <Map className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">GeoTag</h1>
              <p className="text-[10px] font-medium text-green-600 uppercase tracking-wider">Farm Manager</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 py-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.route;

            return (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                    ? "bg-green-50 text-green-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-600 rounded-r-full" />
                )}
                <Icon size={22} className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`font-medium ${isActive ? "font-semibold" : ""}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100 text-center">
            <p className="text-xs font-medium text-green-800 mb-2">Need Help?</p>
            <button className="text-xs bg-white text-green-700 px-3 py-2 rounded-lg shadow-sm border border-green-200 font-semibold w-full hover:bg-green-50 transition-colors">Contact Support</button>
          </div>
        </div>
      </aside>
    </>
  );
};
