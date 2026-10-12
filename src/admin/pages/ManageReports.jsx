import {
  CheckCircle2,
  Eye,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  deleteReport,
  getAllReports,
  updateReportStatus,
} from "../../api/report.api";

function ManageReports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================
  // FETCH REPORTS
  // =====================================

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllReports();

      setReports(response?.reports || []);
    } catch (error) {
      console.error("Fetch reports error:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // =====================================
  // UPDATE STATUS
  // =====================================

  const handleResolve = async (reportId) => {
    try {
      setActionLoading(true);

      await updateReportStatus(
        reportId,
        "resolved"
      );

      setReports((previousReports) =>
        previousReports.map((report) =>
          report._id === reportId
            ? {
                ...report,
                status: "resolved",
              }
            : report
        )
      );

      if (selectedReport?._id === reportId) {
        setSelectedReport((previous) => ({
          ...previous,
          status: "resolved",
        }));
      }
    } catch (error) {
      console.error(
        "Resolve report error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to resolve report."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================
  // DELETE REPORT
  // =====================================

  const handleDelete = async (reportId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      await deleteReport(reportId);

      setReports((previousReports) =>
        previousReports.filter(
          (report) => report._id !== reportId
        )
      );

      if (selectedReport?._id === reportId) {
        setSelectedReport(null);
      }
    } catch (error) {
      console.error(
        "Delete report error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete report."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================
  // HELPERS
  // =====================================

  const getReportId = (id) => {
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

  const formatType = (type) => {
    if (!type) return "N/A";

    return type
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
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

  const getTargetName = (report) => {
    if (report.targetRoom?.title) {
      return report.targetRoom.title;
    }

    if (report.targetUser?.name) {
      return report.targetUser.name;
    }

    if (report.targetRequest?._id) {
      return `Request #${report.targetRequest._id
        .slice(-6)
        .toUpperCase()}`;
    }

    if (report.targetVisit?._id) {
      return `Visit #${report.targetVisit._id
        .slice(-6)
        .toUpperCase()}`;
    }

    return "N/A";
  };

  // =====================================
  // STATISTICS
  // =====================================

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "pending"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "resolved"
  ).length;

  return (
    <div className="space-y-6">
      {/* =====================================
          HEADER
      ===================================== */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Manage Reports
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review reports submitted by students
          and owners.
        </p>
      </div>

      {/* =====================================
          STATS
      ===================================== */}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Reports
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalReports}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {pendingReports}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Resolved
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {resolvedReports}
          </p>
        </div>
      </div>

      {/* =====================================
          TABLE
      ===================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-slate-50">
              <tr>
                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Report
                </th>

                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Type
                </th>

                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Reported By
                </th>

                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Target
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
                    Loading reports...
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
                      onClick={fetchReports}
                      className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                /* Empty */

                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No reports found.
                  </td>
                </tr>
              ) : (
                /* Data */

                reports.map((report) => (
                  <tr
                    key={report._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                      {getReportId(report._id)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {formatType(report.type)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-medium text-slate-700">
                        {report.reportedBy?.name ||
                          "N/A"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {report.reporterRole || ""}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      <div className="max-w-xs">
                        {getTargetName(report)}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {formatDate(report.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          report.status
                        )}`}
                      >
                        {formatType(
                          report.status
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {/* View */}

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedReport(
                              report
                            )
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          title="View report"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Resolve */}

                        {report.status !==
                          "resolved" &&
                          report.status !==
                            "rejected" && (
                            <button
                              type="button"
                              disabled={
                                actionLoading
                              }
                              onClick={() =>
                                handleResolve(
                                  report._id
                                )
                              }
                              className="rounded-lg border border-green-200 p-2 text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                              title="Resolve report"
                            >
                              <CheckCircle2
                                size={16}
                              />
                            </button>
                          )}

                        {/* Delete */}

                        <button
                          type="button"
                          disabled={
                            actionLoading
                          }
                          onClick={() =>
                            handleDelete(
                              report._id
                            )
                          }
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete report"
                        >
                          <Trash2 size={16} />
                        </button>
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

      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() =>
            setSelectedReport(null)
          }
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Report Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {getReportId(
                    selectedReport._id
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedReport(null)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            <div className="max-h-screen overflow-y-auto p-5 sm:max-h-[70vh] sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Type */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Report Type
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {formatType(
                      selectedReport.type
                    )}
                  </p>
                </div>

                {/* Status */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      selectedReport.status
                    )}`}
                  >
                    {formatType(
                      selectedReport.status
                    )}
                  </span>
                </div>

                {/* Reported By */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Reported By
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedReport
                      .reportedBy?.name ||
                      "N/A"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedReport
                      .reportedBy?.email ||
                      "N/A"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Role:{" "}
                    {selectedReport
                      .reporterRole ||
                      "N/A"}
                  </p>
                </div>

                {/* Target */}

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Target
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {getTargetName(
                      selectedReport
                    )}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Type:{" "}
                    {selectedReport
                      .targetType ||
                      "N/A"}
                  </p>
                </div>
              </div>

              {/* Description */}

              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Description
                </p>

                <p className="mt-2 whitespace-normal text-sm leading-6 text-slate-600">
                  {selectedReport.description ||
                    "No description provided."}
                </p>
              </div>

              {/* Admin Note */}

              {selectedReport.adminNote && (
                <div className="mt-4 rounded-xl bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase text-blue-500">
                    Admin Note
                  </p>

                  <p className="mt-2 whitespace-normal text-sm leading-6 text-blue-700">
                    {selectedReport.adminNote}
                  </p>
                </div>
              )}

              {/* Date */}

              <div className="mt-4 text-sm text-slate-500">
                Submitted:{" "}
                {formatDate(
                  selectedReport.createdAt
                )}
              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              {selectedReport.status !==
                "resolved" &&
                selectedReport.status !==
                  "rejected" && (
                  <button
                    type="button"
                    disabled={actionLoading}
                    onClick={() =>
                      handleResolve(
                        selectedReport._id
                      )
                    }
                    className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    Resolve
                  </button>
                )}

              <button
                type="button"
                onClick={() =>
                  setSelectedReport(null)
                }
                className="w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
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

export default ManageReports;