import { Search, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

function RoomCTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="overflow-hidden rounded-3xl bg-[#BBE0EF] px-6 py-12 text-center sm:px-10">

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Can&apos;t Find the Right Room?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-700">
            Keep exploring or list yours available room on RoomSaathi and
            connect with students looking for accommodation.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3 font-semibold text-white transition hover:bg-[#FF3E9B]"
            >
              <Search size={18} />
              Explore Rooms
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
            >
              <PlusCircle size={18} />
              List yours Room
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RoomCTA;