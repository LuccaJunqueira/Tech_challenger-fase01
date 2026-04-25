# Página de Erro — Implementação

Guia para criar a página de erro do Next.js (`error.tsx`) que exibe quando ocorre algum problema na aplicação.

---

## 1. Estrutura

```
src/app/
├── error.tsx              ← página de erro (Next.js)
└── transactions/
    └── page.tsx
```

---

## 2. Página de Erro (src/app/error.tsx)

Esta página special do Next.js Renderiza automaticamente quando ocorre um erro não tratado. Ela inclui:
- Imagem de erro 404
- Botão para voltar às transações

```tsx
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
      {/* Imagem de erro */}
      <div className="relative w-[300px] h-[200px] mb-8">
        <Image
          src="/images/Erro 404.webp"
          alt="Algo deu errado"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Mensagem */}
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Algo deu errado
      </h2>
      
      <p className="text-muted-foreground mb-6">
        Tente novamente mais tarde.
      </p>

      {/* Botão para voltar */}
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
```

---

## 3. Quando usar error.tsx

| Situação | O que acontece |
|---------|--------------|
| Erro non tratados (crash) | Mostrar página de erro com opção de retry |
| Falha em componentes | Renderiza o error.tsx ao invés de tela branca |
|Erros de API | Pode ser tratado aqui |

---

## 4. Diferença entre error.tsx e página 404

| Arquivo | Rota | Quando usa |
|---------|-----|------------|
| `error.tsx` | Qualquer uma | Erro não tratado(exceção) |
| `[...]/page.tsx` | `...` (rota inválida) | Página não encontrada (404) |

---

## 5. Resumo

| Arquivo | Arquivo | Conteúdo |
|---------|--------|----------|
| `src/app/error.tsx` | Página de erro | Imagem + botões retry e voltar |

A página usa a imagem `/images/Erro 404.webp` que já está em `public/images/`.