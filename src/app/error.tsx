'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative w-[300px] h-[200px] mb-8">
        <Image
          src="/images/Erro 404.webp"
          alt="Algo deu errado"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-2">
        Algo deu errado
      </h2>
      
      <p className="text-muted-foreground mb-6">
        Tente novamente mais tarde.
      </p>

      <button
        onClick={() => reset()}
        className="
          px-6 py-3
          bg-gradient-to-r from-primary to-secondary
          text-primary-foreground
          font-semibold rounded-lg
          hover:opacity-90 transition-opacity
          mb-4
        "
      >
        Tentar novamente
      </button>

      <Link
        href="/transactions"
        className="
          text-sm text-muted-foreground
          hover:text-foreground transition-colors
        "
      >
        Voltar ao início
      </Link>
    </div>
  );
}