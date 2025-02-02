"use client";
export function StatsWidget({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-gray-500 dark:text-gray-200">{title}</p>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
