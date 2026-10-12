import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flag,
  ShieldAlert,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import { createReport } from "../api/report.api";

const reportTypes = [
  {
    value: "fake_room",
    label: "Fake room listing",
    description: "The room does not exist or appears to be fraudulent.",
  },
  {
    value: "wrong_information",
    label: "Wrong information",
    description: "The rent, location, photos, or details are incorrect.",
  },
  {
    value: "duplicate_listing",
    label: "Duplicate listing",
    description: "The same room has been listed multiple times.",
  },
  {
    value: "suspicious_user",
    label: "Suspicious user",
    description: "The owner or user is behaving suspiciously.",
  },
  {
    value: "inappropriate_content",
    label: "Inappropriate content",
    description: "The listing contains inappropriate content.",
  },
  {
    value: "other",
    label: "Other",
    description: "Report another issue related to this listing.",
  },
];

function ReportPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [type, setType] = useState("fake_room");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!roomId) {
      setError("Room ID is missing. Please open a room and try again.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe the issue before submitting.");
      return;
    }

    if (description.trim().length > 2000) {
      setError("Description cannot exceed 2000 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await createReport({
        type,
        targetType: "room",
        targetRoom: roomId,
        description: description.trim(),
      });

      if (response.success) {
        setSuccess("Your report has been submitted successfully.");
        setDescription("");

        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        setError(response.message || "Failed to submit report.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit your report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#BBE0EF]/30 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#1f5081] px-6 py-7 text-white sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Flag size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">Report a Room</h1>

                <p className="mt-1 text-sm text-blue-100">
                  Help us keep RoomSaathi safe and trustworthy.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 sm:p-8"
          >
            <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <ShieldAlert
                size={22}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <h2 className="text-sm font-semibold text-amber-900">
                  Before you submit
                </h2>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  Select the reason that best describes the problem and
                  provide accurate details so our team can review it.
                </p>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <p>{success}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="reportType"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Reason for reporting
              </label>

              <select
                id="reportType"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#1f5081] focus:ring-2 focus:ring-[#1f5081]/15"
              >
                {reportTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-slate-500">
                {
                  reportTypes.find((item) => item.value === type)
                    ?.description
                }
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Describe the issue
                </label>

                <span className="text-xs text-slate-500">
                  {description.length}/2000
                </span>
              </div>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what is wrong with this room listing..."
                rows={6}
                maxLength={2000}
                required
                className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1f5081] focus:ring-2 focus:ring-[#1f5081]/15"
              />

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Please avoid sharing passwords, private information, or
                unrelated personal details.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                What happens next?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Your report will be sent to the RoomSaathi team for review.
                You can report genuine concerns to help protect other users.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || Boolean(success)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f5081] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174166] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 size={18} />
                    Report Submitted
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
          Reports are intended for genuine concerns. Please provide accurate
          information to help us review the issue.
        </p>
      </div>
    </div>
  );
}

export default ReportPage;