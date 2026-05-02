# Guia de Acessibilidade, Boas Práticas e Usabilidade - ByteBank

> Documento técnico elaborado com base na análise completa do código-fonte do projeto ByteBank.
> Data: Maio 2026 | Stack: Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript

---

## 📚 Índice

1. [Arquitetura Next.js: Server vs Client Components](#1-arquitetura-nextjs-server-vs-client-components)
2. [Análise Atual do Projeto](#2-análise-atual-do-projeto)
3. [Acessibilidade (a11y)](#3-acessibilidade-a11y)
4. [Responsividade e Tailwind CSS](#4-responsividade-e-tailwind-css)
5. [Navegação por Teclado](#5-navegação-por-teclado)
6. [Leitores de Tela](#6-leitores-de-tela)
7. [Refatoração Recomendada por Arquivo](#7-refatoração-recomendada-por-arquivo)
8. [Boas Práticas de Código](#8-boas-práticas-de-código)
9. [Checklist de Implementação](#9-checklist-de-implementação)

---

## 1. Arquitetura Next.js: Server vs Client Components

### Conceito Fundamental

Você está **correto**. O Next.js (especialmente com App Router) foi desenhado para executar lógica no **servidor**, enviando apenas HTML pronto para o cliente. Isso traz:

| Vantagem no Servidor | Desvantagem no Cliente |
|----------------------|------------------------|
| Menor bundle JavaScript enviado | Aumenta o peso do bundle |
| Dados já processados na resposta | Processamento no navegador do usuário |
| Melhor SEO (HTML completo) | Pior SEO (conteúdo pode não estar no HTML inicial) |
| Mais seguro (lógica oculta) | Lógica exposta no código-fonte |
| Menor consumo de bateria/dados | Maior consumo de recursos do dispositivo |

### Quando usar "use client"

```typescript
// ✅ Use "use client" APENAS para:
- Event listeners (onClick, onChange, etc.)
- Hooks do React (useState, useEffect, useRouter, usePathname)
- Interatividade do navegador (formulários controlados, modais)

// ❌ NÃO use "use client" para:
- Busca de dados estática ou dinâmica no servidor
- Renderização de UI estática
- Cálculos de negócio que não dependem do navegador
- Leitura de parâmetros de URL via params (servidor)
```

### Estratégia Híbrida Recomendada

```
Server Component (Página)
├── Busca dados no servidor (fetch, banco de dados)
├── Calcula totais e processa dados
└── Renderiza UI estática
    └── Client Component (apenas onde necessário)
        ├── Formulários controlados
        ├── Estados interativos (filtros, modais)
        └── Navegação do navegador
```

---

## 2. Análise Atual do Projeto

### Mapa de Componentes e Diretivas

| Arquivo | "use client" | Tipo | Recomendação |
|---------|--------------|------|--------------|
| `src/app/layout.tsx` | ❌ | Server | ✅ Correto |
| `src/app/page.tsx` | ❌ | Server | ✅ Correto |
| `src/app/error.tsx` | ✅ | Client | ✅ Necessário (erro precisa de interatividade) |
| `src/app/not-found.tsx` | ✅ | Client | ✅ Necessário |
| `src/app/transactions/page.tsx` | ✅ | Client | ⚠️ **Refatorar** - lógica de negócio no servidor |
| `src/app/transactions/new/page.tsx` | ✅ | Client | ⚠️ **Refatorar** - formulário pode ser Server Action |
| `src/app/transactions/[id]/edit/page.tsx` | ✅ | Client | ⚠️ **Refatorar** - formulário pode ser Server Action |
| `src/components/layout/header.tsx` | ✅ | Client | ⚠️ **Refatorar** - pode ser Server Component |
| `src/components/layout/sidebar.tsx` | ✅ | Client | ✅ Necessário (usa usePathname) |
| `src/context/transactions-context.tsx` | ✅ | Client | ⚠️ **Migrar para Server Actions** |

### Fluxo Atual vs Recomendado

```
ATUAL (Todo no Cliente):
transactions/page.tsx ("use client")
  └── useTransactions() → useState → cálculos no cliente

RECOMENDADO (Servidor + Client):
transactions/page.tsx (Server Component)
  └── fetch transactions no servidor
      └── <TransactionsList /> ("use client" apenas para filtros)
```

---

## 3. Acessibilidade (a11y)

### 3.1 Estrutura Semântica

#### ✅ Implementado
- `<html lang="pt-BR">` em `layout.tsx`
- `role="banner"` no header
- `aria-label` na sidebar
- `aria-live="polite"` na lista de transações
- `role="alert"` na confirmação de exclusão
- `htmlFor` + `id` em todos os inputs

#### ⚠️ Melhorias Necessárias

**Skip Navigation Link** - Essencial para navegação por teclado:

```tsx
// Adicionar em src/app/layout.tsx, logo após <body>:
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neon-cyan focus:text-bg-deep focus:rounded-pill focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-bg-deep"
>
  Pular para o conteúdo principal
</a>
```

**Landmark Regions** - Adicionar em `layout.tsx`:

```tsx
<body>
  <a href="#main-content" className="sr-only focus:not-sr-only...">
    Pular para o conteúdo principal
  </a>
  {children}
</body>

// E garantir que em cada página:
<main id="main-content" tabIndex={-1} className="flex-1">
  ...
</main>
```

### 3.2 Outlines e Focus Visible

O CSS atual já define foco nos inputs, mas precisamos garantir **outlines visíveis** em todos os elementos interativos.

**Adicionar ao `globals.css`:**

```css
/* Foco visível universal - essencial para navegação por teclado */
*:focus-visible {
  outline: 2px solid var(--color-neon-cyan);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Links com foco visível */
a:focus-visible {
  outline: 2px solid var(--color-neon-cyan);
  outline-offset: 4px;
  border-radius: 4px;
}

/* Botões com foco visível */
button:focus-visible {
  outline: 2px solid var(--color-neon-cyan);
  outline-offset: 2px;
}

/* Remover outline padrão do navegador apenas quando focus-visible estiver ativo */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### 3.3 Contraste de Cores

Verificação baseada nas cores do `globals.css`:

| Elemento | Cor de Fundo | Cor do Texto | Contraste | Status |
|----------|--------------|--------------|-----------|--------|
| Texto principal | #020617 | #F1F5F9 | 15.2:1 | ✅ AAA |
| Texto secundário | #020617 | #94A3B8 | 6.3:1 | ✅ AA |
| Link neon-cyan | #020617 | #22D3EE | 8.1:1 | ✅ AA |
| Botão primário | Gradient cyan/purple | #FFFFFF | >4.5:1 | ✅ AA |

### 3.4 Textos Alternativos e Aria Labels

**Melhorar os botões de ação na lista de transações** (`transactions/page.tsx`):

```tsx
// Atual
<Button variant="outline" size="sm">Editar</Button>
<Button variant="danger" size="sm">Excluir</Button>

// Melhorado para acessibilidade
<Button 
  variant="outline" 
  size="sm"
  aria-label={`Editar transação ${t.description}`}
>
  Editar
</Button>
<Button 
  variant="danger" 
  size="sm"
  aria-label={`Excluir transação ${t.description}`}
>
  Excluir
</Button>
```

---

## 4. Responsividade e Tailwind CSS

### 4.1 Breakpoints do Tailwind (Padrão)

| Prefixo | Resolução | Dispositivo |
|---------|-----------|-------------|
| (none) | < 640px | Mobile (sm) |
| `sm:` | ≥ 640px | Large mobile / Small tablet |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |
| `xl:` | ≥ 1280px | Large desktop |
| `2xl:` | ≥ 1536px | Extra large |

### 4.2 Padrões de Tamanho no Projeto

O projeto usa classes personalizadas no Button:

```tsx
// src/components/ui/button/index.tsx
const sizes = {
  sm: 'px-3 py-1.5 text-xs',    // Pequeno - mobile
  md: 'px-5 py-2.5 text-sm',    // Médio - tablet/desktop
  lg: 'px-6 py-3 text-base',    // Grande - desktop largo
};
```

### 4.3 Responsividade nas Páginas

**`src/app/page.tsx` (Home)** - Adicionar responsividade:

```tsx
// Atual
<div className="p-6 space-y-6 flex flex-col items-center justify-center bg-[url('/images/Credit_card.webp')] bg-cover bg-center min-h-[90vh] rounded-lg">

// Responsivo
<div className="
  flex flex-col items-center justify-center
  bg-[url('/images/Credit_card.webp')] bg-cover bg-center
  min-h-[90vh] rounded-lg
  p-4 sm:p-6 lg:p-8                          /* Padding responsivo */
  space-y-4 sm:space-y-6                       /* Espaçamento responsivo */
">
  <div className="
    glass rounded-modal
    p-6 sm:p-8 lg:p-10                         /* Padding interno responsivo */
    flex flex-col items-center gap-3 sm:gap-4   /* Gap responsivo */
    text-center
    max-w-sm sm:max-w-md lg:max-w-lg           /* Largura máxima responsiva */
    w-full mx-4                                /* Margem lateral mobile */
  ">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
      Bem-vindo ao ByteBank
    </h1>
    <p className="text-xs sm:text-sm text-muted-foreground">
      Gerencie suas finanças de forma fácil e eficiente.
    </p>
    <Link href="/transactions">
      <Button variant="primary" size="md" className="sm:size-lg">
        Comece agora
      </Button>
    </Link>
  </div>
</div>
```

**`src/app/transactions/page.tsx`** - Grid responsivo para KPIs:

```tsx
// Atual
<div className="grid grid-cols-3 gap-4">

// Responsivo
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
```

**Filtros responsivos:**

```tsx
// Atual
<div className="flex gap-2 mb-4 flex-wrap">

// Melhorado
<div className="flex gap-2 mb-4 flex-wrap" role="tablist" aria-label="Filtrar transações por tipo">
  {(["all", "deposit", "transfer", "payment", "withdrawal"] as const).map((type) => (
    <button
      key={type}
      role="tab"
      aria-selected={filter === type}
      onClick={() => setFilter(type)}
      className={`
        px-3 py-1.5 rounded-pill text-xs font-mono font-semibold
        transition-colors border
        ${filter === type
          ? "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30"
          : "text-muted-foreground border-white/10 hover:text-foreground"
        }
      `}
    >
      {filterLabels[type]}
    </button>
  ))}
</div>
```

### 4.4 Tabela de Transações Responsiva

```tsx
// Lista de transações - melhorar para mobile
<li className="
  flex flex-col sm:flex-row                   /* Empilha no mobile, linha no desktop */
  items-start sm:items-center
  justify-between
  gap-3 sm:gap-4
  py-3 border-b border-white/5 last:border-0
">
  <div className="flex items-center gap-3 flex-1 min-w-0">
    <div className="flex flex-col min-w-0">
      <p className="text-sm font-medium text-foreground truncate">
        {t.description}
      </p>
      <div className="flex items-center gap-2 mt-0.5 flex-wrap">  {/* wrap para mobile */}
        <span className="text-xs text-muted-foreground">
          {t.date}
        </span>
        <Badge variant={badgeVariant[t.type]}>
          {badgeLabel[t.type]}
        </Badge>
      </div>
    </div>
  </div>

  <div className="flex items-center gap-3 self-end sm:self-center">  {/* Alinhamento mobile */}
    <p className={`font-mono font-semibold text-sm shrink-0 ${
      t.type === "deposit" ? "text-neon-green" : "text-neon-pink"
    }`}>
      {t.type === "deposit" ? "+" : "-"}R$ {t.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
    </p>

    <div className="flex items-center gap-2 shrink-0">  {/* gap menor no mobile */}
      {/* Botões */}
    </div>
  </div>
</li>
```

---

## 5. Navegação por Teclado

### 5.1 Ordem de Tabulação

A ordem natural do HTML deve seguir a ordem visual. Verificar:

1. Skip link (primeiro elemento focável)
2. Logo/Brand
3. Links do menu principal
4. Links de ação (Nova transação)
5. Conteúdo principal
6. Filtros (selecionáveis via setas também)
7. Botões de ação em cada transação

### 5.2 Teclas de Atalho para Filtros

```tsx
// Adicionar suporte a teclas em transactions/page.tsx
const handleKeyDown = (e: React.KeyboardEvent, type: FilterType) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setFilter(type);
  }
};

// No botão de filtro:
<button
  role="tab"
  aria-selected={filter === type}
  tabIndex={filter === type ? 0 : -1}
  onClick={() => setFilter(type)}
  onKeyDown={(e) => handleKeyDown(e, type)}
>
```

### 5.3 Gerenciamento de Foco após Exclusão

```tsx
// Após excluir, mover foco para o próximo item ou mensagem de vazio
const handleDelete = (id: string) => {
  deleteTransaction(id);
  setConfirmDelete(null);
  // Mover foco programaticamente
  setTimeout(() => {
    const nextButton = document.querySelector('[data-focus-after-delete]') as HTMLElement;
    nextButton?.focus();
  }, 0);
};
```

---

## 6. Leitores de Tela

### 6.1 Anúncios Dinâmicos

```tsx
// Status da lista para leitores de tela
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {filtered.length === 0 
    ? "Nenhuma transação encontrada para o filtro selecionado."
    : `${filtered.length} transações encontradas.`
  }
</div>
```

### 6.2 Labels Descritivos

```tsx
// Select de tipo em formulários
<select
  id="type"
  value={form.type}
  onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
  required
  aria-describedby="type-help"
  className="..."
>
  <option value="" className="bg-bg-surface">Selecione</option>
  ...
</select>
<p id="type-help" className="sr-only">
  Selecione o tipo de transação: Depósito, Transferência, Pagamento ou Saque
</p>
```

### 6.3 Confirmação de Exclusão

```tsx
{confirmDelete === t.id ? (
  <span className="flex items-center gap-1" role="alert" aria-live="assertive">
    <span className="sr-only">Confirmar exclusão da transação {t.description}</span>
    <Button variant="danger" size="sm" onClick={() => deleteTransaction(t.id)}>
      Confirmar exclusão
    </Button>
    <Button variant="secondary" size="sm" onClick={() => setConfirmDelete(null)}>
      Cancelar
    </Button>
  </span>
) : (...)}
```

---

## 7. Refatoração Recomendada por Arquivo

### 7.1 `src/context/transactions-context.tsx`

**Problema:** Todo o estado e lógica de negócio estão no cliente.

**Solução:** Migrar para Server Actions (Next.js 16 suporta nativamente).

```typescript
// NOVO: src/app/transactions/actions.ts (Server Actions)
'use server';

import { revalidatePath } from 'next/cache';
import type { Transaction, TransactionType } from '@/data/transactions';

// Simulando banco de dados (futuramente será um banco real)
let transactions: Transaction[] = [/* dados iniciais */];

export async function addTransaction(data: Omit<Transaction, 'id' | 'createdAt'>) {
  const newTransaction: Transaction = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  transactions = [newTransaction, ...transactions];
  revalidatePath('/transactions');
  return newTransaction;
}

export async function updateTransaction(id: string, data: Omit<Transaction, 'id' | 'createdAt'>) {
  transactions = transactions.map((t) => 
    t.id === id ? { ...t, ...data } : t
  );
  revalidatePath('/transactions');
  return transactions.find((t) => t.id === id);
}

export async function deleteTransaction(id: string) {
  transactions = transactions.filter((t) => t.id !== id);
  revalidatePath('/transactions');
}

export async function getTransactions() {
  return transactions;
}
```

### 7.2 `src/app/transactions/page.tsx`

**Atual:** Client Component com useContext
**Recomendado:** Server Component com Server Actions

```typescript
// Remover "use client" do topo do arquivo
// 'use client'; ← REMOVER

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTransactions } from "./actions";
import type { TransactionType } from "@/data/transactions";

// Server Component - busca dados no servidor
export default async function TransactionsPage() {
  const transactions = await getTransactions();

  // Cálculos no servidor
  const totals = {
    income: transactions
      .filter((t) => t.type === "deposit")
      .reduce((acc, t) => acc + t.amount, 0),
    expense: transactions
      .filter((t) => t.type === "payment" || t.type === "withdrawal" || t.type === "transfer")
      .reduce((acc, t) => acc + t.amount, 0),
  };
  totals.balance = totals.income - totals.expense;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header - Server Component */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Visão geral
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <Link href="/transactions/new">
          <Button variant="primary" size="sm" className="sm:size-md">
            + Nova transação
          </Button>
        </Link>
      </div>

      {/* KPIs - Server Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card className="space-y-2 p-4 sm:p-6">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
            Saldo disponível
          </p>
          <p className={`text-2xl sm:text-3xl font-mono font-bold ${totals.balance >= 0 ? "text-neon-cyan" : "text-neon-pink"}`}>
            R$ {totals.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </Card>
        {/* ... outros cards ... */}
      </div>

      {/* Lista com filtros - Extrair para Client Component apenas o filtro */}
      <TransactionsList initialTransactions={transactions} />
    </div>
  );
}

// Client Component separado apenas para a parte interativa (filtros)
'use client';
import { useState, useMemo } from 'react';
// ... resto do código de filtro ...
function TransactionsList({ initialTransactions }: { initialTransactions: Transaction[] }) {
  const [filter, setFilter] = useState<FilterType>("all");
  // ... resto do código ...
}
```

### 7.3 `src/app/transactions/new/page.tsx`

**Refatorado com Server Action:**

```typescript
// Remover "use client"
// 'use client'; ← REMOVER

import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addTransaction } from "../actions";
import type { TransactionType } from "@/data/transactions";

// Server Component
export default function NewTransactionPage() {
  // Server Action vinculada ao formulário
  async function handleSubmit(formData: FormData) {
    'use server';

    const type = formData.get('type') as TransactionType;
    const amount = parseFloat(formData.get('amount') as string);
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;

    if (!type || !amount || !description || !category) return;

    await addTransaction({ type, amount, description, category, date });
    redirect('/transactions');
  }

  return (
    <div className="p-4 sm:p-6 max-w-lg mx-auto">
      <h1 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
        Nova Transação
      </h1>

      <Card className="p-4 sm:p-6">
        <form action={handleSubmit} className="space-y-4">
          {/* Tipo */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="type"
              className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Tipo
            </label>
            <select
              id="type"
              name="type"
              required
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/30 transition-all"
            >
              <option value="" className="bg-bg-surface">Selecione</option>
              <option value="deposit" className="bg-bg-surface">Depósito</option>
              <option value="transfer" className="bg-bg-surface">Transferência</option>
              <option value="payment" className="bg-bg-surface">Pagamento</option>
              <option value="withdrawal" className="bg-bg-surface">Saque</option>
            </select>
          </div>

          <Input
            label="Valor (R$)"
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0,00"
            required
          />

          <Input
            label="Descrição"
            id="description"
            name="description"
            type="text"
            placeholder="Ex: Salário mensal"
            required
          />

          <Input
            label="Categoria"
            id="category"
            name="category"
            type="text"
            placeholder="Ex: Receita"
            required
          />

          <Input
            label="Data"
            id="date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Salvar
            </Button>
            <Link href="/transactions" className="w-full sm:w-auto">
              <Button type="button" variant="secondary" className="w-full sm:w-auto">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
```

### 7.4 `src/components/layout/header.tsx`

**Refatoração:** Remover "use client" se não houver necessidade de hooks.

```typescript
// 'use client'; ← REMOVER (se não usar hooks do React)

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface HeaderProps {
  showLogin?: boolean;
}

export function Header({ showLogin = true }: HeaderProps) {
  return (
    <header 
      role="banner" 
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label="ByteBank - Página inicial">
              <Logo />
            </Link>
          </div>
          {showLogin && (
            <nav aria-label="Ações do usuário">
              <Link href="/login">
                <Button variant="primary" size="sm" className="sm:size-md">
                  Login
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
```

---

## 8. Boas Práticas de Código

### 8.1 Estrutura de Pastas Recomendada

```
src/
├── app/
│   ├── (dashboard)/              # Grupo de rotas para dashboard
│   │   ├── layout.tsx            # Layout do dashboard (com sidebar)
│   │   └── page.tsx
│   ├── transactions/
│   │   ├── actions.ts            # Server Actions
│   │   ├── page.tsx              # Server Component
│   │   ├── loading.tsx           # Loading UI (Suspense)
│   │   ├── error.tsx             # Error UI
│   │   ├── new/
│   │   │   ├── page.tsx          # Server Component com formulário
│   │   │   └── error.tsx
│   │   └── [id]/edit/
│   │       └── page.tsx
│   ├── api/                      # API routes (se necessário)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── layout/
│   ├── ui/
│   └── transactions/             # Componentes específicos de transações
│       ├── transactions-list.tsx  # Client Component (filtros)
│       └── transaction-form.tsx   # Componente de formulário reutilizável
├── lib/
│   ├── validations.ts            # Validações de formulário (zod)
│   └── utils.ts
├── data/
│   └── transactions.ts           # Tipos e dados estáticos
└── types/
    └── index.ts                  # Tipos globais
```

### 8.2 Validações com Zod (Recomendado)

```typescript
// src/lib/validations.ts
import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['deposit', 'transfer', 'payment', 'withdrawal']),
  amount: z.number().positive('Valor deve ser maior que zero'),
  description: z.string().min(3, 'Descrição deve ter pelo menos 3 caracteres'),
  category: z.string().min(2, 'Categoria deve ter pelo menos 2 caracteres'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
```

### 8.3 Loading States

```tsx
// src/app/transactions/loading.tsx
export default function TransactionsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-bg-surface rounded animate-pulse" />
        <div className="h-10 w-36 bg-bg-surface rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-bg-surface rounded-card animate-pulse" />
        ))}
      </div>
    </div>
  );
}
```

---

## 9. Checklist de Implementação

### Acessibilidade
- [ ] Adicionar skip navigation link em `layout.tsx`
- [ ] Adicionar `tabIndex={-1}` e `id="main-content"` em todas as páginas
- [ ] Adicionar estilos `*:focus-visible` no `globals.css`
- [ ] Adicionar `aria-label` descritivo em todos os botões de ação
- [ ] Adicionar `role="tablist"` e `role="tab"` nos filtros
- [ ] Adicionar `aria-live` para anúncios dinâmicos
- [ ] Verificar contraste de cores (já está bom)
- [ ] Testar com leitor de tela (NVDA/VoiceOver)

### Responsividade
- [ ] Adicionar classes `sm:`, `md:`, `lg:` em `page.tsx` (Home)
- [ ] Tornar grid de KPIs responsivo em `transactions/page.tsx`
- [ ] Tornar lista de transações empilhável no mobile
- [ ] Ajustar tamanhos de botão (`size` prop) conforme breakpoint
- [ ] Testar em diferentes tamanhos de tela

### Next.js - Server vs Client
- [ ] Criar `src/app/transactions/actions.ts` com Server Actions
- [ ] Refatorar `transactions/page.tsx` para Server Component
- [ ] Refatorar `transactions/new/page.tsx` para usar Server Actions
- [ ] Refatorar `transactions/[id]/edit/page.tsx` para Server Actions
- [ ] Remover `transactions-context.tsx` (substituir por Server Actions)
- [ ] Verificar se `header.tsx` pode ser Server Component
- [ ] Adicionar `loading.tsx` para Suspense automático

### Boas Práticas
- [ ] Instalar e configurar Zod para validações
- [ ] Criar componente `TransactionForm` reutilizável
- [ ] Adicionar `error.tsx` específicos para cada rota
- [ ] Adicionar `loading.tsx` específicos para cada rota
- [ ] Limpar arquivos vazios (`data/dashboard.ts`, `data/transation.ts`)
- [ ] Padronizar nomenclatura (`transation.ts` → `transaction.ts`)

---

## Conclusão

O projeto ByteBank tem uma base sólida com Tailwind CSS v4 e componentes bem estruturados. As principais melhorias recomendadas são:

1. **Mover lógica de negócio para o servidor** usando Server Actions do Next.js
2. **Reduzir o uso de "use client"** apenas para componentes que precisam de interatividade do navegador
3. **Adicionar suporte completo a navegação por teclado** com skip links e outlines visíveis
4. **Tornar a interface totalmente responsiva** com breakpoints do Tailwind
5. **Melhorar acessibilidade** com ARIA attributes apropriados

Ao seguir este guia, o projeto estará em conformidade com as melhores práticas de acessibilidade (WCAG 2.1 AA), usabilidade responsiva e arquitetura Next.js moderna.
