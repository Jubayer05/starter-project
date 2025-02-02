"use client";

import { RecentActivityWidget } from "./components/ui/RecentActivityWidget";
import { StatsWidget } from "./components/ui/StatsWidget";

export default function DashboardPage() {
  const activities = ["User logged in", "New order placed", "Profile updated"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsWidget title="Total Users" value="1,234" icon="👥" />
        <StatsWidget title="Revenue" value="$12,345" icon="💰" />
        <StatsWidget title="Tasks Completed" value="56" icon="✅" />
      </div>
      {/* <ChartWidget /> */}
      <RecentActivityWidget activities={activities} />
    </div>
  );
}
