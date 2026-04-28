# Transactions — Estrutura de Dados e Páginas

Guia para implementar o sistema de transações com listagem, criação, edição e exclusão.

## 1. Estratégia de Estado

Por que Context API em vez de localStorage?
As páginas /transactions/new e /transactions/[id]/edit são rotas separadas.
Se cada uma salvar no localStorage e a listagem usar useState local,
as mudanças nunca se sincronizam — a lista não atualiza após criar ou editar.
A solução é um Context simples que compartilha o estado entre todas as páginas.

## 2. Tipo Transaction

`src/data/transactions.ts`

```ts
export type TransactionType = 'deposit' | 'transfer' | 'payment' | 'withdrawal';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;       // formato: 'YYYY-MM-DD'
  createdAt: string;  // ISO string
}

export const initialTransactions: Transaction[] = [
  { id: '1',  type: 'deposit',    amount: 5000, description: 'Salário mensal',            category: 'Receita',       date: '2024-01-15', createdAt: '2024-01-15T08:00:00Z' },
  { id: '2',  type: 'transfer',   amount: 1500, description: 'Transferência para Poupança', category: 'Transferência', date: '2024-01-16', createdAt: '2024-01-16T10:30:00Z' },
  { id: '3',  type: 'payment',    amount: 450,  description: 'Conta de luz',               category: 'Contas',        date: '2024-01-18', createdAt: '2024-01-18T14:20:00Z' },
  { id: '4',  type: 'withdrawal', amount: 300,  description: 'Saque ATM',                  category: 'Saque',         date: '2024-01-20', createdAt: '2024-01-20T16:45:00Z' },
  { id: '5',  type: 'deposit',    amount: 2500, description: 'Freelance projeto X',        category: 'Receita',       date: '2024-01-22', createdAt: '2024-01-22T09:15:00Z' },
  { id: '6',  type: 'payment',    amount: 120,  description: 'Internet mensal',            category: 'Contas',        date: '2024-01-25', createdAt: '2024-01-25T11:00:00Z' },
  { id: '7',  type: 'transfer',   amount: 800,  description: 'Pix para João',              category: 'Transferência', date: '2024-01-26', createdAt: '2024-01-26T15:30:00Z' },
  { id: '8',  type: 'payment',    amount: 89,   description: 'Assinatura streaming',       category: 'Serviços',      date: '2024-01-28', createdAt: '2024-01-28T20:00:00Z' },
  { id: '9',  type: 'withdrawal', amount: 200,  description: 'Saque caixa',                category: 'Saque',         date: '2024-01-30', createdAt: '2024-01-30T12:00:00Z' },
  { id: '10', type: 'deposit',    amount: 1000, description: 'Bônus',                      category: 'Receita',       date: '2024-02-01', createdAt: '2024-02-01T08:30:00Z' },
];
```

## 3. Context de Transações

`src/context/transactions-context.tsx`

```tsx
'use client';

import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { initialTransactions, type Transaction, type TransactionType } from '@/data/transactions';

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, data: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  totals: { income: number; expense: number; balance: number };
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = useCallback((data: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const updateTransaction = useCallback((id: string, data: Omit<Transaction, 'id' | 'createdAt'>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'deposit')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'payment' || t.type === 'withdrawal')
      .reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction, totals }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error('useTransactions deve ser usado dentro de TransactionsProvider');
  return context;
}
```

## 4. Estrutura de Pastas

```
src/
├── context/
│   └── transactions-context.tsx
├── data/
│   └── transactions.ts
└── app/
    └── transactions/
        ├── page.tsx
        ├── new/
        │   └── page.tsx
        └── [id]/
            └── edit/
                └── page.tsx
```

## 5. Página de Listagem

`src/app/transactions/page.tsx`

```tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTransactions } from '@/context/transactions-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type TransactionType } from '@/data/transactions';

type FilterType = 'all' | TransactionType;

const filterLabels: Record<FilterType, string> = {
  all: 'Todos',
  deposit: 'Depósito',
  transfer: 'Transferência',
  payment: 'Pagamento',
  withdrawal: 'Saque',
};

const badgeVariant: Record<TransactionType, 'green' | 'cyan' | 'purple' | 'red'> = {
  deposit: 'green',
  transfer: 'cyan',
  payment: 'purple',
  withdrawal: 'red',
};

const badgeLabel: Record<TransactionType, string> = {
  deposit: '↑ dep',
  transfer: 'tra',
  payment: 'pag',
  withdrawal: '↓ saque',
};

export default function TransactionsPage() {
  const { transactions, deleteTransaction, totals } = useTransactions();
  const [filter, setFilter] = useState<FilterType>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Visão geral</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <Link href="/transactions/new">
          <Button variant="primary">+ Nova transação</Button>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="space-y-2">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
            Saldo disponível
          </p>
          <p className={`text-3xl font-mono font-bold ${totals.balance >= 0 ? 'text-neon-cyan' : 'text-neon-pink'}`}>
            R$ {totals.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="space-y-2">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
            Entradas
          </p>
          <p className="text-3xl font-mono font-bold text-neon-green">
            R$ {totals.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground">
            {transactions.filter((t) => t.type === 'deposit').length} transações
          </p>
        </Card>
        <Card className="space-y-2">
          <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-muted-foreground">
            Saídas
          </p>
          <p className="text-3xl font-mono font-bold text-neon-pink">
            R$ {totals.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground">
            {transactions.filter((t) => t.type === 'payment' || t.type === 'withdrawal').length} transações
          </p>
        </Card>
      </div>

      {/* Transações recentes */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Transações recentes</h2>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(['all', 'deposit', 'transfer', 'payment', 'withdrawal'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-pill text-xs font-mono font-semibold transition-colors border ${
                filter === type
                  ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30'
                  : 'text-muted-foreground border-white/10 hover:text-foreground'
              }`}
            >
              {filterLabels[type]}
            </button>
          ))}
        </div>

        {/* Lista */}
        <ul className="space-y-2" aria-live="polite">
          {filtered.length === 0 && (
            <li className="text-sm text-muted-foreground py-4 text-center">
              Nenhuma transação encontrada.
            </li>
          )}
          {filtered.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{t.date}</span>
                    <Badge variant={badgeVariant[t.type]}>{badgeLabel[t.type]}</Badge>
                  </div>
                </div>
              </div>

              <p className={`font-mono font-semibold text-sm shrink-0 ${
                t.type === 'deposit' ? 'text-neon-green' : 'text-neon-pink'
              }`}>
                {t.type === 'deposit' ? '+' : '-'}R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>

              <div className="flex items-center gap-3 shrink-0">
                <Link href={`/transactions/${t.id}/edit`}>
                  <Button variant="outline" size="sm">Editar</Button>
                </Link>
                {confirmDelete === t.id ? (
                  <span className="flex items-center gap-1" role="alert">
                    <Button variant="danger" size="sm" onClick={() => deleteTransaction(t.id)}>
                      Confirmar
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setConfirmDelete(null)}>
                      Cancelar
                    </Button>
                  </span>
                ) : (
                  <Button variant="danger" size="sm" onClick={() => setConfirmDelete(t.id)}>
                    Excluir
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
```

## 6. Página Nova Transação

`src/app/transactions/new/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTransactions } from '@/context/transactions-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type TransactionType } from '@/data/transactions';

export default function NewTransactionPage() {
  const router = useRouter();
  const { addTransaction } = useTransactions();

  const [form, setForm] = useState({
    type: '' as TransactionType | '',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.amount || !form.description || !form.category) return;

    addTransaction({
      type: form.type as TransactionType,
      amount: parseFloat(form.amount),
      description: form.description,
      category: form.category,
      date: form.date,
    });

    router.push('/transactions');
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-bold text-foreground mb-6">Nova Transação</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">

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
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
              required
              className="w-full px-4 py-3 rounded-r12 bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/30 transition-all"
            >
              <option value="" className="bg-card">Selecione</option>
              <option value="deposit" className="bg-card">Depósito</option>
              <option value="transfer" className="bg-card">Transferência</option>
              <option value="payment" className="bg-card">Pagamento</option>
              <option value="withdrawal" className="bg-card">Saque</option>
            </select>
          </div>

          <Input
            label="Valor (R$)"
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0,00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />

          <Input
            label="Descrição"
            id="description"
            type="text"
            placeholder="Ex: Salário mensal"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <Input
            label="Categoria"
            id="category"
            type="text"
            placeholder="Ex: Receita"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />

          <Input
            label="Data"
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary">Salvar</Button>
            <Link href="/transactions">
              <Button type="button" variant="secondary">Cancelar</Button>
            </Link>
          </div>

        </form>
      </Card>
    </div>
  );
}
```

## 7. Página de Edição

`src/app/transactions/[id]/edit/page.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTransactions } from '@/context/transactions-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type TransactionType } from '@/data/transactions';

export default function EditTransactionPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { transactions, updateTransaction } = useTransactions();

  const transaction = transactions.find((t) => t.id === id);

  const [form, setForm] = useState({
    type: '' as TransactionType | '',
    amount: '',
    description: '',
    category: '',
    date: '',
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        type: transaction.type,
        amount: transaction.amount.toString(),
        description: transaction.description,
        category: transaction.category,
        date: transaction.date,
      });
    }
  }, [transaction]);

  if (!transaction) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Transação não encontrada.</p>
        <Link href="/transactions" className="text-neon-cyan text-sm hover:underline mt-2 inline-block">
          Voltar
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.amount || !form.description || !form.category) return;

    updateTransaction(id, {
      type: form.type as TransactionType,
      amount: parseFloat(form.amount),
      description: form.description,
      category: form.category,
      date: form.date,
    });

    router.push('/transactions');
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-bold text-foreground mb-6">Editar Transação</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">

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
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
              required
              className="w-full px-4 py-3 rounded-r12 bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/30 transition-all"
            >
              <option value="" className="bg-card">Selecione</option>
              <option value="deposit" className="bg-card">Depósito</option>
              <option value="transfer" className="bg-card">Transferência</option>
              <option value="payment" className="bg-card">Pagamento</option>
              <option value="withdrawal" className="bg-card">Saque</option>
            </select>
          </div>

          <Input
            label="Valor (R$)"
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />

          <Input
            label="Descrição"
            id="description"
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <Input
            label="Categoria"
            id="category"
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />

          <Input
            label="Data"
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary">Salvar</Button>
            <Link href="/transactions">
              <Button type="button" variant="secondary">Cancelar</Button>
            </Link>
          </div>

        </form>
      </Card>
    </div>
  );
}
```

## 8. Fluxo de Navegação

```
/transactions (lista)
    ├── [+ Nova transação] → /transactions/new → [Salvar] → /transactions
    ├── [Editar]           → /transactions/[id]/edit → [Salvar] → /transactions
    └── [Excluir]          → confirmação inline → remove da lista
```