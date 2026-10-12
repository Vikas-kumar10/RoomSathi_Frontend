
import { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  CheckCircle2,
  House,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

function RoomActions({ room, onStatusChange, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
        aria-label="Room actions"
        aria-expanded={open}
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-11 z-20 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
            <Link
              to={`/rooms/${room._id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Eye size={16} />
              View Room
            </Link>

            <Link
              to={`/owner/edit-room/${room._id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={16} />
              Edit Room
            </Link>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onStatusChange(room);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              {room.status === "available" ? (
                <>
                  <CheckCircle2 size={16} />
                  Mark as Rented
                </>
              ) : (
                <>
                  <House size={16} />
                  Mark as Available
                </>
              )}
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDelete(room);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete Room
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RoomActions;
