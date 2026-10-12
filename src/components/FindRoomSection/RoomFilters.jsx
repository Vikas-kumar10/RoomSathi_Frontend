import { useEffect, useState } from "react";

import {
  SlidersHorizontal,
  RotateCcw,
  Home,
  IndianRupee,
  Wifi,
  Wind,
  Car,
  Bath,
  Utensils,
  Zap,
} from "lucide-react";

function RoomFilters({
  filters,
  setFilters,
  onApply,
}) {
  /*
    Local filters are used here.

    User can select multiple options first.
    Rooms will update only after clicking
    "Apply Filters".
  */

  const [localFilters, setLocalFilters] = useState(filters);

  /*
    Keep local filters synchronized
    when parent filters change.
  */

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const roomTypes = [
    "Single",
    "Double",
    "Shared",
  ];

  const budgets = [
    {
      label: "Under ₹5,000",
      value: "under-5000",
    },
    {
      label: "₹5,000 - ₹10,000",
      value: "5000-10000",
    },
    {
      label: "₹10,000 - ₹15,000",
      value: "10000-15000",
    },
    {
      label: "Above ₹15,000",
      value: "above-15000",
    },
  ];

  const amenities = [
    {
      name: "Wi-Fi",
      icon: Wifi,
    },
    {
      name: "AC",
      icon: Wind,
    },
    {
      name: "Parking",
      icon: Car,
    },
    {
      name: "Attached Bathroom",
      icon: Bath,
    },
    {
      name: "Kitchen",
      icon: Utensils,
    },
    {
      name: "Power Backup",
      icon: Zap,
    },
  ];

  /*
    Room Type
  */

  const handleRoomTypeChange = (type) => {
    setLocalFilters((prev) => {
      const alreadySelected =
        prev.roomTypes.includes(type);

      return {
        ...prev,

        roomTypes: alreadySelected
          ? prev.roomTypes.filter(
              (item) => item !== type
            )
          : [...prev.roomTypes, type],
      };
    });
  };

  /*
    Budget
  */

  const handleBudgetChange = (value) => {
    setLocalFilters((prev) => ({
      ...prev,
      budget: value,
    }));
  };

  /*
    Amenities
  */

  const handleAmenityChange = (amenity) => {
    setLocalFilters((prev) => {
      const alreadySelected =
        prev.amenities.includes(amenity);

      return {
        ...prev,

        amenities: alreadySelected
          ? prev.amenities.filter(
              (item) => item !== amenity
            )
          : [...prev.amenities, amenity],
      };
    });
  };

  /*
    Apply Filters
  */

  const handleApply = () => {
    setFilters(localFilters);
    onApply(localFilters);
  };

  /*
    Reset Filters
  */

  const handleReset = () => {
    const resetFilters = {
      roomTypes: [],
      budget: "",
      amenities: [],
    };

    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    onApply(resetFilters);
  };

  return (
    <aside className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

      {/* Filter Header */}
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-5">

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
              <SlidersHorizontal size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">
                Filter Rooms
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Find a room that suits you
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-white hover:text-[#FF3E9B]"
          >
            <RotateCcw size={13} />
            Reset
          </button>

        </div>

      </div>

      {/* Filter Content */}
      <div className="px-5 py-6">

        <div className="space-y-7">

          {/* Room Type */}
          <div>

            <div className="mb-3 flex items-center gap-2">

              <Home
                size={17}
                className="text-[#FF3E9B]"
              />

              <h3 className="text-sm font-bold text-gray-900">
                Room Type
              </h3>

            </div>

            <div className="space-y-2">

              {roomTypes.map((type) => {

                const checked =
                  localFilters.roomTypes.includes(
                    type
                  );

                return (
                  <label
                    key={type}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-[#BBE0EF] hover:bg-[#BBE0EF]/40"
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        handleRoomTypeChange(type)
                      }
                      className="h-4 w-4 cursor-pointer accent-[#19CF37]"
                    />

                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                      {type} Room
                    </span>

                  </label>
                );
              })}

            </div>

          </div>

          {/* Monthly Budget */}
          <div>

            <div className="mb-3 flex items-center gap-2">

              <IndianRupee
                size={17}
                className="text-[#FF3E9B]"
              />

              <h3 className="text-sm font-bold text-gray-900">
                Monthly Budget
              </h3>

            </div>

            <div className="space-y-2">

              {budgets.map((budget) => {

                const checked =
                  localFilters.budget ===
                  budget.value;

                return (
                  <label
                    key={budget.value}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-[#BBE0EF] hover:bg-[#BBE0EF]/40"
                  >

                    <input
                      type="radio"
                      name="budget"
                      value={budget.value}
                      checked={checked}
                      onChange={() =>
                        handleBudgetChange(
                          budget.value
                        )
                      }
                      className="h-4 w-4 cursor-pointer accent-[#19CF37]"
                    />

                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                      {budget.label}
                    </span>

                  </label>
                );
              })}

            </div>

          </div>

          {/* Amenities */}
          <div>

            <div className="mb-3 flex items-center gap-2">

              <Zap
                size={17}
                className="text-[#FF3E9B]"
              />

              <h3 className="text-sm font-bold text-gray-900">
                Amenities
              </h3>

            </div>

            <div className="space-y-2">

              {amenities.map((amenity) => {

                const Icon = amenity.icon;

                const checked =
                  localFilters.amenities.includes(
                    amenity.name
                  );

                return (
                  <label
                    key={amenity.name}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-[#BBE0EF] hover:bg-[#BBE0EF]/40"
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        handleAmenityChange(
                          amenity.name
                        )
                      }
                      className="h-4 w-4 shrink-0 cursor-pointer accent-[#19CF37]"
                    />

                    <Icon
                      size={16}
                      className="text-gray-400 transition group-hover:text-[#FF3E9B]"
                    />

                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
                      {amenity.name}
                    </span>

                  </label>
                );
              })}

            </div>

          </div>

        </div>

        {/* Apply Button */}
        <button
          type="button"
          onClick={handleApply}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 font-semibold text-white shadow-sm transition duration-200 hover:bg-[#FF3E9B] hover:shadow-md"
        >
          <SlidersHorizontal size={17} />
          Apply Filters
        </button>

      </div>

    </aside>
  );
}

export default RoomFilters;