import { Check, Eye, Search, Trash2, X } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAdminRooms,
  updateRoomApprovalStatus,
  deleteAdminRoom,
} from "../../api/room.api";

function ManageRooms() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // =====================================
  // FETCH ROOMS
  // =====================================

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminRooms();

      setRooms(response?.rooms || []);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);

      setError(error?.response?.data?.message || "Failed to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // =====================================
  // UPDATE ROOM STATUS
  // =====================================

  const handleRoomStatusChange = async (roomId, approvalStatus) => {
    try {
      setUpdatingId(roomId);

      const response = await updateRoomApprovalStatus(roomId, approvalStatus);

      setRooms((currentRooms) =>
        currentRooms.map((room) =>
          room._id === roomId
            ? {
                ...room,
                approvalStatus:
                  response?.room?.approvalStatus || approvalStatus,
              }
            : room,
        ),
      );
    } catch (error) {
      console.error("Room status update failed:", error);

      alert(error?.response?.data?.message || "Failed to update room status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================
  // DELETE ROOM
  // =====================================

  const handleDeleteRoom = async (roomId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this room?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(roomId);

      await deleteAdminRoom(roomId);

      setRooms((currentRooms) =>
        currentRooms.filter((room) => room._id !== roomId),
      );
    } catch (error) {
      console.error("Delete room failed:", error);

      alert(error?.response?.data?.message || "Failed to remove room.");
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // SEARCH
  // =====================================

  const filteredRooms = rooms.filter((room) => {
    const ownerName =
      typeof room.owner === "object"
        ? room.owner?.name || ""
        : room.owner || "";

    const searchText = `
      ${room.title || ""}
      ${ownerName}
      ${room.location || ""}
      ${room.type || ""}
    `.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  // =====================================
  // STATUS LABEL
  // =====================================

  const getStatusLabel = (status) => {
    if (status === "approved") {
      return "Approved";
    }

    if (status === "rejected") {
      return "Rejected";
    }

    return "Pending";
  };

  // =====================================
  // STATUS CLASS
  // =====================================

  const getStatusClass = (status) => {
    if (status === "approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  // =====================================
  // ROOM ACTIONS
  // =====================================

  const RoomActions = ({ room, status }) => {
    const isUpdating = updatingId === room._id;

    const isDeleting = deletingId === room._id;

    return (
      <div className="flex flex-wrap items-center gap-2">
        {/* View */}
        <button
          type="button"
          title="View room"
          onClick={() => navigate(`/admin/rooms/${room._id}`)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <Eye size={16} />
        </button>

        {/* Approve / Reject */}
        {status === "pending" && (
          <>
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handleRoomStatusChange(room._id, "approved")}
              title="Approve"
              className="rounded-lg border border-green-200 p-2 text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={16} />
            </button>

            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handleRoomStatusChange(room._id, "rejected")}
              title="Reject"
              className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={16} />
            </button>
          </>
        )}

        {/* Delete */}
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => handleDeleteRoom(room._id)}
          title="Remove room"
          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          HEADER
      ===================================== */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Rooms</h1>

        <p className="mt-1 text-sm text-slate-500">
          Approve, reject and remove room listings.
        </p>
      </div>

      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search room..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">Loading rooms...</p>
        </div>
      )}

      {/* =====================================
          ERROR
      ===================================== */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================
          DESKTOP TABLE
      ===================================== */}

      {!loading && !error && rooms.length > 0 && filteredRooms.length > 0 && (
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Room
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Owner
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Location
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Rent
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRooms.map((room) => {
                  const status = room.approvalStatus || "pending";

                  const ownerName =
                    typeof room.owner === "object"
                      ? room.owner?.name || "-"
                      : room.owner || "-";

                  return (
                    <tr key={room._id} className="transition hover:bg-slate-50">
                      {/* Room */}
                      <td className="px-5 py-4 align-top">
                        <p className="max-w-xs text-sm font-semibold text-slate-900">
                          {room.title || "Untitled Room"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {room.type || "Room"}
                        </p>
                      </td>

                      {/* Owner */}
                      <td className="px-5 py-4 align-top text-sm text-slate-600">
                        {ownerName}
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4 align-top text-sm text-slate-600">
                        {room.location || "-"}
                      </td>

                      {/* Rent */}
                      <td className="px-5 py-4 align-top text-sm font-semibold text-slate-700">
                        ₹{Number(room.rent || 0).toLocaleString("en-IN")}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            status,
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 align-top">
                        <RoomActions room={room} status={status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================
          MOBILE CARDS
      ===================================== */}

      {!loading && !error && rooms.length > 0 && filteredRooms.length > 0 && (
        <div className="grid gap-4 md:hidden">
          {filteredRooms.map((room) => {
            const status = room.approvalStatus || "pending";

            const ownerName =
              typeof room.owner === "object"
                ? room.owner?.name || "-"
                : room.owner || "-";

            return (
              <div
                key={room._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* Header */}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-slate-900">
                      {room.title || "Untitled Room"}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {room.type || "Room"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      status,
                    )}`}
                  >
                    {getStatusLabel(status)}
                  </span>
                </div>

                {/* Details */}

                <div className="mt-5 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-400">Owner</p>

                    <p className="mt-1 text-sm text-slate-700">{ownerName}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {room.location || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Monthly Rent
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      ₹{Number(room.rent || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Actions */}

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <RoomActions room={room} status={status} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =====================================
          SEARCH EMPTY
      ===================================== */}

      {!loading && !error && rooms.length > 0 && filteredRooms.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">
            No rooms match your search.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Try searching with a different room name, owner or location.
          </p>
        </div>
      )}

      {/* =====================================
          EMPTY
      ===================================== */}

      {!loading && !error && rooms.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">
            No rooms found.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Room listings will appear here when owners add rooms.
          </p>
        </div>
      )}
    </div>
  );
}

export default ManageRooms;
