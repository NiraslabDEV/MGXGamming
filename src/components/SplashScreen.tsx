"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"hidden" | "in" | "hold" | "out">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem("mgx_splash")) return;
    sessionStorage.setItem("mgx_splash", "1");

    // Sequência: aparece → segura → desaparece
    setPhase("in");
    const hold = setTimeout(() => setPhase("hold"), 400);
    const out  = setTimeout(() => setPhase("out"), 2200);
    return () => { clearTimeout(hold); clearTimeout(out); };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#0e0e0e] flex flex-col items-center justify-center gap-8"
      style={{
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "all",
        transition: phase === "out" ? "opacity 0.5s ease-in" : undefined,
      }}
    >
      {/* Logo */}
      <img
        src="/Logo-Mgx.jpeg"
        alt="MGX Gaming"
        className="w-36 h-36 object-contain rounded-full"
        style={{
          transform: phase === "in" ? "scale(0.7)" : "scale(1)",
          opacity: phase === "in" ? 0 : 1,
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
        }}
      />

      {/* Loading bar */}
      <div className="w-48 h-[2px] bg-[#1f1f1f] overflow-hidden rounded-full">
        <div
          className="h-full bg-[#ffe792] rounded-full"
          style={{
            width: phase === "hold" || phase === "out" ? "100%" : "0%",
            transition: phase === "hold" ? "width 1.6s cubic-bezier(0.4,0,0.2,1)" : undefined,
          }}
        />
      </div>

      {/* Tagline */}
      <p
        className="font-label text-[10px] uppercase tracking-[0.4em] text-[#484848]"
        style={{
          opacity: phase === "in" ? 0 : 1,
          transition: "opacity 0.5s ease 0.2s",
        }}
      >
        Mozambique Gaming Experience
      </p>
    </div>
  );
}
