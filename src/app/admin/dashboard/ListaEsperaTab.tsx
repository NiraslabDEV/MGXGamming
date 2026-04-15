"use client";

import { useState, useEffect } from "react";

interface ListaEsperaEntry {
  id: string;
  email: string;
  nome: string | null;
  data_registo: string;
}

export default function ListaEsperaTab() {
  const [data, setData] = useState<ListaEsperaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadListaEspera();
  }, []);

  async function loadListaEspera() {
    try {
      setLoading(true);
      const res = await fetch("/api/lista-espera", {
        method: "GET",
        headers: {
          Authorization: "Bearer admin", // Ainda será validado no servidor
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar");
      const { data: listData } = await res.json();
      setData(listData || []);
    } catch (err) {
      console.error("Erro:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function exportToCSV() {
    if (data.length === 0) {
      alert("Sem dados para exportar");
      return;
    }

    const headers = ["Email", "Nome", "Data de Registo"];
    const rows = data.map((item) => [
      item.email,
      item.nome || "",
      new Date(item.data_registo).toLocaleString("pt-MZ"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `lista-espera-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }

  function copyAllEmails() {
    if (data.length === 0) {
      alert("Sem emails para copiar");
      return;
    }

    const emails = data.map((item) => item.email).join("; ");
    navigator.clipboard.writeText(emails);
    alert(`${data.length} emails copiados para a clipboard!`);
  }

  const filtered = data.filter(
    (item) =>
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      (item.nome?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8 border-l-4 border-[#ffe792] pl-6 py-2">
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">
          Lista de Espera
        </h1>
        <p className="text-[#ababab] font-label uppercase text-xs tracking-[0.2em] mt-1">
          Gestão de Emails / {data.length} registos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-[#131313] p-5 border-l-2 border-[#ffe792]">
          <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
            Emails Registados
          </p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-headline font-black">
              {data.length}
            </span>
            <span className="material-symbols-outlined text-[#ffe792]/30 text-4xl">
              mail
            </span>
          </div>
        </div>
        <div className="bg-[#131313] p-5 border-l-2 border-[#ffd709]">
          <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
            Com Nome
          </p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-headline font-black">
              {data.filter((i) => i.nome).length}
            </span>
            <span className="material-symbols-outlined text-[#ffd709]/30 text-4xl">
              person
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={copyAllEmails}
          disabled={data.length === 0}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 font-headline font-black uppercase text-xs tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">content_copy</span>
          Copiar Todos os Emails
        </button>
        <button
          onClick={exportToCSV}
          disabled={data.length === 0}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 font-headline font-black uppercase text-xs tracking-widest hover:bg-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">download</span>
          Exportar CSV
        </button>
        <button
          onClick={loadListaEspera}
          className="flex items-center justify-center gap-2 bg-[#262626] border border-[#484848] text-white px-6 py-3 font-headline font-black uppercase text-xs tracking-widest hover:bg-[#333333] transition-all"
        >
          <span className="material-symbols-outlined">refresh</span>
          Recarregar
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#ababab] text-sm">
          search
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por email ou nome..."
          className="w-full bg-[#262626] border border-[#484848] pl-12 pr-4 py-3 text-sm focus:ring-1 focus:ring-[#ffe792] outline-none transition-all placeholder:text-[#484848] text-white"
        />
      </div>

      {/* Table */}
      <div className="bg-[#131313]">
        {loading ? (
          <div className="p-12 text-center text-[#ababab]">
            <span className="material-symbols-outlined text-4xl block mb-2 animate-spin">
              hourglass_empty
            </span>
            A carregar...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-[#ababab]">
            <span className="material-symbols-outlined text-4xl block mb-2">
              mail
            </span>
            {search ? "Nenhum resultado encontrado" : "Sem registos ainda"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f1f1f] border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] font-label uppercase tracking-[0.2em] text-[#ababab]">
                    Email
                  </th>
                  <th className="px-6 py-4 text-[10px] font-label uppercase tracking-[0.2em] text-[#ababab]">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-[10px] font-label uppercase tracking-[0.2em] text-[#ababab]">
                    Data de Registo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-body text-white text-sm break-all">
                        {item.email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-[#ababab] text-sm">
                        {item.nome || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-label text-[#ababab] text-xs uppercase tracking-wider">
                        {new Date(item.data_registo).toLocaleString(
                          "pt-MZ",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 bg-[#131313] border-t border-white/5">
          <span className="text-xs text-[#ababab] font-label uppercase tracking-widest">
            {filtered.length} de {data.length} registos
          </span>
        </div>
      </div>
    </div>
  );
}
