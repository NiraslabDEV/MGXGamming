"use client";

interface AnalyticsEvent {
  event_name: string;
  game: string | null;
  created_at: string;
}

interface Inscricao {
  status: string;
  jogo: string;
}

function count(events: AnalyticsEvent[], name: string, game?: string) {
  return events.filter(
    (e) =>
      e.event_name === name &&
      (game === undefined || e.game === game || (!game && true))
  ).length;
}

function countPage(events: AnalyticsEvent[], page: string) {
  return events.filter(
    (e) => e.event_name === "page_view" && (e as unknown as { page?: string }).page === page
  ).length;
}

function pct(val: number, total: number) {
  if (!total) return 0;
  return Math.round((val / total) * 100);
}

function FunnelStep({
  label,
  value,
  top,
  color = "#ffe792",
  sub,
}: {
  label: string;
  value: number;
  top: number;
  color?: string;
  sub?: string;
}) {
  const p = pct(value, top);
  return (
    <div className="flex items-center gap-4">
      <div className="w-40 shrink-0">
        <p className="text-xs font-label uppercase tracking-widest text-[#ababab] truncate">{label}</p>
        {sub && <p className="text-[10px] text-[#484848] uppercase tracking-wider">{sub}</p>}
      </div>
      <div className="flex-1 h-8 bg-[#1f1f1f] relative overflow-hidden">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${p}%`, backgroundColor: color, opacity: 0.85 }}
        />
        <span className="absolute inset-0 flex items-center px-3 text-xs font-headline font-black">
          {value.toLocaleString()}
        </span>
      </div>
      <div className="w-12 text-right text-sm font-headline font-black text-[#ababab]">
        {p}%
      </div>
    </div>
  );
}

export default function AnalyticsTab({
  events,
  inscricoes,
}: {
  events: AnalyticsEvent[];
  inscricoes: Inscricao[];
}) {
  // Funnel counts — full
  const eventsWithPage = events as unknown as (AnalyticsEvent & { page?: string })[];
  const homeViews      = eventsWithPage.filter((e) => e.event_name === "page_view" && e.page === "home").length;
  const torneioViews   = eventsWithPage.filter((e) => e.event_name === "page_view" && (e.page === "torneio_fc25" || e.page === "torneio_fortnite")).length;
  const clickInscrever = events.filter((e) => e.event_name === "click_inscrever").length;
  const inscreverViews = eventsWithPage.filter((e) => e.event_name === "page_view" && e.page === "inscrever").length;
  const formSubmits    = events.filter((e) => e.event_name === "form_submit").length;
  const aprovados      = inscricoes.filter((i) => i.status === "confirmado").length;

  const top = homeViews || 1;

  // Per-game
  const fc25Torneio   = eventsWithPage.filter((e) => e.event_name === "page_view" && e.page === "torneio_fc25").length;
  const fnTorneio     = eventsWithPage.filter((e) => e.event_name === "page_view" && e.page === "torneio_fortnite").length;
  const fc25Inscrever = events.filter((e) => e.event_name === "click_inscrever" && e.game === "FC25").length;
  const fnInscrever   = events.filter((e) => e.event_name === "click_inscrever" && e.game === "Fortnite").length;
  const fc25Submit    = events.filter((e) => e.event_name === "form_submit" && e.game === "FC25").length;
  const fnSubmit      = events.filter((e) => e.event_name === "form_submit" && e.game === "Fortnite").length;
  const fc25Aprov     = inscricoes.filter((i) => i.status === "confirmado" && i.jogo === "FC25").length;
  const fnAprov       = inscricoes.filter((i) => i.status === "confirmado" && i.jogo === "Fortnite").length;

  // Button clicks breakdown
  const heroFc25    = events.filter((e) => e.event_name === "click_hero_fc25").length;
  const heroFn      = events.filter((e) => e.event_name === "click_hero_fortnite").length;
  const cardFc25    = events.filter((e) => e.event_name === "click_card_fc25").length;
  const cardFn      = events.filter((e) => e.event_name === "click_card_fortnite").length;
  const ctaInscrever = events.filter((e) => e.event_name === "click_cta_inscrever").length;

  const totalEvents = events.length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-l-4 border-[#ffe792] pl-6 py-2">
        <h1 className="text-4xl font-headline font-black uppercase tracking-tighter">Analytics</h1>
        <p className="text-[#ababab] font-label uppercase text-xs tracking-[0.2em] mt-1">
          Funil de Conversão / {totalEvents.toLocaleString()} eventos registados
        </p>
      </div>

      {/* Funnel */}
      <div className="bg-[#131313] p-8">
        <h2 className="font-headline font-black uppercase text-lg mb-2 flex items-center gap-3">
          <span className="w-2 h-6 bg-[#ffe792]" />
          FUNIL COMPLETO
        </h2>
        <p className="text-[#ababab] text-xs uppercase tracking-widest mb-8 font-label">
          Todos os jogos · percentagem relativa à homepage
        </p>
        <div className="space-y-4">
          <FunnelStep label="Visitas Homepage"    value={homeViews}      top={top} />
          <FunnelStep label="Viu Torneio"         value={torneioViews}   top={top} sub="qualquer jogo" />
          <FunnelStep label="Clicou Inscrever"    value={clickInscrever} top={top} color="#4ade80" />
          <FunnelStep label="Abriu Formulário"    value={inscreverViews} top={top} color="#4ade80" />
          <FunnelStep label="Submeteu Inscrição"  value={formSubmits}    top={top} color="#facc15" />
          <FunnelStep label="Pagamento Aprovado"  value={aprovados}      top={top} color="#22c55e" sub="admin confirmou" />
        </div>
      </div>

      {/* Per-game breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FC25 */}
        <div className="bg-[#131313] p-8">
          <h3 className="font-headline font-black uppercase text-base mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffe792] text-base">sports_soccer</span>
            FC25
          </h3>
          <div className="space-y-3">
            <FunnelStep label="Viu Torneio"        value={fc25Torneio}   top={homeViews || 1} />
            <FunnelStep label="Clicou Inscrever"   value={fc25Inscrever} top={homeViews || 1} color="#4ade80" />
            <FunnelStep label="Submeteu Formulário" value={fc25Submit}   top={homeViews || 1} color="#facc15" />
            <FunnelStep label="Aprovados"          value={fc25Aprov}     top={homeViews || 1} color="#22c55e" />
          </div>
        </div>

        {/* Fortnite */}
        <div className="bg-[#131313] p-8">
          <h3 className="font-headline font-black uppercase text-base mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffe792] text-base">sports_esports</span>
            Fortnite
          </h3>
          <div className="space-y-3">
            <FunnelStep label="Viu Torneio"        value={fnTorneio}   top={homeViews || 1} />
            <FunnelStep label="Clicou Inscrever"   value={fnInscrever} top={homeViews || 1} color="#4ade80" />
            <FunnelStep label="Submeteu Formulário" value={fnSubmit}   top={homeViews || 1} color="#facc15" />
            <FunnelStep label="Aprovados"          value={fnAprov}     top={homeViews || 1} color="#22c55e" />
          </div>
        </div>
      </div>

      {/* Button clicks breakdown */}
      <div className="bg-[#131313] p-8">
        <h2 className="font-headline font-black uppercase text-lg mb-6 flex items-center gap-3">
          <span className="w-2 h-6 bg-[#ffe792]" />
          CLIQUES POR BOTÃO
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Hero → FC25",      value: heroFc25,     icon: "sports_soccer" },
            { label: "Hero → Fortnite",  value: heroFn,       icon: "sports_esports" },
            { label: "Card FC25",        value: cardFc25,     icon: "smart_button" },
            { label: "Card Fortnite",    value: cardFn,       icon: "smart_button" },
            { label: "CTA Inscrever",    value: ctaInscrever, icon: "ads_click" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-[#1f1f1f] p-5 border-l-2 border-[#ffe792]/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#ffe792]/60 text-sm">{icon}</span>
                <p className="text-[10px] text-[#ababab] uppercase font-label tracking-widest">{label}</p>
              </div>
              <p className="text-3xl font-headline font-black">{value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
