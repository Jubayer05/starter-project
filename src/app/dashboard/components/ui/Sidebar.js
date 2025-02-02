"use client"; // Mark as a Client Component
import {
  BarChart,
  Book,
  ChevronDown,
  ChevronRight,
  Cog,
  HelpCircleIcon,
  Home,
  LogOut,
  PersonStanding,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export function Sidebar({ isSidebarOpen }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItems = [
    {
      id: 1,
      label: "Overview",
      link: "/dashboard",
      icon: Home, // Icon component
    },
    {
      id: 2,
      label: "Courses",
      icon: Book, // Icon component
      children: [
        {
          id: 3,
          label: "Course 1",
          link: "/dashboard/courses/course1",
          icon: Book, // Icon component
        },
        {
          id: 4,
          label: "Course 2",
          link: "/dashboard/courses/course2",
          icon: Book, // Icon component
        },
      ],
    },
    {
      id: 6,
      label: "Profile",
      link: `/dashboard/profile`,
      icon: Cog, // Icon component
    },
    {
      id: 7,
      label: "Update Profile",
      link: "/dashboard/profile/update-profile",
      icon: BarChart, // Icon component
    },
    {
      id: 8,
      label: "Users",
      icon: PersonStanding, // Icon component
      children: [
        {
          id: 9,
          label: "User 1",
          link: "/dashboard/users/user1",
          icon: Book, // Icon component
        },
        {
          id: 10,
          label: "User 2",
          link: "/dashboard/users/user2",
          icon: Book, // Icon component
        },
      ],
    },
    {
      id: 11,
      label: "Support",
      link: "/dashboard/support",
      icon: HelpCircleIcon, // Icon component
    },
  ];

  const handleClick = () => {
    toast.success("Action completed successfully!"); // Trigger a success toast
  };

  return (
    <aside
      className={`w-64 bg-white shadow dark:bg-gray-700 p-4 fixed h-full transition-all duration-300 flex flex-col z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      }`} // Always visible on medium screens and above
    >
      {/* Brand Logo and Collapse Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Brand</h1>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.children ? (
                // Expandable Item
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center justify-between transition-all duration-300"
                  >
                    <div className="flex items-center text-black dark:text-white">
                      {item.icon && <item.icon className="mr-2" />}{" "}
                      {/* Render Icon */}
                      <span>{item.label}</span>
                    </div>
                    <span>
                      {openSubmenu === item.label ? (
                        <ChevronDown className="text-black dark:text-white" />
                      ) : (
                        <ChevronRight className="text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                  {openSubmenu === item.label && (
                    <ul className="pl-6 mt-2 space-y-2">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            href={child.link}
                            className="flex items-center p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all duration-300"
                          >
                            {child.icon && <child.icon className="mr-2" />}{" "}
                            {/* Render Icon */}
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Direct Link
                <Link
                  href={item.link}
                  className="flex items-center p-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all duration-300"
                >
                  {item.icon && <item.icon className="mr-2" />}{" "}
                  {/* Render Icon */}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button at the Bottom */}
      <div className="mt-auto">
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
        >
          <span>Logout</span>
          <LogOut className="mr-2" /> {/* Icon */}
        </button>
      </div>
    </aside>
  );
}
