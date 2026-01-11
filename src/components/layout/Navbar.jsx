import React from "react";
import { Menu, Bell, Search, User } from "lucide-react";

export const Navbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Mobile Only Branding */}
          <div className="lg:hidden flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">GeoTag</h1>
          </div>

          {/* Desktop Search / Breadcrumbs (Placeholder) */}
          <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-4 py-2 w-64 border border-gray-100 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="hidden sm:block text-right leading-tight">
              <p className="text-sm font-semibold text-gray-900">John Farmer</p>
              <p className="text-xs text-green-600 font-medium">Head Agronomist</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
