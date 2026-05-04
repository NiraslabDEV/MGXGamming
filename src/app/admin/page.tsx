"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Senha incorrecta. Tenta novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] kinetic-mesh flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-12 text-center flex flex-col items-center gap-3">
          <Image
            src="/Logo-Mgx.jpeg"
            alt="MGX Gaming"
            width={96}
            height={96}
            className="h-24 w-24 object-contain rounded-full"
          />
          <p className="text-[#ababab] text-xs uppercase tracking-[0.3em] font-label">
            Tournament Control Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#131313] border-l-4 border-[#ffe792] p-8">
          <h1 className="font-headline font-black uppercase text-xl mb-6 text-white">
            Acesso Admin
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-label text-[10px] uppercase tracking-[0.2em] text-[#ababab] mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoFocus
                className="w-full bg-[#262626] border-2 border-[#484848] px-5 py-4 text-white focus:border-[#ffe792] outline-none transition-all placeholder:text-[#484848] font-body text-lg"
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border-l-4 border-red-500 px-4 py-3">
                <p className="text-red-400 text-sm font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#ffd709] text-black font-headline font-black uppercase tracking-tight text-lg hover:bg-[#ffe792] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "A verificar..." : "ENTRAR"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#484848] text-xs mt-6 uppercase tracking-widest font-label">
          MGX Gaming © 2024 — Maputo
        </p>
      </div>
    </div>
  );
}
