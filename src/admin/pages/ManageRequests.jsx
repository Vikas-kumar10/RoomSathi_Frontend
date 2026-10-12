import { Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { getAllRequests } from "../../api/request.api";
import RequestDetailsModal from "../components/RequestDetailsModal";

function ManageRequests() {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch Requests
  // ==========================================

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllRequests();

      setRequests(response?.requests || []);
    } catch (error) {
      console.error("Failed to fetch requests:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ==========================================
  // Search Requests
  // ==========================================

  const filteredRequests = requests.filter((request) => {
    const searchText = `
      ${request.student?.name || ""}
      ${request.student?.email || ""}
      ${request.owner?.name || ""}
      ${request.owner?.email || ""}
      ${request.room?.title || ""}
      ${request.room?.location || ""}
      ${request.status || ""}
      ${request._id || ""}
    `.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  // ==========================================
  // Request Statistics
  // ==========================================

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const acceptedRequests = requests.filter(
    (request) => request.status === "accepted"
  ).length;

  // ==========================================
  // Request ID
  // ==========================================

  const getRequestId = (id) => {
    if (!id) return "N/A";

    return `#${id.slice(-6).toUpperCase()}`;
  };

  // ==========================================
  // Format Date
  // ==========================================

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

  // ==========================================
  // Status Formatting
  // ==========================================

  const formatStatus = (status) => {
    if (!status) return "Pending";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  // ==========================================
  // Open Request Details
  // ==========================================

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  // ==========================================
  // Close Request Details
  // ==========================================

  const handleCloseRequest = () => {
    setSelectedRequest(null);
  };

  return (
    <>
      <div className="space-y-6">
        {/* ==========================================
            Header
        ========================================== */}

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Manage Requests
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View all room visit requests across the
            platform.
          </p>
        </div>

        {/* ==========================================
            Statistics
        ========================================== */}

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Total */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Requests
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {totalRequests}
            </p>
          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {pendingRequests}
            </p>
          </div>

          {/* Accepted */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Accepted
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {acceptedRequests}
            </p>
          </div>
        </div>

        {/* ==========================================
            Search
        ========================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search student, owner, room, location or status..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        {/* ==========================================
            Loading
        ========================================== */}

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading requests...
            </p>
          </div>
        )}

        {/* ==========================================
            Error
        ========================================== */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchRequests}
              className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ==========================================
            Empty State
        ========================================== */}

        {!loading &&
          !error &&
          requests.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                No requests found.
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Room visit requests will appear here.
              </p>
            </div>
          )}

        {/* ==========================================
            Search Empty State
        ========================================== */}

        {!loading &&
          !error &&
          requests.length > 0 &&
          filteredRequests.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                No matching requests found.
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try searching with another keyword.
              </p>
            </div>
          )}

        {/* ==========================================
            Requests Table
        ========================================== */}

        {!loading &&
          !error &&
          filteredRequests.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                        Request
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                        Student
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                        Room
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                        Owner
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                        Date
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                        Status
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredRequests.map((request) => {
                      const status =
                        request.status || "pending";

                      return (
                        <tr
                          key={request._id}
                          className="transition hover:bg-slate-50"
                        >
                          {/* Request ID */}

                          <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                            {getRequestId(request._id)}
                          </td>

                          {/* Student */}

                          <td className="px-5 py-4">
                            <div className="max-w-xs">
                              <p className="truncate text-sm font-medium text-slate-900">
                                {request.student?.name ||
                                  "N/A"}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-400">
                                {request.student?.email ||
                                  ""}
                              </p>
                            </div>
                          </td>

                          {/* Room */}

                          <td className="px-5 py-4">
                            <div className="max-w-xs">
                              <p className="truncate text-sm font-medium text-slate-900">
                                {request.room?.title ||
                                  "N/A"}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-400">
                                {request.room?.location ||
                                  ""}
                              </p>
                            </div>
                          </td>

                          {/* Owner */}

                          <td className="px-5 py-4">
                            <div className="max-w-xs">
                              <p className="truncate text-sm font-medium text-slate-900">
                                {request.owner?.name ||
                                  "N/A"}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-400">
                                {request.owner?.email ||
                                  ""}
                              </p>
                            </div>
                          </td>

                          {/* Date */}

                          <td className="whitespace-nowrap px-5 py-4">
                            <div>
                              <p className="text-sm text-slate-600">
                                {formatDate(
                                  request.preferredDate
                                )}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {request.preferredTime ||
                                  ""}
                              </p>
                            </div>
                          </td>

                          {/* Status */}

                          <td className="whitespace-nowrap px-5 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                status === "accepted"
                                  ? "bg-green-100 text-green-700"
                                  : status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {formatStatus(status)}
                            </span>
                          </td>

                          {/* Action */}

                          <td className="whitespace-nowrap px-5 py-4">
                            <button
                              type="button"
                              onClick={() =>
                                handleViewRequest(
                                  request
                                )
                              }
                              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                              title="View Request Details"
                              aria-label="View Request Details"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>

      {/* ==========================================
          Request Details Modal
      ========================================== */}

      <RequestDetailsModal
        request={selectedRequest}
        onClose={handleCloseRequest}
      />
    </>
  );
}

export default ManageRequests;