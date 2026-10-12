import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RoomSearch from "./RoomSearch.jsx";
import CustomCursor from "../CustomCursor.jsx";

function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    
    <section className="overflow-hidden bg-[#BBE0EF]">
      <CustomCursor />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-5">
        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.25,
          }}
          className="flex flex-col items-start"
        >
          {/* Location Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-semibold text-[#FF3E9B] shadow-sm backdrop-blur-sm"
          >
            <MapPin size={16} />
            Find Rooms Across Patna
          </motion.div>

          {/* Animated Heading */}
          <motion.h1
            variants={itemVariants}
            className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Find a Room That
            <motion.span
              variants={itemVariants}
              className="mt-1 block text-[#FF3E9B]"
            >
              Feels Like Home
            </motion.span>
          </motion.h1>

          {/* Professional Animated Description */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-[15px] leading-7 tracking-[0.01em] text-gray-700 sm:text-base sm:leading-8 lg:text-[17px]"
          >
            Discover{" "}
            <span className="font-semibold text-gray-900">
              comfortable and affordable rooms
            </span>{" "}
            near your college, coaching center, workplace, or preferred location
            in Patna. Explore available options, connect directly with room
            owners, and schedule a visit to find a place that feels like home.
          </motion.p>

          {/* Animated Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-3 sm:gap-4"
          >
            <Link
              to="/rooms"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#14b92f] hover:shadow-lg"
            >
              Find Rooms
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#FF3E9B] bg-white px-6 py-3.5 font-semibold text-[#FF3E9B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF3E9B] hover:text-white hover:shadow-md"
            >
              List Your Room
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Search Component */}
        <motion.div
          initial={{
            opacity: 0,
            x: 35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full"
        >
          <RoomSearch />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
