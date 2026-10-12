import { useEffect, useState } from "react";

import {
  Heart,
  MapPin,
  CheckCircle2,
  Wifi,
  Wind,
  Car,
  Bath,
  Utensils,
  X,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  saveRoom,
  removeSavedRoom,
  checkSavedRoom,
} from "../../api/savedRoom.api";

function RoomCard({ room }) {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkingSaved, setCheckingSaved] = useState(true);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  /*
    =========================
    FACILITY ICON
    =========================
  */

  const getFacilityIcon = (facility) => {
    if (facility === "Wi-Fi") {
      return <Wifi size={15} />;
    }

    if (facility === "AC") {
      return <Wind size={15} />;
    }

    if (facility === "Parking") {
      return <Car size={15} />;
    }

    if (facility === "Attached Bathroom") {
      return <Bath size={15} />;
    }

    if (facility === "Kitchen") {
      return <Utensils size={15} />;
    }

    return null;
  };

  /*
    =========================
    LOGIN POPUP
    =========================
  */

  const openLoginPopup = (message) => {
    setPopupMessage(message);
    setShowLoginPopup(true);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleLogin = () => {
    setShowLoginPopup(false);

    navigate("/login");
  };

  /*
    =========================
    CHECK SAVED STATUS
    =========================
  */

  useEffect(() => {
    const checkRoomSavedStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsSaved(false);
        setCheckingSaved(false);
        return;
      }

      try {
        setCheckingSaved(true);

        const data = await checkSavedRoom(room._id);

        setIsSaved(data?.isSaved || false);
      } catch (error) {
        console.error("Check saved room error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }

        setIsSaved(false);
      } finally {
        setCheckingSaved(false);
      }
    };

    if (room?._id) {
      checkRoomSavedStatus();
    }
  }, [room?._id]);

  /*
    =========================
    SAVE / REMOVE ROOM
    =========================
  */

  const handleSaveRoom = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      openLoginPopup(
        "Please login first to save this room to your saved list.",
      );

      return;
    }

    if (!room?._id || saving) {
      return;
    }

    try {
      setSaving(true);

      if (isSaved) {
        await removeSavedRoom(room._id);

        setIsSaved(false);
      } else {
        await saveRoom(room._id);

        setIsSaved(true);
      }
    } catch (error) {
      console.error("Save room error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");

        openLoginPopup("Your login session has expired. Please login again.");

        return;
      }

      openLoginPopup(
        error.response?.data?.message ||
          "Unable to save this room. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
    =========================
    VIEW DETAILS
    =========================
  */

  const handleViewDetails = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      openLoginPopup("Please login first to view complete room details.");

      return;
    }

    if (!room?._id) {
      return;
    }

    navigate(`/rooms/${room._id}`);
  };

  const image =
    room.images && room.images.length > 0 ? room.images[0] : "/rooms/room1.jpg";

  return (
    <>
      {/* =========================
          ROOM CARD
      ========================= */}

      <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* IMAGE */}

        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={room.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* AVAILABLE */}

          {room.status === "available" && (
            <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#19CF37] shadow-md">
              <CheckCircle2 size={14} />
              Available
            </div>
          )}

          {/* FAVORITE */}

          <button
            type="button"
            onClick={handleSaveRoom}
            disabled={saving || checkingSaved}
            aria-label={isSaved ? "Remove room from saved rooms" : "Save room"}
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition ${
              isSaved
                ? "bg-[#FF3E9B] text-white"
                : "bg-white text-gray-600 hover:bg-[#FF3E9B] hover:text-white"
            } ${
              saving || checkingSaved ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            <Heart size={19} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="p-5">
          {/* TITLE */}

          <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
            {room.title}
          </h3>

          {/* LOCATION */}

          <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin size={15} className="text-[#FF3E9B]" />

            {room.location}
          </div>

          {/* ROOM TYPE */}

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-[#BBE0EF] px-3 py-1 text-xs font-semibold text-gray-700">
              {room.roomType}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                room.status === "available"
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {room.status}
            </span>
          </div>

          {/* FACILITIES */}

          <div className="mt-4 flex min-h-10 flex-wrap gap-2">
            {(room.facilities || []).map((facility) => (
              <span
                key={facility}
                className="flex items-center gap-1.5 text-xs text-gray-600"
              >
                {getFacilityIcon(facility)}

                {facility}
              </span>
            ))}
          </div>

          {/* BOTTOM */}

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            {/* RENT */}

            <div>
              <span className="text-xl font-bold text-[#19CF37]">
                ₹{Number(room.rent || 0).toLocaleString("en-IN")}
              </span>

              <span className="text-xs text-gray-500">/month</span>
            </div>

            {/* VIEW DETAILS */}

            <button
              type="button"
              onClick={handleViewDetails}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#FF3E9B]"
            >
              View Details
            </button>
          </div>
        </div>
      </article>

      {/* =========================
          LOGIN POPUP
      ========================= */}

      {showLoginPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={closeLoginPopup}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP ACCENT */}

            <div className="h-1.5 bg-sky-700 from-[#0AF2FA] via-[#FF3E9B] to-[#19CF37]" />

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={closeLoginPopup}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* CONTENT */}

            <div className="px-6 pb-7 pt-8 text-center sm:px-8">
              {/* ICON */}

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#BBE0EF]">
                <LockKeyhole size={28} className="text-gray-800" />
              </div>

              {/* TITLE */}

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Login Required
              </h3>

              {/* MESSAGE */}

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                {popupMessage}
              </p>

              {/* BUTTONS */}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={closeLoginPopup}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Maybe Later
                </button>

                <button
                  type="button"
                  onClick={handleLogin}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#FF3E9B]"
                >
                  Login Now
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RoomCard;
