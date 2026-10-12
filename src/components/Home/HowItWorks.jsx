
import { motion } from "framer-motion";
import {
  Search,
  CalendarCheck,
  UserRound,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Room",
    description:
      "Search rooms according to your preferred location, budget, room type, and facilities.",
    tag: "Discover",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Request a Visit",
    description:
      "Send a visit request to the owner and select a convenient date to see the room in person.",
    tag: "Schedule",
  },
  {
    number: "03",
    icon: UserRound,
    title: "Meet the Owner",
    description:
      "Connect with the owner, visit the room, and decide if it feels like the right place for you.",
    tag: "Connect",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
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

function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#0AF2FA]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#FF3E9B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF3E9B]/20 bg-[#FF3E9B]/5 px-4 py-2">
            <Sparkles size={15} className="text-[#FF3E9B]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3E9B]">
              Simple Process
            </span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            How{" "}
            <span className="text-[#FF3E9B]">RoomSaathi</span>{" "}
            Works
          </h2>

          

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#0AF2FA]" />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="relative grid gap-6 md:grid-cols-3 md:gap-7"
        >
          {/* Connecting line on desktop */}
          <div className="pointer-events-none absolute left-[20%] right-[20%] top-12 hidden border-t-2 border-dashed border-[#0AF2FA]/70 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_5px_25px_rgba(31,41,55,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[#FF3E9B] hover:shadow-[0_16px_35px_rgba(255,62,155,0.16)] sm:p-8"
              >
                {/* Step number */}
                <div className="absolute right-6 top-5 text-4xl font-black tracking-tight text-gray-100 transition-colors duration-300 group-hover:text-[#FF3E9B]/15">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-[#BBE0EF]/60 text-[#1f5081] shadow-sm transition-all duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white group-hover:shadow-md">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Step label */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19CF37]" />
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500 transition-colors group-hover:text-[#FF3E9B]">
                    Step {index + 1} · {step.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                  {step.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-gray-600 sm:text-base">
                  {step.description}
                </p>

                {/* Bottom indicator */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-gray-500">
                    {index === 0
                      ? "Start exploring"
                      : index === 1
                        ? "Plan your visit"
                        : "Find your place"}
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BBE0EF]/50 text-[#1f5081] transition-all duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white">
                    <ArrowRight size={17} />
                  </div>
                </div>

                {/* Pink hover accent */}
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#FF3E9B] transition-transform duration-300 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-9 flex max-w-2xl items-start gap-3 rounded-2xl border border-[#0AF2FA]/40 bg-[#BBE0EF]/30 p-5 sm:items-center sm:p-6"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1f5081] shadow-sm">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900">
              Your next room, made simpler.
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Explore available rooms and connect directly with room owners
              through RoomSaathi.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
