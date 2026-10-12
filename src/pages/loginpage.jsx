// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Mail,
//   LockKeyhole,
//   UserRound,
//   CheckCircle2,
//   LoaderCircle,
// } from "lucide-react";

// import { loginUser } from "../api/auth.api";
// import { useAuth } from "../context/AuthContext";
// import LoadingOverlay from "../components/LoadingOverlay";

// function LoginPage() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
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

//       const data = await loginUser({
//         email: formData.email.trim(),
//         password: formData.password,
//         role: formData.role,
//       });

//       login(data);

//       setSuccess(data.message || "Login successful!");

//       const role = data.user?.role;
//       const status = data.user?.status;
//       if (role === "student") {
//         navigate("/student/dashboard", { replace: true });
//       } else if (role === "owner" && status === "blocked") {
//         navigate("/owner/blocked", { replace: true });
//       } else if (role === "owner") {
//         navigate("/owner/dashboard", { replace: true });
//       } else if (role === "admin") {
//         navigate("/admin", { replace: true });
//       } else {
//         setError("Unable to identify your account role.");
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Login failed. Please check your email and password.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Full-screen Login Loader */}
//       <LoadingOverlay show={loading} />

//       <main className="flex min-h-screen items-center justify-center bg-[#BBE0EF] px-4 py-6 sm:px-8">
//         <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl lg:grid-cols-2">
//           {/* Left Section */}
//           <section className="bg-[#BBE0EF] p-6 sm:p-8 lg:p-9">
//             <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF3E9B]">
//               Welcome to RoomSaathi
//             </p>

//             <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
//               Find your next room
//             </h1>

//             <p className="mt-3 max-w-md text-sm leading-6 text-gray-700">
//               Sign in to discover trusted listings, manage your room search, and
//               stay connected with landlords.
//             </p>

//             <div className="mt-6 space-y-3">
//               {[
//                 "Verified room listings",
//                 "Simple room management",
//                 "Support when you need it",
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#19CF37] text-white">
//                     <CheckCircle2 size={16} />
//                   </div>

//                   <span className="text-sm font-medium text-gray-700">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Login Section */}
//           <section className="bg-white p-6 sm:p-8 lg:p-9">
//             <div className="mb-5">
//               <h2 className="text-2xl font-bold text-gray-900">Login</h2>

//               <p className="mt-1 text-xs text-gray-500">
//                 Access your RoomSaathi account
//               </p>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div
//                 role="alert"
//                 className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
//               >
//                 {error}
//               </div>
//             )}

//             {/* Success Message */}
//             {success && (
//               <div
//                 role="status"
//                 className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
//               >
//                 {success}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Email and Password */}
//               <div className="grid gap-4 sm:grid-cols-2">
//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="mb-1.5 block text-xs font-semibold text-gray-700"
//                   >
//                     Email
//                   </label>

//                   <div className="relative">
//                     <Mail
//                       size={17}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                     />

//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       placeholder="you@example.com"
//                       autoComplete="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       disabled={loading}
//                       className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA] disabled:cursor-not-allowed disabled:opacity-60"
//                     />
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="mb-1.5 block text-xs font-semibold text-gray-700"
//                   >
//                     Password
//                   </label>

//                   <div className="relative">
//                     <LockKeyhole
//                       size={17}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                     />

//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="Enter your password"
//                       autoComplete="current-password"
//                       value={formData.password}
//                       onChange={handleChange}
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
//                   Role
//                 </label>

//                 <div className="relative">
//                   <UserRound
//                     size={17}
//                     className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B]"
//                   />

//                   <select
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     required
//                     disabled={loading}
//                     className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     <option value="student">Student</option>
//                     <option value="owner">Owner</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Remember Me and Forgot Password */}
//               <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
//                 <label className="flex items-center gap-2 text-gray-600">
//                   <input
//                     type="checkbox"
//                     name="remember"
//                     className="h-4 w-4 accent-[#19CF37]"
//                   />
//                   Remember me
//                 </label>

//                 <Link
//                   to="/forgot-password"
//                   className="font-semibold text-[#FF3E9B] transition hover:text-[#19CF37]"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#19CF37] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FF3E9B] focus:outline-none focus:ring-2 focus:ring-[#0AF2FA] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <LoaderCircle size={17} className="animate-spin" />
//                     Logging in...
//                   </>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </form>

//             {/* Register */}
//             <div className="mt-4 text-center text-xs text-gray-500">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/register"
//                 className="font-semibold text-[#FF3E9B] transition hover:text-[#19CF37]"
//               >
//                 Register here
//               </Link>
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// }

// export default LoginPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  LockKeyhole,
  UserRound,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import LoadingOverlay from "../components/LoadingOverlay";

const containerVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
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

      const data = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      login(data);

      setSuccess(data.message || "Login successful!");

      const role = data.user?.role;
      const status = data.user?.status;

      if (role === "student") {
        navigate("/student/dashboard", { replace: true });
      } else if (role === "owner" && status === "blocked") {
        navigate("/owner/blocked", { replace: true });
      } else if (role === "owner") {
        navigate("/owner/dashboard", { replace: true });
      } else if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        setError("Unable to identify your account role.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Existing Full-screen Loader */}
      <LoadingOverlay show={loading} />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#BBE0EF] px-4 py-6 sm:px-8">
        {/* Animated background decorations */}
        <div className="pointer-events-none absolute -left-24 top-70px h-72 w-72 animate-[float_9s_ease-in-out_infinite] rounded-full bg-[#0AF2FA]/35 blur-3xl sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute -bottom-24 right-70px h-80 w-80 animate-[float_11s_ease-in-out_infinite] rounded-full bg-[#FF3E9B]/20 blur-3xl sm:h-450px sm:w-450px" />

        <div className="pointer-events-none absolute right-[18%] top-[12%] h-32 w-32 rounded-full bg-[#19CF37]/10 blur-2xl" />

        {/* Subtle decorative dots */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-[12%] top-[20%] h-2 w-2 rounded-full bg-[#FF3E9B]" />
          <div className="absolute right-[15%] top-[28%] h-3 w-3 rounded-full bg-[#0AF2FA]" />
          <div className="absolute bottom-[20%] left-[22%] h-2 w-2 rounded-full bg-[#19CF37]" />
          <div className="absolute bottom-[15%] right-[25%] h-2 w-2 rounded-full bg-[#FF3E9B]" />
        </div>

        {/* Main Login Card - Original Layout Preserved */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_25px_80px_rgba(31,41,55,0.16)] lg:grid-cols-2"
        >
          {/* Left Section */}
          <section className="relative overflow-hidden bg-[#BBE0EF] p-6 sm:p-8 lg:p-9">
            {/* Left panel decorative shapes */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0AF2FA]/30 blur-2xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#FF3E9B]/15 blur-2xl" />

            <motion.div variants={itemVariants} className="relative z-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#FF3E9B]">
                Welcome to RoomSaathi
              </p>

              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Find your next room
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-700">
                Sign in to discover trusted listings, manage your room search,
                and stay connected with landlords.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="relative z-10 mt-6 space-y-3"
            >
              {[
                "Verified room listings",
                "Simple room management",
                "Support when you need it",
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

          {/* Login Section */}
          <section className="relative bg-white p-6 sm:p-8 lg:p-9">
            <motion.div variants={itemVariants} className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>

              <p className="mt-1 text-xs text-gray-500">
                Access your RoomSaathi account
              </p>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#0AF2FA]" />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
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
                className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              >
                {success}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email and Password */}
              <motion.div
                variants={containerVariants}
                className="grid gap-4 sm:grid-cols-2"
              >
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
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                    />

                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-[#0AF2FA] focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Role */}
              <motion.div variants={itemVariants} className="sm:w-1/2">
                <label
                  htmlFor="role"
                  className="mb-1.5 block text-xs font-semibold text-gray-700"
                >
                  Role
                </label>

                <div className="group relative">
                  <UserRound
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF3E9B] transition-transform duration-300 group-focus-within:scale-110"
                  />

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition-all duration-300 hover:border-[#0AF2FA] focus:border-[#0AF2FA] focus:bg-white focus:ring-2 focus:ring-[#0AF2FA]/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="student">Student</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
              </motion.div>

              {/* Remember Me and Forgot Password */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between"
              >
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 accent-[#19CF37] focus:ring-2 focus:ring-[#0AF2FA]"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="font-semibold text-[#FF3E9B] transition-colors duration-300 hover:text-gray-900"
                >
                  Forgot password?
                </Link>
              </motion.div>

              {/* Login Button */}
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
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Register */}
            <motion.div
              variants={itemVariants}
              className="mt-4 text-center text-xs text-gray-500"
            >
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#FF3E9B] transition-colors duration-300 hover:text-gray-900"
              >
                Register here
              </Link>
            </motion.div>
          </section>
        </motion.div>
      </main>

      {/* Local floating animation */}
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

export default LoginPage;
