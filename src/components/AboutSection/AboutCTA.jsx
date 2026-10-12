import { Link } from "react-router-dom";
import { Search, Home, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function AboutCTA() {
  return (
    <section className="overflow-hidden bg-[#0AF2FA] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Ready to Find Your{" "}
          <span className="text-[#FF3E9B]">Room?</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-800 sm:text-lg sm:leading-8">
          Explore available rooms or list your vacant room on RoomSaathi
          and connect with students looking for comfortable accommodation.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/rooms"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-7 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF3E9B] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF3E9B] focus:ring-offset-2"
          >
            <Search
              size={19}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            Find a Room
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF3E9B] hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF3E9B] focus:ring-offset-2"
          >
            <Home
              size={19}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            List Your Room
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutCTA;