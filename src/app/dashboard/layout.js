"use client"; // Mark as a Client Component
import { useState } from "react";
import { Navbar } from "./components/ui/Navbar";
import { Sidebar } from "./components/ui/Sidebar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar hidden by default on small screens

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content Area */}
        <main
          className={`min-w-[400px] mt-10 pt-12 overflow-hidden flex-1 p-4 bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
            isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 "
          } `} // No margin on small screens when sidebar is open
        >
          {children}
        </main>
      </div>
    </div>
  );
}
