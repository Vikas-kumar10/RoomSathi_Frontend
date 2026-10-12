import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Building2,
  ClipboardList,
  MessageSquareWarning,
  UserRound,
  Users,
} from "lucide-react";

import StatCard from "../components/StatCard";
import { getAdminDashboard } from "../../api/admin.api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalOwners: 0,
    totalRooms: 0,
    totalRequests: 0,
    totalReports: 0,
    totalComplaints: 0,
  });

  const [recentRooms, setRecentRooms] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboard();

        if (data.success) {
          setStats(data.stats);
          setRecentRooms(data.recentRooms || []);
          setRecentReports(data.recentReports || []);
        }
      } catch (err) {
        console.error("Failed to fetch admin dashboard:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor and manage your RoomSaathi platform.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Students"
          value={loading ? "..." : stats.totalStudents}
          subtitle="Registered students"
          icon={Users}
          iconClass="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Total Owners"
          value={loading ? "..." : stats.totalOwners}
          subtitle="Registered owners"
          icon={UserRound}
          iconClass="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Total Rooms"
          value={loading ? "..." : stats.totalRooms}
          subtitle="Rooms listed on platform"
          icon={Building2}
          iconClass="bg-green-100 text-green-600"
        />

        <StatCard
          title="Total Requests"
          value={loading ? "..." : stats.totalRequests}
          subtitle="Total visit requests"
          icon={ClipboardList}
          iconClass="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="Reports"
          value={loading ? "..." : stats.totalReports}
          subtitle="Total submitted reports"
          icon={AlertTriangle}
          iconClass="bg-red-100 text-red-600"
        />

        <StatCard
          title="Complaints"
          value={loading ? "..." : stats.totalComplaints}
          subtitle="Total submitted complaints"
          icon={MessageSquareWarning}
          iconClass="bg-pink-100 text-pink-600"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-bold text-slate-900">
                Recent Room Approvals
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest rooms submitted by owners
              </p>
            </div>

            <a
              href="/admin/rooms"
              className="text-sm font-semibold text-cyan-600 hover:text-cyan-700"
            >
              View All
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Room
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Owner
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-8 text-center text-sm text-slate-500"
                    >
                      Loading rooms...
                    </td>
                  </tr>
                ) : recentRooms.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-8 text-center text-sm text-slate-500"
                    >
                      No rooms found.
                    </td>
                  </tr>
                ) : (
                  recentRooms.map((room) => (
                    <tr
                      key={room._id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {room.title}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {room.owner?.name || "Unknown"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {room.location}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            room.approvalStatus === "approved"
                              ? "bg-green-100 text-green-700"
                              : room.approvalStatus === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {room.approvalStatus
                            ? room.approvalStatus.charAt(0).toUpperCase() +
                              room.approvalStatus.slice(1)
                            : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold text-slate-900">
              Recent Reports
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Reports that require admin attention
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <p className="p-5 text-sm text-slate-500">
                Loading reports...
              </p>
            ) : recentReports.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">
                No reports found.
              </p>
            ) : (
              recentReports.map((report) => (
                <div
                  key={report._id}
                  className="p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                      <AlertTriangle size={17} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {report.title || report.reason || "Room report"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Reported by{" "}
                        {report.reportedBy?.name ||
                          report.user?.name ||
                          report.reporter?.name ||
                          "User"}
                      </p>

                      <span
                        className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                          ["resolved", "approved", "closed"].includes(
                            report.status?.toLowerCase()
                          )
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {report.status
                          ? report.status.charAt(0).toUpperCase() +
                            report.status.slice(1)
                          : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;