"use client"; // Mark as a Client Component
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering the button until the component is mounted
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
