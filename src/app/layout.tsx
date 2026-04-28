import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";

import { Sidebar } from "@/components/layout/sidebar";
import { TransactionsProvider } from "@/context/transactions-context";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ByteBank",
  description: "Gerencie suas transações financeiras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body>
        <TransactionsProvider>
          <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </TransactionsProvider>
      </body>
    </html>
  );
}
