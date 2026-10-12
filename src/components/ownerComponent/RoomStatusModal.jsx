
import { CheckCircle2, House, X } from "lucide-react";

function RoomStatusModal({
  room,
  onClose,
  onConfirm,
  loading,
}) {
  if (!room) return null;

  const isAvailable = room.status === "available";
  const nextStatus = isAvailable ? "rented" : "available";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              isAvailable
                ? "bg-orange-50 text-orange-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {isAvailable ? (
              <CheckCircle2 size={24} />
            ) : (
              <House size={24} />
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900">
          {isAvailable ? "Mark Room as Rented" : "Mark Room as Available"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to mark{" "}
          <span className="font-semibold text-slate-800">
            {room.title}
          </span>{" "}
          as{" "}
          <span className="font-semibold text-slate-800">
            {nextStatus === "rented" ? "Rented" : "Available"}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(room._id, nextStatus)}
            disabled={loading}
            className="rounded-xl bg-[#19CF37] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomStatusModal;
