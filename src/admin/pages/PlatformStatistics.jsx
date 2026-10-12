import {
  BarChart3,
  Building2,
  CalendarDays,
  ClipboardList,
  UserRound,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  getPlatformStatistics,
} from "../../api/adminStatistics.api"

function PlatformStatistics() {
  const [statistics, setStatistics] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================
  // FETCH STATISTICS
  // =====================================

  const loadStatistics = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getPlatformStatistics();

      setStatistics(
        response?.statistics || null
      );
    } catch (error) {
      console.error(
        "Statistics loading error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to load platform statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    loadStatistics();
  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Platform Statistics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Loading platform performance...
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm"
              />
            )
          )}
        </div>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Platform Statistics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Overview of RoomSaathi platform
            performance.
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">
            {error}
          </p>

          <button
            onClick={loadStatistics}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // SAFE DEFAULTS
  // =====================================

  const students =
    statistics?.students || 0;

  const owners =
    statistics?.owners || 0;

  const rooms =
    statistics?.rooms || 0;

  const requests =
    statistics?.requests || 0;

  const visits =
    statistics?.visits || 0;

  const monthlyGrowth =
    statistics?.monthlyGrowth || 0;

  const monthlyActivity =
    statistics?.monthlyActivity || {};

  const roomDistribution =
    statistics?.roomDistribution || {};

  const newStudents =
    monthlyActivity.newStudents || 0;

  const newRooms =
    monthlyActivity.newRooms || 0;

  const visitRequests =
    monthlyActivity.visitRequests || 0;

  const newStudentsPercentage =
    monthlyActivity.newStudentsPercentage || 0;

  const newRoomsPercentage =
    monthlyActivity.newRoomsPercentage || 0;

  const visitRequestsPercentage =
    monthlyActivity.visitRequestsPercentage || 0;

  const approvedRooms =
    roomDistribution.approved || 0;

  const pendingRooms =
    roomDistribution.pending || 0;

  const rejectedRooms =
    roomDistribution.rejected || 0;

  return (
    <div className="space-y-6">
      {/* =====================================
          HEADER
      ===================================== */}

      <div>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Platform Statistics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Overview of RoomSaathi platform
              performance.
            </p>
          </div>

          <button
            onClick={loadStatistics}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* =====================================
          MAIN STATISTICS
      ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Students */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Users size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Students
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {students.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Owners */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <UserRound size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Owners
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {owners.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Rooms */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <Building2 size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Rooms
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {rooms.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Requests */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <ClipboardList size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Requests
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {requests.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Visits */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Visits
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {visits.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Growth */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-pink-100 p-3 text-pink-600">
              <BarChart3 size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Monthly Growth
              </p>

              <p
                className={`text-2xl font-bold ${
                  monthlyGrowth >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {monthlyGrowth >= 0
                  ? "+"
                  : ""}
                {monthlyGrowth}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          LOWER SECTION
      ===================================== */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* =====================================
            MONTHLY ACTIVITY
        ===================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Monthly Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Platform activity for the current
            month.
          </p>

          <div className="mt-6 space-y-5">
            {/* New Students */}

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  New Students
                </span>

                <span className="font-semibold text-slate-900">
                  {newStudents.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{
                    width: `${newStudentsPercentage}%`,
                  }}
                />
              </div>
            </div>

            {/* New Rooms */}

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  New Rooms
                </span>

                <span className="font-semibold text-slate-900">
                  {newRooms.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{
                    width: `${newRoomsPercentage}%`,
                  }}
                />
              </div>
            </div>

            {/* Visit Requests */}

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  Visit Requests
                </span>

                <span className="font-semibold text-slate-900">
                  {visitRequests.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-cyan-500"
                  style={{
                    width: `${visitRequestsPercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            ROOM DISTRIBUTION
        ===================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Room Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current room listing distribution.
          </p>

          <div className="mt-6 space-y-4">
            {/* Approved */}

            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
              <span className="text-sm font-medium text-green-700">
                Approved Rooms
              </span>

              <span className="font-bold text-green-700">
                {approvedRooms.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            {/* Pending */}

            <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">
              <span className="text-sm font-medium text-yellow-700">
                Pending Approval
              </span>

              <span className="font-bold text-yellow-700">
                {pendingRooms.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            {/* Rejected */}

            <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">
              <span className="text-sm font-medium text-red-700">
                Rejected Rooms
              </span>

              <span className="font-bold text-red-700">
                {rejectedRooms.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformStatistics;