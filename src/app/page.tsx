import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <div>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="p-6 space-y-6  flex flex-col items-center justify-center bg-[url('/images/Credit_card.webp')] bg-cover bg-center min-h-[90vh] rounded-lg">
          <div className="backdrop-blur w-lg rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold color-foreground text-center">
              Bem-vindo ao Finanças Pessoais
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie suas finanças de forma fácil e eficiente.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
