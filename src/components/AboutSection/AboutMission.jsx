import { motion } from "framer-motion";
import { Target, ShieldCheck, ArrowUpRight } from "lucide-react";

function AboutMission() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
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
    <section className="overflow-hidden bg-[#BBE0EF] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <span className="inline-flex items-center rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-[#FF3E9B] shadow-sm">
            What Drives Us
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Our Mission &{" "}
            <span className="text-[#FF3E9B]">Vision</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            We’re making room hunting simpler, more convenient, and more
            accessible for students and room owners.
          </p>
        </motion.div>

        {/* Mission and Vision Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-2 md:gap-8"
        >
          {/* Mission */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-9 lg:p-10"
          >
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#BBE0EF]/50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0AF2FA]/20 transition-colors duration-300 group-hover:bg-[#FF3E9B]">
                  <Target
                    size={28}
                    className="text-gray-900 transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                <span className="text-sm font-bold tracking-[0.2em] text-gray-300 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                  01
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B] sm:text-3xl">
                Our Mission
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-gray-600 sm:text-base">
                Our mission is to make room discovery simple and convenient
                for students while giving room owners an easy way to showcase
                their vacant rooms to people who are looking for accommodation.
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#FF3E9B]">
                Making room search easier
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-7 text-white shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-9 lg:p-10"
          >
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150 group-hover:bg-[#FF3E9B]/10" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF3E9B] transition-colors duration-300 group-hover:bg-[#0AF2FA]">
                  <ShieldCheck
                    size={28}
                    className="text-white transition-colors duration-300 group-hover:text-gray-900"
                  />
                </div>

                <span className="text-sm font-bold tracking-[0.2em] text-gray-600 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                  02
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-bold transition-colors duration-300 group-hover:text-[#FF3E9B] sm:text-3xl">
                Our Vision
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-gray-300 sm:text-base">
                We want to create a simple platform where students can discover
                rooms, check important details, request a visit, and connect
                with room owners without making the search unnecessarily
                complicated.
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#FF3E9B]">
                Building a better room-finding experience
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutMission;