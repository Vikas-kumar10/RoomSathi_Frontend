import {
  MapPin,
  Navigation,
  Clock3,
  Building2,
  ArrowUpRight,
} from "lucide-react";

function ContactMap() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden rounded-3xl bg-[#BBE0EF] p-6 sm:p-8 lg:min-h-600px">

      {/* Decorative Background */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full  opacity-40"></div>

      <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#FF3E9B] opacity-10"></div>

      {/* Map Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 h-px w-3/4 bg-gray-700"></div>
        <div className="absolute left-20 top-40 h-px w-2/3 rotate-12 bg-gray-700"></div>
        <div className="absolute bottom-32 right-10 h-px w-3/4 -rotate-12 bg-gray-700"></div>

        <div className="absolute left-1/4 top-0 h-full w-px rotate-12 bg-gray-700"></div>
        <div className="absolute right-1/4 top-0 h-full w-px -rotate-12 bg-gray-700"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl   p-6 shadow-2xl sm:p-8">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#BBE0EF] px-4 py-2 text-sm font-semibold text-[#FF3E9B]">
          <MapPin size={17} />
          Our Location
        </div>

        {/* Heading */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold leading-tight text-gray-900">
            Visit RoomSaathi
          </h2>

          <p className="mt-3 text-base leading-7 text-gray-600">
            Looking for a room or want to list yours property? Connect with
            RoomSaathi and find the right accommodation solution for you.
          </p>
        </div>

        {/* Location Card */}
        <div className="mt-7 rounded-2xl border border-gray-100 bg-gray-50 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF3E9B] text-white shadow-md">
              <Building2 size={23} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                RoomSaathi Office
              </p>

              <h3 className="mt-1 text-lg font-bold text-gray-900">
                Patna, Bihar
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Patna, Bihar, India
              </p>
            </div>

          </div>

        </div>

        {/* Information */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">

          {/* Working Hours */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
                <Clock3 size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Working Hours
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  9 AM - 7 PM
                </p>
              </div>
            </div>

          </div>

          {/* Service Area */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#FF3E9B]">
                <Navigation size={19} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Service Area
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Patna & Nearby
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Button */}
        <button
          type="button"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3.5 font-semibold text-white shadow-md transition duration-300 hover:bg-[#FF3E9B] hover:shadow-lg"
        >
          <Navigation size={19} />
          Get Directions
          <ArrowUpRight size={18} />
        </button>

        {/* Bottom Text */}
        <p className="mt-4 text-center text-xs leading-5 text-gray-500">
          We are here to make yours room search simple, convenient, and
          reliable.
        </p>

      </div>
    </div>
  );
}

export default ContactMap;