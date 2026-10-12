import {
  Search,
  MapPin,
  Home,
} from "lucide-react";

const POPULAR_AREAS = [
  "Kankarbagh",
  "Boring Road",
  "Rajendra Nagar",
  "Patliputra Colony",
];

function RoomSearchForm({
  location,
  setLocation,
  roomType,
  setRoomType,
  budget,
  setBudget,
  loading,
  onSearch,
  onPopularSearch,
}) {
  return (
    <div className="mx-auto mt-10 max-w-6xl rounded-3xl border border-white bg-white p-4 shadow-2xl sm:p-5">
      <div className="grid gap-3 lg:grid-cols-4">
        {/* Location */}
        <div className="group rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-[#BBE0EF] hover:bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
              <MapPin size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <label
                htmlFor="room-location"
                className="block text-xs font-bold uppercase tracking-wide text-gray-500"
              >
                Location
              </label>

              <input
                id="room-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
                placeholder="Where do you want to stay?"
                className="mt-1 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:font-medium placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div className="group rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-[#BBE0EF] hover:bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
              <Home size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <label
                htmlFor="room-type"
                className="block text-xs font-bold uppercase tracking-wide text-gray-500"
              >
                Room Type
              </label>

              <select
                id="room-type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-gray-900 outline-none"
              >
                <option>Any Type</option>
                <option>Single Room</option>
                <option>Double Sharing</option>
                <option>Triple Sharing</option>
                <option>PG</option>
                <option>Flat</option>
              </select>
            </div>
          </div>
        </div>

        {/* Monthly Budget */}
        <div className="group rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-[#BBE0EF] hover:bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
              <span className="text-lg font-bold">₹</span>
            </div>

            <div className="min-w-0 flex-1">
              <label
                htmlFor="room-budget"
                className="block text-xs font-bold uppercase tracking-wide text-gray-500"
              >
                Monthly Budget
              </label>

              <select
                id="room-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-1 w-full cursor-pointer bg-transparent text-sm font-semibold text-gray-900 outline-none"
              >
                <option>Any Budget</option>
                <option>Under ₹5,000</option>
                <option>₹5,000 - ₹10,000</option>
                <option>₹10,000 - ₹15,000</option>
                <option>Above ₹15,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearch}
          disabled={loading}
          className="flex min-h-20 items-center justify-center gap-2 rounded-2xl bg-[#19CF37] px-6 text-sm font-bold text-white shadow-md transition duration-300 hover:bg-[#FF3E9B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search size={20} />
          {loading ? "Loading..." : "Search Rooms"}
        </button>
      </div>

      {/* Popular Locations */}
      <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
          Popular:
        </span>

        <div className="flex flex-wrap gap-2">
          {POPULAR_AREAS.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => onPopularSearch(area)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-[#FF3E9B] hover:text-[#FF3E9B]"
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomSearchForm;