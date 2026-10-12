import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Phone,
  ChevronRight,
  CheckCircle2,
  Clock4,
  XCircle,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

const visits = [
  {
    id: 1,
    roomTitle: "Comfortable Single Room",
    location: "Kankarbagh, Patna",
    image: "/rooms/room1.jpg",
    date: "24 September 2026",
    time: "11:00 AM",
    owner: "Amit Kumar",
    phone: "9876543210",
    status: "upcoming",
    rent: 7500,
    roomType: "Single Room",
  },
  {
    id: 2,
    roomTitle: "Premium Student Room",
    location: "Boring Road, Patna",
    image: "/rooms/room2.jpg",
    date: "20 September 2026",
    time: "04:30 PM",
    owner: "Rahul Singh",
    phone: "9123456780",
    status: "completed",
    rent: 8500,
    roomType: "Single Room",
  },
  {
    id: 3,
    roomTitle: "Affordable Shared Room",
    location: "Rajendra Nagar, Patna",
    image: "/rooms/room3.jpg",
    date: "18 September 2026",
    time: "12:30 PM",
    owner: "Vivek Kumar",
    phone: "9988776655",
    status: "cancelled",
    rent: 5000,
    roomType: "Shared Room",
  },
];

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    icon: Clock4,
    className: "bg-blue-50 text-blue-600",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-600",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-500",
  },
};

function MyVisits() {
  const upcomingVisits = visits.filter((visit) => visit.status === "upcoming");

  const completedVisits = visits.filter(
    (visit) => visit.status === "completed",
  );

  const cancelledVisits = visits.filter(
    (visit) => visit.status === "cancelled",
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#BBE0EF] px-4 py-2 text-sm font-bold text-[#FF3E9B]">
                <CalendarDays size={16} />
                My Visits
              </div>

              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Manage yours Room Visits
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Keep track of yours upcoming room visits, completed visits, and
                previously cancelled appointments in one place.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-bold text-white transition hover:bg-green-600"
            >
              Find More Rooms
              <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Visit Statistics */}
      <section className="px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Visits
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {visits.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#BBE0EF] text-[#19CF37]">
                <CalendarDays size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {upcomingVisits.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Clock4 size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {completedVisits.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cancelled</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {cancelledVisits.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <XCircle size={21} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visits */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {visits.length > 0 ? (
            <div className="space-y-5">
              {visits.map((visit) => {
                const StatusIcon = statusConfig[visit.status].icon;

                return (
                  <article
                    key={visit.id}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-lg"
                  >
                    <div className="grid lg:grid-cols-[280px_1fr]">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-gray-100 lg:h-full">
                        <img
                          src={visit.image}
                          alt={visit.roomTitle}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />

                        <div
                          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${statusConfig[visit.status].className}`}
                        >
                          <StatusIcon size={14} />
                          {statusConfig[visit.status].label}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-7">
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Building2 size={17} className="text-[#19CF37]" />

                              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Room Visit
                              </span>
                            </div>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                              {visit.roomTitle}
                            </h2>

                            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                              <MapPin size={16} className="text-[#FF3E9B]" />
                              {visit.location}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-gray-50 px-5 py-4 xl:min-w-40">
                            <p className="text-xs font-medium text-gray-500">
                              Monthly Rent
                            </p>

                            <p className="mt-1 text-xl font-bold text-gray-900">
                              ₹{visit.rent.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Visit Information */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center gap-2 text-[#19CF37]">
                              <CalendarDays size={17} />

                              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                Date
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-gray-900">
                              {visit.date}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center gap-2 text-[#FF3E9B]">
                              <Clock3 size={17} />

                              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                Time
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-gray-900">
                              {visit.time}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center gap-2 text-[#19CF37]">
                              <UserRound size={17} />

                              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                Owner
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-gray-900">
                              {visit.owner}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center gap-2 text-[#FF3E9B]">
                              <BedDoubleIcon />

                              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                Room Type
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-gray-900">
                              {visit.roomType}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone size={16} className="text-[#19CF37]" />

                            <span>{visit.phone}</span>
                          </div>

                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                              to={`/rooms/${visit.id}`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-[#19CF37] hover:text-[#19CF37]"
                            >
                              View Room
                              <ChevronRight size={16} />
                            </Link>

                            {visit.status === "upcoming" && (
                              <button
                                type="button"
                                className="rounded-xl bg-[#FF3E9B] px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600"
                              >
                                Reschedule Visit
                              </button>
                            )}

                            {visit.status === "completed" && (
                              <button
                                type="button"
                                className="rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                              >
                                Contact Owner
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="mx-auto max-w-2xl rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#BBE0EF] text-[#19CF37]">
                <CalendarDays size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                No Visits Scheduled
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                You haven't scheduled any room visits yet. Explore available
                rooms and arrange a visit when you find a place you like.
              </p>

              <Link
                to="/rooms"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3 text-sm font-bold text-white transition hover:bg-green-600"
              >
                Explore Rooms
                <ChevronRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/*
  Small reusable icon component
  Keeps the main JSX clean.
*/
function BedDoubleIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20v-8" />
      <path d="M2 16h20" />
      <path d="M22 20v-8" />
      <path d="M4 12V7a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v4" />
      <path d="M14 12V8a3 3 0 0 1 3-3h1a4 4 0 0 1 4 4v3" />
      <path d="M2 20h20" />
    </svg>
  );
}

export default MyVisits;
