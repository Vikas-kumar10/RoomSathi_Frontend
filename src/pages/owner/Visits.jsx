import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  getOwnerRequests,
  updateRequestStatus,
} from "../../api/request.api";

function Visits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOwnerRequests();

      const requests = response.requests || response || [];

      setVisits(requests);
    } catch (error) {
      console.error("Failed to fetch visits:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load student visits."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleStatusUpdate = async (requestId, status) => {
    try {
      setUpdatingId(requestId);

      await updateRequestStatus(requestId, status);

      // Refresh visits after status update
      await fetchVisits();
    } catch (error) {
      console.error("Failed to update visit status:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update visit status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const upcomingVisits = visits.filter(
    (visit) => visit.status === "accepted"
  );

  const completedVisits = visits.filter(
    (visit) => visit.status === "completed"
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-purple-600">
            Visit Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Student Visits
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage students who have scheduled a room visit.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Upcoming
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {upcomingVisits.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {completedVisits.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Total Visits
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {visits.length}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              Loading student visits...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && visits.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <CalendarCheck
              size={36}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-base font-bold text-slate-800">
              No visits found
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Student visit requests will appear here.
            </p>
          </div>
        )}

        {/* Visits */}
        {!loading && visits.length > 0 && (
          <div className="space-y-4">
            {visits.map((visit) => {
              const studentName =
                visit.student?.name || "Student";

              const roomTitle =
                visit.room?.title || "Room";

              const location =
                visit.room?.location || "Location not available";

              const status = visit.status || "pending";

              return (
                <div
                  key={visit._id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    {/* Student Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-50 font-bold text-purple-600">
                      {studentName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    {/* Visit Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-slate-900">
                          {studentName}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "accepted"
                              ? "bg-purple-50 text-purple-600"
                              : status === "completed"
                              ? "bg-green-50 text-green-700"
                              : status === "rejected" ||
                                status === "cancelled"
                              ? "bg-red-50 text-red-600"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {status === "accepted"
                            ? "Upcoming"
                            : status.charAt(0).toUpperCase() +
                              status.slice(1)}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {roomTitle}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                        {/* Date */}
                        <span className="flex items-center gap-1.5">
                          <CalendarCheck size={14} />
                          {visit.preferredDate ||
                            "Date not selected"}
                        </span>

                        {/* Time */}
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={14} />
                          {visit.preferredTime ||
                            "Time not selected"}
                        </span>

                        {/* Location */}
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {location}
                        </span>

                        {/* Phone */}
                        {visit.student?.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone size={14} />
                            {visit.student.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {status === "accepted" ? (
                        <>
                          <button
                            type="button"
                            disabled={updatingId === visit._id}
                            onClick={() =>
                              handleStatusUpdate(
                                visit._id,
                                "completed"
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-xl border border-green-200 px-4 py-2.5 text-xs font-semibold text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <CheckCircle2 size={15} />

                            {updatingId === visit._id
                              ? "Updating..."
                              : "Complete"}
                          </button>

                          <button
                            type="button"
                            disabled={updatingId === visit._id}
                            onClick={() =>
                              handleStatusUpdate(
                                visit._id,
                                "cancelled"
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-xl border border-red-100 px-4 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <XCircle size={15} />
                            Cancel
                          </button>
                        </>
                      ) : status === "completed" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 px-4 py-2.5 text-xs font-semibold text-green-700">
                          <CheckCircle2 size={15} />
                          Completed
                        </span>
                      ) : status === "cancelled" ||
                        status === "rejected" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">
                          <XCircle size={15} />
                          {status === "cancelled"
                            ? "Cancelled"
                            : "Rejected"}
                        </span>
                      ) : (
                        <span className="rounded-xl bg-yellow-50 px-4 py-2.5 text-xs font-semibold text-yellow-700">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Visits;