
import { motion } from "framer-motion";
import { Home, Search, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function AboutHero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.16,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#BBE0EF] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#0AF2FA] opacity-20 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#FF3E9B] opacity-15 blur-3xl" />

      <div className="pointer-events-none absolute right-1/3 top-10 h-24 w-24 rounded-full bg-white opacity-40 blur-2xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-bold text-[#FF3E9B] shadow-sm backdrop-blur-sm"
            >
              <Home size={17} />
              About RoomSaathi
              <Sparkles size={15} />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold leading-tight tracking-tight text-[#1f5081] sm:text-5xl lg:text-6xl"
            >
              Making Room Search
              <span className="mt-2 block text-[#FF3E9B]">
                Simple for Students
              </span>
            </motion.h1>

            {/* Decorative Accent */}
            <motion.div
              variants={itemVariants}
              className="mt-5 h-1.5 w-24 rounded-full bg-[#0AF2FA]"
            />

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-xl text-base leading-8 text-gray-700 sm:text-lg"
            >
              RoomSaathi is a platform designed to connect students
              looking for rooms with owners who have rooms available
              for rent.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="mt-7"
            >
              <Link
                to="/rooms"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#19CF37] px-6 py-3.5 font-bold text-gray-900 shadow-md transition-colors duration-300 hover:bg-[#FF3E9B] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0AF2FA] focus:ring-offset-2 focus:ring-offset-[#BBE0EF]"
              >
                <Search
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                Find a Room
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>

            {/* Supporting Text */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-3 text-sm text-[#1f5081]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white/70">
                <Home size={17} className="text-[#FF3E9B]" />
              </div>

              <p className="font-medium">
                Your room search starts here.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.85,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-lg"
          >
            {/* Image Glow */}
            <div className="absolute -inset-3 rounded-3xl bg-[#0AF2FA] opacity-40 blur-xl" />

            {/* Image Frame */}
            <motion.div
              className="relative rounded-3xl border border-white/80 bg-white/60 p-2 shadow-xl"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <img
                src="/About/about home.png"
                alt="RoomSaathi - Find a comfortable room"
                className="h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-96"
              />

              {/* Image Caption */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF3E9B]/10 text-[#FF3E9B]">
                  <Home size={22} />
                </div>

                <div>
                  <p className="font-extrabold text-[#1f5081]">
                    Find Your Perfect Room
                  </p>
                  <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                    A simpler way to find your next stay
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Decorative Icon */}
            <motion.div
              className="absolute -right-3 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white shadow-lg sm:-right-5 sm:-top-5"
              animate={{ y: [0, -7, 0], rotate: [0, 4, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={25} className="text-[#FF3E9B]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
