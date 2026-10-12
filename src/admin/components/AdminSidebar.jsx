import {
  BarChart3,
  Building2,
  ClipboardList,
  FileWarning,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquareWarning,
  UserRound,
  Users,
  X,
  Menu,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      path: "/admin/students",
      icon: Users,
    },
    {
      title: "Owners",
      path: "/admin/owners",
      icon: UserRound,
    },
    {
      title: "Rooms",
      path: "/admin/rooms",
      icon: Building2,
    },
    {
      title: "Requests",
      path: "/admin/requests",
      icon: ClipboardList,
    },
    {
      title: "Visits",
      path: "/admin/visits",
      icon: ClipboardList,
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: FileWarning,
    },
    {
      title: "Complaints",
      path: "/admin/complaints",
      icon: MessageSquareWarning,
    },
    {
      title: "Statistics",
      path: "/admin/statistics",
      icon: BarChart3,
    },
  ];

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-slate-900 p-2 text-white shadow-lg lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-slate-950 text-white shadow-xl transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* ================= LOGO ================= */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-800 px-5">
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm transition duration-300 group-hover:scale-105"
              style={{
                backgroundColor: "#19CF37",
              }}
            >
              <Home size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Room
                <span
                  style={{
                    color: "#FF3E9B",
                  }}
                >
                  Saathi
                </span>
              </h1>

              <p className="text-xs font-medium text-slate-400">
                Find yours Perfect Room
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="px-2 py-3">
          {/* <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Management
          </p> */}

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 shadow-sm"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />

                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ================= LOGOUT ================= */}
        <div className=" shrink-0 border-t border-slate-500 ">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center  rounded-xl px-2 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;