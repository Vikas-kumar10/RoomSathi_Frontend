import { Search, UserX, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getUsers,
  updateUserStatus,
} from "../../api/userService.js";

function ManageOwners() {
  const [search, setSearch] = useState("");
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers("owner");

      setOwners(response.users || []);
    } catch (error) {
      console.error("Failed to fetch owners:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load owners."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const filteredOwners = owners.filter((owner) =>
    `${owner.name || ""} ${owner.email || ""} ${
      owner.phone || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleStatusChange = async (
    userId,
    currentStatus
  ) => {
    try {
      setUpdatingId(userId);

      const newStatus =
        currentStatus === "active"
          ? "blocked"
          : "active";

      const response = await updateUserStatus(
        userId,
        newStatus
      );

      setOwners((prevOwners) =>
        prevOwners.map((owner) =>
          owner._id === userId
            ? {
                ...owner,
                status: response.user.status,
              }
            : owner
        )
      );
    } catch (error) {
      console.error(
        "Status update failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update owner status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Manage Owners
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage property owners.
        </p>
      </div>

      {/* Search */}
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
            placeholder="Search owner..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Loading owners...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading &&
        !error &&
        owners.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Owner
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Phone
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Rooms
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Status
                    </th>

                    <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredOwners.map((owner) => {
                    const isActive =
                      owner.status === "active";

                    const isUpdating =
                      updatingId === owner._id;

                    return (
                      <tr
                        key={owner._id}
                        className="transition hover:bg-slate-50"
                      >
                        {/* Owner */}
                        <td className="px-5 py-4">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {owner.name || "N/A"}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {owner.email || "N/A"}
                            </p>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                          {owner.phone || "-"}
                        </td>

                        {/* Rooms */}
                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-700">
                          {owner.rooms || 0}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
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
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusChange(
                                owner._id,
                                owner.status
                              )
                            }
                            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                              isActive
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-green-100 text-green-600 hover:bg-green-200"
                            }`}
                          >
                            {isUpdating ? (
                              "Updating..."
                            ) : isActive ? (
                              <>
                                <UserX size={16} />
                                Block
                              </>
                            ) : (
                              <>
                                <UserCheck size={16} />
                                Unblock
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* Search Empty */}
      {!loading &&
        !error &&
        owners.length > 0 &&
        filteredOwners.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              No owners match your search.
            </p>
          </div>
        )}

      {/* Empty */}
      {!loading &&
        !error &&
        owners.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700">
              No owners found.
            </p>
          </div>
        )}
    </div>
  );
}

export default ManageOwners;