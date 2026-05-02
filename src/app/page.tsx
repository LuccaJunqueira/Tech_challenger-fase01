import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="p-6 space-y-6  flex flex-col items-center justify-center bg-[url('/images/Credit_card.webp')] bg-cover bg-center min-h-[90vh] rounded-lg">
          <div className="
          glass
          rounded-modal
          p-10
          flex flex-col items-center gap-4
          text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Bem-vindo ao ByteBank
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas finanças de forma fácil e eficiente.
          </p>
          <Link href="/transactions">
            <Button variant="primary">Comece agora</Button>
          </Link>
        </div>
        </div>
      </main>
    </div>
  );  
}
