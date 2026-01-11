import React from "react";
import { Bell, Search, User, Map, LayoutDashboard, Package, BarChart3, UploadCloud } from "lucide-react";
import { ROUTES } from "../../utils/constants";

export const Navbar = ({ currentPage, onNavigate }) => {
  const navItems = [
    { label: "Dashboard", route: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: "Farm Map", route: ROUTES.MAP, icon: Map },
    { label: "Inventory", route: ROUTES.INVENTORY, icon: Package },
    { label: "Analytics", route: ROUTES.ANALYTICS, icon: BarChart3 },
    { label: "Upload", route: ROUTES.UPLOAD, icon: UploadCloud },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <div className="flex items-center gap-8">
          {/* Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(ROUTES.DASHBOARD)}>
            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-600/20">
              <Map className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">GeoTag</h1>
              <p className="text-[10px] font-medium text-green-600 uppercase tracking-wider">Farm Manager</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              const Icon = item.icon;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive
                    ? "bg-green-50 text-green-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={18} className={isActive ? "text-green-600" : ""} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 w-48 border border-gray-100 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-xs ml-2 w-full text-gray-600 placeholder-gray-400"
            />
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>
          <div
            onClick={() => onNavigate(ROUTES.PROFILE)}
            className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className={`w-10 h-10 ${currentPage === ROUTES.PROFILE ? 'ring-2 ring-green-500 ring-offset-2' : ''} bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30`}>
              <User size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Scrollable list at bottom of header) */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = currentPage === item.route;
          return (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${isActive
                ? "bg-green-600 text-white shadow-md shadow-green-600/30"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
