import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ListaEsperaForm from "@/components/ListaEsperaForm";
import PageTracker from "@/components/PageTracker";
import TrackedLink from "@/components/TrackedLink";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 kinetic-mesh">
        <PageTracker page="home" />
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden px-6 lg:px-24 border-l-4 border-[#ffe792] mt-4">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-homepage.png"
              alt="Gamer MGX Gaming — Maputo"
              fill
              className="object-cover opacity-40 mix-blend-luminosity"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-block bg-[#ffe792] text-black px-3 py-1 font-headline font-black text-xs tracking-[0.2em] mb-6 uppercase">
              MOZAMBIQUE GAMING EXPERIENCE
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter uppercase mb-8">
              Torna-te Gamer <br />
              Pro em <br />
              <span className="text-[#ffe792]">Moçambique</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <TrackedLink
                href="/torneio/fifa"
                eventName="click_hero_fc25"
                eventGame="FC25"
                className="px-8 py-5 bg-[#ffe792] text-black font-headline font-black text-lg tracking-tight uppercase transition-all hover:translate-x-2 active:scale-95 flex items-center gap-3"
              >
                VER TORNEIO FC25
                <span className="material-symbols-outlined font-bold">
                  arrow_forward
                </span>
              </TrackedLink>
              <TrackedLink
                href="/torneio/fortnite"
                eventName="click_hero_fortnite"
                eventGame="Fortnite"
                className="px-8 py-5 border border-[#484848] text-white font-headline font-bold text-lg tracking-tight uppercase hover:bg-[#262626] transition-all"
              >
                VER FORTNITE
              </TrackedLink>
            </div>
          </div>
        </section>

        {/* Match Ticker */}
        <div className="bg-black py-4 flex overflow-hidden whitespace-nowrap border-y border-[#484848]/30">
          <div className="flex gap-12 animate-marquee font-headline font-black text-[#ffe792]/40 uppercase tracking-widest text-sm italic">
            <span>
              FC25 LIVE • TEKKEN WORLD TOUR RULES • NELIO GAMING LOUNGE OPEN • 84
              619 0531 • RACING COMMUNITY • FC25 LIVE • TEKKEN WORLD TOUR
              RULES • NELIO GAMING LOUNGE OPEN • 84 619 0531 • RACING COMMUNITY •
            </span>
            <span>
              FC25 LIVE • TEKKEN WORLD TOUR RULES • NELIO GAMING LOUNGE OPEN • 84
              619 0531 • RACING COMMUNITY • FC25 LIVE • TEKKEN WORLD TOUR
              RULES • NELIO GAMING LOUNGE OPEN • 84 619 0531 • RACING COMMUNITY •
            </span>
          </div>
        </div>

        {/* Tournaments Grid */}
        <section className="py-24 px-6 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-1 w-12 bg-[#ffe792]" />
                <span className="font-headline font-black text-[#ffe792] tracking-widest text-sm uppercase">
                  Next Battles
                </span>
              </div>
              <h2 className="text-5xl font-headline font-black uppercase tracking-tighter">
                Eventos Ativos
              </h2>
            </div>
            <div className="text-[#ababab] max-w-sm text-right font-medium">
              Compete com os melhores jogadores de Moçambique e ganha prémios
              em numerário todas as semanas.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FIFA Card */}
            <div className="group relative bg-[#131313] p-1 border-l-4 border-[#ffe792] hover:-translate-y-2 transition-all duration-300">
              <div className="relative aspect-video overflow-hidden mb-6">
                <Image
                  src="/fc25-card.png"
                  alt="Campeonato FC25 — MGX Gaming"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-[#ffe792] text-black px-3 py-1 font-headline font-bold text-xs uppercase">
                  ACTIVE NOW
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-headline font-black uppercase">
                    Campeonato de FC25
                  </h3>
                  <span className="text-[#ffe792] font-headline font-bold text-sm">
                    16 MAIO
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#1f1f1f] p-4">
                    <span className="block text-[10px] text-[#ababab] font-headline font-black uppercase tracking-widest mb-1">
                      Entry Fee
                    </span>
                    <span className="text-xl font-headline font-bold">
                      800mt
                    </span>
                  </div>
                  <div className="bg-[#1f1f1f] p-4">
                    <span className="block text-[10px] text-[#ababab] font-headline font-black uppercase tracking-widest mb-1">
                      Grand Prize
                    </span>
                    <span className="text-xl font-headline font-bold text-[#ffe792]">
                      4.000mt
                    </span>
                  </div>
                </div>
                <TrackedLink
                  href="/torneio/fifa"
                  eventName="click_card_fc25"
                  eventGame="FC25"
                  className="block w-full py-4 bg-[#ffd709] text-black font-headline font-black uppercase tracking-tight hover:bg-[#ffe792] transition-colors text-center"
                >
                  Ver Detalhes
                </TrackedLink>
              </div>
            </div>

            {/* Fortnite Card */}
            <div className="group relative bg-[#131313] p-1 border-l-4 border-[#ffe792] hover:-translate-y-2 transition-all duration-300">
              <div className="relative aspect-video overflow-hidden mb-6">
                <Image
                  src="/fortnite-card.png"
                  alt="Fortnite Reload Solo — MGX Gaming 23 de Maio"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-[#ffe792] text-black px-3 py-1 font-headline font-bold text-xs uppercase">
                  23 MAIO
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-headline font-black uppercase">
                    Fortnite
                  </h3>
                  <span className="text-[#ffe792] font-headline font-bold text-sm">
                    RELOAD SOLO
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#1f1f1f] p-4">
                    <span className="block text-[10px] text-[#ababab] font-headline font-black uppercase tracking-widest mb-1">Entry Fee</span>
                    <span className="text-xl font-headline font-bold">200mt</span>
                  </div>
                  <div className="bg-[#1f1f1f] p-4">
                    <span className="block text-[10px] text-[#ababab] font-headline font-black uppercase tracking-widest mb-1">Vagas</span>
                    <span className="text-xl font-headline font-bold text-[#ffe792]">13 equipas</span>
                  </div>
                </div>
                <TrackedLink
                  href="/torneio/fortnite"
                  eventName="click_card_fortnite"
                  eventGame="Fortnite"
                  className="block w-full py-4 bg-[#ffd709] text-black font-headline font-black uppercase tracking-tight hover:bg-[#ffe792] transition-colors text-center"
                >
                  Ver Detalhes
                </TrackedLink>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-[#0e0e0e] border border-[#262626] border-l-4 border-l-[#ffe792] flex flex-col justify-between overflow-hidden">
              <div className="p-8">
                <h3 className="text-3xl font-headline font-black text-white uppercase leading-none mb-2">
                  Merch MGX
                </h3>
                <p className="text-[#ababab] text-sm mb-6 uppercase tracking-widest font-label">
                  Mozambique Gaming Experience
                </p>
              </div>
              <div className="grid grid-cols-2 gap-0">
                <div className="relative overflow-hidden aspect-square bg-[#131313]">
                  <Image
                    src="/mgx-tshirt.jpg"
                    alt="T-shirt MGX Gaming"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-[10px] font-headline font-black uppercase tracking-widest">T-Shirt</p>
                  </div>
                </div>
                <div className="relative overflow-hidden aspect-square bg-[#131313]">
                  <Image
                    src="/mgx-mouse.jpg"
                    alt="Mouse MGX Gaming"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-[10px] font-headline font-black uppercase tracking-widest">Mouse</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <a
                  href="https://wa.me/258846190531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#ffe792] text-black font-headline font-black uppercase text-sm tracking-tight hover:bg-[#ffd709] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">shopping_bag</span>
                  Encomendar via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Official Posters */}
        <section className="py-16 px-6 lg:px-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-12 bg-[#ffe792]" />
            <span className="font-headline font-black text-[#ffe792] tracking-widest text-sm uppercase">
              Cartazes Oficiais
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <TrackedLink href="/torneio/fifa" eventName="click_poster_fc25" eventGame="FC25" className="block group">
              <Image
                src="/poster-fc25.jpg"
                alt="Poster Oficial — Campeonato FC25 · 16 de Maio · MGX Gaming"
                width={600}
                height={850}
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 300px"
              />
            </TrackedLink>
            <TrackedLink href="/torneio/fortnite" eventName="click_poster_fortnite" eventGame="Fortnite" className="block group">
              <Image
                src="/poster-fortnite.jpg"
                alt="Poster Oficial — Fortnite Reload Solo · 23 de Maio · MGX Gaming"
                width={600}
                height={850}
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 300px"
              />
            </TrackedLink>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-24 px-6 lg:px-24 bg-[#131313] relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <h2 className="text-6xl font-headline font-black uppercase tracking-tighter mb-12">
                Informação{" "}
                <span className="text-[#ffe792] italic">&amp;</span> FAQ
              </h2>
              <div className="space-y-6">
                <div className="bg-[#1f1f1f] p-8 border-l-4 border-[#ffe792]">
                  <h4 className="text-xl font-headline font-black uppercase mb-4 flex items-center gap-4">
                    <span className="text-[#ffe792] text-2xl">01.</span>
                    Onde se localiza a MGX Gaming?
                  </h4>
                  <p className="text-[#ababab] max-w-2xl">
                    Somos uma plataforma de gaming online. Atualmente,
                    estabelecemos uma parceria estratégica com o Nelio Gaming
                    Lounge para a realização de campeonatos presenciais. O
                    espaço está localizado no Centro Comercial Super Marés, na
                    Costa do Sol, em Maputo.
                  </p>
                </div>
                <div className="bg-[#1f1f1f] p-8 border-l-4 border-[#484848]">
                  <h4 className="text-xl font-headline font-black uppercase mb-4 flex items-center gap-4">
                    <span className="text-[#484848] text-2xl">02.</span>
                    Como participar nos torneios?
                  </h4>
                  <p className="text-[#ababab] max-w-2xl">
                    Preenche o formulário de inscrição, efectua o pagamento de
                    800mt via M-Pesa ou E-mola para o número{" "}
                    <span className="text-[#ffe792] font-bold">84 619 0531</span>{" "}
                    e faz upload do comprovativo. A confirmação chega via
                    WhatsApp.
                  </p>
                </div>
                <div className="bg-[#1f1f1f] p-8 border-l-4 border-[#484848]">
                  <h4 className="text-xl font-headline font-black uppercase mb-4 flex items-center gap-4">
                    <span className="text-[#484848] text-2xl">03.</span>
                    Qual é o formato do torneio?
                  </h4>
                  <p className="text-[#ababab] max-w-2xl">
                    Chave de eliminação dupla. Um jogador só é eliminado
                    após perder duas partidas. Todos começam na chave superior;
                    ao perder, caem para uma chave de inferior. O campeão da
                    chave superior enfrenta o da inferior na grande final.
                    Limite máximo de 16 jogadores. Tempo de jogo: 4 minutos
                    por parte.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 bg-[#262626] p-8 relative overflow-hidden flex flex-col justify-end min-h-[400px]">
              <div className="absolute inset-0 opacity-20">
                <iframe
                  src="https://maps.google.com/maps?q=Centro+Comercial+Super+Mares+Costa+do+Sol+Maputo&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="relative z-10">
                <div className="bg-[#ffe792] p-2 inline-block mb-4">
                  <span className="material-symbols-outlined text-black">
                    location_on
                  </span>
                </div>
                <h3 className="text-3xl font-headline font-black uppercase mb-2">
                  NELIO GAMING LOUNGE
                </h3>
                <p className="text-[#ababab] mb-6">
                  Visita-nos e sente a energia do gaming lounge ao vivo.
                </p>
                <a
                  href="https://maps.google.com/maps?q=Centro+Comercial+Super+Mares+Costa+do+Sol+Maputo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 border-2 border-[#ffe792] text-[#ffe792] font-headline font-black uppercase tracking-widest hover:bg-[#ffe792] hover:text-black transition-all text-center"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto bg-[#ffe792] py-16 px-6 md:px-24 text-center">
            <h2 className="text-5xl md:text-7xl font-headline font-black text-black uppercase tracking-tighter mb-8 leading-none">
              Pronto para Dominar o Ranking?
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <TrackedLink
                href="/inscrever"
                eventName="click_cta_inscrever"
                className="px-12 py-5 bg-black text-white font-headline font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4"
              >
                INSCREVER AGORA
                <span className="material-symbols-outlined">
                  sports_esports
                </span>
              </TrackedLink>
              <a
                href="https://wa.me/258846190531"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-green-600 text-white font-headline font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4"
              >
                WHATSAPP COMMUNITY
                <span className="material-symbols-outlined">forum</span>
              </a>
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section className="py-24 px-6 border-t-4 border-[#ffe792] bg-[#131313]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="h-1 w-12 bg-[#ffe792]" />
              <span className="font-headline font-black text-[#ffe792] tracking-widest text-sm uppercase">
                Stay Ahead
              </span>
              <div className="h-1 w-12 bg-[#ffe792]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter mb-6">
              Lista de Espera para Próximos Eventos
            </h2>
            <p className="text-[#ababab] mb-12 text-lg max-w-2xl mx-auto">
              Sê o primeiro a saber quando abrirmos novas vagas para torneios e
              eventos exclusivos. Não percas o teu lugar na arena.
            </p>
            <div className="max-w-md mx-auto">
              <ListaEsperaForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
