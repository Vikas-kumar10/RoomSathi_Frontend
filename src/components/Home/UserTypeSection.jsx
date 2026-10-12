
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  UserRound,
  House,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Users,
} from "lucide-react";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function UserTypeSection() {
  return (
    <section className="relative overflow-hidden bg-[#BBE0EF]/35 py-14 sm:py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#0AF2FA]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#FF3E9B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF3E9B]/20 bg-white px-4 py-2 shadow-sm">
            <Users size={15} className="text-[#FF3E9B]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3E9B]">
              Made for You
            </span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Find Your Room or{" "}
            <span className="text-[#FF3E9B]">List Your Property</span>
          </h2>

         

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#0AF2FA]" />
        </motion.div>

        {/* User Type Cards */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Student Card */}
          <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{
              y: -7,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white p-7 shadow-[0_8px_30px_rgba(31,41,55,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-[#FF3E9B] hover:shadow-[0_18px_40px_rgba(255,62,155,0.15)] sm:p-10"
          >
            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#0AF2FA]/15 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#BBE0EF]/60 text-[#1f5081] transition-all duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white">
                <UserRound size={27} strokeWidth={1.8} />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#19CF37]/25 bg-[#19CF37]/10 px-3 py-1.5 text-xs font-bold text-gray-700">
                <CheckCircle2 size={13} className="text-green-600" />
                For Students
              </span>
            </div>

            <div className="relative mt-7 flex-1">
              <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B] sm:text-3xl">
                Looking for a Room?
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
                Find rooms that match your preferred location, budget, and
                lifestyle. Explore room details and request a visit directly
                through the platform.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "Explore available rooms",
                  "Compare rent and facilities",
                  "Request a room visit",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-gray-700"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-[#19CF37]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 border-t border-gray-100 pt-6">
              <Link
                to="/rooms"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3.5 font-bold text-gray-900 transition-all duration-300 hover:bg-[#FF3E9B] hover:text-white sm:w-auto"
              >
                Find a Room
                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF3E9B] transition-transform duration-300 group-hover:scale-x-100" />
          </motion.article>

          {/* Owner Card */}
          <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{
              y: -7,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-7 text-white shadow-[0_8px_30px_rgba(17,24,39,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-[#FF3E9B] hover:shadow-[0_18px_40px_rgba(255,62,155,0.2)] sm:p-10"
          >
            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF3E9B]/15 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FF3E9B] text-white transition-all duration-300 group-hover:bg-[#0AF2FA] group-hover:text-gray-900">
                <House size={27} strokeWidth={1.8} />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0AF2FA]/25 bg-[#0AF2FA]/10 px-3 py-1.5 text-xs font-bold text-gray-200">
                <Sparkles size={13} className="text-[#0AF2FA]" />
                For Owners
              </span>
            </div>

            <div className="relative mt-7 flex-1">
              <h3 className="text-2xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-[#FF3E9B] sm:text-3xl">
                Have a Room to Rent?
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">
                List your available room, manage your listings, and connect
                with students looking for accommodation in Patna.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "Publish your room listing",
                  "Manage room availability",
                  "Receive student visit requests",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-gray-200"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-[#0AF2FA]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 border-t border-white/10 pt-6">
              <Link
                to="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF3E9B] px-5 py-3.5 font-bold text-white transition-all duration-300 hover:bg-[#0AF2FA] hover:text-gray-900 sm:w-auto"
              >
                List Your Room
                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF3E9B] transition-transform duration-300 group-hover:scale-x-100" />
          </motion.article>
        </div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center text-sm leading-6 text-gray-600"
        >
          <span className="font-semibold text-gray-900">
            One platform, two possibilities.
          </span>{" "}
          Find your next room or help someone find theirs.
        </motion.p>
      </div>
    </section>
  );
}

export default UserTypeSection;

