import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  MapPin,
  Home,
  Phone,
  MessageCircle,
} from "lucide-react";

import { getOwnerRequests, updateRequestStatus } from "../../api/request.api";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // Get Owner Requests
  // ==========================================

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOwnerRequests();

      // Depending on your backend response
      setRequests(data.requests || data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);

      setError(
        error.response?.data?.message || "Failed to load room requests.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ==========================================
  // Accept / Reject Request
  // ==========================================

  const handleStatusUpdate = async (requestId, status) => {
    try {
      setUpdatingId(requestId);
      setError("");

      const response = await updateRequestStatus(requestId, status);

      // Update UI immediately
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status: response.request?.status || status,
              }
            : request,
        ),
      );
    } catch (error) {
      console.error("Failed to update request:", error);

      setError(
        error.response?.data?.message || "Failed to update request status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7">
            <p className="text-sm font-semibold text-[#FF3E9B]">
              Student Requests
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Room Requests
            </h1>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">Loading requests...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-[#FF3E9B]">
            Student Requests
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Room Requests
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review and manage requests from students.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* No Requests */}
        {requests.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Home size={24} className="text-slate-400" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No room requests
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You don't have any student requests yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => {
              const student = request.student || {};
              const room = request.room || {};

              const studentName = student.name || "Student";

              const studentPhone = student.phone || "Phone not available";

              const roomTitle = room.title || "Room";

              const location = room.location || "Location not available";

              const requestStatus = request.status || "pending";

              return (
                <div
                  key={request._id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    {/* Student Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 font-bold text-[#FF3E9B]">
                      {studentName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    {/* Request Information */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-slate-900">
                          {studentName}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            requestStatus === "accepted"
                              ? "bg-green-50 text-green-700"
                              : requestStatus === "rejected"
                                ? "bg-red-50 text-red-600"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {requestStatus}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
                        {/* Room */}
                        <span className="flex items-center gap-2">
                          <Home size={15} />
                          {roomTitle}
                        </span>

                        {/* Location */}
                        <span className="flex items-center gap-2">
                          <MapPin size={15} />
                          {location}
                        </span>

                        {/* Phone */}
                        <span className="flex items-center gap-2">
                          <Phone size={15} />
                          {studentPhone}
                        </span>

                        {/* Date */}
                        <span className="flex items-center gap-2">
                          <Clock3 size={15} />

                          {request.preferredDate
                            ? new Date(
                                request.preferredDate,
                              ).toLocaleDateString()
                            : "Date not selected"}

                          {request.preferredTime && (
                            <span>{request.preferredTime}</span>
                          )}
                        </span>
                      </div>

                      {/* Student Message */}
                      {request.message && (
                        <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3">
                          <p className="text-xs font-semibold text-slate-700">
                            Student Message
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {request.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {/* Message */}
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-[#19CF37] hover:text-[#19CF37]"
                      >
                        <MessageCircle size={15} />
                        Message
                      </button>

                      {/* Pending Actions */}
                      {requestStatus === "pending" && (
                        <>
                          <button
                            type="button"
                            disabled={updatingId === request._id}
                            onClick={() =>
                              handleStatusUpdate(request._id, "accepted")
                            }
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#19CF37] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <CheckCircle2 size={15} />

                            {updatingId === request._id
                              ? "Updating..."
                              : "Accept"}
                          </button>

                          <button
                            type="button"
                            disabled={updatingId === request._id}
                            onClick={() =>
                              handleStatusUpdate(request._id, "rejected")
                            }
                            className="inline-flex items-center gap-1.5 rounded-xl border border-red-100 px-4 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <XCircle size={15} />
                            Reject
                          </button>
                        </>
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

export default Requests;
