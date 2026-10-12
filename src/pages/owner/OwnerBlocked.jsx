
import { ShieldAlert, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OwnerBlocked() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <ShieldAlert size={32} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Account Temporarily Blocked
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          You are blocked for some time. Your owner dashboard
          is temporarily unavailable. Please contact support
          for more information.
        </p>

        <button
          type="button"
          onClick={() => {
            // Apne AuthContext ke logout function ko yahan use karo.
            navigate("/login");
          }}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          <LogOut size={17} />
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default OwnerBlocked;
