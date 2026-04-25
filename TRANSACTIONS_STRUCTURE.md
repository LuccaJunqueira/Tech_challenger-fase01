# Transactions — Estrutura de Dados e Páginas

Guia para implementar o sistema de transações com listagem, criação, edição e exclusão.

---

## 1. Dados Mock

### 1.1 Tipo Transaction

Crie o arquivo `src/data/transactions.ts`:

```ts
export type TransactionType = 'deposit' | 'transfer' | 'payment' | 'withdrawal';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string; // ISO string
  createdAt: string;
}

export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 5000,
    description: 'Salário mensal',
    category: 'Receita',
    date: '2024-01-15',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    type: 'transfer',
    amount: 1500,
    description: 'Transferência para Poupança',
    category: 'Transferência',
    date: '2024-01-16',
    createdAt: '2024-01-16T10:30:00Z',
  },
  {
    id: '3',
    type: 'payment',
    amount: 450,
    description: 'Conta de luz',
    category: 'Contas',
    date: '2024-01-18',
    createdAt: '2024-01-18T14:20:00Z',
  },
  {
    id: '4',
    type: 'withdrawal',
    amount: 300,
    description: 'Saque ATM',
    category: 'Saque',
    date: '2024-01-20',
    createdAt: '2024-01-20T16:45:00Z',
  },
  {
    id: '5',
    type: 'deposit',
    amount: 2500,
    description: 'Freelance projeto X',
    category: 'Receita',
    date: '2024-01-22',
    createdAt: '2024-01-22T09:15:00Z',
  },
  {
    id: '6',
    type: 'payment',
    amount: 120,
    description: 'Internet mensal',
    category: 'Contas',
    date: '2024-01-25',
    createdAt: '2024-01-25T11:00:00Z',
  },
  {
    id: '7',
    type: 'transfer',
    amount: 800,
    description: 'Pix para João',
    category: 'Transferência',
    date: '2024-01-26',
    createdAt: '2024-01-26T15:30:00Z',
  },
  {
    id: '8',
    type: 'payment',
    amount: 89,
    description: 'Assinatura streaming',
    category: 'Serviços',
    date: '2024-01-28',
    createdAt: '2024-01-28T20:00:00Z',
  },
  {
    id: '9',
    type: 'withdrawal',
    amount: 200,
    description: 'Saque caixa',
    category: 'Saque',
    date: '2024-01-30',
    createdAt: '2024-01-30T12:00:00Z',
  },
  {
    id: '10',
    type: 'deposit',
    amount: 1000,
    description: 'Bonus',
    category: 'Receita',
    date: '2024-02-01',
    createdAt: '2024-02-01T08:30:00Z',
  },
];
```

---

## 2. Estrutura de Pastas

```
src/
├── app/
│   ├── transactions/
│   │   ├── page.tsx              ← listagem principal
│   │   ├── new/
│   │   │   └── page.tsx           ← nova transação
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx        ← edição de transação
│   └── globals.css
└── data/
    └── transactions.ts            ← tipo + dados mock
```

---

## 3. Página de Listagem (src/app/transactions/page.tsx)

```tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { transactions as initialTransactions, type Transaction, type TransactionType } from '@/data/transactions';

type FilterType = 'all' | TransactionType;

export default function TransactionsPage() {
  // State para gerenciar as transações (CRUD)
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados mock ao iniciar
  useEffect(() => {
    setTransactionsList(initialTransactions);
    setIsLoading(false);
  }, []);

  // Lista filtrada
  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactionsList;
    return transactionsList.filter((t) => t.type === filter);
  }, [filter, transactionsList]);

  // Cálculos dinâmicos - baseados nas transações atuais
  const totals = useMemo(() => {
    const income = transactionsList
      .filter((t) => t.type === 'deposit' || t.type === 'transfer')
      .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactionsList
      .filter((t) => t.type === 'payment' || t.type === 'withdrawal')
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  }, [transactionsList]);

  // Função para deletar
  const handleDelete = (id: string) => {
    setTransactionsList((prev) => prev.filter((t) => t.id !== id));
    setConfirmDelete(null);
  };

  // Função para adicionar nova transação (chamada pela página new)
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactionsList((prev) => [newTransaction, ...prev]);
  };

  // Função para atualizar transação (chamada pela página edit)
  const updateTransaction = (id: string, updatedData: Omit<Transaction, 'id' | 'createdAt'>) => {
    setTransactionsList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      {/* Totais - Card acima da lista */}
      <div>
        <div>
          <span>Entradas</span>
          <span>R$ {totals.income.toLocaleString()}</span>
        </div>
        <div>
          <span>Saídas</span>
          <span>R$ {totals.expense.toLocaleString()}</span>
        </div>
        <div>
          <span>Saldo</span>
          <span>R$ {totals.balance.toLocaleString()}</span>
        </div>
      </div>

      {/* Filtro */}
      <select value={filter} onChange={(e) => setFilter(e.target.value as FilterType)}>
        <option value="all">Todas</option>
        <option value="deposit">Depósito</option>
        <option value="transfer">Transferência</option>
        <option value="payment">Pagamento</option>
        <option value="withdrawal">Saque</option>
      </select>

      {/* Lista de transações */}
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.type}</span>
            <span>R$ {transaction.amount.toLocaleString()}</span>
            <span>{transaction.description}</span>
            <span>{transaction.date}</span>

            {/* Ações */}
            <Link href={`/transactions/${transaction.id}/edit`}>
              Editar
            </Link>

            {confirmDelete === transaction.id ? (
              // Badge de confirmação
              <div>
                <span>Confirmar exclusão?</span>
                <button onClick={() => handleDelete(transaction.id)}>Sim</button>
                <button onClick={() => setConfirmDelete(null)}>Não</button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(transaction.id)}>Excluir</button>
            )}
          </li>
        ))}
      </ul>

      {/* Nova transação */}
      <Link href="/transactions/new">
        <button>+ Nova Transação</button>
      </Link>
    </div>
  );
}
```

---

## 4. Página Nova Transação (src/app/transactions/new/page.tsx)

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { type TransactionType } from '@/data/transactions';

export default function NewTransactionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    type: '' as TransactionType | '',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.type || !form.amount || !form.description || !form.category) {
      return;
    }

    // Criar objeto de transação
    const newTransaction = {
      type: form.type as TransactionType,
      amount: parseFloat(form.amount),
      description: form.description,
      category: form.category,
      date: form.date,
    };

    // Salvar no localStorage (solução simples para persistência entre páginas)
    // Em app real, usar Context API ou Zustand
    const existing = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transactionWithId = {
      ...newTransaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('transactions', JSON.stringify([transactionWithId, ...existing]));

    // Retornar para lista
    router.push('/transactions');
    router.refresh(); // Atualiza a página de listagem
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nova Transação</h1>

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
        required
      >
        <option value="">Selecione o tipo</option>
        <option value="deposit">Depósito</option>
        <option value="transfer">Transferência</option>
        <option value="payment">Pagamento</option>
        <option value="withdrawal">Saque</option>
      </select>

      <input
        type="number"
        placeholder="Valor"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Descrição"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Categoria"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <div>
        <button type="submit">Salvar</button>
        <Link href="/transactions">Cancelar</Link>
      </div>
    </form>
  );
}
```

---

## 5. Página Edição (src/app/transactions/[id]/edit/page.tsx)

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { transactions as initialTransactions, type Transaction, type TransactionType } from '@/data/transactions';

export default function EditTransactionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    type: '' as TransactionType | '',
    amount: '',
    description: '',
    category: '',
    date: '',
  });

  // Carregar dados da transação
  useEffect(() => {
    // Primeiro verifica no localStorage
    const stored = JSON.parse(localStorage.getItem('transactions') || '[]');
    const fromStorage = stored.find((t: Transaction) => t.id === id);
    
    if (fromStorage) {
      setForm({
        type: fromStorage.type,
        amount: fromStorage.amount.toString(),
        description: fromStorage.description,
        category: fromStorage.category,
        date: fromStorage.date,
      });
    } else {
      // Se não encontrar, busca nos mock
      const transaction = initialTransactions.find((t) => t.id === id);
      if (transaction) {
        setForm({
          type: transaction.type,
          amount: transaction.amount.toString(),
          description: transaction.description,
          category: transaction.category,
          date: transaction.date,
        });
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.type || !form.amount || !form.description || !form.category) {
      return;
    }

    // Atualizar no localStorage
    const stored = JSON.parse(localStorage.getItem('transactions') || '[]');
    const updated = stored.map((t: Transaction) => 
      t.id === id 
        ? { 
            ...t, 
            type: form.type as TransactionType, 
            amount: parseFloat(form.amount),
            description: form.description,
            category: form.category,
            date: form.date,
          } 
        : t
    );
    localStorage.setItem('transactions', JSON.stringify(updated));

    // Retornar para lista
    router.push('/transactions');
    router.refresh();
  };

  const transaction = initialTransactions.find((t) => t.id === id);
  
  if (!transaction) {
    // Verifica também no localStorage
    const stored = JSON.parse(localStorage.getItem('transactions') || '[]');
    const fromStorage = stored.find((t: Transaction) => t.id === id);
    if (!fromStorage) {
      return <div>Transação não encontrada</div>;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Transação</h1>

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
        required
      >
        <option value="">Selecione o tipo</option>
        <option value="deposit">Depósito</option>
        <option value="transfer">Transferência</option>
        <option value="payment">Pagamento</option>
        <option value="withdrawal">Saque</option>
      </select>

      <input
        type="number"
        placeholder="Valor"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Descrição"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Categoria"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <div>
        <button type="submit">Salvar</button>
        <Link href="/transactions">Cancelar</Link>
      </div>
    </form>
  );
}
```

---

## 6. Fluxo de Navegação

```
/transactions (lista)
    │
    ├── [+ Nova Transação] → /transactions/new
    │                           │
    │                           └── [Salvar] → /transactions
    │
    ├── [Editar] → /transactions/[id]/edit
    │                    │
    │                    └── [Salvar] → /transactions
    │
    └── [Excluir] → Badge de confirmação
                       │
                       └── [Sim] → /transactions
```

---

## 7. Resumo de Arquivos

| Arquivo | Conteúdo |
|--------|---------|
| `src/data/transactions.ts` | Tipo Transaction + array com 10 registros |
| `src/app/transactions/page.tsx` | Lista, filtros, totais, exclusão |
| `src/app/transactions/new/page.tsx` | Formulário novo |
| `src/app/transactions/[id]/edit/page.tsx` | Formulário edição |

---

## 8. Observações

### 8.1 Persistência de Dados

Este guia usa **localStorage** para persistência simples entre páginas. 

**Em produção**, considere uma destas alternativas:
- **Context API + Zustand** — estado global
- **React Query** — fetching + cache
- **API Routes** (Next.js) — backend com banco de dados

### 8.2 Fluxo de Navegação

```
/transactions (lista)
    │
    ├── [+ Nova Transação] → /transactions/new
    │                           │
    │                           └── [Salvar] → /transactions
    │
    ├── [Editar] → /transactions/[id]/edit
    │                    │
    │                    └── [Salvar] → /transactions
    │
    └── [Excluir] → Badge de confirmação
                       │
                       └── [Sim] → /transactions
```

---

Próximo passo: Implementar a parte visual (UI) conforme o design system.