import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Heart,
  UserRound,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const navLinks = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: Home,
  },
  {
    name: "Find Rooms",
    path: "/rooms",
    icon: Search,
  },
  {
    name: "My Requests",
    path: "/student/requests",
    icon: ClipboardList,
  },
  {
    name: "Saved Rooms",
    path: "/student/saved-rooms",
    icon: Heart,
  },
];

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const name = user?.name || "Student";
  const email = user?.email || "";
  const role = user?.role || "student";
  const initial = name.charAt(0).toUpperCase();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();

    setMenuOpen(false);
    setProfileOpen(false);

    navigate("/login");
  };

  // Close profile when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // Close menus after navigation
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/student/dashboard"
            onClick={() => {
              setMenuOpen(false);
              setProfileOpen(false);
            }}
            className="flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#0AF2FA] shadow-sm">
              <Home
                size={22}
                strokeWidth={2.3}
                className="text-slate-900"
              />

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#FF3E9B]" />
            </div>

            <div className="leading-none">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Room
                <span className="text-[#FF3E9B]">Saathi</span>
              </h1>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Student Panel
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-1 lg:flex">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-white text-[#19CF37] shadow-sm"
                      : "text-slate-500 hover:bg-white hover:text-slate-800"
                  }`}
                >
                  <Icon size={16} strokeWidth={2.2} />

                  <span>{item.name}</span>

                  {active && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#FF3E9B]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative hidden lg:block"
          >
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className={`flex items-center gap-3 rounded-2xl border px-2.5 py-2 transition-all ${
                profileOpen
                  ? "border-[#0AF2FA] bg-[#0AF2FA]/40"
                  : "border-slate-200 bg-white hover:border-[#0AF2FA] hover:bg-slate-50"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#19CF37] text-sm font-extrabold text-white">
                {initial}
              </div>

              <div className="hidden text-left xl:block">
                <p className="max-w-24 truncate text-sm font-bold text-slate-800">
                  {name}
                </p>

                <p className="text-[11px] capitalize text-slate-400">
                  {role}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                {/* User Info */}
                <div className="bg-[#BBE0EF]/35 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#19CF37] font-bold text-white">
                      {initial}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-slate-900">
                        {name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {email}
                      </p>

                      <span className="mt-1.5 inline-block rounded-full bg-[#0AF2FA]/20 px-2 py-0.5 text-[10px] font-bold capitalize text-slate-700">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="p-2">
                  <Link
                    to="/student/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-[#BBE0EF]/40 hover:text-slate-900"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                      <UserRound size={16} />
                    </span>

                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                      <LogOut size={16} />
                    </span>

                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#0AF2FA] hover:bg-[#BBE0EF]/30 lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

            {/* User Info */}
            <div className="mb-3 flex items-center gap-3 rounded-2xl bg-[#BBE0EF]/35 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#19CF37] font-bold text-white">
                {initial}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {name}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {email}
                </p>

                <p className="text-xs font-semibold capitalize text-[#FF3E9B]">
                  {role}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-[#BBE0EF]/50 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        active
                          ? "text-[#19CF37]"
                          : "text-slate-400"
                      }
                    />

                    {item.name}

                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#19CF37]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Profile Actions */}
            <div className="mt-3 border-t border-slate-100 pt-3">
              <Link
                to="/student/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <UserRound size={18} />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default StudentNavbar;