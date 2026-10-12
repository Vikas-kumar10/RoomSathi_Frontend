import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  MapPin,
  IndianRupee,
  FileText,
  Home,
  ChevronDown,
} from "lucide-react";

import {
  getSingleRoom,
  updateRoom,
} from "../../api/room.api";

function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    location: "",
    roomType: "Single",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSingleRoom(id);
        const room = data?.room;

        if (!room) {
          setError("Room details not found.");
          return;
        }

        setFormData({
          title: room.title || "",
          description: room.description || "",
          rent: room.rent || "",
          location: room.location || "",
          roomType: room.roomType || "Single",
        });
      } catch (error) {
        console.error("Fetch room error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load room details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateRoom(id, formData);

      navigate("/owner/my-rooms");
    } catch (error) {
      console.error("Update room error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update room. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#BBE0EF] px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white bg-white px-6 py-5 shadow-md">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#19CF37]" />

          <p className="text-sm font-semibold text-slate-600">
            Loading room details...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#BBE0EF] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back Navigation */}
        <div className="mb-5">
          <Link
            to="/owner/my-rooms"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-white/60 hover:text-[#FF3E9B]"
          >
            <ArrowLeft size={17} />
            Back to My Rooms
          </Link>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-xl">

          {/* Header */}
          <div className="border-b border-slate-100 bg-sky-700 from-cyan-50 via-white to-pink-50 px-6 py-7 sm:px-8">
            <div className="flex items-start gap-4">

              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0AF2FA] text-slate-900 shadow-sm">
                <Home size={23} />
              </div>

              {/* Heading */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#19CF37]">
                  Room Management
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Edit Room
                </h1>

                <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
                  Update your room information and keep your listing
                  details accurate for students.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8"
          >
            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

            <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">

              {/* Room Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Room Title
                </label>

                <div className="relative">
                  <Home
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
                  />

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Spacious Single Room"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0AF2FA] focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>
              </div>

              {/* Monthly Rent */}
              <div>
                <label
                  htmlFor="rent"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Monthly Rent
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-0 top-0 flex h-full items-center border-r border-slate-200 px-3.5">
                    <IndianRupee
                      size={17}
                      className="text-[#FF3E9B]"
                    />
                  </div>

                  <input
                    id="rent"
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="Enter monthly rent"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-14 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0AF2FA] focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
                  />

                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Kankarbagh, Patna"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0AF2FA] focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label
                  htmlFor="roomType"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Room Type
                </label>

                <div className="relative">
                  <Home
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
                  />

                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-11 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#0AF2FA] focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  >
                    <option value="Single">
                      Single Room
                    </option>

                    <option value="Double">
                      Double Room
                    </option>

                    <option value="Shared">
                      Shared Room
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Room Description
                  </label>

                  <span className="text-xs text-slate-400">
                    Tell students about this room
                  </span>
                </div>

                <div className="relative">
                  <FileText
                    size={18}
                    className="pointer-events-none absolute left-4 top-4 text-[#FF3E9B]"
                  />

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Describe the room, nearby facilities, available amenities, rules, and other important details..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0AF2FA] focus:bg-white focus:ring-4 focus:ring-cyan-50"
                  />
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <p className="hidden text-xs text-slate-400 sm:block">
                Make sure all room information is accurate before
                saving.
              </p>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Link
                  to="/owner/my-rooms"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#FF3E9B] hover:text-[#FF3E9B]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Note */}
        <div className="mt-4 flex items-center justify-center gap-2 px-4 text-center">
          <p className="text-xs text-slate-500">
            Your room information will be updated immediately after
            saving.
          </p>
        </div>
      </div>
    </main>
  );
}

export default EditRoom;