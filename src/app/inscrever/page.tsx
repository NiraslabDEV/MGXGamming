import Link from "next/link";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InscricaoForm from "./InscricaoForm";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inscrição — Campeonato FC25 | MGX Gaming",
  description:
    "Inscreve-te no Campeonato de FC25 da MGX Gaming. Preenche o formulário, paga 800mt via M-Pesa e garante a tua vaga.",
};

const CONFIG: Record<string, { vagas: number; preco: number; premio: string; data: string; titulo: string }> = {
  Fortnite: { vagas: 32, preco: 200, premio: "4.000mt", data: "Em Breve", titulo: "FORTNITE" },
  default:   { vagas: 16, preco: 800, premio: "4.000mt", data: "16 de Maio", titulo: "FC25" },
};

export default async function InscricaoPage(
  { searchParams }: { searchParams: Promise<{ jogo?: string }> }
) {
  const { jogo } = await searchParams;
  const cfg = CONFIG[jogo ?? ""] ?? CONFIG.default;
  const TOTAL_VAGAS = cfg.vagas;

  let vagasRestantes = TOTAL_VAGAS;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );
    const query = supabase
      .from("inscricoes")
      .select("*", { count: "exact", head: true })
      .neq("status", "rejeitado");
    if (jogo) query.eq("jogo", jogo);
    const { count } = await query;
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
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/torneio/fifa"
              className="inline-flex items-center gap-2 text-[#ababab] hover:text-[#ffe792] font-headline uppercase text-xs tracking-widest transition-colors mb-6"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Ver Detalhes do Torneio
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#ffe792] text-black px-3 py-1 font-label text-xs font-bold tracking-[0.2em] uppercase">
                VAGAS LIMITADAS
              </span>
              <div className="h-[2px] w-12 bg-[#ffe792]" />
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
              INSCRIÇÃO <span className="text-[#ffe792]">{cfg.titulo}</span>
            </h1>
            <p className="text-[#ababab] mt-4 text-lg max-w-xl">
              Preenche o formulário, faz o pagamento de{" "}
              <strong className="text-white">{cfg.preco}mt via M-Pesa</strong> e envia
              o comprovativo para garantir a tua vaga.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="text-[#ababab]">A carregar...</div>}>
                <InscricaoForm />
              </Suspense>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-5 space-y-8">
              {/* Event Summary */}
              <div className="bg-[#131313] p-8 border-l-4 border-[#ffe792]">
                <h3 className="font-headline font-black uppercase text-lg mb-6 text-[#ffe792]">
                  RESUMO DO EVENTO
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#484848]/30 pb-4">
                    <span className="text-[#ababab] text-sm uppercase font-headline font-bold tracking-widest">
                      Data
                    </span>
                    <span className="font-headline font-black text-lg">
                      {cfg.data}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#484848]/30 pb-4">
                    <span className="text-[#ababab] text-sm uppercase font-headline font-bold tracking-widest">
                      Inscrição
                    </span>
                    <span className="font-headline font-black text-lg">
                      {cfg.preco}mt
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#484848]/30 pb-4">
                    <span className="text-[#ababab] text-sm uppercase font-headline font-bold tracking-widest">
                      Prémio
                    </span>
                    <span className="font-headline font-black text-lg text-[#ffe792]">
                      {cfg.premio}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#484848]/30 pb-4">
                    <span className="text-[#ababab] text-sm uppercase font-headline font-bold tracking-widest">
                      Local
                    </span>
                    <span className="font-headline font-black text-sm text-right">
                      NelioGamingLounge, Super Marés
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ababab] text-sm uppercase font-headline font-bold tracking-widest">
                      Vagas
                    </span>
                    <span className="font-headline font-black text-lg">
                      {TOTAL_VAGAS} total
                    </span>
                  </div>
                </div>
              </div>

              {/* Vacancy Urgency */}
              <div className="bg-[#ffe792] p-8 text-black">
                <h4 className="font-headline font-black text-xl mb-4 uppercase">
                  {vagasRestantes === 0
                    ? "VAGAS ESGOTADAS"
                    : `APENAS ${vagasRestantes} VAGA${vagasRestantes !== 1 ? "S" : ""} RESTANTE${vagasRestantes !== 1 ? "S" : ""}`}
                </h4>
                <div className="h-3 bg-black/20 w-full mb-4">
                  <div className="h-full bg-black transition-all duration-500" style={{ width: `${percentagem}%` }} />
                </div>
                <p className="text-sm font-bold text-black/60 uppercase">
                  {percentagem}% das vagas já preenchidas
                </p>
                <p className="text-xs mt-2 text-black/50">
                  {vagasRestantes === 0
                    ? "Todas as vagas foram preenchidas!"
                    : "Inscreve-te agora antes que esgotem!"}
                </p>
              </div>

              {/* Help */}
              <div className="bg-[#131313] p-8 border-l-4 border-[#484848]">
                <h3 className="font-headline font-black uppercase text-sm mb-4 text-[#ababab]">
                  PRECISA DE AJUDA?
                </h3>
                <p className="text-[#ababab] text-sm mb-4">
                  Se tens dificuldade com o formulário, entra em contacto
                  diretamente pelo WhatsApp.
                </p>
                <a
                  href="https://wa.me/258846190531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#ffe792] font-headline font-bold uppercase text-sm hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">
                    chat
                  </span>
                  84 619 0531
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
