import {
  ShieldCheck,
  Users,
  CheckCircle2,
} from "lucide-react";

const TRUST_ITEMS = [
  {
    title: "Trusted Listings",
    description: "Quality-focused properties",
    icon: ShieldCheck,
    color: "bg-[#19CF37]",
  },
  {
    title: "Student Friendly",
    description: "Options for every budget",
    icon: Users,
    color: "bg-[#FF3E9B]",
  },
  {
    title: "Easy to Explore",
    description: "Search, compare and connect",
    icon: CheckCircle2,
    color: "bg-[#19CF37]",
  },
];

function RoomSearchTrust() {
  return (
    <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
      {TRUST_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center justify-center gap-3 rounded-2xl bg-white bg-opacity-70 px-4 py-4 shadow-sm backdrop-blur-sm"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white ${item.color}`}
            >
              <Icon size={20} />
            </div>

            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">
                {item.title}
              </p>

              <p className="text-xs text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoomSearchTrust;