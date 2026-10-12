
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  IndianRupee,
  Home as HomeIcon,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function RoomSearch() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to search for rooms.");
      navigate("/login");
      return;
    }

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (budget) {
      params.set("budget", budget);
    }

    if (roomType) {
      params.set("type", roomType);
    }

    navigate(`/rooms?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const inputClass =
    "w-full appearance-none bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400";

  const fieldClass =
    "group flex items-center gap-3.5 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 transition-all duration-300 hover:border-[#0AF2FA] focus-within:border-[#0AF2FA] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0AF2FA]/15";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-white bg-white shadow-[0_20px_60px_rgba(31,80,129,0.12)]"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0AF2FA]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#FF3E9B]/10 blur-3xl" />

      {/* Top accent */}
      <div className="h-1.5 w-full bg-[#0AF2FA] from-[#0AF2FA] via-[#FF3E9B] to-[#19CF37]" />

      <div className="relative p-5 sm:p-5">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-1">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0AF2FA]/15 text-[#1f5081]">
              <HomeIcon size={21} />
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF3E9B]/10 px-3 py-1.5 text-xs font-semibold text-[#d9267d]">
              <Sparkles size={13} />
              Your next home awaits
            </span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Find Your Perfect{" "}
            <span className="text-[#FF3E9B]">Room</span>
          </h2>

          {/* <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            Explore available rooms in Patna that match your
            location, budget, and lifestyle.
          </p> */}
        </motion.div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-5">
          {/* Location */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="room-location"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Preferred Location
            </label>

            <div className={fieldClass}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF3E9B]/10 text-[#FF3E9B] transition-colors group-focus-within:bg-[#FF3E9B]/15">
                <MapPin size={20} />
              </span>

              <div className="min-w-0 flex-1">
                <input
                  id="room-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Boring Road, Kankarbagh"
                  autoComplete="off"
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-gray-400">
                  Choose your preferred area
                </p>
              </div>
            </div>
          </motion.div>

          {/* Budget */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="room-budget"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Monthly Budget
            </label>

            <div className={fieldClass}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0AF2FA]/20 text-[#167d87] transition-colors group-focus-within:bg-[#0AF2FA]/30">
                <IndianRupee size={20} />
              </span>

              <div className="min-w-0 flex-1">
                <select
                  id="room-budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select your budget</option>
                  <option value="2000-4000">₹2,000 – ₹4,000</option>
                  <option value="4000-6000">₹4,000 – ₹6,000</option>
                  <option value="6000-8000">₹6,000 – ₹8,000</option>
                  <option value="8000+">₹8,000+</option>
                </select>

                <p className="mt-1 text-xs text-gray-400">
                  Find a room within your price range
                </p>
              </div>
            </div>
          </motion.div>

          {/* Room Type */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="room-type"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Room Type
            </label>

            <div className={fieldClass}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF3E9B]/10 text-[#FF3E9B] transition-colors group-focus-within:bg-[#FF3E9B]/15">
                <HomeIcon size={20} />
              </span>

              <div className="min-w-0 flex-1">
                <select
                  id="room-type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select room type</option>
                  <option value="single">Single Room</option>
                  <option value="shared">Double Sharing</option>
                  <option value="pg">PG</option>
                  <option value="1rk">1 RK</option>
                  <option value="1bhk">1 BHK</option>
                </select>

                <p className="mt-1 text-xs text-gray-400">
                  Select the space that suits you
                </p>
              </div>
            </div>
          </motion.div>

          {/* Search Button */}
          <motion.div variants={itemVariants} className="pt-1">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#19CF37] px-5 py-4 font-bold text-white shadow-lg shadow-[#19CF37]/20 transition-colors duration-300 hover:bg-[#14b92f] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#19CF37]/30"
            >
              <Search size={20} />
              <span>Search Available Rooms</span>
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>

            <p className="mt-3 text-center text-xs text-gray-400">
              <MapPin
                size={12}
                className="mr-1 inline-block text-[#FF3E9B]"
              />
              Discover rooms across Patna
            </p>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

export default RoomSearch;

