import React from "react";
import { Navbar } from "./Navbar";
import { Notification } from "../common/Notification";

export const Layout = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      {/* Notifications */}
      <Notification />

      {/* Top Navigation */}
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 relative">
        <div className="max-w-7xl mx-auto p-4 lg:p-6 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};
