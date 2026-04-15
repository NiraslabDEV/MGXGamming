"use client";

import { useState } from "react";

export default function ListaEsperaForm() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome: nome || undefined }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: data.message || "Email registado com sucesso!",
        });
        setEmail("");
        setNome("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Erro ao registar.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Erro de conexão. Tenta novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-headline font-bold uppercase tracking-widest text-[#ababab] mb-2">
          Email *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="teu@email.com"
          className="w-full bg-[#262626] border border-[#484848] px-4 py-3 text-white placeholder:text-[#484848] focus:border-[#ffe792] focus:ring-1 focus:ring-[#ffe792] outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-headline font-bold uppercase tracking-widest text-[#ababab] mb-2">
          Nome (Opcional)
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Teu nome"
          className="w-full bg-[#262626] border border-[#484848] px-4 py-3 text-white placeholder:text-[#484848] focus:border-[#ffe792] focus:ring-1 focus:ring-[#ffe792] outline-none transition-colors"
        />
      </div>

      {message && (
        <div
          className={`p-4 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-900/30 text-green-300 border border-green-700/50"
              : "bg-red-900/30 text-red-300 border border-red-700/50"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ffe792] text-black font-headline font-black uppercase tracking-tight py-3 px-4 hover:bg-[#ffd709] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Registando..." : "Registar na Lista de Espera"}
      </button>
    </form>
  );
}
