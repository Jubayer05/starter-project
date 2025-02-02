"use client";
export function RecentActivityWidget({ activities }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-white">
        Recent Activity
      </h2>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
