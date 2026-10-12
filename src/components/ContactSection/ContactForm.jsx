import {
  Send,
  UserRound,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

function ContactForm() {
  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#FF3E9B] focus:bg-white focus:ring-2 focus:ring-pink-100";

  const iconClasses =
    "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400";

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Connect your API submission logic here.
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-6 sm:px-8 sm:py-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#BBE0EF] text-[#FF3E9B]">
            <MessageSquare size={23} />
          </div>

          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#FF3E9B]">
              Get in Touch
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Have a question about a room or listing? Tell us how we can
              help, and our team will get back to you.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        className="space-y-5 px-5 py-6 sm:space-y-6 sm:px-8 sm:py-8"
        onSubmit={handleSubmit}
      >
        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Full Name
              <span className="ml-1 text-[#FF3E9B]">*</span>
            </label>

            <div className="relative">
              <UserRound size={19} className={iconClasses} />

              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                required
                minLength={2}
                maxLength={100}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Email Address
              <span className="ml-1 text-[#FF3E9B]">*</span>
            </label>

            <div className="relative">
              <Mail size={19} className={iconClasses} />

              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={254}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Phone Number
            <span className="ml-1 text-xs font-normal text-gray-400">
              (Optional)
            </span>
          </label>

          <div className="relative">
            <Phone size={19} className={iconClasses} />

            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
              maxLength={20}
              className={inputClasses}
            />
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            We&apos;ll only use your number to respond to your enquiry.
          </p>
        </div>

        {/* Message */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="contact-message"
              className="block text-sm font-semibold text-gray-800"
            >
              Your Message
              <span className="ml-1 text-[#FF3E9B]">*</span>
            </label>

            <span className="text-xs text-gray-400">Tell us more</span>
          </div>

          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Write your question, issue, or enquiry here..."
            required
            minLength={10}
            maxLength={2000}
            className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-6 text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#FF3E9B] focus:bg-white focus:ring-2 focus:ring-pink-100"
          />
        </div>

        {/* Privacy Note */}
        <div className="flex items-start gap-2 rounded-xl bg-gray-50 px-4 py-3">
          <MessageSquare
            size={17}
            className="mt-0.5 shrink-0 text-[#FF3E9B]"
          />

          <p className="text-xs leading-5 text-gray-600">
            Your information will only be used to respond to your enquiry.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-6 py-3.5 text-sm font-bold text-white shadow-md transition duration-200 hover:bg-[#FF3E9B] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF3E9B] focus:ring-offset-2 active:scale-[0.99]"
        >
          <Send
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;