
import { motion } from "framer-motion";
import {
  ArrowDownUp,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

function RoomSort({ sortBy, onSortChange }) {
  return (
    <motion.section
      className="relative mb-6 overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-5 shadow-md backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#0AF2FA] opacity-15 blur-2xl" />

      <div className="pointer-events-none absolute -bottom-12 left-1/3 h-28 w-28 rounded-full bg-[#FF3E9B] opacity-10 blur-2xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Content */}
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#BBE0EF]/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1f5081]">
            <Sparkles size={14} className="text-[#FF3E9B]" />
            Room Explorer
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-[#1f5081] sm:text-2xl">
            Available Rooms
          </h2>

          <p className="mt-1.5 text-sm leading-6 text-gray-600">
            Find a room that matches your requirements.
          </p>
        </div>

        {/* Right Sorting Control */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF3E9B]/10 text-[#FF3E9B]">
            <SlidersHorizontal size={20} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-initial">
            <label
              htmlFor="room-sort"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              <ArrowDownUp size={14} className="text-[#FF3E9B]" />
              Sort rooms by
            </label>

            <div className="relative">
              <select
                id="room-sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-11 text-sm font-semibold text-gray-800 shadow-sm outline-none transition duration-300 hover:border-[#FF3E9B]/60 focus:border-[#0AF2FA] focus:ring-2 focus:ring-[#0AF2FA]/30 sm:min-w-52"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="oldest">Oldest First</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-[#0AF2FA]" />
    </motion.section>
  );
}

export default RoomSort;