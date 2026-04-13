export default function Footer() {
  return (
    <footer className="bg-neutral-950 w-full">
      <div className="bg-gradient-to-r from-yellow-400 to-transparent h-1 w-full" />
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 text-sm tracking-wide">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-xl font-black text-yellow-400 font-headline uppercase tracking-tighter">
            MGX GAMING
          </span>
          <p className="text-neutral-500 max-w-xs text-center md:text-left uppercase text-xs">
            © 2024 MGX GAMING. URBAN KINETIC DIVISION. POWERING THE NEXT
            GENERATION OF AFRICAN ESPORTS.
          </p>
          <a
            href="/admin"
            className="text-[#484848] hover:text-[#ffe792] transition-all duration-200 text-[10px] uppercase tracking-[0.2em] font-label flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">lock</span>
            Admin
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="https://twitter.com"
            className="text-neutral-500 hover:text-yellow-400 transition-all duration-200 underline decoration-2 underline-offset-4 uppercase"
          >
            Twitter
          </a>
          <a
            href="https://discord.com"
            className="text-neutral-500 hover:text-yellow-400 transition-all duration-200 underline decoration-2 underline-offset-4 uppercase"
          >
            Discord
          </a>
          <a
            href="https://twitch.tv"
            className="text-neutral-500 hover:text-yellow-400 transition-all duration-200 underline decoration-2 underline-offset-4 uppercase"
          >
            Twitch
          </a>
          <a
            href="tel:846190531"
            className="text-yellow-400 font-bold transition-all duration-200"
          >
            Contact: 84 619 0531
          </a>
        </div>
      </div>
    </footer>
  );
}
