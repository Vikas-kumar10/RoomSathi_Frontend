
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  ArrowUpRight,
  Building2,
  Search,
  Sparkles,
} from "lucide-react";

const areas = [
  {
    name: "Boring Road",
    description: "Find a comfortable room near your daily essentials.",
    number: "01",
  },
  {
    name: "Kankarbagh",
    description: "Explore convenient stays in a popular residential area.",
    number: "02",
  },
  {
    name: "Rajendra Nagar",
    description: "Discover rooms close to student-friendly locations.",
    number: "03",
  },
  {
    name: "Bailey Road",
    description: "Explore rental options around a well-connected area.",
    number: "04",
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

function PopularAreas() {
  return (
    <section className="relative overflow-hidden bg-[#BBE0EF]/40 py-14 sm:py-7">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-20 top-16 h-52 w-52 rounded-full bg-[#0AF2FA]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-[#FF3E9B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex flex-col items-center text-center sm:mb-14"
        >
          

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Find Rooms in{" "}
            <span className="text-[#FF3E9B]">Popular Areas</span>
          </h2>

          

          <div className="mt-5 h-1 w-16 rounded-full bg-[#0AF2FA]" />
        </motion.div>

        {/* Area Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {areas.map((area) => (
            <motion.div
              key={area.name}
              variants={cardVariants}
              whileHover={{
                y: -7,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <Link
                to={`/rooms?location=${encodeURIComponent(area.name)}`}
                className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[#FF3E9B] hover:shadow-[0_16px_35px_rgba(255,62,155,0.18)] sm:p-6"
              >
                {/* Card number */}
                <div className="absolute right-5 top-5 text-xs font-bold tracking-widest text-gray-300 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                  {area.number}
                </div>

                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#BBE0EF]/60 text-[#1f5081] transition-all duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white">
                  <Building2 size={22} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="pr-3 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                    {area.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {area.description}
                  </p>
                </div>

                {/* Bottom action */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-semibold text-gray-600 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                    Explore rooms
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BBE0EF]/50 text-gray-700 transition-all duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                {/* Pink hover accent */}
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF3E9B] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-9 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white bg-white/80 p-5 shadow-sm sm:flex-row sm:px-7"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0AF2FA]/20 text-[#1f5081]">
              <Sparkles size={21} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Looking for a different area?
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Browse available rooms across Patna.
              </p>
            </div>
          </div>

          <Link
            to="/rooms"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-bold text-gray-900 transition-all duration-300 hover:bg-[#FF3E9B] hover:text-white sm:w-auto"
          >
            <Search size={17} />
            Explore All Rooms
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default PopularAreas;

