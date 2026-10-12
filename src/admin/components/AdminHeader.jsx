import {
  Bell,
  ShieldCheck,
  ChevronDown,
  Search,
} from "lucide-react";

function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* ================= LEFT SECTION ================= */}
        <div className="flex items-center gap-4 pl-12 lg:pl-0">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-500">
                RoomSaathi
              </p>

              {/* <span className="text-slate-300">/</span> */}

              {/* <p className="text-sm font-medium text-slate-400">
                Admin
              </p> */}
            </div>

            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">
              Administration
            </h2>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <button
            type="button"
            className="hidden rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 md:flex"
            title="Search"
          >
            <Search size={20} />
          </button>

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            title="Notifications"
          >
            <Bell size={21} />

            {/* Notification Dot */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-9 w-px bg-slate-200 sm:block" />

          {/* ================= ADMIN PROFILE ================= */}
          <button
            type="button"
            className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
          >
            {/* Avatar */}
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
              style={{
                backgroundColor: "#1f5081",
              }}
            >
              <ShieldCheck size={19} />
            </div>

            {/* Profile Info */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Administrator
              </p>

              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Super Admin
              </p>
            </div>

            {/* Dropdown Icon */}
            <ChevronDown
              size={17}
              className="hidden text-slate-400 transition group-hover:text-slate-700 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;