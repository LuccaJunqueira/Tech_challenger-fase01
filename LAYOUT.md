# Layout — Configuração Global

Guia para configurar o layout raiz da aplicação ByteBank.

## 1. Estrutura

```
src/app/
└── layout.tsx    ← layout raiz (envolve todas as páginas)
```

## 2. O que este arquivo faz

- Carrega as fontes Sora e JetBrains Mono via next/font
- Envolve toda a aplicação com o TransactionsProvider
- Renderiza a Sidebar em todas as páginas
- Define o layout base: sidebar fixa à esquerda, conteúdo à direita

## 3. src/app/layout.tsx

```tsx
import { Sora, JetBrains_Mono } from 'next/font/google';
import { TransactionsProvider } from '@/context/transactions-context';
import { Sidebar } from '@/components/layout/sidebar';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'ByteBank',
  description: 'Gerencie suas transações financeiras',
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
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </TransactionsProvider>
      </body>
    </html>
  );
}
```

## 4. Por que cada decisão

| Decisão | Motivo |
|--------|-------|
| next/font em vez de @import no CSS | Carrega fontes em build time, sem flash de fonte |
| TransactionsProvider na raiz | Todas as páginas precisam acessar o estado de transações |
| Sidebar dentro do Provider | Permite que a Sidebar acesse dados de transações futuramente |
| h-screen overflow-hidden no wrapper | Garante que o layout ocupe toda a tela sem scroll duplo |
| overflow-y-auto no main | Só o conteúdo principal faz scroll, a sidebar permanece fixa |

## 5. Estrutura visual resultante

```
┌─────────────────────────────────────────┐
│  Sidebar (w-64, fixa)  │  main (flex-1) │
│                        │                │
│  • Dashboard           │  {children}    │
│  • Transações          │                │
│  • Nova transação      │  (scroll aqui) │
│                        │                │
│  TA  Thamiris A.       │                │
└─────────────────────────────────────────┘
```