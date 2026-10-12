import {
  Search,
  ShieldCheck,
  Wallet,
  Users,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    icon: Search,
    title: "Search yours Way",
    description:
      "Find rooms based on yours preferred location, budget, room type and lifestyle needs.",
  },

  {
    number: "02",
    icon: ShieldCheck,
    title: "Explore Verified Listings",
    description:
      "Discover room listings with clear property details so you can make informed decisions.",
  },

  {
    number: "03",
    icon: Wallet,
    title: "Stay Within Budget",
    description:
      "Compare different accommodation options and find a room that fits yours monthly budget.",
  },

  {
    number: "04",
    icon: Users,
    title: "Connect with Owners",
    description:
      "Get property information and connect directly with room owners when you find a suitable place.",
  },
];

function WhyChooseRoomSaathi() {
  return (
    <section className="bg-white px-4 py-15 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          

          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            A Simpler Way to
            <span className="text-[#FF3E9B]"> Find yours Next Room</span>
          </h2>

          

        </div>

        {/* Benefits */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.number}
                className="group relative flex min-h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-7 transition duration-300 hover:-translate-y-2 hover:bg-[#BBE0EF] hover:shadow-xl"
              >

                {/* Top Row */}
                <div className="flex items-start justify-between">

                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#19CF37] shadow-sm transition duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white">
                    <Icon size={26} strokeWidth={2} />
                  </div>

                  {/* Number */}
                  <span className="text-sm font-bold text-gray-300 transition duration-300 group-hover:text-gray-500">
                    {benefit.number}
                  </span>

                </div>

                {/* Content */}
                <div className="mt-7 flex flex-1 flex-col">

                  <h3 className="text-xl font-bold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                    {benefit.description}
                  </p>

                </div>

                {/* Bottom Indicator */}
                <div className="mt-7 flex items-center justify-between border-t border-gray-200 pt-5 group-hover:border-gray-300">

                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    RoomSaathi
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 transition duration-300 group-hover:bg-[#19CF37] group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom Highlight */}
        <div className="mt-12 rounded-3xl border border-[#BBE0EF] bg-[#BBE0EF] px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                yours next room could be just a search away.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-700">
                Browse available rooms, compare yours options and choose
                accommodation that matches yours needs.
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#FF3E9B] shadow-sm">
              Simple. Convenient. RoomSaathi.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseRoomSaathi;