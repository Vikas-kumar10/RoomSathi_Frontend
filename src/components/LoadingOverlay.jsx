import { LoaderCircle } from "lucide-react";

function LoadingOverlay({ show }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Signing you in"
    >
      <div className="w-full max-w-sm rounded-3xl border border-white/60 bg-white p-8 text-center shadow-2xl">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#0AF2FA] border-r-[#FF3E9B]" />

          <LoaderCircle
            size={32}
            className="animate-spin text-[#FF3E9B]"
          />
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Signing you in...
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please wait while we verify your credentials.
        </p>

        <div className="mx-auto mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-[loadingBar_1.2s_ease-in-out_infinite] rounded-full bg-sky-700 from-[#0AF2FA] to-[#FF3E9B]" />
        </div>

        <p className="mt-4 text-xs font-medium text-slate-400">
          RoomSaathi · Find your space
        </p>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spin {
            animation-duration: 2s;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingOverlay;