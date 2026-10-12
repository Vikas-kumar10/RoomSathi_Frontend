import {
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  UserRound,
  X,
  Mail,
  IndianRupee,
  Send,
  Home,
} from "lucide-react";

function RequestVisitModal({
  room,
  user,
  formData,
  setFormData,
  onClose,
  onSubmit,
  loading,
}) {
  if (!room || !user) return null;

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Request a Room Visit
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Send your preferred visit date and time to the owner.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Room Information */}
          <section className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Home size={18} className="text-[#FF3E9B]" />

              <h3 className="font-bold text-gray-900">
                Room Information
              </h3>
            </div>

            <div className="flex gap-4">
              <img
                src={
                  room.images && room.images.length > 0
                    ? room.images[0]
                    : "/rooms/room1.jpg"
                }
                alt={room.title}
                className="h-24 w-28 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <h4 className="truncate font-bold text-gray-900">
                  {room.title}
                </h4>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={15} />
                  <span>{room.location}</span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-[#19CF37]">
                  <IndianRupee size={15} />

                  <span>
                    {Number(room.rent || 0).toLocaleString("en-IN")}
                    /month
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Student Information */}
          <section className="rounded-xl border border-[#BBE0EF] bg-[#BBE0EF]/40 p-4">
            <div className="mb-3 flex items-center gap-2">
              <UserRound size={18} className="text-[#1f5081]" />

              <h3 className="font-bold text-gray-900">
                Your Information
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Name
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <UserRound size={15} />
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Phone
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Phone size={15} />
                  {user.phone}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-medium text-gray-500">
                  Email
                </p>

                <p className="mt-1 flex items-center gap-2 break-all text-sm font-semibold text-gray-900">
                  <Mail size={15} />
                  {user.email}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Your account information will automatically be sent
              with this request.
            </p>
          </section>

          {/* Visit Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <h3 className="mb-4 text-base font-bold text-gray-900">
                Visit Details
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Date */}
                <div>
                  <label
                    htmlFor="visitDate"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Preferred Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="visitDate"
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full rounded-xl border border-gray-300 bg-white px-10 py-3 text-sm text-gray-800 outline-none transition focus:border-[#1f5081] focus:ring-2 focus:ring-[#1f5081]/10"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="visitTime"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Preferred Time
                  </label>

                  <div className="relative">
                    <Clock3
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="visitTime"
                      type="time"
                      name="visitTime"
                      value={formData.visitTime}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-300 bg-white px-10 py-3 text-sm text-gray-800 outline-none transition focus:border-[#1f5081] focus:ring-2 focus:ring-[#1f5081]/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Message to Owner
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                placeholder="Example: Main Monday ko shaam 5 baje room dekhne aa sakta hoon."
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#1f5081] focus:ring-2 focus:ring-[#1f5081]/10"
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {formData.message.length}/500
              </p>
            </div>

            {/* Info */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm leading-6 text-yellow-800">
                Your request will be sent to the room owner. The owner
                can review your preferred date, time and message and
                then accept or reject the visit request.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Send Visit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestVisitModal;