import { Search, MapPin, Users, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Search,
    number: "01",
    title: "Discover the Right Room",
    description:
      "Search and explore rooms based on yours preferred location, budget, and accommodation needs.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Choose yours Location",
    description:
      "Find suitable rooms near yours college, coaching centre, workplace, or other preferred areas.",
  },
  {
    icon: Users,
    number: "03",
    title: "Connect with Owners",
    description:
      "Get in touch with room owners directly, ask questions, and arrange a convenient room visit.",
  },
];

function AboutIntro() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Finding a Room Should Be
            <span className="text-[#FF3E9B]"> Simple</span>
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#FF3E9B]/30 hover:shadow-xl sm:p-8"
              >
                {/* Top Number */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-gray-300 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                    {feature.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#BBE0EF] transition duration-300 group-hover:bg-[#FF3E9B]">
                    <Icon
                      size={23}
                      className="text-[#FF3E9B] transition duration-300 group-hover:text-white"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-7 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#FF3E9B]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>

                {/* Bottom Link */}
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#FF3E9B]">
                  Learn more
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

                {/* Decorative Element */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#BBE0EF] opacity-40 transition duration-300 group-hover:scale-150 group-hover:bg-[#FF3E9B]/20" />
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-[#BBE0EF]">
          <div className="flex flex-col items-start justify-between gap-6 px-7 py-8 sm:px-10 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#FF3E9B]">
                Built for Students
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                yours next room is closer than you think.
              </h3>

              <p className="mt-2 max-w-2xl leading-6 text-gray-600">
                Explore available rooms, compare yours options, and connect
                with owners through RoomSaathi.
              </p>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#FF3E9B] hover:shadow-lg"
            >
              <Search
                size={19}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              Start Searching
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIntro;