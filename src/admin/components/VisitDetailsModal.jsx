import { X } from "lucide-react";

function VisitDetailsModal({ visit, onClose }) {
  if (!visit) return null;

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

  const getVisitId = (id) => {
    if (!id) return "N/A";

    return `#${id.slice(-6).toUpperCase()}`;
  };

  const status = visit.status || "upcoming";

  const getStatusClass = () => {
    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  const formatStatus = (value) => {
    return (
      value.charAt(0).toUpperCase() +
      value.slice(1)
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-screen w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900">
              Visit Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Visit {getVisitId(visit._id)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Student */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Student
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {visit.student?.name || "N/A"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {visit.student?.email || "N/A"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {visit.student?.phone || "N/A"}
              </p>
            </div>

            {/* Owner */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Owner
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {visit.owner?.name || "N/A"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {visit.owner?.email || "N/A"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {visit.owner?.phone || "N/A"}
              </p>
            </div>

            {/* Room */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Room
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {visit.room?.title || "N/A"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {visit.room?.location || "N/A"}
              </p>

              {visit.room?.rent !== undefined && (
                <p className="mt-1 text-sm font-medium text-slate-700">
                  ₹{visit.room.rent}/month
                </p>
              )}
            </div>

            {/* Status */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass()}`}
              >
                {formatStatus(status)}
              </span>
            </div>

            {/* Date */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Scheduled Date
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {formatDate(visit.scheduledDate)}
              </p>
            </div>

            {/* Time */}
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Scheduled Time
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {visit.scheduledTime || "N/A"}
              </p>
            </div>
          </div>

          {/* Request Message */}
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-slate-400">
              Student Message
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {visit.request?.message ||
                "No message provided."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default VisitDetailsModal;