
import {
  Plus,
  Home,
  Users,
  CalendarCheck,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add New Room",
    description: "List another room for students.",
    path: "/owner/add-room",
    icon: Plus,
    boxClass: "border-green-100 bg-green-50",
    hoverClass: "hover:border-[#19CF37]",
    iconBg: "bg-[#19CF37]",
    iconColor: "text-[#19CF37]",
  },
  {
    title: "Manage Rooms",
    description: "Edit or manage yours listed rooms.",
    path: "/owner/my-rooms",
    icon: Home,
    boxClass: "border-blue-100 bg-blue-50",
    hoverClass: "hover:border-blue-400",
    iconBg: "bg-blue-600",
    iconColor: "text-blue-600",
  },
  {
    title: "Room Requests",
    description: "Review requests from students.",
    path: "/owner/requests",
    icon: Users,
    boxClass: "border-pink-100 bg-pink-50",
    hoverClass: "hover:border-[#FF3E9B]",
    iconBg: "bg-[#FF3E9B]",
    iconColor: "text-[#FF3E9B]",
  },
  {
    title: "Manage Visits",
    description: "Check upcoming student visits.",
    path: "/owner/visits",
    icon: CalendarCheck,
    boxClass: "border-purple-100 bg-purple-50",
    hoverClass: "hover:border-purple-400",
    iconBg: "bg-purple-600",
    iconColor: "text-purple-600",
  },
];

function QuickActions() {
  return (
    <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            to={action.path}
            className={`group rounded-2xl border p-5 transition hover:bg-white ${action.boxClass} ${action.hoverClass}`}
          >
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white ${action.iconBg}`}
            >
              <Icon size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {action.description}
            </p>

            <ArrowUpRight
              size={18}
              className={`mt-4 transition group-hover:translate-x-1 group-hover:-translate-y-1 ${action.iconColor}`}
            />
          </Link>
        );
      })}
    </section>
  );
}

export default QuickActions;