import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  IndianRupee,
  Home,
  UserRound,
  CheckCircle2,
} from "lucide-react";

import { getSingleRoom } from "../../api/room.api";

function ViewRoom() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleRoom(id)
      .then((data) => setRoom(data.room))
      .catch((error) => console.error("Fetch room error:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#BBE0EF]">
        <p className="text-sm font-medium text-slate-600">
          Loading room...
        </p>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#BBE0EF]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Room not found
          </h2>

          <Link
            to="/owner/my-rooms"
            className="mt-4 inline-flex rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to My Rooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#BBE0EF] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/owner/my-rooms"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#FF3E9B]"
        >
          <ArrowLeft size={17} />
          Back to My Rooms
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-lg">

          {/* Image */}
          <div className="relative h-72 bg-slate-100 sm:h-96">
            {room.images?.length > 0 ? (
              <img
                src={room.images[0]}
                alt={room.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No Image Available
              </div>
            )}

            <span
              className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold ${
                room.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-900 text-white"
              }`}
            >
              {room.status === "available"
                ? "Available"
                : "Rented"}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            {/* Title */}
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {room.title}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={17} className="text-[#FF3E9B]" />
                  {room.location}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xl font-bold text-slate-900">
                <IndianRupee size={20} />
                {Number(room.rent).toLocaleString("en-IN")}

                <span className="text-sm font-normal text-slate-400">
                  /month
                </span>
              </div>
            </div>

            {/* Room Info */}
            <div className="grid gap-4 py-6 sm:grid-cols-3">

              <div className="rounded-2xl bg-cyan-50 p-4">
                <Home
                  size={20}
                  className="text-[#0AF2FA]"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Room Type
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {room.roomType}
                </p>
              </div>

              <div className="rounded-2xl bg-pink-50 p-4">
                <MapPin
                  size={20}
                  className="text-[#FF3E9B]"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Location
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {room.location}
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <CheckCircle2
                  size={20}
                  className="text-[#19CF37]"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Status
                </p>

                <p className="mt-1 font-semibold capitalize text-slate-800">
                  {room.status}
                </p>
              </div>

            </div>

            {/* Description */}
            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900">
                About This Room
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {room.description}
              </p>
            </div>

            {/* Facilities */}
            {room.facilities?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Facilities
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {room.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold text-slate-700"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Owner */}
            {room.owner && (
              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#19CF37] text-white">
                    <UserRound size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {room.owner.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {room.owner.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Edit */}
            <div className="mt-7 flex justify-end">
              <Link
                to={`/owner/edit-room/${room._id}`}
                className="rounded-xl bg-[#19CF37] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                Edit Room
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ViewRoom;