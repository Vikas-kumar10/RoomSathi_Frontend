import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  Building2,
} from "lucide-react";

function OwnerProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Fetch logged-in owner data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
    }
  }, []);

  const userName = user?.name || "Owner";
  const userEmail = user?.email || "Not available";
  const userPhone = user?.phone || "Not available";
  const userRole = user?.role || "owner";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#BBE0EF] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* ================= BACK BUTTON ================= */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-4  text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:border-[#0AF2FA] hover:text-slate-900 hover:shadow-md"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Owner Profile
          </h1>
        </div>

        {/* ================= MAIN PROFILE CARD ================= */}
        <section className="overflow-hidden rounded-3xl border border-white bg-white shadow-lg">
          {/* ================= PROFILE HEADER ================= */}
          <div className="relative overflow-hidden bg-[#0AF2FA] px-6 py-8 sm:px-8 lg:px-10">
            {/* Decorative Shapes */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF3E9B] opacity-80" />

            <div className="absolute -bottom-16 left-1/3 h-36 w-36 rounded-full bg-white opacity-20" />

            <div className="absolute right-1/3 top-8 h-12 w-12 rounded-full bg-white opacity-20" />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#19CF37] shadow-sm">
                    <Building2 size={19} />
                  </div>

                  <span className="text-lg font-bold text-white">
                    Room<span className="text-[#FF3E9B]">Saathi</span>
                  </span>
                </div>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/90">
                  yours account information is displayed securely below.
                </p>
              </div>

              {/* Status */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 backdrop-blur-sm">
                <CheckCircle2 size={16} className="text-white" />

                <span className="text-xs font-bold text-white">
                  Active Account
                </span>
              </div>
            </div>
          </div>

          {/* ================= PROFILE IDENTITY ================= */}
          <div className="px-6 py-7 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5 border-b border-slate-100 pb-7 sm:flex-row sm:items-center sm:justify-between">
              {/* Owner Identity */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#FF3E9B] text-3xl font-bold text-white shadow-md ring-4 ring-pink-50 sm:h-24 sm:w-24 sm:text-4xl">
                  {userInitial}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
                    {userName}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold capitalize text-green-700">
                      <ShieldCheck size={14} />
                      {userRole}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Label */}
              <div className="hidden rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-right sm:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Account Type
                </p>

                <p className="mt-1 text-sm font-bold capitalize text-slate-800">
                  {userRole}
                </p>
              </div>
            </div>

            {/* ================= INFORMATION SECTION ================= */}
            <div className="pt-7">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  yours registered account details.
                </p>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Full Name */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-cyan-200 hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                      <UserRound size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Full Name
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-800 sm:text-base">
                        {userName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-pink-200 hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-[#FF3E9B]">
                      <Mail size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Email Address
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-800 sm:text-base">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-green-200 hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#19CF37]">
                      <Phone size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Phone Number
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800 sm:text-base">
                        {userPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Role */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-cyan-200 hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                      <ShieldCheck size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Account Role
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-sm font-semibold capitalize text-slate-800 sm:text-base">
                          {userRole}
                        </p>

                        <BadgeCheck
                          size={17}
                          className="shrink-0 text-[#19CF37]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= ACCOUNT STATUS ================= */}
            <div className="mt-7 rounded-2xl border border-green-100 bg-green-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#19CF37] shadow-sm">
                  <CheckCircle2 size={20} />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-green-800">
                    Owner Account Active
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-green-700 sm:text-sm">
                    yours RoomSaathi owner account is active. You can manage
                    yours rooms, requests, visits, and messages from yours
                    dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* ================= BOTTOM NOTE ================= */}
            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
              <ShieldCheck size={14} />
              <span>
                Profile information is fetched from yours registered account.
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OwnerProfile;
