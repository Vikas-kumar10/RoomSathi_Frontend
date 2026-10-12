import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 98765 43210",
    description: "Speak directly with our support team.",
    action: "Call now",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "support@roomsaathi.com",
    description: "Send us yours questions anytime.",
    action: "Send email",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Patna, Bihar",
    description: "Helping students find rooms in Patna.",
    action: "View location",
  },
  {
    icon: Clock,
    title: "Available",
    value: "24 × 7 Support",
    description: "We are available every day to assist you.",
    action: "Get support",
  },
];

function ContactInfo() {
  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          <span className="inline-flex items-center rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-[#FF3E9B]">
            Contact Information
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We&apos;re Here to
            <span className="text-[#FF3E9B]"> Help You</span>
          </h2>

        

        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Decorative Element */}
                <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[#BBE0EF] opacity-60 transition duration-300 group-hover:scale-125" />

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#BBE0EF] text-[#FF3E9B] transition duration-300 group-hover:bg-[#FF3E9B] group-hover:text-white">
                  <Icon size={25} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative mt-6">

                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {item.value}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                </div>

                {/* Bottom Action */}
                <div className="relative mt-6 flex items-center justify-between border-t border-gray-100 pt-4">

                  <span className="text-sm font-semibold text-[#FF3E9B]">
                    {item.action}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition duration-300 group-hover:bg-[#19CF37] group-hover:text-white">
                    <ArrowUpRight size={17} />
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom Highlight */}
        <div className="mt-10 rounded-2xl bg-[#BBE0EF] px-6 py-7 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Looking for a room in Patna?
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-700">
                Explore available rooms and find a place that feels like home.
              </p>
            </div>

            <a
              href="/rooms"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#FF3E9B]"
            >
              Explore Rooms
              <ArrowUpRight size={18} />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactInfo;