import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock3,
  CheckCircle2,
  XCircle,
  MapPin,
  IndianRupee,
  UserRound,
  CalendarDays,
  Eye,
  Trash2,
  Inbox,
} from "lucide-react";

import { getStudentRequests, deleteRequest } from "../../api/request.api";
import CustomCursor from "../../components/CustomCursor";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const data = await getStudentRequests();

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (requestId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this request?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(requestId);

      await deleteRequest(requestId);

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId),
      );
    } catch (error) {
      console.error("Failed to delete request:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "pending",
  );

  const acceptedRequests = requests.filter(
    (request) => request.status === "accepted",
  );

  const rejectedRequests = requests.filter(
    (request) => request.status === "rejected",
  );

  const getStatusConfig = (status) => {
    if (status === "accepted") {
      return {
        label: "Accepted",
        icon: CheckCircle2,
        badge: "bg-green-100 text-green-700 border-green-200",
      };
    }

    if (status === "rejected") {
      return {
        label: "Rejected",
        icon: XCircle,
        badge: "bg-red-100 text-red-700 border-red-200",
      };
    }

    return {
      label: "Pending",
      icon: Clock3,
      badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
  };

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <CustomCursor/>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#FF3E9B]">
                Student Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                My Room Requests
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Keep track of the rooms you have requested and check the latest
                response from property owners.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-green-600 hover:shadow-md"
            >
              Find More Rooms
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {requests.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
                <Inbox size={23} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {pendingRequests.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                <Clock3 size={23} />
              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Accepted</p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {acceptedRequests.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CheckCircle2 size={23} />
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {rejectedRequests.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <XCircle size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">yours Requests</h2>

            <p className="mt-1 text-sm text-gray-500">
              Rooms you have shown interest in
            </p>
          </div>

          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
            {requests.length} {requests.length === 1 ? "Request" : "Requests"}
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 md:flex-row">
                  <div className="h-52 w-full rounded-2xl bg-gray-200 md:h-44 md:w-60" />

                  <div className="flex-1 space-y-4">
                    <div className="h-6 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                    <div className="h-4 w-1/3 rounded bg-gray-200" />
                    <div className="h-10 w-full rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && requests.length === 0 && (
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#BBE0EF] text-[#FF3E9B]">
              <Inbox size={36} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              No Room Requests Yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              You haven't requested any rooms yet. Explore available rooms and
              send a request to a property owner.
            </p>

            <Link
              to="/rooms"
              className="mt-7 inline-flex items-center rounded-xl bg-[#19CF37] px-6 py-3 text-sm font-bold text-white transition duration-300 hover:bg-green-600"
            >
              Explore Rooms
            </Link>
          </div>
        )}

        {/* Requests */}
        {!loading && requests.length > 0 && (
          <div className="space-y-5">
            {requests.map((request) => {
              const statusConfig = getStatusConfig(request.status);

              const StatusIcon = statusConfig.icon;

              const roomImage =
                request.room?.images?.length > 0
                  ? request.room.images[0]
                  : "/images/default-room.jpg";

              return (
                <div
                  key={request._id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Room Image */}
                    <div className="relative h-56 w-full shrink-0 overflow-hidden bg-gray-100 lg:h-auto lg:w-72">
                      <img
                        src={roomImage}
                        alt={request.room?.title || "Room"}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />

                      <div
                        className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${statusConfig.badge}`}
                      >
                        <StatusIcon size={14} />
                        {statusConfig.label}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      {/* Top */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {request.room?.title || "Room Listing"}
                          </h3>

                          <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin size={16} className="text-[#FF3E9B]" />

                            <span>
                              {request.room?.location || "Location unavailable"}
                            </span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="flex items-center text-xl font-bold text-[#19CF37]">
                            <IndianRupee size={18} />

                            {request.room?.rent
                              ? request.room.rent.toLocaleString("en-IN")
                              : "N/A"}
                          </p>

                          <p className="text-xs text-gray-500">per month</p>
                        </div>
                      </div>

                      {/* Room Details */}
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#BBE0EF] text-[#FF3E9B]">
                            <UserRound size={17} />
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">Room Type</p>

                            <p className="text-sm font-semibold text-gray-800">
                              {request.room?.roomType || "Not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#BBE0EF] text-[#FF3E9B]">
                            <CalendarDays size={17} />
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Requested On
                            </p>

                            <p className="text-sm font-semibold text-gray-800">
                              {formatDate(request.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Owner */}
                      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#19CF37] text-sm font-bold text-white">
                            {request.owner?.name?.charAt(0)?.toUpperCase() ||
                              "O"}
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Property Owner
                            </p>

                            <p className="text-sm font-bold text-gray-900">
                              {request.owner?.name || "Owner"}
                            </p>
                          </div>
                        </div>

                        {/* <p className="text-sm text-gray-500">
                          {request.owner?.phone || "Contact unavailable"}
                        </p> */}
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        {request.room?._id && (
                          <Link
                            to={`/rooms/${request.room._id}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 transition duration-300 hover:border-[#19CF37] hover:text-[#19CF37]"
                          >
                            <Eye size={17} />
                            View Room
                          </Link>
                        )}

                        {request.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => handleDelete(request._id)}
                            disabled={deletingId === request._id}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition duration-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 size={17} />

                            {deletingId === request._id
                              ? "Cancelling..."
                              : "Cancel Request"}
                          </button>
                        )}

                        {request.status === "accepted" && (
                          <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-50 px-5 py-2.5 text-sm font-bold text-green-700">
                            <CheckCircle2 size={17} />
                            Request Accepted
                          </div>
                        )}

                        {request.status === "rejected" && (
                          <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600">
                            <XCircle size={17} />
                            Request Rejected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyRequests;
