import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  Edit3,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function StudentProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#BBE0EF] px-4">
        <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#BBE0EF] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <UserRound size={26} className="text-red-500" />
          </div>

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Profile Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please login to view yours profile.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-[#19CF37] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase() || "S";

  return (
    <main className="min-h-screen bg-[#BBE0EF] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <Link
          to="/student/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#FF3E9B]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-lg">

          {/* Header */}
          <div className="border-b border-slate-100 bg-cyan-50 px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#19CF37] text-3xl font-extrabold text-white shadow-sm">
                  {initial}
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#19CF37]">
                    Student Profile
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                    {user.name}
                  </h1>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-[#FF3E9B] px-3 py-1 text-xs font-bold capitalize text-white">
                      {user.role || "student"}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/student/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#19CF37] hover:text-[#19CF37]"
              >
                <Edit3 size={17} />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6 sm:p-8">

            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                yours account information is shown below.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">
                    <UserRound
                      size={19}
                      className="text-cyan-700"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Full Name
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {user.name || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
                    <Mail
                      size={19}
                      className="text-[#FF3E9B]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Email Address
                    </p>

                    <p className="mt-1 truncate font-semibold text-slate-800">
                      {user.email || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    <Phone
                      size={19}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Phone Number
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {user.phone || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                    <ShieldCheck
                      size={19}
                      className="text-purple-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Account Type
                    </p>

                    <p className="mt-1 font-semibold capitalize text-slate-800">
                      {user.role || "student"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0AF2FA]">
                  <ShieldCheck
                    size={19}
                    className="text-slate-800"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Account Information
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    You are logged in as a student. You can use yours
                    account to find rooms, save rooms and send room
                    requests to owners.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default StudentProfile;