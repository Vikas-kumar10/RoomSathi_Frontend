import {
  Heart,
  MapPin,
  CheckCircle2,
  Wifi,
  Wind,
  Car,
  Bath,
  Utensils,
} from "lucide-react";

import { Link } from "react-router-dom";

function RoomCard({ room }) {
  // Facility ke according icon return karega
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

  // Agar room data available nahi hai
  if (!room) {
    return null;
  }

  // Safe image handling
  const image =
    Array.isArray(room.images) && room.images.length > 0
      ? room.images[0]
      : "/rooms/room1.jpg";

  // Safe facilities handling
  const facilities = Array.isArray(room.facilities)
    ? room.facilities
    : [];

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={room.title || "Room"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Available */}
        {room.status === "available" && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#19CF37] shadow-md">
            <CheckCircle2 size={14} />
            Available
          </div>
        )}

        {/* Favorite */}
        <button
          type="button"
          aria-label="Add room to favorites"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:bg-[#FF3E9B] hover:text-white"
        >
          <Heart size={19} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
          {room.title || "Room Available"}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin
            size={15}
            className="shrink-0 text-[#FF3E9B]"
          />

          <span className="line-clamp-1">
            {room.location || "Location not available"}
          </span>
        </div>

        {/* Room Type */}
        <div className="mt-4 flex flex-wrap items-center gap-2">

          <span className="rounded-full bg-[#BBE0EF] px-3 py-1 text-xs font-semibold text-gray-700">
            {room.roomType || "Room"}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              room.status === "available"
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {room.status || "available"}
          </span>

        </div>

        {/* Facilities */}
        <div className="mt-4 flex min-h-10 flex-wrap gap-x-4 gap-y-2">

          {facilities.length > 0 ? (
            facilities.map((facility, index) => (
              <span
                key={`${facility}-${index}`}
                className="flex items-center gap-1.5 text-xs text-gray-600"
              >
                {getFacilityIcon(facility)}
                {facility}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">
              No facilities listed
            </span>
          )}

        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

          {/* Rent */}
          <div>
            <span className="text-xl font-bold text-[#19CF37]">
              ₹
              {Number(room.rent || 0).toLocaleString(
                "en-IN"
              )}
            </span>

            <span className="ml-1 text-xs text-gray-500">
              /month
            </span>
          </div>

          {/* View Details */}
          <Link
            to={`/rooms/${room._id || room.id}`}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#FF3E9B]"
          >
            View Details
          </Link>

        </div>
      </div>
    </article>
  );
}

export default RoomCard;