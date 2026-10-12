import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Car,
  Check,
  CheckCircle2,
  Heart,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Share2,
  Table2,
  Utensils,
  UserRound,
  Wallet,
  Wifi,
  Wind,
  Zap,
  Flag,
} from "lucide-react";

import { getSingleRoom } from "../../api/room.api";
import { useAuth } from "../../context/AuthContext";
import { createVisitRequest } from "../../api/request.api";
import RequestVisitModal from "../../components/rooms/RequestVisitModal";
import { useNavigate } from "react-router-dom";

function RoomDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [formData, setFormData] = useState({
    visitDate: "",
    visitTime: "",
    message: "",
  });

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleRequestClick = () => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
    if (user?.role !== "student") {
      return alert("Only students can request a room visit.");
    }
    setShowModal(true);
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setRequestLoading(true);

    try {
      const payload = {
        roomId: room._id,
        ...formData,
      };
      await createVisitRequest(payload);
      alert("Visit request sent successfully!");
      setShowModal(false);
      setFormData({ visitDate: "", visitTime: "", message: "" });
    } catch (error) {
      alert(
        error?.response?.data?.message || error || "Failed to send request",
      );
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSingleRoom(id);

        setRoom(data.room || data.data || data);
      } catch (err) {
        console.error("Failed to fetch room:", err);

        setError(err.response?.data?.message || "Unable to load room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleShare = async () => {
    if (!room) {
      return;
    }

    const shareUrl = window.location.href;

    const shareData = {
      title: room.title,
      text: `${room.title} - ₹${Number(room.rent || 0).toLocaleString(
        "en-IN",
      )}/month`,
      url: shareUrl,
    };

    try {
      setSharing(true);

      // Mobile / supported browser
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      // Fallback for unsupported browser
      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      // User ne native share popup cancel kiya
      if (error.name !== "AbortError") {
        console.error("Share error:", error);
      }
    } finally {
      setSharing(false);
    }
  };

  const getFacilityIcon = (facility) => {
    const value = facility?.toLowerCase();

    if (value === "wi-fi" || value === "wifi") {
      return <Wifi size={17} />;
    }

    if (value === "ac") {
      return <Wind size={17} />;
    }

    if (value === "parking") {
      return <Car size={17} />;
    }

    if (value === "attached bathroom" || value === "bathroom") {
      return <Bath size={17} />;
    }

    if (value === "kitchen") {
      return <Utensils size={17} />;
    }

    if (value === "power backup") {
      return <Zap size={17} />;
    }

    if (value === "bed") {
      return <BedDouble size={17} />;
    }

    if (value === "study table") {
      return <Table2 size={17} />;
    }

    if (value === "wardrobe") {
      return <Home size={17} />;
    }

    return <Check size={17} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="h-80 animate-pulse bg-gray-200 sm:h-96" />

              <div className="space-y-5 p-6 sm:p-8">
                <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
                <div className="h-20 animate-pulse rounded-xl bg-gray-200" />
                <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Home size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Room Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error || "The room details could not be found."}
          </p>

          <Link
            to="/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#FF3E9B]"
          >
            <ArrowLeft size={17} />
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const images =
    room.images && room.images.length > 0 ? room.images : ["/rooms/room1.jpg"];

  const currentImage = images[activeImage] || images[0];

  const facilities = room.facilities || [];

  const owner =
    typeof room.owner === "object" && room.owner !== null ? room.owner : null;

  const rent = Number(room.rent || 0);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* TOP NAVIGATION */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#FF3E9B] hover:text-[#FF3E9B]"
          >
            <ArrowLeft size={17} />
            Back to Rooms
          </Link>

          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              onClick={handleShare}
              disabled={sharing}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-[#BBE0EF] hover:text-gray-900 ${
                sharing ? "cursor-not-allowed opacity-60" : ""
              }`}
              aria-label="Share room"
            >
              <Share2 size={18} />
            </button>

            {copied && (
              <span className="absolute right-24 top-12 z-20 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg">
                Link copied!
              </span>
            )}

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-[#FF3E9B] hover:text-white"
              aria-label="Add room to favorites"
            >
              <Heart size={18} />
            </button>

            <button
              type="button"
              onClick={() => navigate(`/report/${room._id}`)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-red-200 hover:bg-red-500 hover:text-white"
              aria-label="Report room"
              title="Report room"
            >
              <Flag size={18} />
            </button>
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2">
            {/* IMAGE GALLERY */}
            <div className="border-b border-gray-200 bg-gray-50 p-4 lg:border-b-0 lg:border-r sm:p-6">
              <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 sm:h-96">
                <img
                  src={currentImage}
                  alt={room.title}
                  className="h-full w-full object-cover"
                />

                {room.status === "available" && (
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#19CF37] shadow-md">
                    <CheckCircle2 size={15} />
                    Available
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:h-20 sm:w-24 ${
                        activeImage === index
                          ? "border-[#FF3E9B]"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${room.title} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ROOM INFORMATION */}
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#BBE0EF] px-3 py-1.5 text-xs font-semibold text-gray-700">
                  {room.roomType}
                </span>

                {room.status === "available" && (
                  <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={13} />
                    Available
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {room.title}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={17} className="shrink-0 text-[#FF3E9B]" />
                <span>{room.location}, Patna</span>
              </div>

              {/* PRICE */}
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Monthly Rent
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-bold text-[#19CF37]">
                    ₹{rent.toLocaleString("en-IN")}
                  </span>

                  <span className="mb-1 text-sm text-gray-500">/ month</span>
                </div>
              </div>

              {/* QUICK HIGHLIGHTS */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 p-4">
                  <BedDouble size={19} className="text-[#FF3E9B]" />
                  <p className="mt-2 text-xs text-gray-500">Room Type</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {room.roomType}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <MapPin size={19} className="text-[#FF3E9B]" />
                  <p className="mt-2 text-xs text-gray-500">Location</p>
                  <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                    {room.location}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <ShieldCheck size={19} className="text-[#19CF37]" />
                  <p className="mt-2 text-xs text-gray-500">Status</p>
                  <p className="mt-1 text-sm font-semibold capitalize text-gray-900">
                    {room.status}
                  </p>
                </div>
              </div>

              {/* TRUST INFO */}
              <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-[#19CF37]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Safe & Transparent
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Connect directly with the room owner and schedule a visit
                      before making your decision.
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-auto pt-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-600"
                  >
                    <Phone size={18} />
                    Contact Owner
                  </button>

                  <button
                    type="button"
                    onClick={handleRequestClick}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#FF3E9B]"
                  >
                    <CheckCircle2 size={18} />
                    Request Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* LEFT - RENTAL SUMMARY */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-6 lg:self-start">
            <div className="border-b border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BBE0EF] text-gray-800">
                  <Wallet size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Rental Summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    Estimated monthly expenses
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-b-2xl">
              {/* MONTHLY RENT */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="bg-gray-50 px-4 py-4 text-sm font-medium text-gray-600">
                  Monthly Rent
                </div>

                <div className="flex items-center justify-end px-4 py-4 text-sm font-bold text-gray-900">
                  ₹{rent.toLocaleString("en-IN")}
                </div>
              </div>

              {/* SECURITY DEPOSIT */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="bg-gray-50 px-4 py-4 text-sm font-medium text-gray-600">
                  Security Deposit
                </div>

                <div className="flex items-center justify-end px-4 py-4 text-sm font-semibold text-gray-900">
                  Not specified
                </div>
              </div>

              {/* MAINTENANCE */}
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="bg-gray-50 px-4 py-4 text-sm font-medium text-gray-600">
                  Maintenance
                </div>

                <div className="flex items-center justify-end px-4 py-4 text-sm font-semibold text-gray-900">
                  Not specified
                </div>
              </div>

              {/* ELECTRICITY */}
              <div className="grid grid-cols-2">
                <div className="bg-gray-50 px-4 py-4 text-sm font-medium text-gray-600">
                  Electricity
                </div>

                <div className="flex items-center justify-end px-4 py-4 text-sm font-semibold text-gray-900">
                  As per usage
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT - ROOM DETAILS */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BBE0EF] text-gray-800">
                  <Home size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Room Details
                  </h2>

                  <p className="text-xs text-gray-500">
                    Everything you need to know about this room
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              {/* ABOUT THIS ROOM */}
              <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-4">
                <div className="flex items-start gap-2 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 sm:col-span-1">
                  <Home size={17} className="mt-0.5 shrink-0 text-[#FF3E9B]" />
                  About This Room
                </div>

                <div className="px-4 py-4 text-sm leading-6 text-gray-600 sm:col-span-3">
                  {room.description || "No description available."}
                </div>
              </div>

              {/* ROOM TYPE */}
              <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-4">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 sm:col-span-1">
                  <BedDouble size={17} className="text-[#FF3E9B]" />
                  Room Type
                </div>

                <div className="px-4 py-4 text-sm font-medium text-gray-900 sm:col-span-3">
                  {room.roomType}
                </div>
              </div>

              {/* LOCATION */}
              <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-4">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 sm:col-span-1">
                  <MapPin size={17} className="text-[#FF3E9B]" />
                  Location
                </div>

                <div className="px-4 py-4 text-sm font-medium text-gray-900 sm:col-span-3">
                  {room.location}, Patna
                </div>
              </div>

              {/* FACILITIES */}
              <div className="grid grid-cols-1 border-b border-gray-200 sm:grid-cols-4">
                <div className="flex items-start gap-2 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 sm:col-span-1">
                  <CheckCircle2 size={17} className="mt-0.5 text-[#19CF37]" />
                  Facilities
                </div>

                <div className="px-4 py-4 sm:col-span-3">
                  {facilities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {facilities.map((facility) => (
                        <span
                          key={facility}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700"
                        >
                          <span className="text-[#19CF37]">
                            {getFacilityIcon(facility)}
                          </span>

                          {facility}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">
                      No facilities specified.
                    </span>
                  )}
                </div>
              </div>

              {/* AVAILABILITY */}
              <div className="grid grid-cols-1 sm:grid-cols-4">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 sm:col-span-1">
                  <CheckCircle2 size={17} className="text-[#19CF37]" />
                  Availability
                </div>

                <div className="px-4 py-4 sm:col-span-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                      room.status === "available"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {room.status === "available"
                      ? "Available for Rent"
                      : "Currently Rented"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* OWNER SECTION */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BBE0EF] text-gray-800">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">Room Owner</h2>

                <p className="text-xs text-gray-500">
                  Contact the owner directly for more information
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#BBE0EF] text-gray-700">
                <UserRound size={26} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-gray-900">
                    {owner?.name || "Room Owner"}
                  </h3>

                  <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={13} />
                    Verified
                  </span>
                </div>

                {/* {owner?.phone && (
                  <p className="mt-1 text-sm text-gray-500">{owner.phone}</p>
                )} */}

                {/* {owner?.email && (
                  <p className="mt-1 text-xs text-gray-400">{owner.email}</p>
                )} */}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#19CF37] hover:bg-green-50 hover:text-green-700"
              >
                <Phone size={17} />
                Call Owner
              </button>

              <button
                type="button"
                onClick={handleRequestClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                Request Visit
              </button>
            </div>
          </div>
        </section>
      </div>

      {showModal && (
        <RequestVisitModal
          room={room}
          user={user}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowModal(false)}
          onSubmit={handleRequestSubmit}
          loading={requestLoading}
        />
      )}
    </main>
  );
}

export default RoomDetails;
