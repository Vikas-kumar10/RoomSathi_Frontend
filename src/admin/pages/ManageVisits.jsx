import { CalendarDays, Eye, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAllVisits } from "../../api/visit.api";
import VisitDetailsModal from "../components/VisitDetailsModal"

function ManageVisits() {
  const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVisit, setSelectedVisit] = useState(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllVisits();

        setVisits(response?.visits || []);
      } catch (error) {
        console.error("Get all visits error:", error);

        setError(
          error?.response?.data?.message ||
            "Failed to fetch visits."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  const getVisitId = (id) => {
    if (!id) return "N/A";

    return `#${id.slice(-6).toUpperCase()}`;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatStatus = (status) => {
    if (!status) return "Upcoming";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  const filteredVisits = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return visits;
    }

    return visits.filter((visit) => {
      const searchableText = [
        visit._id,
        visit.student?.name,
        visit.student?.email,
        visit.owner?.name,
        visit.owner?.email,
        visit.room?.title,
        visit.room?.location,
        visit.status,
        visit.scheduledTime,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchValue);
    });
  }, [visits, search]);

  const totalVisits = visits.length;

  const upcomingVisits = visits.filter(
    (visit) => visit.status === "upcoming"
  ).length;

  const completedVisits = visits.filter(
    (visit) => visit.status === "completed"
  ).length;

  const cancelledVisits = visits.filter(
    (visit) => visit.status === "cancelled"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Manage Visits
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor scheduled room visits.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Visits
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {totalVisits}
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Upcoming
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {upcomingVisits}
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {completedVisits}
          </p>
        </div>

        {/* Cancelled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Cancelled
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {cancelledVisits}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search student, owner, room..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-950px">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Visit
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Student
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Owner
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Room
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Schedule
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading visits...
                  </td>
                </tr>
              ) : filteredVisits.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    {search
                      ? "No visits found for your search."
                      : "No visits available."}
                  </td>
                </tr>
              ) : (
                filteredVisits.map((visit) => {
                  const status = visit.status || "upcoming";

                  return (
                    <tr
                      key={visit._id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Visit ID */}
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {getVisitId(visit._id)}
                      </td>

                      {/* Student */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {visit.student?.name || "N/A"}
                        </p>

                        {visit.student?.email && (
                          <p className="mt-1 text-xs text-slate-400">
                            {visit.student.email}
                          </p>
                        )}
                      </td>

                      {/* Owner */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {visit.owner?.name || "N/A"}
                        </p>

                        {visit.owner?.email && (
                          <p className="mt-1 text-xs text-slate-400">
                            {visit.owner.email}
                          </p>
                        )}
                      </td>

                      {/* Room */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {visit.room?.title || "N/A"}
                        </p>

                        {visit.room?.location && (
                          <p className="mt-1 text-xs text-slate-400">
                            {visit.room.location}
                          </p>
                        )}
                      </td>

                      {/* Schedule */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {formatDate(visit.scheduledDate)}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {visit.scheduledTime || "N/A"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "completed"
                              ? "bg-green-100 text-green-700"
                              : status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {formatStatus(status)}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedVisit(visit)
                          }
                          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                          title="View Visit Details"
                          aria-label="View Visit Details"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visit Details Modal */}
      <VisitDetailsModal
        visit={selectedVisit}
        onClose={() => setSelectedVisit(null)}
      />
    </div>
  );
}

export default ManageVisits;