import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTracker from "@/components/PageTracker";
import TrackedLink from "@/components/TrackedLink";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Campeonato de Fortnite — MGX Gaming | Maputo",
  description:
    "Detalhes do Campeonato de Fortnite da MGX Gaming. Maputo. Prémio de 4.000mt. Inscrição: 800mt via M-Pesa.",
};

const TOTAL_VAGAS = 39;

export default async function TorneioFortnite() {
  let vagasRestantes = TOTAL_VAGAS;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );
    const { count } = await supabase
      .from("inscricoes")
      .select("*", { count: "exact", head: true })
      .eq("jogo", "Fortnite")
      .neq("status", "rejeitado");
    vagasRestantes = Math.max(0, TOTAL_VAGAS - (count ?? 0));
  } catch {
    // fallback
  }
  const preenchidas = TOTAL_VAGAS - vagasRestantes;
  const percentagem = Math.round((preenchidas / TOTAL_VAGAS) * 100);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 kinetic-mesh">
        <PageTracker page="torneio_fortnite" game="Fortnite" />
        {/* Hero Section */}
        <section className="relative w-full h-[716px] flex flex-col justify-end overflow-hidden mb-12">
          <div className="absolute inset-0 z-0">
            <img
              src="/fortnite-torneio.jpg"
              alt="MGX Gaming — Fortnite Torneio 23 de Maio"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent" />
          </div>
          <div className="relative z-10 px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#ffe792] text-black px-3 py-1 font-label text-xs font-bold tracking-[0.2em] uppercase">
                BATTLE ROYALE
              </span>
              <div className="h-[2px] w-12 bg-[#ffe792]" />
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
              CAMPEONATO DE{" "}
              <span className="text-[#ffe792] block md:inline">FORTNITE</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <div className="bg-[#1f1f1f] p-6 border-l-4 border-[#ffe792]">
                <p className="font-label text-xs text-[#ababab] uppercase tracking-widest mb-1">DATE EVENT</p>
                <p className="font-headline text-2xl font-bold uppercase">23 de MAIO</p>
              </div>
              <div className="bg-[#1f1f1f] p-6 border-l-4 border-[#ffe792]">
                <p className="font-label text-xs text-[#ababab] uppercase tracking-widest mb-1">REGISTRATION</p>
                <p className="font-headline text-2xl font-bold uppercase">200mt</p>
              </div>
              <div className="bg-[#1f1f1f] p-6 border-l-4 border-[#ffe792]">
                <p className="font-label text-xs text-[#ababab] uppercase tracking-widest mb-1">GRAND PRIZE</p>
                <p className="font-headline text-2xl font-bold text-[#ffe792] uppercase">4.000mt</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Registration Guide */}
          <div className="md:col-span-7 space-y-8">
            <div className="bg-[#131313] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-9xl">sports_esports</span>
              </div>
              <h2 className="font-headline text-3xl font-black uppercase mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ffe792]" />
                INSCRIÇÃO &amp; ACESSO
              </h2>
              <p className="text-[#ababab] mb-8 leading-relaxed">
                <span className="text-[#ffe792] font-bold">Só os melhores sobrevivem.</span> Inscreve-te no torneio de Fortnite da MGX Gaming — Modo Reload Solo, 4 partidas, 13 vagas. Mostre a tua habilidade, faz história, sê lendário.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="font-headline text-4xl font-black text-[#ffe792]/30">01</div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xl mb-1">DADOS DO ATLETA</h3>
                    <p className="text-[#ababab]">Prepara o teu nome completo e Gamertag oficial para o registo.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="font-headline text-4xl font-black text-[#ffe792]/30">02</div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xl mb-1">PAGAMENTO</h3>
                    <p className="text-[#ababab]">
                      Efectua o pagamento de <span className="text-[#ffe792] font-bold">200mt</span> via M-Pesa ou E-mola para o número{" "}
                      <span className="text-[#ffe792] font-bold">84 619 0531</span>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="font-headline text-4xl font-black text-[#ffe792]/30">03</div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xl mb-1">CONFIRMAÇÃO</h3>
                    <p className="text-[#ababab]">
                      Envia o comprovativo pelo formulário online ou via WhatsApp{" "}
                      <span className="text-[#ffe792] font-bold">84 619 0531</span>.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <TrackedLink
                  href="/inscrever?jogo=Fortnite"
                  eventName="click_inscrever"
                  eventGame="Fortnite"
                  className="inline-flex items-center justify-center bg-[#ffd709] text-black font-headline font-black text-lg uppercase tracking-tight py-5 px-10 hover:bg-[#ffe792] transition-all duration-300 active:scale-95 flex-1"
                >
                  INSCREVER ONLINE
                  <span className="material-symbols-outlined ml-3">edit_note</span>
                </TrackedLink>
                <a
                  href="https://wa.me/258846190531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-600 text-white font-headline font-black text-lg uppercase tracking-tight py-5 px-10 hover:bg-green-500 transition-all duration-300 active:scale-95 flex-1"
                >
                  VIA WHATSAPP
                  <span className="material-symbols-outlined ml-3">send</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#262626] p-8">
                <h3 className="font-headline font-black uppercase text-xl mb-4 text-[#ffe792]">REGRAS BÁSICAS</h3>
                <ul className="space-y-3 text-sm text-[#ababab]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">check_circle</span>
                    Modo: Reload Solo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">check_circle</span>
                    Pontuação por eliminações e colocação
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">check_circle</span>
                    Proibido comportamento anti-desportivo
                  </li>
                </ul>
              </div>
              <div className="bg-[#262626] p-8">
                <h3 className="font-headline font-black uppercase text-xl mb-4 text-[#ffe792]">FORMATO</h3>
                <ul className="space-y-3 text-sm text-[#ababab]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">group</span>
                    13 equipas — 39 jogadores no total
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">trophy</span>
                    Inscrição: 200 MT por jogador
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">military_tech</span>
                    1º Lugar — 1.950 MT
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">military_tech</span>
                    2º Lugar — 1.170 MT
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">military_tech</span>
                    3º Lugar — 780 MT
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-5 space-y-8">
            <div className="bg-[#1f1f1f] border-l-4 border-[#ffe792] p-8">
              <h3 className="font-headline font-black uppercase text-2xl mb-2">LOCALIZAÇÃO</h3>
              <p className="text-[#ababab] mb-6 uppercase text-sm tracking-widest font-label">
                Arena MGX - Maputo, Moçambique
              </p>
              <div className="flex items-center gap-2 text-[#ffe792] font-bold">
                <span className="material-symbols-outlined">location_on</span>
                <span className="font-headline text-sm uppercase">Nelio Gaming Lounge, Super Marés</span>
              </div>
            </div>

            {/* Vacancy Counter */}
            <div className="bg-[#ffe792] p-8 text-black">
              <h4 className="font-headline font-black text-xl mb-4 uppercase">CAPACIDADE LIMITADA</h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-4xl font-black font-headline">{TOTAL_VAGAS}</p>
                  <p className="text-xs font-bold uppercase tracking-widest">VAGAS TOTAIS</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black font-headline">{vagasRestantes}</p>
                  <p className="text-xs font-bold uppercase tracking-widest">RESTANTES</p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-black/20 w-full">
                <div className="h-full bg-black" style={{ width: `${percentagem}%` }} />
              </div>
              <p className="text-xs mt-2 font-bold text-black/60 uppercase">
                {percentagem}% das vagas preenchidas
              </p>
            </div>

            <TrackedLink
              href="/inscrever?jogo=Fortnite"
              eventName="click_inscrever"
              eventGame="Fortnite"
              className="block w-full py-6 bg-[#ffd709] text-black font-headline font-black text-xl uppercase tracking-tight hover:bg-[#ffe792] transition-all duration-300 active:scale-95 text-center"
            >
              GARANTIR MINHA VAGA →
            </TrackedLink>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
