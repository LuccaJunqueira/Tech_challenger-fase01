export type TransactionType = 'deposit' | 'transfer' | 'payment' | 'withdrawal';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
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