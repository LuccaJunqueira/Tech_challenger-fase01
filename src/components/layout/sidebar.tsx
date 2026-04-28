"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebaritem";

const navGroups = [
  {
    label: "PRINCIPAL",
    items: [
      { label: "Home", href: "/" },
      { label: "Transações", href: "/transactions" },
    ],
  },
  {
    label: "AÇÕES",
    items: [{ label: "Nova transação", href: "/transactions/new" }],
  },
  {
    label: "SISTEMA",
    items: [
      { label: "Configurações", href: "/settings" },
      { label: "Sair", href: "/logout" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/transactions/new") return pathname === "/transactions/new";
    if (href === "/transactions")
      return (
        pathname === "/transactions" || pathname.startsWith("/transactions/")
      );
    return pathname === href;
  };

  return (
    <aside
      aria-label="Menu de navegação principal"
      className="w-64 h-screen flex flex-col bg-card border-r border-white/8 shrink-0"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/8">
        <Image
          src="/images/avatar3.png"
          alt="Logo ByteBank"
          width={44}
          height={44}
          className="object-contain"
          priority
        />

        <Image
          src="/images/logo.png"
          alt="ByteBank"
          width={100}
          height={24}
          className="object-contain"
          priority
        />
      </div>

      {/* Navegação */}
      <nav
        aria-label="Menu principal"
        className="flex-1 px-4 py-6 flex flex-col gap-6 overflow-y-auto"
      >
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-mono font-semibold tracking-widest text-muted-foreground mb-2 px-3">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <SidebarItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  active={isActive(item.href)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer — usuário */}
      <div className="px-4 py-4 border-t border-white/8 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
          TA
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            Thamiris A.
          </p>
          <p className="text-xs text-muted-foreground">Conta corrente</p>
        </div>
      </div>
    </aside>
  );
}
