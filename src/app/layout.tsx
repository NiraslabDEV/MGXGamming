import type { Metadata } from "next";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "MGX Gaming — Torneios de FC26 & Fortnite | Maputo",
  description:
    "Inscreve-te nos torneios de FC26 e Fortnite da MGX Gaming em Maputo. Prémios até 4.000mt. Inscrição via M-Pesa.",
  openGraph: {
    title: "MGX Gaming — Torneios FC26 & Fortnite | Maputo",
    description: "Inscreve-te nos torneios de FC26 e Fortnite da MGX Gaming em Maputo. Prémios até 4.000mt.",
    siteName: "MGX Gaming",
    locale: "pt_MZ",
    type: "website",
    images: [{ url: "/Logo-Mgx.jpeg", width: 1254, height: 1254, alt: "MGX Gaming" }],
  },
  twitter: {
    card: "summary",
    title: "MGX Gaming — Torneios FC26 & Fortnite | Maputo",
    description: "Inscreve-te nos torneios de FC26 e Fortnite da MGX Gaming em Maputo. Prémios até 4.000mt.",
    images: ["/Logo-Mgx.jpeg"],
  },
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
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
