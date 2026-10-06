import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Servi Cam | Encuentra o Publica Servicios",
  description: "Plataforma inteligente para conectar clientes con prestadores de servicios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen pb-16">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
