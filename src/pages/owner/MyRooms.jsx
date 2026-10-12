import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  MapPin,
  IndianRupee,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import { getMyRooms, deleteRoom } from "../../api/room.api";

function MyRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getMyRooms()
      .then((data) => setRooms(data.rooms || []))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      await deleteRoom(id);
      setRooms(rooms.filter((room) => room._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#19CF37]">
              Property Management
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              My Rooms
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage yours listed rooms.
            </p>
          </div>

          <Link
            to="/owner/add-room"
            className="inline-flex items-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-semibold text-white hover:bg-green-600"
          >
            <Plus size={18} />
            Add Room
          </Link>
        </div>

        {/* No Rooms */}
        {rooms.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              No Rooms Listed
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You have not added any rooms yet.
            </p>
          </div>
        ) : (
          /* Rooms */
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <article
                key={room._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Image */}
                <div className="relative h-52 bg-slate-100">
                  <img
                    src={room.images?.[0]}
                    alt={room.title}
                    className="h-full w-full object-cover"
                  />

                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                      room.status === "available"
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-bold text-slate-900">
                    {room.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={15} />
                    {room.location}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 font-bold">
                      <IndianRupee size={16} />
                      {Number(room.rent).toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-slate-400">
                        /month
                      </span>
                    </div>

                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs">
                      {room.roomType}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <Link
                      to={`/rooms/${room._id}`}
                      className="flex items-center justify-center gap-1 rounded-xl border py-2.5 text-xs font-semibold hover:border-[#19CF37] hover:text-[#19CF37]"
                    >
                      <Eye size={15} />
                      View
                    </Link>

                    <Link
                      to={`/owner/edit-room/${room._id}`}
                      className="flex items-center justify-center gap-1 rounded-xl border py-2.5 text-xs font-semibold hover:border-blue-400 hover:text-blue-600"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(room._id)}
                      className="flex items-center justify-center gap-1 rounded-xl border border-red-100 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyRooms;