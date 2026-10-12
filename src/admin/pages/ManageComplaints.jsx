import {
  CheckCircle2,
  Eye,
  MessageSquareWarning,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getAllComplaints,
  updateComplaintStatus,
} from "../../api/complaint.api";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================
  // FETCH COMPLAINTS
  // =====================================

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllComplaints();

      setComplaints(response?.complaints || []);
    } catch (error) {
      console.error(
        "Fetch complaints error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to load complaints."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // =====================================
  // RESOLVE COMPLAINT
  // =====================================

  const handleResolve = async (complaintId) => {
    try {
      setActionLoading(true);

      await updateComplaintStatus(
        complaintId,
        "resolved"
      );

      setComplaints((previousComplaints) =>
        previousComplaints.map((complaint) =>
          complaint._id === complaintId
            ? {
                ...complaint,
                status: "resolved",
              }
            : complaint
        )
      );

      if (
        selectedComplaint?._id === complaintId
      ) {
        setSelectedComplaint((previous) => ({
          ...previous,
          status: "resolved",
        }));
      }
    } catch (error) {
      console.error(
        "Resolve complaint error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to resolve complaint."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================
  // HELPERS
  // =====================================

  const getComplaintId = (id) => {
    if (!id) {
      return "N/A";
    }

    return `#${id.slice(-6).toUpperCase()}`;
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

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

  const formatValue = (value) => {
    if (!value) {
      return "N/A";
    }

    return value
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";

      case "medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-700";

      case "investigating":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // =====================================
  // STATISTICS
  // =====================================

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "resolved"
  ).length;

  return (
    <div className="space-y-6">
      {/* =====================================
          HEADER
      ===================================== */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Manage Complaints
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review and resolve platform complaints.
        </p>
      </div>

      {/* =====================================
          STATS
      ===================================== */}

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Total */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Complaints
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalComplaints}
          </p>
        </div>

        {/* Pending */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {pendingComplaints}
          </p>
        </div>

        {/* Resolved */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Resolved
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {resolvedComplaints}
          </p>
        </div>
      </div>

      {/* =====================================
          TABLE
      ===================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Complaint
                </th>

                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  User
                </th>

                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Subject
                </th>

                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Priority
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
              {/* Loading */}

              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading complaints...
                  </td>
                </tr>
              ) : error ? (
                /* Error */

                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center"
                  >
                    <p className="text-sm text-red-500">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={fetchComplaints}
                      className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : complaints.length === 0 ? (
                /* Empty */

                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No complaints found.
                  </td>
                </tr>
              ) : (
                /* Data */

                complaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Complaint */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-pink-100 p-2 text-pink-600">
                          <MessageSquareWarning
                            size={16}
                          />
                        </div>

                        <span className="text-sm font-semibold text-slate-900">
                          {getComplaintId(
                            complaint._id
                          )}
                        </span>
                      </div>
                    </td>

                    {/* User */}

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-medium text-slate-700">
                        {complaint.user?.name ||
                          "N/A"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {complaint.userRole || ""}
                      </p>
                    </td>

                    {/* Subject */}

                    <td className="max-w-xs px-5 py-4">
                      <p className="truncate text-sm text-slate-600">
                        {complaint.subject ||
                          "N/A"}
                      </p>
                    </td>

                    {/* Priority */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClasses(
                          complaint.priority
                        )}`}
                      >
                        {formatValue(
                          complaint.priority
                        )}
                      </span>
                    </td>

                    {/* Date */}

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {formatDate(
                        complaint.createdAt
                      )}
                    </td>

                    {/* Status */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          complaint.status
                        )}`}
                      >
                        {formatValue(
                          complaint.status
                        )}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex gap-2">
                        {/* View */}

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedComplaint(
                              complaint
                            )
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          title="View complaint"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Resolve */}

                        {complaint.status !==
                          "resolved" &&
                          complaint.status !==
                            "rejected" && (
                            <button
                              type="button"
                              disabled={
                                actionLoading
                              }
                              onClick={() =>
                                handleResolve(
                                  complaint._id
                                )
                              }
                              className="rounded-lg border border-green-200 p-2 text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                              title="Resolve complaint"
                            >
                              <CheckCircle2
                                size={16}
                              />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================
          DETAILS MODAL
      ===================================== */}

      {selectedComplaint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() =>
            setSelectedComplaint(null)
          }
        >
          <div
            className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* =====================================
                MODAL HEADER
            ===================================== */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Complaint Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {getComplaintId(
                    selectedComplaint._id
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedComplaint(null)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close complaint details"
              >
                <X size={20} />
              </button>
            </div>

            {/* =====================================
                MODAL BODY
            ===================================== */}

            <div className="overflow-y-auto p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* User */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    User
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedComplaint.user
                      ?.name || "N/A"}
                  </p>

                  <p className="mt-1  text-sm text-slate-500">
                    {selectedComplaint.user
                      ?.email || "N/A"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Role:{" "}
                    {selectedComplaint.userRole ||
                      "N/A"}
                  </p>
                </div>

                {/* Priority */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Priority
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClasses(
                      selectedComplaint.priority
                    )}`}
                  >
                    {formatValue(
                      selectedComplaint.priority
                    )}
                  </span>
                </div>

                {/* Status */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      selectedComplaint.status
                    )}`}
                  >
                    {formatValue(
                      selectedComplaint.status
                    )}
                  </span>
                </div>

                {/* Date */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Submitted
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {formatDate(
                      selectedComplaint.createdAt
                    )}
                  </p>
                </div>
              </div>

              {/* Subject */}

              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Subject
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {selectedComplaint.subject ||
                    "N/A"}
                </p>
              </div>

              {/* Description */}

              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Description
                </p>

                <p className="mt-2 whitespace-pre-wrap  text-sm leading-6 text-slate-600">
                  {selectedComplaint.description ||
                    "No description provided."}
                </p>
              </div>

              {/* Admin Note */}

              {selectedComplaint.adminNote && (
                <div className="mt-4 rounded-xl bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase text-blue-500">
                    Admin Note
                  </p>

                  <p className="mt-2 whitespace-pre-wrap  text-sm leading-6 text-blue-700">
                    {selectedComplaint.adminNote}
                  </p>
                </div>
              )}
            </div>

            {/* =====================================
                MODAL FOOTER
            ===================================== */}

            <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
              {selectedComplaint.status !==
                "resolved" &&
                selectedComplaint.status !==
                  "rejected" && (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() =>
                      handleResolve(
                        selectedComplaint._id
                      )
                    }
                    className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading
                      ? "Resolving..."
                      : "Resolve"}
                  </button>
                )}

              <button
                type="button"
                onClick={() =>
                  setSelectedComplaint(null)
                }
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageComplaints;