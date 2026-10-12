import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  IndianRupee,
  X,
  LogIn,
  LockKeyhole,
  ArrowRight,
  House,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllRooms } from "../../api/room.api";

function RoomShowcase() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        const response = await getAllRooms();
        const roomData = response?.rooms || response || [];
        console.log("roomData", roomData);

        setRooms(Array.isArray(roomData) ? roomData.slice(0, 6) : []);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleViewRoom = (roomId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    navigate(`/rooms/${roomId}`);
  };

  const handleViewAllRooms = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    navigate("/rooms");
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#BBE0EF]/40 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#0AF2FA]/15 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-10 h-56 w-56 rounded-full bg-[#FF3E9B]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="mb-9 text-center sm:mb-11"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF3E9B]/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FF3E9B] shadow-sm">
              <Sparkles size={15} />
              Available Rooms
            </div>

            <h2 className="whitespace-nowrap text-xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Find a Room That{" "}
              <span className="text-[#FF3E9B]">Fits Your Lifestyle</span>
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#0AF2FA]" />
          </motion.div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
                >
                  <div className="h-40 animate-pulse rounded-xl bg-gray-200" />

                  <div className="space-y-3 p-3 pt-4">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                    <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
                    <div className="h-10 animate-pulse rounded-xl bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && rooms.length === 0 && (
            <motion.div
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#0AF2FA]/15 text-[#1f5081]">
                <House size={28} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                No Rooms Available
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                There are currently no rooms available. Please check again
                later.
              </p>
            </motion.div>
          )}

          {/* Room Cards */}
          {!loading && rooms.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.08 }}
              className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            >
              {rooms.map((room) => (
                <motion.article
                  key={room._id}
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#FF3E9B] hover:shadow-[0_16px_35px_rgba(255,62,155,0.20)]"
                >
                  {/* Room Image */}
                  <div className="relative h-40 shrink-0 overflow-hidden bg-gray-100">
                    {room.images?.[0] ? (
                      <motion.img
                        src={room.images[0]}
                        alt={room.title || "Available room"}
                        loading="lazy"
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          console.error(
                            "Failed image URL:",
                            e.currentTarget.src,
                          );
                        }}
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                        <House size={32} strokeWidth={1.5} />
                        <span className="text-xs">No Image Available</span>
                      </div>
                    )}

                    {/* Listing Label */}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-[#19CF37]" />
                      Room Listing
                    </div>

                    {/* Pink Hover Accent */}
                    <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF3E9B] transition-transform duration-300 group-hover:scale-x-100" />
                  </div>

                  {/* Room Details */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3
                      title={room.title}
                      className="line-clamp-1 text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B] sm:text-lg"
                    >
                      {room.title || "Untitled Room"}
                    </h3>

                    {/* Location */}
                    <div className="mt-2 flex items-start gap-2 text-sm text-gray-500">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-[#FF3E9B]"
                      />

                      <span className="line-clamp-1">
                        {room.location || "Location not specified"}
                      </span>
                    </div>

                    {/* Rent */}
                    <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-[#0AF2FA]/30 bg-[#0AF2FA]/10 px-3 py-2.5">
                      <div>
                        <p className="text-xs font-medium text-gray-500">
                          Monthly Rent
                        </p>

                        <div className="mt-0.5 flex items-center gap-0.5 text-lg font-extrabold text-gray-900">
                          <IndianRupee size={17} className="text-[#1f5081]" />

                          <span>
                            {Number(room.rent || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <span className="rounded-lg bg-white px-2 py-1.5 text-xs font-semibold text-gray-500 shadow-sm">
                        / month
                      </span>
                    </div>

                    {/* View Room Button */}
                    <motion.button
                      type="button"
                      onClick={() => handleViewRoom(room._id)}
                      whileTap={{ scale: 0.97 }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-4 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#FF3E9B] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF3E9B]/25"
                    >
                      View Room Details
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* View All Rooms */}
          {!loading && rooms.length > 0 && (
            <motion.div
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              className="mt-9 text-center sm:mt-11"
            >
              <button
                type="button"
                onClick={handleViewAllRooms}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#1f5081] bg-white px-6 py-3 text-sm font-bold text-[#1f5081] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3E9B] hover:bg-[#FF3E9B] hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF3E9B]/25"
              >
                Explore All Rooms
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            key="login-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="login-modal-title"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white p-6 shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Top Accent */}
              <div className="absolute left-0 top-0 h-1.5 w-full bg-[#0AF2FA]" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                aria-label="Close login popup"
                className="absolute right-4 top-5 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-800"
              >
                <X size={20} />
              </button>

              {/* Modal Icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0AF2FA]/15 text-[#1f5081]">
                <LockKeyhole size={29} />
              </div>

              {/* Modal Content */}
              <div className="mt-5 text-center">
                <h2
                  id="login-modal-title"
                  className="text-2xl font-extrabold tracking-tight text-gray-900"
                >
                  Login Required
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Please log in to explore room details, check availability, and
                  find your perfect room in Patna.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#FF3E9B] hover:bg-[#FF3E9B] hover:text-white"
                >
                  Maybe Later
                </button>

                <motion.button
                  type="button"
                  onClick={handleLogin}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#FF3E9B]"
                >
                  <LogIn size={18} />
                  Login Now
                </motion.button>
              </div>

              <p className="mt-5 text-center text-xs text-gray-400">
                Find your next room with RoomSaathi.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default RoomShowcase;
