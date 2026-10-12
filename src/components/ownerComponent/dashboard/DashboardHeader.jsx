
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardHeader() {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Header Content */}
      <div>
        <p className="mb-1 text-sm font-semibold text-[#19CF37]">
          Owner Dashboard
        </p>

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Welcome back, Owner 👋
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your rooms, requests and student visits from one place.
        </p>
      </div>

      {/* Add Room Button */}
      <Link
        to="/owner/add-room"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
      >
        <Plus size={18} />
        Add New Room
      </Link>
    </div>
  );
}

export default DashboardHeader;

