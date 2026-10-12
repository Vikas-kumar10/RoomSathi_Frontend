// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   UserRound,
//   Mail,
//   Phone,
//   LockKeyhole,
//   UserCog,
//   LoaderCircle,
// } from "lucide-react";

// import { registerUser } from "../api/auth.api";
// import LoadingOverlay from "../components/LoadingOverlay";

// function RegisterPage() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "student",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     try {
//       setLoading(true);

//       const data = await registerUser({
//         ...formData,
//         name: formData.name.trim(),
//         email: formData.email.trim(),
//         phone: formData.phone.trim(),
//       });

//       setSuccess(data.message || "Account created successfully!");

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "student",
//       });

//       // Show success message before redirecting.
//       setTimeout(() => {
//         navigate("/login", { replace: true });
//       }, 1200);
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Full-screen Registration Loader */}
//       <LoadingOverlay show={loading} />

//       <main className="flex min-h-screen items-center justify-center bg-[#BBE0EF] px-4 py-6 sm:px-6">
//         <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">
//           {/* Left Section */}
//           <section className="bg-[#BBE0EF] p-6 sm:p-8 lg:p-9">
//             <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF3E9B]">
//               Join RoomSaathi
//             </p>

//             <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
//               Create your account
//             </h1>

//             <p className="mt-3 max-w-md text-sm leading-6 text-gray-700">
//               Find safe rooms, connect with trusted landlords,
//               and manage your rental journey in one place.
//             </p>

//             <div className="mt-6 space-y-3">
//               {[
//                 "Verified room listings",
//                 "Quick rental support",
//                 "Student-friendly matches",
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#19CF37] text-white">
//                     <span className="text-sm font-bold">✓</span>
//                   </div>

//                   <span className="text-sm font-medium text-gray-700">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Registration Form */}
//           <section className="p-6 sm:p-8 lg:p-9">
//             <div className="mb-5">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Register
//               </h2>

//               <p className="mt-1 text-xs text-gray-500">
//                 Create your RoomSaathi account
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Error Message */}
//               {error && (
//                 <div
//                   role="alert"
//                   className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
//                 >
//                   {error}
//                 </div>
//               )}

//               {/* Success Message */}
//               {success && (
//                 <div
//                   role="status"
//                   className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
//                 >
//                   {success}
//                 </div>
//               )}

//               {/* Name and Email */}
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="mb-1.5 block text-xs font-semibold text-gray-700"
//                   >
//                     Full Name
//                   </label>

//                   <div className="relative">
//                     <UserRound
//                       size={16}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                     />

//                     <input
//                       id="name"
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       autoComplete="name"
//                       required
//                       disabled={loading}
//                       className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA] disabled:cursor-not-allowed disabled:opacity-60"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="mb-1.5 block text-xs font-semibold text-gray-700"
//                   >
//                     Email
//                   </label>

//                   <div className="relative">
//                     <Mail
//                       size={16}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                     />

//                     <input
//                       id="email"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       required
//                       disabled={loading}
//                       className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA] disabled:cursor-not-allowed disabled:opacity-60"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Phone and Password */}
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="mb-1.5 block text-xs font-semibold text-gray-700"
//                   >
//                     Phone
//                   </label>

//                   <div className="relative">
//                     <Phone
//                       size={16}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                     />

//                     <input
//                       id="phone"
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="+91 98765 43210"
//                       autoComplete="tel"
//                       required
//                       disabled={loading}
//                       className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA] disabled:cursor-not-allowed disabled:opacity-60"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="mb-1.5 block text-xs font-semibold text-gray-700"
//                   >
//                     Password
//                   </label>

//                   <div className="relative">
//                     <LockKeyhole
//                       size={16}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                     />

//                     <input
//                       id="password"
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Create a password"
//                       autoComplete="new-password"
//                       minLength={6}
//                       required
//                       disabled={loading}
//                       className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA] disabled:cursor-not-allowed disabled:opacity-60"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Role */}
//               <div className="sm:w-1/2">
//                 <label
//                   htmlFor="role"
//                   className="mb-1.5 block text-xs font-semibold text-gray-700"
//                 >
//                   Register As
//                 </label>

//                 <div className="relative">
//                   <UserCog
//                     size={16}
//                     className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                   />

//                   <select
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     disabled={loading}
//                     className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     <option value="student">Student</option>
//                     <option value="owner">Owner</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#19CF37] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FF3E9B] focus:outline-none focus:ring-2 focus:ring-[#0AF2FA] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <LoaderCircle size={17} className="animate-spin" />
//                     Creating Account...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </form>

//             {/* Login Link */}
//             <div className="mt-4 text-center text-xs text-gray-500">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-semibold text-[#19CF37] transition hover:text-[#FF3E9B]"
//               >
//                 Login here
//               </Link>
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// }

// export default RegisterPage;





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  UserCog,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

import { registerUser } from "../api/auth.api";
import LoadingOverlay from "../components/LoadingOverlay";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const data = await registerUser({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });

      setSuccess(data.message || "Account created successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "student",
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Existing Full-screen Loader */}
      <LoadingOverlay show={loading} />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#BBE0EF] px-4 py-6 sm:px-6">
        {/* Animated background shapes */}
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 animate-[float_9s_ease-in-out_infinite] rounded-full bg-[#0AF2FA]/35 blur-3xl sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 animate-[float_11s_ease-in-out_infinite] rounded-full bg-[#FF3E9B]/20 blur-3xl sm:h-450px sm:w-450px" />

        <div className="pointer-events-none absolute right-[18%] top-[12%] h-32 w-32 rounded-full bg-[#19CF37]/10 blur-2xl" />

        {/* Decorative dots */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-[12%] top-[20%] h-2 w-2 rounded-full bg-[#FF3E9B]" />
          <div className="absolute right-[15%] top-[28%] h-3 w-3 rounded-full bg-[#0AF2FA]" />
          <div className="absolute bottom-[20%] left-[22%] h-2 w-2 rounded-full bg-[#19CF37]" />
          <div className="absolute bottom-[15%] right-[25%] h-2 w-2 rounded-full bg-[#FF3E9B]" />
        </div>

        {/* Main Registration Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_25px_80px_rgba(31,41,55,0.16)] lg:grid-cols-2"
        >
          {/* Left Section */}
          <section className="relative overflow-hidden bg-[#BBE0EF] p-6 sm:p-8 lg:p-9">
            {/* Panel decorations */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0AF2FA]/30 blur-2xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#FF3E9B]/15 blur-2xl" />

            <motion.div
              variants={itemVariants}
              className="relative z-10"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF3E9B]">
                Join RoomSaathi
              </p>

              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-700">
                Find safe rooms, connect with trusted landlords, and manage
                your rental journey in one place.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="relative z-10 mt-6 space-y-3"
            >
              {[
                "Verified room listings",
                "Quick rental support",
                "Student-friendly matches",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#19CF37] text-gray-900 shadow-sm transition-transform duration-300 hover:scale-110">
                    <CheckCircle2 size={16} />
                  </div>

                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Registration Form */}
          <section className="relative bg-white p-6 sm:p-8 lg:p-9">
            <motion.div
              variants={itemVariants}
              className="mb-5"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Register
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Create your RoomSaathi account
              </p>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#0AF2FA]" />
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                >
                  {error}
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                >
                  {success}
                </motion.div>
              )}

              {/* Name and Email */}
              <motion.div
                variants={containerVariants}
                className="grid gap-4 sm:grid-cols-2"
              >
                {/* Full Name */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-semibold text-gray-700"
                  >
                    Full Name
                  </label>

                  <div className="group relative">
                    <UserRound
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-[#0AF2FA] focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold text-gray-700"
                  >
                    Email
                  </label>

                  <div className="group relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-[#0AF2FA] focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Phone and Password */}
              <motion.div
                variants={containerVariants}
                className="grid gap-4 sm:grid-cols-2"
              >
                {/* Phone */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-semibold text-gray-700"
                  >
                    Phone
                  </label>

                  <div className="group relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      required
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-[#0AF2FA] focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="group relative">
                    <LockKeyhole
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      minLength={6}
                      required
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-[#0AF2FA] focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Role */}
              <motion.div
                variants={itemVariants}
                className="sm:w-1/2"
              >
                <label
                  htmlFor="role"
                  className="mb-1.5 block text-xs font-semibold text-gray-700"
                >
                  Register As
                </label>

                <div className="group relative">
                  <UserCog
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                  />

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all duration-300 hover:border-[#0AF2FA] focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="student">Student</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? undefined : { scale: 1.015 }}
                  whileTap={loading ? undefined : { scale: 0.985 }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#19CF37] px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-colors duration-300 hover:bg-[#FF3E9B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0AF2FA] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.div
              variants={itemVariants}
              className="mt-4 text-center text-xs text-gray-500"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#19CF37] transition-colors duration-300 hover:text-[#FF3E9B]"
              >
                Login here
              </Link>
            </motion.div>
          </section>
        </motion.div>
      </main>

      {/* Floating background animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(14px, -18px, 0);
          }
        }
      `}</style>
    </>
  );
}

export default RegisterPage;

