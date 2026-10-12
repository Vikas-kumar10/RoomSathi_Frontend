// import { useEffect, useState } from "react";
// import {
//   MapPin,
//   IndianRupee,
//   ArrowUpRight,
//   Eye,
//   MoreHorizontal,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// import { getMyRooms } from "../../../api/room.api";

// function MyRooms() {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ==========================================
//   // Fetch Logged-in Owner's Rooms
//   // ==========================================

//   const fetchMyRooms = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getMyRooms();

//       // Supports:
//       // { success: true, rooms: [...] }
//       // OR
//       // [...]
//       setRooms(response.rooms || response || []);
//     } catch (error) {
//       console.error("Failed to fetch my rooms:", error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to load your rooms."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyRooms();
//   }, []);

//   return (
//     <section className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

//       {/* Header */}
//       <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">

//         <div>
//           <h2 className="font-bold text-slate-900">
//             My Rooms
//           </h2>

//           <p className="mt-1 text-xs text-slate-400">
//             Recently listed rooms
//           </p>
//         </div>

//         <Link
//           to="/owner/my-rooms"
//           className="inline-flex items-center gap-1 text-sm font-semibold text-[#19CF37] transition hover:text-green-700"
//         >
//           View All
//           <ArrowUpRight size={16} />
//         </Link>

//       </div>

//       {/* Loading */}
//       {loading && (
//         <div className="p-8 text-center">
//           <p className="text-sm text-slate-500">
//             Loading your rooms...
//           </p>
//         </div>
//       )}

//       {/* Error */}
//       {!loading && error && (
//         <div className="p-6">
//           <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && !error && rooms.length === 0 && (
//         <div className="p-8 text-center">

//           <p className="text-sm font-semibold text-slate-700">
//             No rooms listed yet.
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Add your first room to start receiving student requests.
//           </p>

//         </div>
//       )}

//       {/* Rooms */}
//       {!loading && !error && rooms.length > 0 && (
//         <div className="divide-y divide-slate-100">

//           {rooms.map((room) => (
//             <div
//               key={room._id}
//               className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:px-6"
//             >

//               {/* Image */}
//               <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-20 sm:w-28">

//                 {room.images ? (
//                   <img
//                     src={room.images}
//                     alt={room.title}
//                     className="h-full w-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.style.display = "none";
//                     }}
//                   />
//                 ) : (
//                   <div className="flex h-full items-center justify-center text-xs text-slate-400">
//                     No Image
//                   </div>
//                 )}

//               </div>

//               {/* Room Details */}
//               <div className="min-w-0 flex-1">

//                 <div className="flex flex-wrap items-center gap-2">

//                   <h3 className="font-semibold text-slate-900">
//                     {room.title}
//                   </h3>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
//                       room.status === "available"
//                         ? "bg-green-50 text-green-700"
//                         : "bg-slate-100 text-slate-500"
//                     }`}
//                   >
//                     {room.status === "available"
//                       ? "Available"
//                       : "Rented"}
//                   </span>

//                 </div>

//                 <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

//                   {/* Location */}
//                   <span className="flex items-center gap-1">
//                     <MapPin size={13} />
//                     {room.location}
//                   </span>

//                   {/* Room Type */}
//                   <span>
//                     {room.type}
//                   </span>

//                   {/* Rent */}
//                   <span className="flex items-center gap-1 font-semibold text-slate-700">
//                     <IndianRupee size={13} />

//                     {Number(room.rent).toLocaleString("en-IN")}
//                     /month
//                   </span>

//                 </div>

//                 {/* Requests */}
//                 <p className="mt-2 text-xs text-[#FF3E9B]">
//                   {room.requests || 0} student requests
//                 </p>

//               </div>

//               {/* Actions */}
//               <div className="flex items-center gap-2">

//                 {/* View Room */}
//                 <Link
//                   to={`/rooms/${room._id}`}
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#19CF37] hover:text-[#19CF37]"
//                   title="View room"
//                 >
//                   <Eye size={17} />
//                 </Link>

//                 {/* More */}
//                 <button
//                   type="button"
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
//                   title="More options"
//                 >
//                   <MoreHorizontal size={18} />
//                 </button>

//               </div>

//             </div>
//           ))}

//         </div>
//       )}

//     </section>
//   );
// }

// export default MyRooms;

import { useCallback, useEffect, useState } from "react";
import { MapPin, IndianRupee, ArrowUpRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";

import { getMyRooms, updateRoom, deleteRoom } from "../../../api/room.api";
import RoomActions from "./RoomActions";
import RoomStatusModal from "../RoomStatusModal";

function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchMyRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyRooms();
      const roomData = response?.rooms || response || [];

      setRooms(Array.isArray(roomData) ? roomData : []);
    } catch (error) {
      console.error("Failed to fetch my rooms:", error);

      setError(error.response?.data?.message || "Failed to load your rooms.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyRooms();
  }, [fetchMyRooms]);

  const handleStatusUpdate = async (roomId, status) => {
    try {
      setUpdating(true);
      setError("");

      // Use existing PUT /rooms/:id endpoint
      await updateRoom(roomId, { status });

      // Update UI only after API succeeds
      setRooms((previousRooms) =>
        previousRooms.map((room) =>
          room._id === roomId ? { ...room, status } : room,
        ),
      );

      setSelectedRoom(null);
    } catch (error) {
      console.error(
        "Failed to update room status:",
        error.response?.data || error,
      );

      setError(
        error.response?.data?.message || "Failed to update room status.",
      );
    } finally {
      setUpdating(false);
    }
  };

  /*-----Delete----- */
  const handleDeleteRoom = async (room) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${room.title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setDeleteError("");

      await deleteRoom(room._id);

      // Remove the deleted room from the UI
      setRooms((previousRooms) =>
        previousRooms.filter((item) => item._id !== room._id),
      );

      if (selectedRoom?._id === room._id) {
        setSelectedRoom(null);
      }
    } catch (error) {
      console.error("Failed to delete room:", error.response?.data || error);

      setDeleteError(error.response?.data?.message || "Failed to delete room.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
          <div>
            <h2 className="font-bold text-slate-900">My Rooms</h2>

            <p className="mt-1 text-xs text-slate-400">Recently listed rooms</p>
          </div>

          <Link
            to="/owner/my-rooms"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#19CF37] transition hover:text-green-700"
          >
            View All
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-8 text-center text-sm text-slate-500">
            Loading your rooms...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="p-5">
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && rooms.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No rooms listed yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add your first room to start receiving student requests.
            </p>
          </div>
        )}

        {/* Room list */}
        {!loading && !error && rooms.length > 0 && (
          <div className="divide-y divide-slate-100">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:px-6"
              >
                {/* Image */}
                <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-20 sm:w-28">
                  {Array.isArray(room.images) && room.images[0] ? (
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : typeof room.images === "string" && room.images ? (
                    <img
                      src={room.images}
                      alt={room.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {room.title}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        room.status === "available"
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {room.status === "available" ? "Available" : "Rented"}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {room.location}
                    </span>

                    <span>{room.roomType || room.type || "Room"}</span>

                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <IndianRupee size={13} />
                      {Number(room.rent || 0).toLocaleString("en-IN")}
                      /month
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#FF3E9B]">
                    {room.requests || 0} student requests
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    to={`/rooms/${room._id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#19CF37] hover:text-[#19CF37]"
                    title="View room"
                    aria-label="View room"
                  >
                    <Eye size={17} />
                  </Link>

                  <RoomActions
                    room={room}
                    onStatusChange={setSelectedRoom}
                    onDelete={handleDeleteRoom}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Status confirmation modal */}
      <RoomStatusModal
        room={selectedRoom}
        loading={updating}
        onClose={() => {
          if (!updating) setSelectedRoom(null);
        }}
        onConfirm={handleStatusUpdate}
      />
    </>
  );
}

export default MyRooms;
