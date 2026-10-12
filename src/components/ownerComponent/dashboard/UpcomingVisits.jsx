import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getOwnerRequests } from "../../../api/request.api";

function UpcomingVisits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUpcomingVisits = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOwnerRequests();

      const requests = response.requests || response || [];

      // Only accepted requests are considered upcoming visits
      const upcoming = requests.filter(
        (request) => request.status === "accepted"
      );

      setVisits(upcoming);
    } catch (error) {
      console.error("Failed to fetch upcoming visits:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load upcoming visits."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingVisits();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <div>
          <h2 className="font-bold text-slate-900">
            Upcoming Visits
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Students visiting your rooms
          </p>
        </div>

        <CalendarCheck size={20} className="text-purple-600" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 text-center">
          <p className="text-sm text-slate-500">
            Loading upcoming visits...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="p-5">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && visits.length === 0 && (
        <div className="p-6 text-center">
          <CalendarCheck
            size={30}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-sm font-semibold text-slate-700">
            No upcoming visits
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Accepted student visit requests will appear here.
          </p>
        </div>
      )}

      {/* Visits */}
      {!loading && !error && visits.length > 0 && (
        <div className="space-y-4 p-5">
          {visits.slice(0, 3).map((visit) => (
            <div
              key={visit._id}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {visit.student?.name || "Student"}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {visit.room?.title || "Room"}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-purple-50 px-2 py-1 text-[11px] font-semibold text-purple-600">
                  Upcoming
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CalendarCheck size={14} />
                  <span>
                    {visit.preferredDate || "Date not selected"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={14} />
                  <span>
                    {visit.preferredTime || "Time not selected"}
                  </span>
                </div>
              </div>

              <Link
                to={`/owner/visits/${visit._id}`}
                className="mt-4 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition hover:border-purple-400 hover:text-purple-600"
              >
                View Visit
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* View All */}
      <div className="border-t border-slate-100 p-5">
        <Link
          to="/owner/visits"
          className="flex items-center justify-center gap-1 text-sm font-semibold text-purple-600 transition hover:text-purple-700"
        >
          View All Visits
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default UpcomingVisits;