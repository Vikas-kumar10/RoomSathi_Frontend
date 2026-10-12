
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarCheck,
  UserRound,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Easy Room Discovery",
    description:
      "Find available rooms without visiting every area blindly. Explore options based on your preferred location and budget.",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Schedule a Visit",
    description:
      "Request a convenient visit date and time to see the room in person before making your decision.",
  },
  {
    icon: UserRound,
    number: "03",
    title: "Connect Directly",
    description:
      "Help students and room owners connect through one convenient platform built around their needs.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
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

function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-[#BBE0EF]/45 py-14 sm:py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#0AF2FA]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#FF3E9B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-11 text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF3E9B]/20 bg-white px-4 py-2 shadow-sm">
            <Sparkles size={15} className="text-[#FF3E9B]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3E9B]">
              Why RoomSaathi
            </span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            A Simpler Way to{" "}
            <span className="text-[#FF3E9B]">Find Your Room</span>
          </h2>

          

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#0AF2FA]" />
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-[0_6px_25px_rgba(31,41,55,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[#FF3E9B] hover:shadow-[0_16px_35px_rgba(255,62,155,0.16)] sm:p-8"
              >
                {/* Number */}
                <span className="absolute right-6 top-5 text-4xl font-black tracking-tight text-gray-100 transition-colors duration-300 group-hover:text-[#FF3E9B]/15">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0AF2FA]/20 text-gray-900 transition-all duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white group-hover:shadow-md">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B] sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                  {feature.description}
                </p>

                {/* Bottom label */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-gray-500 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                    RoomSaathi Advantage
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#BBE0EF]/50 text-gray-800 transition-all duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                {/* Pink hover accent */}
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF3E9B] transition-transform duration-300 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#0AF2FA]/40 bg-white/80 p-5 shadow-sm sm:flex-row sm:px-7"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0AF2FA]/20 text-gray-900">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Your room search starts here.
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Explore rooms and plan your next visit with ease.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#19CF37] px-5 py-3 text-center text-sm font-bold text-gray-900 transition-colors duration-300 hover:bg-[#FF3E9B] hover:text-white">
            Simple. Convenient. Connected.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TrustSection;

