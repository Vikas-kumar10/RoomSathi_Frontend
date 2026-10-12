import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomCursor from "../CustomCursor";

const locations = [
  {
    name: "Kankarbagh",
    rooms: "120+",
    description: "Popular choice for students and working professionals.",
  },
  {
    name: "Boring Road",
    rooms: "85+",
    description: "Well-connected area with plenty of daily conveniences.",
  },
  {
    name: "Rajendra Nagar",
    rooms: "70+",
    description: "A convenient location close to colleges and coaching hubs.",
  },
  {
    name: "Patliputra Colony",
    rooms: "60+",
    description: "Peaceful residential area with comfortable stay options.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function PopularLocations() {
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    navigate(`/rooms?location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#BBE0EF] px-4 py-16 sm:px-6 sm:py-10 lg:px-8">
      <CustomCursor />
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 animate-pulse rounded-full bg-[#0AF2FA] opacity-20 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 animate-pulse rounded-full bg-[#FF3E9B] opacity-15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF3E9B]/20 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#FF3E9B] shadow-sm">
              <MapPin size={17} />
              Explore Locations
              <Sparkles size={15} />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#1f5081] sm:text-4xl lg:text-5xl">
              Find Rooms in
              <span className="block text-[#FF3E9B] sm:inline">
                {" "}
                Popular Areas
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-700 sm:text-lg">
              Explore comfortable and affordable accommodation options in some
              of the most preferred areas for students and professionals.
            </p>
          </div>

          {/* Small Info Card */}
          <motion.div
            className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg backdrop-blur-sm"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0AF2FA]/30 text-[#1f5081]">
              <Building2 size={23} />
            </div>

            <div>
              <p className="font-bold text-gray-900">Multiple Options</p>
              <p className="mt-1 text-sm text-gray-600">Rooms across Patna</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Location Cards */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {locations.map((location, index) => (
            <motion.button
              type="button"
              key={location.name}
              variants={cardVariants}
              onClick={() => handleLocationClick(location.name)}
              aria-label={`Explore rooms in ${location.name}`}
              className="group relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 text-left shadow-md backdrop-blur-sm transition-colors duration-300 hover:border-[#FF3E9B] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0AF2FA] focus:ring-offset-2 focus:ring-offset-[#BBE0EF]"
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Decorative Circle */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0AF2FA]/20 transition-transform duration-500 group-hover:scale-150" />

              <div className="absolute right-5 top-5 text-xs font-bold tracking-widest text-[#1f5081]/50">
                0{index + 1}
              </div>

              {/* Icon and Arrow */}
              <div className="relative flex items-center justify-between">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF3E9B]/10 text-[#FF3E9B] transition-colors duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white"
                  whileHover={{ rotate: -5, scale: 1.08 }}
                >
                  <MapPin size={25} />
                </motion.div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BBE0EF]/60 text-[#1f5081] transition-colors duration-300 group-hover:bg-[#19CF37] group-hover:text-gray-900">
                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="relative mt-6 flex-1">
                <h3 className="text-xl font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                  {location.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {location.description}
                </p>
              </div>

              {/* Room Count */}
              <div className="relative mt-6 flex items-center gap-3 border-t border-gray-100 pt-4 transition-colors duration-300 group-hover:border-[#FF3E9B]/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#19CF37]/15 text-[#1f5081] transition-colors duration-300 group-hover:bg-[#19CF37]/30">
                  <Users size={19} />
                </div>

                <div>
                  <p className="text-sm font-extrabold text-gray-900">
                    {location.rooms} Rooms
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Available to explore
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-md backdrop-blur-sm sm:flex-row sm:items-center sm:px-8 sm:py-7"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <h3 className="text-lg font-extrabold text-[#1f5081] sm:text-xl">
              Looking for a different area?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Search by location to discover more rooms around you.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => navigate("/rooms")}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3.5 font-bold text-gray-900 shadow-md transition-colors duration-300 hover:bg-[#FF3E9B] focus:outline-none focus:ring-2 focus:ring-[#0AF2FA] focus:ring-offset-2 sm:w-auto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore All Locations
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default PopularLocations;
