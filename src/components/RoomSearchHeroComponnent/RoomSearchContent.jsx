import { motion } from "framer-motion";

function RoomSearchContent() {
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="mx-auto max-w-4xl text-center">
      {/* Animated Heading */}
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="text-4xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
      >
        <motion.span
          variants={headingVariants}
          className="block"
        >
          Find a Room That
        </motion.span>

        <motion.span
          variants={headingVariants}
          className="mt-2 block text-[#FF3E9B]"
        >
          Feels Like Home
        </motion.span>
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.55,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto mt-6 max-w-3xl text-base leading-7 tracking-[0.01em] text-gray-600 sm:text-lg sm:leading-8"
      >
        Discover comfortable rooms, PGs, and shared accommodations
        that fit your{" "}
        <span className="font-semibold text-gray-900">
          location, lifestyle, and budget.
        </span>{" "}
        Explore suitable options, compare what matters, and find a
        place you’ll be happy to call home.
      </motion.p>

      {/* Subtle Animated Accent */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 56, opacity: 1 }}
        transition={{
          delay: 1,
          duration: 0.65,
          ease: "easeOut",
        }}
        className="mx-auto mt-6 h-1 rounded-full bg-[#FF3E9B]"
      />
    </div>
  );
}

export default RoomSearchContent;