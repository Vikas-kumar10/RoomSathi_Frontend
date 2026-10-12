
import { motion } from "framer-motion";
import {
  Search,
  CalendarCheck,
  UserRound,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search for a Room",
    description:
      "Students can search available rooms according to location, budget and room type.",
    label: "Explore available rooms",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Request a Visit",
    description:
      "After finding a suitable room, students can request a visit to see the room physically.",
    label: "Schedule your visit",
  },
  {
    number: "03",
    icon: UserRound,
    title: "Meet the Owner",
    description:
      "The owner receives the request and both sides can connect to arrange the room visit.",
    label: "Connect with owners",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
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
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AboutHowItWorks() {
  return (
    <section className="overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#FF3E9B]/15 bg-[#FF3E9B]/5 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#FF3E9B]">
            How RoomSaathi Works
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            From Search to{" "}
            <span className="text-[#FF3E9B]">Room Visit</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Finding your next room doesn't have to be complicated.
            Follow three simple steps to discover a room and connect
            with its owner.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-7"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                variants={cardVariants}
                whileHover={{ y: -7 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_5px_25px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#FF3E9B]/30 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] sm:p-8"
              >
                {/* Decorative background */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#BBE0EF]/40 transition-all duration-500 group-hover:scale-150 group-hover:bg-[#FF3E9B]/10" />

                {/* Step number and icon */}
                <div className="relative flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0AF2FA]/20 transition-all duration-300 group-hover:rotate-[-5deg] group-hover:bg-[#FF3E9B]">
                    <Icon
                      size={27}
                      strokeWidth={1.8}
                      className="text-gray-900 transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <span className="text-4xl font-extrabold tracking-tight text-[#BBE0EF] transition-colors duration-300 group-hover:text-[#FF3E9B]/30">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="relative mt-7 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B] sm:text-2xl">
                  {step.title}
                </h3>

                <p className="relative mt-3 flex-1 text-sm leading-7 text-gray-600 sm:text-base">
                  {step.description}
                </p>

                {/* Bottom label */}
                <div className="relative mt-7 flex items-center gap-2 border-t border-gray-100 pt-5 text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                  <span>{step.label}</span>

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-[#FF3E9B] transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:mt-12"
        >
          <p className="text-sm text-gray-500 sm:text-base">
            Simple steps. Better choices. A place to call home.
          </p>

          <div className="h-1 w-12 rounded-full bg-[#FF3E9B]" />
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHowItWorks;

