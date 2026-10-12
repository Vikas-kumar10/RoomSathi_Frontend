import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  MapPin,
  IndianRupee,
  CheckCircle2,
  Upload,
  X,
  ImagePlus,
  ShieldCheck,
  FileText,
  Sparkles,
  Info,
} from "lucide-react";

import { addRoom } from "../../api/room.api";

const facilitiesList = [
  "Wi-Fi",
  "AC",
  "Attached Bathroom",
  "Parking",
  "24/7 Security",
  "Water Supply",
  "Bed",
  "Study Table",
];

function AddRoom() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    location: "",
    roomType: "Single",
  });

  const [facilities, setFacilities] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Select / unselect facility
  const toggleFacility = (facility) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((item) => item !== facility)
        : [...prev, facility],
    );
  };

  // Image selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setError("");

    if (selectedFiles.length === 0) {
      return;
    }

    if (images.length + selectedFiles.length > 5) {
      setError("You can upload maximum 5 images.");
      e.target.value = "";
      return;
    }

    const invalidFile = selectedFiles.some(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidFile) {
      setError("Please select only image files.");
      e.target.value = "";
      return;
    }

    const largeFile = selectedFiles.some(
      (file) => file.size > 5 * 1024 * 1024,
    );

    if (largeFile) {
      setError("Each image should be less than 5MB.");
      e.target.value = "";
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file),
    );

    setImagePreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  // Remove selected image
  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);

    setImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );

    setImagePreviews((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (images.length === 0) {
      setError("Please upload at least 1 room image.");
      return;
    }

    if (images.length > 5) {
      setError("You can upload maximum 5 images.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("rent", formData.rent);
      data.append("location", formData.location.trim());
      data.append("roomType", formData.roomType);
      data.append("facilities", JSON.stringify(facilities));

      images.forEach((image) => {
        data.append("images", image);
      });

      await addRoom(data);

      navigate("/owner/my-rooms");
    } catch (error) {
      console.error("Add room error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to publish room. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ================= TOP BAR ================= */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/owner/dashboard"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#19CF37]"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
            <ShieldCheck size={15} className="text-[#19CF37]" />
            Your listing will be visible to students
          </div>
        </div>

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-[#19CF37]">
            <Sparkles size={14} />
            Room Listing
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Add New Room
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Add accurate room information, facilities and photos to
            help students find your room easily.
          </p>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600">
            <Info size={18} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-semibold">Unable to publish room</p>
              <p className="mt-1">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto text-red-400 transition hover:text-red-600"
              aria-label="Close error"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* ================= MAIN FORM ================= */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-3">

            {/* ================= LEFT MAIN CONTENT ================= */}
            <div className="space-y-6 lg:col-span-2">

              {/* BASIC INFORMATION */}
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-[#19CF37]">
                      <Home size={21} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Basic Information
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Provide the basic details of your room
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-5 sm:p-7">

                  {/* ROOM TITLE */}
                  <div>
                    <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                      Room Title
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Example: Comfortable Single Room for Students"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#19CF37] focus:bg-white focus:ring-4 focus:ring-green-50"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Keep the title short, clear and attractive.
                    </p>
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                      Room Description
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                      placeholder="Describe the room, nearby facilities, environment, access to transportation and other useful information..."
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#19CF37] focus:bg-white focus:ring-4 focus:ring-green-50"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      A detailed description helps students understand
                      the room before contacting you.
                    </p>
                  </div>

                  {/* RENT + ROOM TYPE */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* RENT */}
                    <div>
                      <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                        Monthly Rent
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <IndianRupee
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="number"
                          name="rent"
                          value={formData.rent}
                          onChange={handleChange}
                          placeholder="7500"
                          min="0"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#19CF37] focus:bg-white focus:ring-4 focus:ring-green-50"
                        />
                      </div>
                    </div>

                    {/* ROOM TYPE */}
                    <div>
                      <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                        Room Type
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-[#19CF37] focus:bg-white focus:ring-4 focus:ring-green-50"
                      >
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Shared">Shared</option>
                      </select>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                      Location
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
                      />

                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Kankarbagh, Patna"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#19CF37] focus:bg-white focus:ring-4 focus:ring-green-50"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ================= ROOM IMAGES ================= */}
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-[#FF3E9B]">
                        <ImagePlus size={21} />
                      </div>

                      <div>
                        <h2 className="font-bold text-slate-900">
                          Room Images
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Upload clear photos of your room
                        </p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                      {images.length} / 5 Images
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">

                  {/* UPLOAD AREA */}
                  {images.length < 5 && (
                    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center transition hover:border-[#19CF37] hover:bg-green-50">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#19CF37] shadow-sm transition group-hover:scale-105">
                        <Upload size={24} />
                      </div>

                      <p className="mt-4 text-sm font-bold text-slate-800">
                        Upload room photos
                      </p>

                      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                        Add up to 5 clear images. Good quality photos
                        can make your listing more attractive.
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#19CF37] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition group-hover:bg-green-600">
                        <ImagePlus size={15} />
                        Choose Images
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* IMAGE PREVIEWS */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={preview}
                          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                        >
                          <img
                            src={preview}
                            alt={`Room preview ${index + 1}`}
                            className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-sky-700 from-black/60 to-transparent px-3 pb-3 pt-8">
                            <span className="text-xs font-semibold text-white">
                              Image {index + 1}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-500 hover:text-white"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* IMAGE STATUS */}
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                    <CheckCircle2
                      size={16}
                      className={
                        images.length > 0
                          ? "text-[#19CF37]"
                          : "text-slate-300"
                      }
                    />

                    {images.length > 0
                      ? `${images.length} image${
                          images.length > 1 ? "s" : ""
                        } selected successfully`
                      : "At least 1 image is required"}
                  </div>
                </div>
              </section>

              {/* ================= FACILITIES ================= */}
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                      <CheckCircle2 size={21} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Room Facilities
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Select all facilities available in the room
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {facilitiesList.map((facility) => {
                      const selected = facilities.includes(facility);

                      return (
                        <button
                          type="button"
                          key={facility}
                          onClick={() => toggleFacility(facility)}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${
                            selected
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                selected
                                  ? "bg-white text-[#19CF37]"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              <CheckCircle2 size={17} />
                            </span>

                            {facility}
                          </span>

                          {selected && (
                            <span className="text-xs font-bold text-[#19CF37]">
                              Selected
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {facilities.length > 0 && (
                    <div className="mt-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                      <p className="text-xs font-semibold text-green-700">
                        {facilities.length} facilities selected
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* ================= RIGHT SIDEBAR ================= */}
            <aside className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-6">

                {/* LISTING SUMMARY */}
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 bg-slate-50 px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#19CF37] shadow-sm">
                        <FileText size={19} />
                      </div>

                      <div>
                        <h2 className="font-bold text-slate-900">
                          Listing Summary
                        </h2>

                        <p className="text-xs text-slate-400">
                          Review before publishing
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">

                    <div className="flex items-center justify-between px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Room Type
                      </span>

                      <span className="rounded-full bg-[#BBE0EF] px-3 py-1 text-xs font-bold text-slate-700">
                        {formData.roomType}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Monthly Rent
                      </span>

                      <span className="text-sm font-bold text-[#19CF37]">
                        ₹
                        {formData.rent
                          ? Number(formData.rent).toLocaleString(
                              "en-IN",
                            )
                          : "0"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Location
                      </span>

                      <span className="text-right text-sm font-semibold text-slate-800">
                        {formData.location || "Not added"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Images
                      </span>

                      <span
                        className={`text-sm font-bold ${
                          images.length > 0
                            ? "text-[#19CF37]"
                            : "text-slate-400"
                        }`}
                      >
                        {images.length} / 5
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4">
                      <span className="text-sm text-slate-500">
                        Facilities
                      </span>

                      <span className="text-sm font-bold text-slate-800">
                        {facilities.length}
                      </span>
                    </div>
                  </div>
                </section>

                {/* PUBLISH CARD */}
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#19CF37]">
                        <ShieldCheck size={19} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Ready to publish?
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Make sure all room information and images
                          are accurate before publishing.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#19CF37] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Home size={17} />
                            Publish Room
                          </>
                        )}
                      </button>

                      <Link
                        to="/owner/my-rooms"
                        className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </section>

                {/* HELPFUL TIP */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <Info
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-500"
                    />

                    <div>
                      <p className="text-xs font-bold text-blue-700">
                        Listing Tip
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-600">
                        Add clear room photos and accurate information
                        so students can understand your listing before
                        contacting you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddRoom;