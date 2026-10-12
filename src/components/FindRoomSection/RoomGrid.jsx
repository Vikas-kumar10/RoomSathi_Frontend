
import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  AlertCircle,
  House,
  RefreshCw,
} from "lucide-react";

import RoomCard from "./RoomCard";
import { getAllRooms } from "../../api/room.api";

/* =========================
   ANIMATION VARIANTS
========================= */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/* =========================
   ANIMATED ROOM CARD
========================= */

function AnimatedRoomCard({ room, onClick }) {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMouse({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((previous) => ({
      ...previous,
      active: false,
    }));
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.25 }}
      className="group relative h-full rounded-2xl p-px"
      style={{
        background: mouse.active
          ? `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px, #FF3E9B, #0AF2FA 45%, #ffffff 85%)`
          : "#ffffff",
        boxShadow: mouse.active
          ? "0 12px 30px rgba(31,80,129,0.14)"
          : "0 3px 12px rgba(31,80,129,0.05)",
      }}
    >
      {/* Card hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: mouse.active
            ? `radial-gradient(150px circle at ${mouse.x}px ${mouse.y}px, rgba(10,242,250,0.18), transparent 80%)`
            : "transparent",
        }}
      />

      {/* Room content */}
      <div className="relative h-full overflow-hidden rounded-2xl bg-white">
        <RoomCard room={room} onClick={onClick} />
      </div>
    </motion.div>
  );
}

/* =========================
   ROOM GRID
========================= */

function RoomGrid({ filters, sortBy }) {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH ROOMS
  ========================= */

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllRooms();

      const roomData =
        data?.rooms ??
        data?.data ??
        data ??
        [];

      setRooms(Array.isArray(roomData) ? roomData : []);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load rooms. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  /* =========================
     ROOM CLICK
  ========================= */

  const handleRoomClick = (room) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to view room details.");
      navigate("/login");
      return;
    }

    const roomId = room?._id || room?.id;

    if (!roomId) return;

    navigate(`/rooms/${roomId}`);
  };

  /* =========================
     FILTER + SORT
  ========================= */

  const processedRooms = useMemo(() => {
    let result = [...rooms];

    // Filter by room type
    if (filters?.roomTypes?.length > 0) {
      result = result.filter((room) =>
        filters.roomTypes.includes(room.roomType)
      );
    }

    // Filter by budget
    if (filters?.budget) {
      result = result.filter((room) => {
        const rent = Number(room.rent);

        switch (filters.budget) {
          case "under-5000":
            return rent < 5000;

          case "5000-10000":
            return rent >= 5000 && rent <= 10000;

          case "10000-15000":
            return rent > 10000 && rent <= 15000;

          case "above-15000":
            return rent > 15000;

          default:
            return true;
        }
      });
    }

    // Filter by amenities
    if (filters?.amenities?.length > 0) {
      result = result.filter((room) => {
        const facilities = Array.isArray(room.facilities)
          ? room.facilities
          : [];

        return filters.amenities.every((selectedAmenity) =>
          facilities.some((facility) => {
            const name =
              typeof facility === "string"
                ? facility
                : facility?.name || "";

            return (
              name.toLowerCase().trim() ===
              selectedAmenity.toLowerCase().trim()
            );
          })
        );
      });
    }

    // Sort rooms
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.rent) - Number(b.rent);

        case "price-high":
          return Number(b.rent) - Number(a.rent);

        case "oldest":
          return (
            new Date(a.createdAt || 0) -
            new Date(b.createdAt || 0)
          );

        case "newest":
        default:
          return (
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
          );
      }
    });

    return result;
  }, [rooms, filters, sortBy]);

  /* =========================
     LOADING STATE
  ========================= */

  if (loading) {
    return (
      <>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0AF2FA]/30 text-[#1f5081]">
            <House size={22} />
          </div>

          <div>
            <h3 className="font-bold text-[#1f5081]">
              Finding Your Perfect Room
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Loading available rooms...
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-white bg-white shadow-sm"
            >
              <div className="h-52 animate-pulse bg-[#BBE0EF]/70" />

              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-4 w-1/2 animate-pulse rounded-lg bg-gray-100" />
                <div className="h-4 w-full animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */

  if (error) {
    return (
      <motion.div
        className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <AlertCircle size={30} />
        </div>

        <h3 className="mt-5 text-xl font-extrabold text-gray-900">
          Something went wrong
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchRooms}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3 font-bold text-gray-900 transition-colors hover:bg-[#FF3E9B]"
        >
          <RefreshCw size={17} />
          Try Again
        </button>
      </motion.div>
    );
  }

  /* =========================
     EMPTY STATE
  ========================= */

  if (processedRooms.length === 0) {
    return (
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white bg-white/90 px-6 py-14 text-center shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full bg-[#0AF2FA]/25 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-[#FF3E9B]/20 blur-3xl" />

        <motion.div
          className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#BBE0EF]/60 text-[#1f5081]"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <House size={36} />
        </motion.div>

        <h3 className="relative mt-6 text-2xl font-extrabold text-[#1f5081]">
          No rooms found
        </h3>

        <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
          Try changing your filters to discover more rooms
          matching your requirements.
        </p>
      </motion.div>
    );
  }

  /* =========================
     ROOMS DISPLAY
  ========================= */

  return (
    <div className="relative">
      {/* Results header */}
      <motion.div
        className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-extrabold text-[#1f5081]">
              {processedRooms.length}
            </span>{" "}
            {processedRooms.length === 1 ? "room" : "rooms"} for you
          </p>

          <div className="mt-2 h-1 w-16 rounded-full bg-[#FF3E9B]" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2 text-xs font-semibold text-[#1f5081] shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#19CF37]" />
          Rooms to explore
        </div>
      </motion.div>

      {/* Room cards */}
      <motion.div
        className="relative z-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {processedRooms.map((room) => (
          <AnimatedRoomCard
            key={room._id || room.id}
            room={room}
            onClick={() => handleRoomClick(room)}
          />
        ))}
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        className="relative z-10 mx-auto mt-10 h-1 rounded-full bg-[#0AF2FA]"
        initial={{ width: 0 }}
        animate={{ width: "72px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </div>
  );
}

export default RoomGrid;
