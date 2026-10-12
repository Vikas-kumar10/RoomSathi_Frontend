
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";

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
    y: 24,
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

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Find Rooms", to: "/rooms" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const userLinks = [
  { label: "Find a Room", to: "/rooms" },
  { label: "List Your Room", to: "/register" },
  { label: "Login", to: "/login" },
  { label: "Create Account", to: "/register" },
];

const contactItems = [
  {
    icon: MapPin,
    text: "Patna, Bihar, India",
    color: "#0AF2FA",
    href: null,
  },
  {
    icon: Phone,
    text: "+91 98765 43210",
    color: "#FF3E9B",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    text: "support@roomsaathi.com",
    color: "#19CF37",
    href: "mailto:support@roomsaathi.com",
  },
];

function FooterLink({ to, children, accent }) {
  return (
    <Link
      to={to}
      className={`group flex w-fit items-center gap-2 text-sm text-gray-400 transition-colors duration-300 ${accent}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gray-700 transition-colors duration-300 group-hover:bg-current" />

      {children}

      <ArrowUpRight
        size={14}
        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </Link>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#0AF2FA]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FF3E9B]/10 blur-3xl" />

      {/* Top brand accent */}
      <div className="relative flex h-1 w-full">
        <div className="w-1/3 bg-[#0AF2FA]" />
        <div className="w-1/3 bg-[#FF3E9B]" />
        <div className="w-1/3 bg-[#19CF37]" />
      </div>

      {/* Main Footer */}
      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.08 }}
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:pr-5">
            <Link
              to="/"
              className="mb-5 flex w-fit items-center gap-3"
              aria-label="RoomSaathi Home"
            >
              <motion.div
                whileHover={{ rotate: -7, scale: 1.07 }}
                transition={{ duration: 0.25 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0AF2FA] text-gray-950 shadow-lg shadow-[#0AF2FA]/15"
              >
                <Home size={24} strokeWidth={2.5} />
              </motion.div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Room<span className="text-[#FF3E9B]">Saathi</span>
                </h2>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-gray-400">
                  Find Your Perfect Room
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-400">
              RoomSaathi connects students looking for rooms with owners
              who have rooms available for rent in Patna.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2">
              <Sparkles size={15} className="text-[#0AF2FA]" />
              <span className="text-xs font-medium text-gray-300">
                Find a place to call home
              </span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 flex items-center gap-2 text-base font-bold text-white">
              <span className="h-5 w-1 rounded-full bg-[#0AF2FA]" />
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  to={link.to}
                  accent="hover:text-[#0AF2FA]"
                >
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </motion.div>

          {/* For Users */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 flex items-center gap-2 text-base font-bold text-white">
              <span className="h-5 w-1 rounded-full bg-[#FF3E9B]" />
              For Users
            </h3>

            <div className="flex flex-col gap-4">
              {userLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  to={link.to}
                  accent="hover:text-[#FF3E9B]"
                >
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 flex items-center gap-2 text-base font-bold text-white">
              <span className="h-5 w-1 rounded-full bg-[#19CF37]" />
              Contact Us
            </h3>

            <div className="space-y-3">
              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + index * 0.1,
                    }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${item.color}18`,
                        color: item.color,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="break-words text-sm leading-6 text-gray-400 transition-colors duration-300 hover:text-white"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-sm leading-6 text-gray-400">
                        {item.text}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <h3 className="text-lg font-bold text-white">
              Ready to find your next room?
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Explore available rooms and discover your next place in Patna.
            </p>
          </div>

          <Link
            to="/rooms"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 font-bold text-gray-950 transition-all duration-300 hover:bg-[#FF3E9B] hover:text-white"
          >
            Explore Rooms
            <ArrowUpRight size={18} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom Footer */}
      <div className="relative border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:px-6 md:flex-row md:text-left lg:px-8"
        >
          <p className="text-xs leading-6 text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} RoomSaathi. All rights reserved.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-gray-500 sm:text-sm">
            Made with
            <Heart
              size={14}
              fill="#FF3E9B"
              className="text-[#FF3E9B]"
            />
            for Students &amp; Room Owners in
            <span className="font-semibold text-[#0AF2FA]">Patna</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;

