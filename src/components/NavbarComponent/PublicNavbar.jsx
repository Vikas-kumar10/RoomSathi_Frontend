


import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Search,
  LogIn,
  UserPlus,
  Menu,
  X,
  Info,
  Phone,
  ArrowUpRight,
} from "lucide-react";

function PublicNavbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Find Rooms", path: "/rooms", icon: Search },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const linkVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#BBE0EF]/70 bg-white/95 shadow-[0_4px_20px_rgba(31,41,55,0.05)] backdrop-blur-xl">
      {/* Top accent line */}
      <div className="h-1 w-full bg-[#0AF2FA]" />

      <div className="mx-auto flex min-h-76px max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center gap-3"
          aria-label="RoomSaathi Home"
        >
          <motion.div
            whileHover={{ rotate: -6, scale: 1.06 }}
            transition={{ duration: 0.25 }}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#19CF37] text-white shadow-[0_5px_14px_rgba(25,207,55,0.20)] transition-colors duration-300 group-hover:bg-[#FF3E9B]"
          >
            <Home size={23} strokeWidth={2.2} />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#0AF2FA]" />
          </motion.div>

          <div>
            <h1 className="text-xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-2xl">
              Room<span className="text-[#FF3E9B]">Saathi</span>
            </h1>

            <p className="mt-0.5 hidden text-[11px] font-medium tracking-wide text-gray-500 sm:block">
              Find Your Perfect Room
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-2 py-3 text-sm font-semibold transition-colors duration-300 ${
                  active
                    ? "text-[#FF3E9B]"
                    : "text-gray-600 hover:text-[#FF3E9B]"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={active ? 2.4 : 1.9}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />

                {item.name}

                <span
                  className={`absolute bottom-1 left-0 h-0.5 rounded-full bg-[#FF3E9B] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
              isActive("/login")
                ? "border-[#FF3E9B] bg-[#FF3E9B] text-white"
                : "border-[#BBE0EF] bg-white text-gray-700 hover:border-[#FF3E9B] hover:bg-[#FF3E9B] hover:text-white"
            }`}
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            to="/register"
            className={`group inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_7px_18px_rgba(255,62,155,0.22)] ${
              isActive("/register")
                ? "bg-[#FF3E9B] text-white"
                : "bg-[#19CF37] text-gray-900 hover:bg-[#FF3E9B] hover:text-white"
            }`}
          >
            <UserPlus size={17} />
            Register
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 md:hidden ${
            mobileMenuOpen
              ? "border-[#FF3E9B] bg-[#FF3E9B] text-white"
              : "border-[#BBE0EF] bg-white text-gray-800 hover:border-[#0AF2FA] hover:bg-[#BBE0EF]/50"
          }`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="public-mobile-menu"
        >
          <motion.span
            key={mobileMenuOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </motion.span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            id="public-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#BBE0EF]/70 bg-white md:hidden"
          >
            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.055 },
                },
              }}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-7xl px-4 pb-5 pt-3 sm:px-6"
            >
              {/* Mobile Navigation Links */}
              <div className="space-y-1.5">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <motion.div key={item.path} variants={linkVariants}>
                      <Link
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                          active
                            ? "bg-[#BBE0EF]/60 text-[#FF3E9B]"
                            : "text-gray-700 hover:bg-[#BBE0EF]/40 hover:text-[#FF3E9B]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon
                            size={19}
                            className={
                              active ? "text-[#FF3E9B]" : "text-gray-500"
                            }
                          />
                          {item.name}
                        </span>

                        {active && (
                          <span className="h-2 w-2 rounded-full bg-[#FF3E9B]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Authentication */}
              <motion.div
                variants={linkVariants}
                className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4"
              >
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition-colors duration-300 ${
                    isActive("/login")
                      ? "border-[#FF3E9B] bg-[#FF3E9B] text-white"
                      : "border-[#BBE0EF] text-gray-700 hover:border-[#FF3E9B] hover:bg-[#FF3E9B] hover:text-white"
                  }`}
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition-colors duration-300 ${
                    isActive("/register")
                      ? "bg-[#FF3E9B] text-white"
                      : "bg-[#19CF37] text-gray-900 hover:bg-[#FF3E9B] hover:text-white"
                  }`}
                >
                  <UserPlus size={17} />
                  Register
                </Link>
              </motion.div>

              {/* Mobile Footer */}
              <motion.div
                variants={linkVariants}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#BBE0EF]/35 px-3 py-3 text-xs font-medium text-gray-600"
              >
                <span className="h-2 w-2 rounded-full bg-[#19CF37]" />
                Find your perfect room with{" "}
                <span className="font-bold text-[#FF3E9B]">RoomSaathi</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default PublicNavbar;

