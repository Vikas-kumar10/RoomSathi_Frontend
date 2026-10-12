import { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  BedDouble,
  Wifi,
  IndianRupee,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Bath,
  Car,
  Wind,
  Utensils,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getSavedRooms,
  removeSavedRoom,
} from "../../api/savedRoom.api";
import CustomCursor from "../../components/CustomCursor";

function SavedRooms() {
  const [savedRooms, setSavedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch saved rooms
  const fetchSavedRooms = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSavedRooms();

      setSavedRooms(data.savedRooms || []);
    } catch (error) {
      console.error("Get saved rooms error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load saved rooms."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRooms();
  }, []);

  // Remove room
  const handleRemove = async (roomId) => {
    try {
      setRemovingId(roomId);

      await removeSavedRoom(roomId);

      setSavedRooms((prev) =>
        prev.filter(
          (savedRoom) => savedRoom.room?._id !== roomId
        )
      );
    } catch (error) {
      console.error("Remove saved room error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to remove saved room."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // Facility icon
  const getFacilityIcon = (facility) => {
    const value = facility?.toLowerCase();

    if (value === "wi-fi" || value === "wifi") {
      return <Wifi size={14} />;
    }

    if (value === "ac") {
      return <Wind size={14} />;
    }

    if (value === "parking") {
      return <Car size={14} />;
    }

    if (
      value === "attached bathroom" ||
      value === "bathroom"
    ) {
      return <Bath size={14} />;
    }

    if (value === "kitchen") {
      return <Utensils size={14} />;
    }

    return <ShieldCheck size={14} />;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <CustomCursor/>

      {/* ================= HEADER ================= */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-[#FF3E9B]">
                <Heart size={16} fill="currentColor" />
                My Saved Rooms
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Rooms You Saved
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Keep track of the rooms you like and quickly
                revisit them whenever you are ready to make a
                decision.
              </p>
            </div>

            {/* COUNT */}
            <div className="flex w-fit items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-[#FF3E9B]">
                <Heart size={20} fill="currentColor" />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Saved Rooms
                </p>

                <p className="text-lg font-bold text-gray-900">
                  {savedRooms.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* ERROR */}
          {error && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 px-4 py-4">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchSavedRooms}
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-red-600 shadow-sm"
              >
                <RefreshCw size={14} />
                Retry
              </button>
            </div>
          )}

          {/* ================= LOADING ================= */}
          {loading ? (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="h-60 animate-pulse bg-gray-200" />

                  <div className="space-y-4 p-6">
                    <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                    <div className="flex gap-2">
                      <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-200" />
                      <div className="h-8 w-28 animate-pulse rounded-lg bg-gray-200" />
                    </div>

                    <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : savedRooms.length > 0 ? (
            <>
              {/* TOP INFO */}
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Your Favourite Rooms
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Compare your saved options before choosing
                    your next room.
                  </p>
                </div>

                <Link
                  to="/rooms"
                  className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#19CF37] transition hover:text-green-700"
                >
                  Explore More Rooms
                  <ArrowRight size={17} />
                </Link>
              </div>

              {/* ROOM GRID */}
              <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {savedRooms.map((savedRoom) => {
                  const room = savedRoom.room;

                  if (!room) {
                    return null;
                  }

                  const image =
                    room.images &&
                    room.images.length > 0
                      ? room.images[0]
                      : "/rooms/room1.jpg";

                  const isRemoving =
                    removingId === room._id;

                  return (
                    <article
                      key={savedRoom._id}
                      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* ================= IMAGE ================= */}
                      <div className="relative h-60 overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={room.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        {/* TOP BADGES */}
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">

                          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-green-600 shadow-md">
                            <ShieldCheck size={14} />
                            Verified
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(room._id)
                            }
                            disabled={isRemoving}
                            aria-label="Remove saved room"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF3E9B] shadow-md transition hover:bg-[#FF3E9B] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isRemoving ? (
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#FF3E9B] border-t-transparent" />
                            ) : (
                              <Heart
                                size={19}
                                fill="currentColor"
                              />
                            )}
                          </button>
                        </div>

                        {/* RENT */}
                        <div className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-2 shadow-md">
                          <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                            <IndianRupee size={16} />

                            {Number(
                              room.rent || 0
                            ).toLocaleString("en-IN")}

                            <span className="ml-1 text-xs font-medium text-gray-500">
                              / month
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ================= CONTENT ================= */}
                      <div className="p-6">

                        {/* TITLE */}
                        <div className="mb-4">
                          <h3 className="line-clamp-1 text-xl font-bold text-gray-900 transition group-hover:text-[#FF3E9B]">
                            {room.title}
                          </h3>

                          <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin
                              size={16}
                              className="shrink-0 text-[#19CF37]"
                            />

                            <span className="line-clamp-1">
                              {room.location}
                            </span>
                          </div>
                        </div>

                        {/* ROOM DETAILS */}
                        <div className="flex flex-wrap gap-2">

                          <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                            <BedDouble size={15} />
                            {room.roomType}
                          </div>

                          {room.status && (
                            <div
                              className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize ${
                                room.status ===
                                "available"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {room.status}
                            </div>
                          )}
                        </div>

                        {/* FACILITIES */}
                        {room.facilities &&
                          room.facilities.length > 0 && (
                            <div className="mt-5 border-t border-gray-100 pt-4">
                              <div className="flex flex-wrap gap-2">
                                {room.facilities
                                  .slice(0, 4)
                                  .map((facility) => (
                                    <span
                                      key={facility}
                                      className="flex items-center gap-1.5 rounded-full bg-[#BBE0EF] px-3 py-1.5 text-xs font-medium text-gray-700"
                                    >
                                      {getFacilityIcon(
                                        facility
                                      )}

                                      {facility}
                                    </span>
                                  ))}

                                {room.facilities.length >
                                  4 && (
                                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                                    +
                                    {room.facilities.length -
                                      4}{" "}
                                    more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                        {/* ACTIONS */}
                        <div className="mt-6 flex gap-3">
                          <Link
                            to={`/rooms/${room._id}`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-4 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                          >
                            View Details
                            <ArrowRight size={16} />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(room._id)
                            }
                            disabled={isRemoving}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label="Remove room"
                          >
                            {isRemoving ? (
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            /* ================= EMPTY STATE ================= */
            <div className="mx-auto max-w-2xl rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-50 text-[#FF3E9B]">
                <Heart size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                No Saved Rooms Yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                When you find a room you like, tap the heart icon
                to save it here. Your favourite rooms will be easy
                to find later.
              </p>

              <Link
                to="/rooms"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3 text-sm font-bold text-white transition hover:bg-green-600"
              >
                Find Rooms
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SavedRooms;