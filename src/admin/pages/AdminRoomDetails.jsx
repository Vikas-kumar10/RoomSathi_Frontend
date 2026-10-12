
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  IndianRupee,
  UserRound,
  Mail,
  Phone,
  House,
  CheckCircle2,
  XCircle,
  Clock,
  Wifi,
  Image as ImageIcon,
  Maximize2,
} from "lucide-react";

import { getAdminRooms } from "../../api/room.api";

// Reusable table component
function DetailsTable({ title, subtitle, icon: Icon, rows, emptyMessage }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>

      {rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-80 text-left">
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, index) => (
                <tr key={`${row.label}-${index}`} className="hover:bg-slate-50">
                  <th className="w-2/5 px-5 py-4 text-sm font-medium text-slate-500 sm:w-1/3 sm:px-6">
                    {row.label}
                  </th>
                  <td className=" px-5 py-4 text-sm font-medium text-slate-800 sm:px-6">
                    {row.value ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-6 text-sm text-slate-500">{emptyMessage}</p>
      )}
    </section>
  );
}

function AdminRoomDetails() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [showImagePreview, setShowImagePreview] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAdminRooms();
        const selectedRoom = (response?.rooms || []).find(
          (item) => item._id === roomId
        );

        if (!selectedRoom) {
          setError("Room details not found.");
          return;
        }

        setRoom(selectedRoom);
      } catch (err) {
        console.error("Failed to load room details:", err);
        setError(
          err?.response?.data?.message || "Failed to load room details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600" />
          <p className="mt-4 text-sm text-slate-500">
            Loading room details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <XCircle className="mx-auto text-red-500" size={40} />
        <h2 className="mt-3 text-lg font-semibold text-slate-900">
          Unable to load room
        </h2>
        <p className="mt-2 text-sm text-red-600">
          {error || "Room not found."}
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <ArrowLeft size={16} />
          Back to Manage Rooms
        </button>
      </div>
    );
  }

  const owner =
    room.owner && typeof room.owner === "object" ? room.owner : {};

  const images = Array.isArray(room.images)
    ? room.images.filter((image) => typeof image === "string" && image.trim())
    : typeof room.images === "string" && room.images.trim()
    ? [room.images]
    : [];

  const facilities = Array.isArray(room.facilities) ? room.facilities : [];
  const status = room.approvalStatus || "pending";

  const statusStyles = {
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    pending: "bg-amber-100 text-amber-700",
  };

  const StatusIcon =
    status === "approved"
      ? CheckCircle2
      : status === "rejected"
      ? XCircle
      : Clock;

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "Not available"
      : parsedDate.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const roomRows = [
    { label: "Room ID", value: room._id },
    { label: "Room Title", value: room.title || "Untitled Room" },
    { label: "Room Type", value: room.roomType || room.type || "Not specified" },
    {
      label: "Monthly Rent",
      value: `₹${Number(room.rent || 0).toLocaleString("en-IN")}`,
    },
    { label: "Listing Status", value: room.status || "available" },
    {
      label: "Approval Status",
      value: (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            statusStyles[status] || statusStyles.pending
          }`}
        >
          <StatusIcon size={14} />
          {status}
        </span>
      ),
    },
    { label: "Location", value: room.location || "Not provided" },
    { label: "Created At", value: formatDate(room.createdAt) },
    { label: "Last Updated", value: formatDate(room.updatedAt) },
  ];

  const ownerRows = [
    { label: "Owner Name", value: owner.name || "Not available" },
    { label: "Email Address", value: owner.email || "Not available" },
    { label: "Phone Number", value: owner.phone || "Not available" },
    {
      label: "Owner ID",
      value:
        owner._id ||
        (typeof room.owner === "string" ? room.owner : "Not available"),
    },
  ];

  const facilityRows = facilities.map((facility, index) => ({
    label: `Facility ${String(index + 1).padStart(2, "0")}`,
    value: facility,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8">
      {/* Page Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-cyan-700"
          >
            <ArrowLeft size={17} />
            Back to Manage Rooms
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Room Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review listing information and owner details.
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold capitalize ${
            statusStyles[status] || statusStyles.pending
          }`}
        >
          <StatusIcon size={16} />
          {status}
        </span>
      </header>

      {/* Image Gallery */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {images.length > 0 ? (
          <div className="p-3 sm:p-5">
            <div className="grid gap-3 md:grid-cols-4">
              <button
                type="button"
                onClick={() => setShowImagePreview(true)}
                aria-label="Preview selected room image"
                className="group relative min-h-64 overflow-hidden rounded-xl bg-slate-100 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 md:col-span-3"
              >
                <img
                  src={images[activeImage]}
                  alt={`${room.title || "Room"} - Image ${activeImage + 1}`}
                  className="h-64 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-80 md:h-96"
                />

                <div className="absolute inset-0 bg-sky-700 from-black/60 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-6">
                  <div>
                    <p className="text-lg font-semibold">
                      {room.title || "Room Listing"}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-white/90">
                      <MapPin size={15} />
                      {room.location || "Location not provided"}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-xs font-medium backdrop-blur-sm">
                    <Maximize2 size={15} />
                    View image
                  </span>
                </div>
              </button>

              <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-y-auto">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-24 sm:w-32 md:h-24 md:w-full ${
                      activeImage === index
                        ? "border-cyan-600 ring-2 ring-cyan-100"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Room thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
                      {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <ImageIcon size={17} />
                {images.length} {images.length === 1 ? "image" : "images"} available
              </p>
              <p className="text-sm font-medium text-slate-600">
                Image {activeImage + 1} of {images.length}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center bg-slate-50 px-6 text-center">
            <ImageIcon size={36} className="text-slate-400" />
            <h2 className="mt-4 font-semibold text-slate-800">
              No room images
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Images have not been added to this listing.
            </p>
          </div>
        )}

        {/* Room Summary */}
        <div className="border-t border-slate-200 p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Room Listing
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {room.title || "Untitled Room"}
              </h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                <MapPin size={17} className="mt-0.5 shrink-0" />
                {room.location || "Location not provided"}
              </p>
            </div>

            <div className="min-w-40 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
              <p className="text-xs font-medium text-cyan-800">Monthly Rent</p>
              <p className="mt-2 flex items-center text-2xl font-bold text-slate-900">
                <IndianRupee size={21} />
                {Number(room.rent || 0).toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-slate-500">Per month</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Remaining Content in Tables */}
      <DetailsTable
        title="About This Room"
        subtitle="Description provided by the owner"
        icon={House}
        rows={[
          {
            label: "Description",
            value: room.description || "No description provided.",
          },
        ]}
      />

      <DetailsTable
        title="Room Information"
        subtitle="Listing details and status"
        icon={House}
        rows={roomRows}
      />

      <DetailsTable
        title="Facilities & Amenities"
        subtitle="Features included in the listing"
        icon={Wifi}
        rows={facilityRows}
        emptyMessage="No facilities listed for this room."
      />

      <DetailsTable
        title="Owner Information"
        subtitle="Contact details associated with this listing"
        icon={UserRound}
        rows={ownerRows}
      />

      {/* Image Preview Modal */}
      {showImagePreview && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowImagePreview(false)}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <p className="text-sm font-medium">
                Image {activeImage + 1} of {images.length}
              </p>
              <button
                type="button"
                onClick={() => setShowImagePreview(false)}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <img
              src={images[activeImage]}
              alt={`Room preview ${activeImage + 1}`}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />

            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  disabled={activeImage === 0}
                  onClick={() =>
                    setActiveImage((current) => current - 1)
                  }
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={activeImage === images.length - 1}
                  onClick={() =>
                    setActiveImage((current) => current + 1)
                  }
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoomDetails;

