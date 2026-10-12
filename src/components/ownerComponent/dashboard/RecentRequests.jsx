import { useEffect, useState } from "react";
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getOwnerRequests,
  updateRequestStatus,
} from "../../../api/request.api";

function RecentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRecentRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOwnerRequests();

      const data = response?.requests || response || [];

      // Latest requests first
      const sortedRequests = [...data].sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

      // Dashboard par sirf latest 5 requests
      setRequests(sortedRequests.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch recent requests:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load recent requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const handleStatusUpdate = async (requestId, status) => {
    try {
      setUpdatingId(requestId);

      await updateRequestStatus(requestId, status);

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status,
              }
            : request
        )
      );
    } catch (error) {
      console.error("Failed to update request status:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update request status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-bold text-slate-900">
            Recent Room Requests
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Review the latest requests from students
          </p>
        </div>

        <Link
          to="/owner/requests"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF3E9B] transition hover:text-pink-700"
        >
          Manage Requests
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="px-5 py-10 text-center sm:px-6">
          <p className="text-sm text-slate-500">
            Loading recent requests...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="px-5 py-5 sm:px-6">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && requests.length === 0 && (
        <div className="px-5 py-10 text-center sm:px-6">
          <p className="text-sm font-semibold text-slate-700">
            No room requests yet.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Student requests will appear here when someone requests a
            visit.
          </p>
        </div>
      )}

      {/* Requests */}
      {!loading && !error && requests.length > 0 && (
        <div className="divide-y divide-slate-100">
          {requests.map((request) => {
            const studentName =
              request.student?.name || "Unknown Student";

            const roomTitle =
              request.room?.title || "Room";

            const location =
              request.room?.location || "Location not available";

            const isPending = request.status === "pending";
            const isUpdating = updatingId === request._id;

            return (
              <div
                key={request._id}
                className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6"
              >
                {/* Student Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-50 text-sm font-bold text-[#FF3E9B]">
                  {getInitials(studentName)}
                </div>

                {/* Request Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {studentName}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        request.status === "accepted"
                          ? "bg-green-50 text-green-700"
                          : request.status === "rejected"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {request.status === "accepted"
                        ? "Accepted"
                        : request.status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Interested in{" "}
                    <span className="font-medium text-slate-700">
                      {roomTitle}
                    </span>
                  </p>

                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {location}
                    </span>

                    <span>
                      {request.preferredDate
                        ? formatDate(request.preferredDate)
                        : formatDate(request.createdAt)}
                    </span>

                    {request.preferredTime && (
                      <span>
                        {request.preferredTime}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {isPending ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleStatusUpdate(
                          request._id,
                          "accepted"
                        )
                      }
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#19CF37] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <CheckCircle2 size={15} />

                      {isUpdating
                        ? "Updating..."
                        : "Accept"}
                    </button>

                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleStatusUpdate(
                          request._id,
                          "rejected"
                        )
                      }
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <XCircle size={15} />
                      Reject
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/owner/requests"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-[#19CF37] hover:text-[#19CF37]"
                  >
                    <Eye size={15} />
                    View
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RecentRequests;