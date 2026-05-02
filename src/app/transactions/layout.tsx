
import { Sidebar } from "@/components/layout/sidebar";
import { TransactionsProvider } from "@/context/transactions-context";

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TransactionsProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </TransactionsProvider>
  );
}
