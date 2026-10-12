


import { useState } from "react";

import RoomSearchHero from "../../components/FindRoomSection/RoomSearchHero";
import PopularLocations from "../../components/FindRoomSection/PopularLocations";
import RoomFilters from "../../components/FindRoomSection/RoomFilters";
import RoomSort from "../../components/FindRoomSection/RoomSort";
import RoomGrid from "../../components/FindRoomSection/RoomGrid";
import Footer from "../../components/Footer";

function StudentDashboard() {
  const [filters, setFilters] = useState({
    roomTypes: [],
    budget: "",
    amenities: [],
  });

  const [sortBy, setSortBy] = useState("newest");

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Search Hero */}
      <RoomSearchHero />

      {/* Popular Locations */}
      <PopularLocations />

      {/* Main Room Search */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-4">

            {/* Filters */}
            <div className="hidden lg:block">
              <RoomFilters
                filters={filters}
                setFilters={setFilters}
                onApply={handleApplyFilters}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">

              {/* Sort */}
              <RoomSort
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />

              {/* Room Grid */}
              <RoomGrid
                filters={filters}
                sortBy={sortBy}
              />

            </div>

          </div>

        </div>
      </section>

       <Footer />

    </div>
  );
}

export default StudentDashboard;