"use client";

import { useState } from "react";

export default function ListaEsperaForm() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome: nome || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Erro ao registar.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Registado com sucesso!");
      setEmail("");
      setNome("");
    } catch {
      setStatus("error");
      setMessage("Erro de ligação. Tenta novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-900/20 border border-green-500/30 p-6 text-center">
        <span className="material-symbols-outlined text-green-400 text-4xl block mb-2">
          check_circle
        </span>
        <p className="text-green-400 font-headline font-bold uppercase text-sm">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="O teu nome (opcional)"
        className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#484848] text-white placeholder:text-[#484848] font-body focus:outline-none focus:ring-1 focus:ring-[#ffe792] transition-all"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="O teu email"
        required
        className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#484848] text-white placeholder:text-[#484848] font-body focus:outline-none focus:ring-1 focus:ring-[#ffe792] transition-all"
      />
      {status === "error" && (
        <p className="text-red-400 text-xs uppercase tracking-wider font-label">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-[#ffd709] text-black font-headline font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          "A registar..."
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">mail</span>
            Juntar-me à Lista
          </>
        )}
      </button>
    </form>
  );
}