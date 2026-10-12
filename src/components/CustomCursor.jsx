
import { useEffect, useRef } from "react";

function CustomCursor() {
  const glowRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Custom cursor only for mouse-based devices
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!mediaQuery.matches) return;

    const glow = glowRef.current;
    const cursor = cursorRef.current;

    if (!glow || !cursor) return;

    let isVisible = false;

    const showCursor = () => {
      if (isVisible) return;

      isVisible = true;
      glow.style.opacity = "1";
      cursor.style.opacity = "1";
    };

    const hideCursor = () => {
      isVisible = false;
      glow.style.opacity = "0";
      cursor.style.opacity = "0";
    };

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      // Update cursor position without React re-renders
      glow.style.left = `${clientX}px`;
      glow.style.top = `${clientY}px`;

      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;

      showCursor();
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
    };
  }, []);

  return (
    <>
      {/* Outer cyan-pink glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 hidden rounded-full md:block"
        style={{
          width: "150px",
          height: "150px",
          zIndex: 9998,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(10,242,250,0.22) 0%, rgba(255,62,155,0.12) 40%, transparent 72%)",
          filter: "blur(8px)",
          transition: "opacity 180ms ease",
          willChange: "left, top, opacity",
        }}
      />

      {/* Cursor ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 hidden rounded-full md:block"
        style={{
          width: "42px",
          height: "42px",
          zIndex: 9999,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(255,62,155,0.9)",
          background: "rgba(10,242,250,0.06)",
          boxShadow:
            "0 0 12px rgba(10,242,250,0.4), inset 0 0 10px rgba(255,62,155,0.15)",
          transition: "opacity 180ms ease",
          willChange: "left, top, opacity",
        }}
      >
        {/* Center dot */}
        <span
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF3E9B]"
          style={{
            boxShadow: "0 0 8px #FF3E9B",
          }}
        />
      </div>
    </>
  );
}

export default CustomCursor;
