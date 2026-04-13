"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface Inscricao {
  id: string;
  nome: string;
  email: string | null;
  whatsapp: string;
  nickname: string;
  jogo: string;
  comprovativo_url: string | null;
  status: "pendente" | "confirmado" | "rejeitado";
  data_inscricao: string;
}

interface Stats {
  total: number;
  totalMt: number;
  vagasRestantes: number;
  confirmados: number;
  pendentes: number;
  rejeitados: number;
}

export default function AdminDashboardClient({
  inscricoes,
  stats,
}: {
  inscricoes: Inscricao[];
  stats: Stats;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Inscricao | null>(
    inscricoes[0] ?? null
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = inscricoes.filter((i) => {
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "confirmado" && i.status === "confirmado") ||
      (filterStatus === "pendente" && i.status === "pendente");
    const matchSearch =
      i.nome.toLowerCase().includes(search.toLowerCase()) ||
      i.nickname.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  async function updateStatus(id: string, status: "confirmado" | "rejeitado" | "pendente") {
    setLoadingId(id);
    await fetch(`/api/inscricao/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoadingId(null);
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, status } : prev);
    }
    startTransition(() => router.refresh());
  }

  async function deleteInscricao(id: string) {
    if (!confirm("Tens a certeza que queres apagar este registo? Esta acção é irreversível.")) return;
    setLoadingId(id);
    await fetch(`/api/inscricao/${id}`, { method: "DELETE" });
    setLoadingId(null);
    if (selected?.id === id) setSelected(null);
    startTransition(() => router.refresh());
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  const statusBadge = (status: string) => {
    if (status === "confirmado")
      return (
        <span className="bg-[#ffe792]/10 text-[#ffe792] px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-[#ffe792]/20">
          Pago
        </span>
      );
    if (status === "rejeitado")
      return (
        <span className="bg-red-900/20 text-red-400 px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-red-500/20">
          Rejeitado
        </span>
      );
    return (
      <span className="bg-[#262626] text-[#ababab] px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-[#484848]">
        Pendente
      </span>
    );
  };

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen font-body">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-6 h-16 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden material-symbols-outlined text-[#ababab] hover:text-yellow-400 transition-colors"
          >
            menu
          </button>
          <span className="text-2xl font-black text-yellow-400 italic font-headline uppercase tracking-wider">
            MGX Gaming
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#ababab] text-sm">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#262626] border-none pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-[#ffe792] w-64 outline-none transition-all placeholder:text-[#484848]"
              placeholder="Pesquisar jogadores..."
            />
          </div>
          <button
            onClick={handleLogout}
            className="material-symbols-outlined text-[#ababab] hover:text-yellow-400 transition-colors"
            title="Sair"
          >
            logout
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-full w-64 bg-neutral-950 pt-16 flex flex-col font-headline font-medium z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <div className="p-6 bg-neutral-900 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffe792] flex items-center justify-center font-black text-black text-lg">
                M
              </div>
              <div>
                <p className="text-yellow-400 font-black text-sm uppercase">
                  MGX Admin
                </p>
                <p className="text-neutral-500 text-[10px] uppercase tracking-widest">
                  Tournament Control
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 mt-4">
            <div className="text-black bg-yellow-400 font-bold px-4 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined">sports_esports</span>
              <span className="uppercase text-xs tracking-wider">
                FIFA Inscrições
              </span>
            </div>
            <div className="text-neutral-400 px-4 py-3 flex items-center gap-3 opacity-40 cursor-not-allowed">
              <span className="material-symbols-outlined">videogame_asset</span>
              <span className="uppercase text-xs tracking-wider">
                Tekken (Em Breve)
              </span>
            </div>
          </nav>

          <div className="mt-auto border-t border-white/5 pb-4">
            <button
              onClick={handleLogout}
              className="w-full text-neutral-400 px-4 py-3 flex items-center gap-3 hover:bg-neutral-800 transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="uppercase text-xs tracking-wider">Sair</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="ml-0 md:ml-64 flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Page Header */}
          <div className="mb-8 border-l-4 border-[#ffe792] pl-6 py-2">
            <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">
              FIFA Inscrições
            </h1>
            <p className="text-[#ababab] font-label uppercase text-xs tracking-[0.2em] mt-1">
              Painel de Gestão / Campeonato 2026
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-[#131313] p-5 border-l-2 border-[#ffd709]">
              <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
                Inscritos Activos
              </p>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-headline font-black">{stats.total}</span>
                <span className="material-symbols-outlined text-[#ffe792]/30 text-4xl">group</span>
              </div>
            </div>
            <div className="bg-[#131313] p-5 border-l-2 border-green-500">
              <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
                Aprovados
              </p>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-headline font-black text-green-400">{stats.confirmados}</span>
                <span className="material-symbols-outlined text-green-500/30 text-4xl">verified</span>
              </div>
            </div>
            <div className="bg-[#131313] p-5 border-l-2 border-yellow-500">
              <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
                Pendentes
              </p>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-headline font-black text-yellow-400">{stats.pendentes}</span>
                <span className="material-symbols-outlined text-yellow-500/30 text-4xl">pending</span>
              </div>
            </div>
            <div className="bg-[#131313] p-5 border-l-2 border-red-500">
              <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
                Rejeitados
              </p>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-headline font-black text-red-400">{stats.rejeitados}</span>
                <span className="material-symbols-outlined text-red-500/30 text-4xl">cancel</span>
              </div>
            </div>
            <div className="bg-[#131313] p-5 border-l-2 border-[#ffd709]">
              <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
                Total Arrecadado
              </p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-headline font-black">
                  {stats.totalMt.toLocaleString()}{" "}
                  <span className="text-base text-[#ffe792]">MT</span>
                </span>
                <span className="material-symbols-outlined text-[#ffe792]/30 text-4xl">payments</span>
              </div>
            </div>
            <div className="bg-[#131313] p-5 border-l-2 border-[#ffd709]">
              <p className="text-[#ababab] text-[10px] uppercase font-label tracking-widest mb-1">
                Vagas Restantes
              </p>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-headline font-black">{stats.vagasRestantes}</span>
                <span className="material-symbols-outlined text-[#ffe792]/30 text-4xl">event_seat</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Table */}
            <div className="col-span-12 xl:col-span-8 bg-[#131313]">
              {/* Filters */}
              <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-[#191919] gap-4">
                <div className="relative w-full md:w-auto">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#ababab] text-sm">
                    filter_alt
                  </span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-[#262626] border-none pl-10 pr-10 py-2 text-xs font-label uppercase tracking-wider focus:ring-1 focus:ring-[#ffe792] outline-none appearance-none w-full text-white"
                  >
                    <option value="all">Status: Todos</option>
                    <option value="confirmado">Pagos</option>
                    <option value="pendente">Pendentes</option>
                  </select>
                </div>
                <div className="relative w-full md:w-auto">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#ababab] text-sm">
                    search
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[#262626] border-none pl-10 pr-4 py-2 text-xs font-label uppercase tracking-wider focus:ring-1 focus:ring-[#ffe792] outline-none w-full md:w-64 text-white placeholder:text-[#484848]"
                    placeholder="Filtrar por nome..."
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1f1f1f] border-b border-white/5">
                      <th className="px-6 py-4 text-[10px] font-label uppercase tracking-[0.2em] text-[#ababab]">
                        Jogador
                      </th>
                      <th className="px-6 py-4 text-[10px] font-label uppercase tracking-[0.2em] text-[#ababab]">
                        WhatsApp
                      </th>
                      <th className="px-6 py-4 text-[10px] font-label uppercase tracking-[0.2em] text-[#ababab] text-center">
                        Status
                      </th>
                      <th className="px-6 py-4 text-[10px] font-label uppercase tracking-[0.2em] text-[#ababab] text-right">
                        Comprovativo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-12 text-center text-[#484848] font-label uppercase tracking-widest text-xs"
                        >
                          Nenhuma inscrição encontrada
                        </td>
                      </tr>
                    )}
                    {filtered.map((inscricao) => (
                      <tr
                        key={inscricao.id}
                        className={`hover:bg-white/5 transition-colors cursor-pointer ${
                          selected?.id === inscricao.id ? "bg-[#ffe792]/5" : ""
                        }`}
                        onClick={() => { setSelected(inscricao); setSidebarOpen(false); }}
                      >
                        <td className="px-6 py-4">
                          <p className="font-headline font-bold text-white uppercase tracking-tight">
                            {inscricao.nome}
                          </p>
                          <p className="text-[#ababab] text-xs font-label uppercase tracking-wider mt-0.5">
                            {inscricao.nickname}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`https://wa.me/258${inscricao.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-[#ababab] hover:text-[#ffe792] transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">
                              chat
                            </span>
                            {inscricao.whatsapp}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {statusBadge(inscricao.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(inscricao);
                            }}
                            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                              selected?.id === inscricao.id
                                ? "bg-[#ffe792] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
                                : "bg-[#2c2c2c] hover:bg-[#ffe792] hover:text-black"
                            }`}
                          >
                            {selected?.id === inscricao.id
                              ? "A Ver"
                              : "Ver"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Count */}
              <div className="px-6 py-4 bg-[#131313] border-t border-white/5">
                <span className="text-xs text-[#ababab] font-label uppercase tracking-widest">
                  {filtered.length} de {inscricoes.length} inscrições
                  {isPending && " — a actualizar..."}
                </span>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="col-span-12 xl:col-span-4 space-y-6">
              {selected ? (
                <div className="bg-[#191919] p-6 relative overflow-hidden">
                  {selected.status === "confirmado" && (
                    <div className="absolute top-0 right-0 bg-[#ffe792] text-black font-black uppercase text-[10px] tracking-widest px-3 py-1">
                      Pago ✓
                    </div>
                  )}
                  {selected.status === "rejeitado" && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white font-black uppercase text-[10px] tracking-widest px-3 py-1">
                      Rejeitado
                    </div>
                  )}

                  <h3 className="text-xl font-headline font-black uppercase text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792]">
                      receipt_long
                    </span>
                    Comprovativo
                  </h3>

                  {/* Proof image */}
                  <div className="aspect-[3/4] bg-neutral-900 border border-white/10 relative group mb-4 overflow-hidden">
                    {selected.comprovativo_url ? (
                      <>
                        <img
                          src={selected.comprovativo_url}
                          alt="Comprovativo"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                          <a
                            href={selected.comprovativo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black font-black uppercase text-xs px-6 py-3 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-sm">
                              zoom_in
                            </span>
                            Ver em tamanho real
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#484848]">
                        <div className="text-center">
                          <span className="material-symbols-outlined text-4xl block mb-2">
                            image_not_supported
                          </span>
                          <p className="text-xs uppercase tracking-widest font-label">
                            Sem comprovativo
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-3 border-t border-white/5 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-label text-[#ababab] uppercase tracking-widest">
                        Nome
                      </span>
                      <span className="text-sm font-headline font-bold uppercase">
                        {selected.nome}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-label text-[#ababab] uppercase tracking-widest">
                        Nickname
                      </span>
                      <span className="text-sm font-headline font-bold text-[#ffe792]">
                        {selected.nickname}
                      </span>
                    </div>
                    {selected.email && (
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-label text-[#ababab] uppercase tracking-widest">
                          Email
                        </span>
                        <span className="text-xs font-body text-[#ffe792] truncate max-w-[160px]" title={selected.email}>
                          {selected.email}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-label text-[#ababab] uppercase tracking-widest">
                        WhatsApp
                      </span>
                      <span className="text-sm font-headline font-bold">
                        {selected.whatsapp}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-label text-[#ababab] uppercase tracking-widest">
                        Inscrito em
                      </span>
                      <span className="text-sm font-headline font-bold">
                        {new Date(selected.data_inscricao).toLocaleDateString(
                          "pt-MZ",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-label text-[#ababab] uppercase tracking-widest">
                        Valor
                      </span>
                      <span className="text-sm font-headline font-bold">
                        800.00 MT
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {selected.status === "pendente" && (
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() =>
                          updateStatus(selected.id, "rejeitado")
                        }
                        disabled={loadingId === selected.id}
                        className="flex-1 bg-[#262626] border border-[#484848] py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-900/30 hover:text-red-400 hover:border-red-500 transition-all disabled:opacity-50"
                      >
                        {loadingId === selected.id ? "..." : "Rejeitar"}
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(selected.id, "confirmado")
                        }
                        disabled={loadingId === selected.id}
                        className="flex-1 bg-[#ffd709] text-black py-3 text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {loadingId === selected.id ? "..." : "Aprovar"}
                      </button>
                    </div>
                  )}

                  {selected.status === "confirmado" && (
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => updateStatus(selected.id, "rejeitado")}
                        disabled={loadingId === selected.id}
                        className="w-full bg-[#262626] border border-[#484848] py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-900/30 hover:text-red-400 hover:border-red-500 transition-all disabled:opacity-50"
                      >
                        {loadingId === selected.id ? "..." : "Rejeitar"}
                      </button>
                    </div>
                  )}

                  {selected.status === "rejeitado" && (
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => updateStatus(selected.id, "pendente")}
                        disabled={loadingId === selected.id}
                        className="flex-1 bg-[#262626] border border-[#484848] py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
                      >
                        {loadingId === selected.id ? "..." : "Pendente"}
                      </button>
                      <button
                        onClick={() => updateStatus(selected.id, "confirmado")}
                        disabled={loadingId === selected.id}
                        className="flex-1 bg-[#ffd709] text-black py-3 text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {loadingId === selected.id ? "..." : "Aprovar"}
                      </button>
                    </div>
                  )}

                  {/* WhatsApp contact */}
                  <a
                    href={`https://wa.me/258${selected.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 w-full py-3 bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Contactar via WhatsApp
                  </a>

                  {/* Delete */}
                  <button
                    onClick={() => deleteInscricao(selected.id)}
                    disabled={loadingId === selected.id}
                    className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-transparent text-[#484848] border border-[#262626] hover:bg-red-900/30 hover:text-red-400 hover:border-red-800 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    {loadingId === selected.id ? "A apagar..." : "Apagar registo"}
                  </button>
                </div>
              ) : (
                <div className="bg-[#191919] p-12 text-center">
                  <span className="material-symbols-outlined text-5xl text-[#484848] block mb-4">
                    touch_app
                  </span>
                  <p className="text-[#484848] font-label uppercase tracking-widest text-xs">
                    Selecciona um jogador para ver o comprovativo
                  </p>
                </div>
              )}

              {/* Activity log */}
              <div className="bg-[#131313] p-6">
                <h3 className="text-xs font-label font-black uppercase text-[#ababab] tracking-[0.2em] mb-4">
                  Últimas Inscrições
                </h3>
                <div className="space-y-4">
                  {inscricoes.slice(0, 4).map((i) => (
                    <div key={i.id} className="flex gap-3 items-start">
                      <div
                        className={`w-1 h-8 flex-shrink-0 ${
                          i.status === "confirmado"
                            ? "bg-[#ffe792]/50"
                            : i.status === "rejeitado"
                            ? "bg-red-500/50"
                            : "bg-white/20"
                        }`}
                      />
                      <div>
                        <p className="text-[11px] text-white font-bold uppercase tracking-tight">
                          {i.nome}
                        </p>
                        <p className="text-[10px] text-[#ababab]">
                          {i.status === "confirmado"
                            ? "Pagamento aprovado"
                            : i.status === "rejeitado"
                            ? "Rejeitado"
                            : "Aguarda verificação"}{" "}
                          •{" "}
                          {new Date(i.data_inscricao).toLocaleDateString(
                            "pt-MZ"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                  {inscricoes.length === 0 && (
                    <p className="text-[10px] text-[#484848] uppercase tracking-widest">
                      Sem actividade ainda
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
