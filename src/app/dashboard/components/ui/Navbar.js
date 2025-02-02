"use client"; // Mark as a Client Component
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ toggleSidebar, isSidebarOpen }) {
  return (
    <header className="fixed z-[100] w-full bg-white dark:bg-gray-800 shadow p-4 top-0 h-[70px]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Sidebar Toggle Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? "◀️" : "▶️"}
          </button>
          <h1 className="text-xl font-bold text-black dark:text-white ">
            Dashboard
          </h1>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
