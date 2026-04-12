import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MGX Gaming — Campeonato de FIFA 24 | Maputo",
  description:
    "Inscreve-te no Campeonato de FIFA 24 da MGX Gaming em Maputo. Prémio de 4.000mt. 800mt de inscrição via M-Pesa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark h-full">
      <body className="bg-[#0e0e0e] text-white font-body min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
