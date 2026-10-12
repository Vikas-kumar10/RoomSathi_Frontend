import { Search, UserX, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getUsers,
  updateUserStatus,
} from "../../api/userService.js";

function ManageStudents() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // =====================================
  // FETCH STUDENTS
  // =====================================

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers("student");

      setStudents(response.users || []);
    } catch (error) {
      console.error(
        "Failed to fetch students:",
        error,
      );

      setError(
        error.response?.data?.message ||
          "Failed to load students.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =====================================
  // SEARCH
  // =====================================

  const filteredStudents = students.filter(
    (student) =>
      `${student.name || ""} ${
        student.email || ""
      } ${student.phone || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  // =====================================
  // STATUS CHANGE
  // =====================================

  const handleStatusChange = async (
    userId,
    currentStatus,
  ) => {
    try {
      setUpdatingId(userId);

      const newStatus =
        currentStatus === "active"
          ? "blocked"
          : "active";

      const response = await updateUserStatus(
        userId,
        newStatus,
      );

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === userId
            ? {
                ...student,
                status:
                  response.user.status,
              }
            : student,
        ),
      );
    } catch (error) {
      console.error(
        "Status update failed:",
        error,
      );

      alert(
        error.response?.data?.message ||
          "Failed to update user status",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          HEADER
      ===================================== */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Manage Students
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage all registered
          students.
        </p>
      </div>

      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search student..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Loading students...
          </p>
        </div>
      )}

      {/* =====================================
          ERROR
      ===================================== */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================
          STUDENT TABLE
      ===================================== */}

      {!loading &&
        !error &&
        students.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500 sm:px-5">
                      Student
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500 sm:px-5">
                      Phone
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500 sm:px-5">
                      Requests
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500 sm:px-5">
                      Status
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500 sm:px-5">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map(
                    (student) => {
                      const isActive =
                        student.status ===
                        "active";

                      const isUpdating =
                        updatingId ===
                        student._id;

                      return (
                        <tr
                          key={student._id}
                          className="transition hover:bg-slate-50"
                        >
                          {/* Student */}

                          <td className="px-4 py-4 sm:px-5">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-slate-900">
                                {student.name ||
                                  "N/A"}
                              </p>

                              <p className="truncate text-xs text-slate-500">
                                {student.email ||
                                  "N/A"}
                              </p>
                            </div>
                          </td>

                          {/* Phone */}

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-5">
                            {student.phone ||
                              "-"}
                          </td>

                          {/* Requests */}

                          <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-5">
                            {student.requests ||
                              0}
                          </td>

                          {/* Status */}

                          <td className="px-4 py-4 sm:px-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {isActive
                                ? "Active"
                                : "Blocked"}
                            </span>
                          </td>

                          {/* Action */}

                          <td className="px-4 py-4 sm:px-5">
                            <button
                              type="button"
                              disabled={
                                isUpdating
                              }
                              onClick={() =>
                                handleStatusChange(
                                  student._id,
                                  student.status,
                                )
                              }
                              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isActive
                                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                                  : "bg-green-100 text-green-600 hover:bg-green-200"
                              }`}
                            >
                              {isUpdating ? (
                                "Updating..."
                              ) : isActive ? (
                                <>
                                  <UserX
                                    size={16}
                                  />
                                  Block
                                </>
                              ) : (
                                <>
                                  <UserCheck
                                    size={16}
                                  />
                                  Unblock
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* =====================================
          SEARCH EMPTY
      ===================================== */}

      {!loading &&
        !error &&
        students.length > 0 &&
        filteredStudents.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              No students match your
              search.
            </p>
          </div>
        )}

      {/* =====================================
          EMPTY
      ===================================== */}

      {!loading &&
        !error &&
        students.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              No students found.
            </p>
          </div>
        )}
    </div>
  );
}

export default ManageStudents;