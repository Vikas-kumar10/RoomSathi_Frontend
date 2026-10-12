import { MessageCircle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardCTA() {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#19CF37]">
            <MessageCircle size={20} />
          </div>

          <h2 className="text-xl font-bold sm:text-2xl">
            Stay connected with students
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Respond to student messages, review room requests and keep
            yours property information updated.
          </p>
        </div>

        <Link
          to="/owner/messages"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Open Messages
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}

export default DashboardCTA;