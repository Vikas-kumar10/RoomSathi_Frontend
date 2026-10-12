import { useEffect, useState } from "react";
import { Home, Clock3, CheckCircle2, House } from "lucide-react";

import { getOwnerDashboardStats } from "../../../api/ownerDashboardService";

function DashboardStats() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getOwnerDashboardStats();
        console.log("BACKEND RESPONSE:", data);


        setStats({
          totalRooms: data?.stats?.totalRooms ?? 0,
          availableRooms: data?.stats?.availableRooms ?? 0,
          pendingRequests: data?.stats?.pendingRequests ?? 0,
          acceptedRequests: data?.stats?.acceptedRequests ?? 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard statistics.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      description: "Rooms listed by you",
      icon: Home,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      title: "Available Rooms",
      value: stats.availableRooms,
      description: "Currently available",
      icon: House,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      description: "Waiting for your response",
      icon: Clock3,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Accepted Requests",
      value: stats.acceptedRequests,
      description: "Requests you accepted",
      icon: CheckCircle2,
      iconBg: "bg-pink-50",
      iconColor: "text-[#FF3E9B]",
    },
  ];

  if (loading) {
    return (
      <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className="mb-7 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon size={21} className={stat.iconColor} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">{stat.description}</p>
          </div>
        );
      })}
    </section>
  );
}

export default DashboardStats;
