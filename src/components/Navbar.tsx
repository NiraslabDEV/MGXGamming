"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-l-4 border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.1)] flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo-Mgx.jpeg"
            alt="MGX Gaming"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`font-headline uppercase tracking-tighter text-sm transition-colors ${
              pathname === "/"
                ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Tournaments
          </Link>
          <Link
            href="/#faq"
            className="text-neutral-400 hover:text-white transition-colors font-headline uppercase tracking-tighter text-sm"
          >
            FAQ
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/inscrever"
          className="bg-yellow-400 text-black px-6 py-2 font-headline font-bold uppercase tracking-tighter hover:bg-yellow-300 transition-all duration-300 active:scale-95 border-l-4 border-yellow-600 text-sm"
        >
          INSCREVER
        </Link>
      </div>
    </nav>
  );
}
