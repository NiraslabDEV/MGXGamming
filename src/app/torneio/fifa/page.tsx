import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTracker from "@/components/PageTracker";
import TrackedLink from "@/components/TrackedLink";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Campeonato de FC26 — MGX Gaming | Maputo",
  description:
    "Detalhes do Campeonato de FC26 da MGX Gaming. 16 de Maio em Maputo. Prémio de 4.000mt. Inscrição: 800mt via M-Pesa.",
};

const TOTAL_VAGAS = 16;

export default async function TorneioFifa() {
  let vagasRestantes = TOTAL_VAGAS;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );
    const { count } = await supabase
      .from("inscricoes")
      .select("*", { count: "exact", head: true })
      .in("jogo", ["FC25", "FC26"])
      .neq("status", "rejeitado");
    vagasRestantes = Math.max(0, TOTAL_VAGAS - (count ?? 0));
  } catch {
    // fallback to default if DB unavailable
  }
  const preenchidas = TOTAL_VAGAS - vagasRestantes;
  const percentagem = Math.round((preenchidas / TOTAL_VAGAS) * 100);
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 kinetic-mesh">
        <PageTracker page="torneio_fc25" game="FC26" />
        {/* Hero Section */}
        <section className="relative w-full h-[716px] flex flex-col justify-end overflow-hidden mb-12">
          <div className="absolute inset-0 z-0">
            <Image
              src="/fc25-torneio.jpg"
              alt="Campeonato FC26 MGX Gaming — Nelio Gaming Lounge, Maputo"
              fill
              className="object-cover opacity-80"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent" />
          </div>
          <div className="relative z-10 px-6 md:px-12 pb-12 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#ffe792] text-black px-3 py-1 font-label text-xs font-bold tracking-[0.2em] uppercase">
                LIVE QUALIFIERS
              </span>
              <div className="h-[2px] w-12 bg-[#ffe792]" />
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
              CAMPEONATO DE{" "}
              <span className="text-[#ffe792] block md:inline">FC26</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-6">
              <div className="bg-[#1f1f1f] p-6 border-l-4 border-[#ffe792]">
                <p className="font-label text-xs text-[#ababab] uppercase tracking-widest mb-1">
                  DATE EVENT
                </p>
                <p className="font-headline text-2xl font-bold uppercase">
                  16 de MAIO
                </p>
              </div>
              <div className="bg-[#1f1f1f] p-6 border-l-4 border-[#ffe792]">
                <p className="font-label text-xs text-[#ababab] uppercase tracking-widest mb-1">
                  REGISTRATION
                </p>
                <p className="font-headline text-2xl font-bold uppercase">
                  800mt
                </p>
              </div>
              <div className="bg-[#1f1f1f] p-6 border-l-4 border-[#ffe792]">
                <p className="font-label text-xs text-[#ababab] uppercase tracking-widest mb-1">
                  GRAND PRIZE
                </p>
                <p className="font-headline text-2xl font-bold text-[#ffe792] uppercase">
                  4.000mt
                </p>
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm px-6 py-4 border-l-4 border-[#ffe792] inline-block">
              <CountdownTimer targetDate="2026-05-16T10:00:00" label="Faltam para o evento" />
            </div>
          </div>
        </section>

        {/* Official Poster */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[#ffe792]" />
            <span className="font-label text-xs text-[#ffe792] uppercase tracking-[0.2em] font-bold">Cartaz Oficial</span>
          </div>
          <div className="max-w-xs">
            <Image
              src="/poster-fc25.jpg"
              alt="Cartaz Oficial — Campeonato FC26 · 16 de Maio · MGX Gaming"
              width={600}
              height={850}
              className="w-full h-auto"
              sizes="300px"
            />
          </div>
        </div>

        {/* Content Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Registration Guide */}
          <div className="md:col-span-7 space-y-8">
            <div className="bg-[#131313] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-9xl">
                  stadium
                </span>
              </div>
              <h2 className="font-headline text-3xl font-black uppercase mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#ffe792]" />
                INSCRIÇÃO &amp; ACESSO
              </h2>
              <p className="text-[#ababab] mb-8 leading-relaxed">
                Prepare-se para entrar na arena. O processo de inscrição é
                simples e direto para garantir sua vaga no grid oficial de
                competição.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="font-headline text-4xl font-black text-[#ffe792]/30">
                    01
                  </div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xl mb-1">
                      DADOS DO ATLETA
                    </h3>
                    <p className="text-[#ababab]">
                      Prepare o seu nome completo e Gamertag oficial para o
                      registo.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="font-headline text-4xl font-black text-[#ffe792]/30">
                    02
                  </div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xl mb-1">
                      PAGAMENTO
                    </h3>
                    <p className="text-[#ababab]">
                      Efectue o pagamento de 800mt via M-Pesa ou E-mola para o
                      número{" "}
                      <span className="text-[#ffe792] font-bold">
                        84 619 0531
                      </span>
                      .
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="font-headline text-4xl font-black text-[#ffe792]/30">
                    03
                  </div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xl mb-1">
                      CONFIRMAÇÃO
                    </h3>
                    <p className="text-[#ababab]">
                      Envie o nome e o comprovante para o número{" "}
                      <span className="text-[#ffe792] font-bold">
                        84 619 0531
                      </span>{" "}
                      via WhatsApp ou use o formulário online.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <TrackedLink
                  href="/inscrever"
                  eventName="click_inscrever"
                  eventGame="FC26"
                  className="inline-flex items-center justify-center bg-[#ffd709] text-black font-headline font-black text-lg uppercase tracking-tight py-5 px-10 hover:bg-[#ffe792] transition-all duration-300 active:scale-95 flex-1"
                >
                  INSCREVER ONLINE
                  <span className="material-symbols-outlined ml-3">
                    edit_note
                  </span>
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

            {/* Rules & Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#262626] p-8">
                <h3 className="font-headline font-black uppercase text-xl mb-4 text-[#ffe792]">
                  REGRAS BÁSICAS
                </h3>
                <ul className="space-y-3 text-sm text-[#ababab]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">
                      check_circle
                    </span>
                    Tempo de Jogo: 6 Minutos por parte
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">
                      check_circle
                    </span>
                    Defesa Táctica Obrigatória
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">
                      check_circle
                    </span>
                    Pausas apenas com a bola fora
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">
                      check_circle
                    </span>
                    Proibido comportamento anti-desportivo
                  </li>
                </ul>
              </div>
              <div className="bg-[#262626] p-8">
                <h3 className="font-headline font-black uppercase text-xl mb-4 text-[#ffe792]">
                  FORMATO
                </h3>
                <ul className="space-y-3 text-sm text-[#ababab]">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">
                      grid_view
                    </span>
                    Fase de Grupos (Round Robin)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">
                      military_tech
                    </span>
                    Eliminatórias em Duas Mãos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffe792] text-sm">
                      trophy
                    </span>
                    Final em Jogo Único
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-5 space-y-8">
            {/* Location Card */}
            <div className="bg-[#1f1f1f] border-l-4 border-[#ffe792]">
              <div className="h-64 w-full bg-neutral-900 overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Centro+Comercial+Super+Mares+Costa+do+Sol+Maputo&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-8">
                <h3 className="font-headline font-black uppercase text-2xl mb-2">
                  LOCALIZAÇÃO
                </h3>
                <p className="text-[#ababab] mb-6 uppercase text-sm tracking-widest font-label">
                  NelioGamingLounge, Super Marés
                </p>
                <a
                  href="https://maps.google.com/maps?q=Centro+Comercial+Super+Mares+Costa+do+Sol+Maputo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#ffe792] font-bold hover:text-[#ffd709] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">location_on</span>
                  <span className="font-headline text-sm uppercase">
                    VER NO MAPA
                  </span>
                </a>
              </div>
            </div>

            {/* Partners */}
            <div className="bg-[#191919] p-8">
              <p className="font-label text-[10px] text-[#ababab] uppercase tracking-[0.3em] mb-6">
                OFFICIAL PARTNERS
              </p>
              <div className="grid grid-cols-2 gap-4 opacity-50 grayscale">
                <div className="h-12 bg-neutral-800 flex items-center justify-center font-black italic tracking-tighter text-sm">
                  PLAYSTATION
                </div>
                <div className="h-12 bg-neutral-800 flex items-center justify-center font-black italic tracking-tighter text-sm">
                  EA SPORTS
                </div>
                <div className="h-12 bg-neutral-800 flex items-center justify-center font-black italic tracking-tighter text-sm">
                  MONSTER
                </div>
                <div className="h-12 bg-neutral-800 flex items-center justify-center font-black italic tracking-tighter text-sm">
                  RAZER
                </div>
              </div>
            </div>

            {/* Vacancy Counter */}
            <div className="bg-[#ffe792] p-8 text-black">
              <h4 className="font-headline font-black text-xl mb-4 uppercase">
                CAPACIDADE LIMITADA
              </h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-4xl font-black font-headline">{TOTAL_VAGAS}</p>
                  <p className="text-xs font-bold uppercase tracking-widest">
                    VAGAS TOTAIS
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black font-headline">{vagasRestantes}</p>
                  <p className="text-xs font-bold uppercase tracking-widest">
                    RESTANTES
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-black/20 w-full">
                <div className="h-full bg-black" style={{ width: `${percentagem}%` }} />
              </div>
              <p className="text-xs mt-2 font-bold text-black/60 uppercase">
                {percentagem}% das vagas preenchidas
              </p>
            </div>

            {/* CTA */}
            <TrackedLink
              href="/inscrever"
              eventName="click_inscrever"
              eventGame="FC26"
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
