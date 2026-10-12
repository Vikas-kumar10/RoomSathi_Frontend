import { motion } from "framer-motion";
import {
  ArrowRight,
  Home,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

function ContactHero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#BBE0EF] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      {/* Decorative Background */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/30" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#FF3E9B]/10" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-[#FF3E9B] shadow-sm backdrop-blur-sm"
            >
              <MessageCircle size={17} />
              We're Here to Help
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Have a Question?
              <span className="mt-1 block text-[#FF3E9B]">
                Let's Talk.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-xl text-base leading-7 text-gray-700 sm:mt-5 sm:text-lg sm:leading-8"
            >
              Whether you're looking for the perfect room, want to list
              your property, or need help using RoomSaathi, our team is
              ready to assist you.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#contact-form"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3.5 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#FF3E9B] hover:shadow-lg"
              >
                Send a Message
                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white bg-white px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Phone size={18} className="text-[#FF3E9B]" />
                Call Us
              </a>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              variants={itemVariants}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#19CF37]" />
                Trusted Support
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={18} className="text-[#19CF37]" />
                Quick Response
              </div>

              <div className="flex items-center gap-2">
                <Home size={18} className="text-[#19CF37]" />
                Student Friendly
              </div>
            </motion.div>
          </motion.div>

          {/* Right Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Floating Decorative Circle */}
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#FF3E9B]/20 blur-xl" />

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-3xl border border-white/70 bg-white/90 p-5 shadow-2xl backdrop-blur-sm sm:p-7"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#FF3E9B]">
                    Contact RoomSaathi
                  </p>

                  <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                    We'd Love to Hear From You
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#BBE0EF] text-[#FF3E9B]">
                  <MessageCircle size={24} />
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Reach out to us for questions, support, room listings, or
                any assistance related to your RoomSaathi experience.
              </p>

              {/* Contact Items */}
              <div className="mt-5 space-y-3">
                {/* Phone */}
                <a
                  href="tel:+919876543210"
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition duration-300 hover:border-[#FF3E9B]/30 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#19CF37]/10 text-[#19CF37] transition-transform duration-300 group-hover:scale-105">
                    <Phone size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500">
                      Call Us
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 transition-colors group-hover:text-[#FF3E9B]">
                      +91 98765 43210
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:support@roomsaathi.com"
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition duration-300 hover:border-[#FF3E9B]/30 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF3E9B]/10 text-[#FF3E9B] transition-transform duration-300 group-hover:scale-105">
                    <Mail size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500">
                      Email Us
                    </p>

                    <p className="mt-1 break-all font-semibold text-gray-900 transition-colors group-hover:text-[#FF3E9B]">
                      support@roomsaathi.com
                    </p>
                  </div>
                </a>
              </div>

              {/* Bottom Note */}
              <div className="mt-5 rounded-2xl bg-[#BBE0EF]/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#19CF37]" />

                  <p className="text-sm leading-6 text-gray-700">
                    Our support team is available to help with your
                    questions and make your room-search experience easier.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;