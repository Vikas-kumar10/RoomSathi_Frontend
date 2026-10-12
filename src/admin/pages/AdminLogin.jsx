import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, LockKeyhole, ShieldCheck, Eye, EyeOff } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Dummy credentials for testing only
    if (
      formData.email.trim().toLowerCase() === "admin@roomsaathi.com" &&
      formData.password === "Admin@123"
    ) {
      sessionStorage.setItem("roomsaathiAdminLoggedIn", "true");
      navigate("/admin", { replace: true });
    } else {
      setError("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        {/* Left panel */}
        <div className="hidden flex-col justify-between bg-[#1f5081] p-10 text-white md:flex">
          <div>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <ShieldCheck size={32} />
            </div>

            <h1 className="text-3xl font-bold">RoomSaathi Admin</h1>

            <p className="mt-4 leading-7 text-blue-100">
              Manage students, owners, rooms, visits and requests from one
              central dashboard.
            </p>
          </div>

          <p className="text-sm text-blue-100">
            Find Your Perfect Room
          </p>
        </div>

        {/* Login form */}
        <div className="p-6 sm:p-10 md:p-12">
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1f5081] md:hidden">
              <ShieldCheck size={27} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-[#1f5081]">
              Admin Portal
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to access your admin dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-slate-200 px-4 transition focus-within:border-[#1f5081] focus-within:ring-2 focus-within:ring-blue-100">
                <Mail size={19} className="text-slate-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  autoComplete="username"
                  required
                  className="w-full border-0 bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="flex items-center rounded-xl border border-slate-200 px-4 transition focus-within:border-[#1f5081] focus-within:ring-2 focus-within:ring-blue-100">
                <LockKeyhole size={19} className="text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  required
                  className="w-full border-0 bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5081] px-4 py-3.5 font-semibold text-white transition hover:bg-[#173e65] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1f5081]">
              Testing Credentials
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Email: admin@roomsaathi.com
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Password: Admin@123
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © RoomSaathi Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;