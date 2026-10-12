import RoomSearchHero from "../components/FindRoomSection/RoomSearchHero";
import PopularLocations from "../components/FindRoomSection/PopularLocations";

import RoomSort from "../components/FindRoomSection/RoomSort";
import RoomGrid from "../components/FindRoomSection/RoomGrid";
import FeaturedRooms from "../components/FindRoomSection/FeaturedRooms";
import WhyChooseRoomSaathi from "../components/FindRoomSection/WhyChooseRoomSaathi";
import RoomCTA from "../components/FindRoomSection/RoomCTA";

function FindRooms() {
  return (
    <main>

      {/* Search Hero */}
      {/* <RoomSearchHero /> */}

      {/* Popular Locations */}
      <PopularLocations />

      {/* Main Room Search */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-3 lg:grid-cols-3">

            

            {/* Results */}
            <div className="lg:col-span-3">

              <RoomSort />

              <RoomGrid />

            </div>

          </div>

        </div>

      </section>

      {/* Featured Rooms */}
      <FeaturedRooms />

      {/* Why RoomSaathi */}
      <WhyChooseRoomSaathi />

      {/* CTA */}
      <RoomCTA />

    </main>
  );
}

export default FindRooms;