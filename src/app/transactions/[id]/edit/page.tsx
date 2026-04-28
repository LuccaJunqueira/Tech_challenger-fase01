"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTransactions } from "@/context/transactions-context";
import type { TransactionType } from "@/data/transactions";

export default function EditTransactionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { transactions, updateTransaction } = useTransactions();

  const transaction = transactions.find((t) => t.id === id);

  const [form, setForm] = useState({
    type: "" as TransactionType | "",
    amount: "",
    description: "",
    category: "",
    date: "",
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
        <Link
          href="/transactions"
          className="text-neon-cyan text-sm hover:underline mt-2 inline-block"
        >
          Voltar
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.amount || !form.description || !form.category)
      return;

    updateTransaction(id, {
      type: form.type as TransactionType,
      amount: parseFloat(form.amount),
      description: form.description,
      category: form.category,
      date: form.date,
    });

    router.push("/transactions");
  };

  return (
    <div className="p-6 max-w-lg w-full w mx-auto">
      <h1 className="text-xl font-bold text-foreground mb-6">
        Editar Transação
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo */}
          <div className="flex flex-col gap-1.5 ">
            <label
              htmlFor="type"
              className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Tipo
            </label>
            <select
              id="type"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as TransactionType })
              }
              required
              className="w-full px-4 py-3 rounded-[var(--radius-input)] bg-bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/30 transition-all"
            >
              <option value="" className="bg-bg-surface">
                Selecione
              </option>
              <option value="deposit" className="bg-bg-surface">
                Depósito
              </option>
              <option value="transfer" className="bg-bg-surface">
                Transferência
              </option>
              <option value="payment" className="bg-bg-surface">
                Pagamento
              </option>
              <option value="withdrawal" className="bg-bg-surface">
                Saque
              </option>
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
            className="bg-bg-surface"
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary">
              Salvar
            </Button>
            <Link href="/transactions">
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
