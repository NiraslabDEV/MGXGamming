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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0e0e0e] text-white min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
