# Sidebar — Implementação

Guia para implementar e atualizar a sidebar conforme o design system ByteBank.

---

## 1. Estrutura Atual

```
src/components/layout/
├── sidebar.tsx       ← componente principal
└── sidebaritem.tsx   ← item de menu
```

---

## 2. Alterações Necessárias

### 2.1 Atualizar sidebar.tsx

O arquivo deve seguir as seguintes modificações:

```tsx
// src/components/layout/sidebar.tsx
import Image from "next/image";
import { CirclePlus, House, LogOut, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebaritem";

// Rotas do sistema
const routes = {
  dashboard: '/',
  transactions: '/transactions',
  newTransaction: '/transactions/new',
  settings: '/settings',
  logout: '/logout',
};

export function Sidebar() {
  const pathname = usePathname();

  // Função para verificar rota ativa
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/transactions') return pathname.startsWith('/transactions');
    return pathname === href;
  };

  return (
    <aside
      className="
        w-72 h-screen
        flex flex-col
        bg-gradient-to-b from-background to-card
        border-r border-border/50
        backdrop-blur-xl
      "
    >
      {/* LOGO */}
      <div
        className="
          h-16 flex items-center
          px-space-lg
          border-b border-border/50
        "
      >
        {/* Logo ByteBank - Usar imagem */}
        <Image 
          src="/images/Logo.webp" 
          alt="ByteBank" 
          width={100} 
          height={28}
          className="object-contain"
        />
      </div>

      {/* MENU */}
      <div
        className="
          flex-1
          px-space-lg py-space-xl
          space-y-space-xl
        "
      >
        {/* PRINCIPAL */}
        <div>
          <p className="text-xs text-muted-foreground mb-space-sm tracking-wider">
            PRINCIPAL
          </p>

          <div className="flex flex-col gap-space-xs">
            <SidebarItem
              icon={<House size={18} />}
              label="Dashboard"
              href={routes.dashboard}
              active={isActive(routes.dashboard)}
            />
            <SidebarItem
              icon={<Wallet size={18} />}
              label="Transações"
              href={routes.transactions}
              active={isActive(routes.transactions)}
            />
          </div>
        </div>

        {/* AÇÕES */}
        <div>
          <p className="text-xs text-muted-foreground mb-space-sm tracking-wider">
            AÇÕES
          </p>

          <div className="flex flex-col gap-space-xs">
            <SidebarItem
              icon={<CirclePlus size={18} />}
              label="Nova transação"
              href={routes.newTransaction}
              active={isActive(routes.newTransaction)}
            />
          </div>
        </div>

        {/* SISTEMA */}
        <div>
          <p className="text-xs text-muted-foreground mb-space-sm tracking-wider">
            SISTEMA
          </p>

          <div className="flex flex-col gap-space-xs">
            <SidebarItem
              icon={<Settings size={18} />}
              label="Configurações"
              href={routes.settings}
              active={isActive(routes.settings)}
            />
            <SidebarItem
              icon={<LogOut size={18} />}
              label="Sair"
              href={routes.logout}
            />
          </div>
        </div>
      </div>

      {/* FOOTER - Usuário */}
      <div
        className="
          p-space-lg
          border-t border-border/50
          flex items-center gap-space-sm
        "
      >
        {/* Avatar - Substituir por imagem quando tiver */}
        <div
          className="
            w-10 h-10
            rounded-full
            bg-primary
            flex items-center justify-center
            text-primary-foreground text-sm
            shadow-[0_0_10px_hsl(var(--primary)/0.4)]
          "
        >
          TA
        </div>

        <div>
          <p className="text-sm text-foreground font-medium">Thamiris A.</p>
          <p className="text-xs text-muted-foreground">Conta corrente</p>
        </div>
      </div>
    </aside>
  );
}
```

### 2.2 Atualizar sidebaritem.tsx

O arquivo pode permanecer com pequenas melhorias:

```tsx
// src/components/layout/sidebaritem.tsx

import Link from "next/link";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

export function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-space-sm
        px-space-md py-space-sm
        rounded-md
        text-sm font-medium
        transition-all duration-200

        ${
          active
            ? "bg-accent/15 text-accent border border-accent/30 shadow-[0_0_12px_hsl(var(--accent)/0.2)]"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
        }
      `}
    >
      {/* Indicador lateral (ativo) */}
      {active && (
        <span
          className="
            absolute left-0 top-1/2 -translate-y-1/2
            h-5 w-[3px]
            bg-accent
            rounded-r
          "
        />
      )}

      {/* Ícone */}
      <span className="transition-transform group-hover:scale-110">
        {icon}
      </span>

      {/* Label */}
      <span>{label}</span>
    </Link>
  );
}
```

---

## 3. Imagens Adicionadas

As imagens já estão em `public/images/`:

| Item | Arquivo | Substituir no código |
|------|--------|---------------------|
| Logo ByteBank | `Logo.webp` | `<Image src="/images/Logo.webp" alt="ByteBank" width={120} height={32} />` |
| Avatar usuário | (usar inicial por enquanto) | `#Código atual com iniciais TA` |

---

## 4. Rotas do Sistema

| Página | Rota | Status |
|-------|-----|--------|
| Dashboard | `/` | ✓ |
| Lista transações | `/transactions` | ✓ |
| Nova transação | `/transactions/new` | ✓ |
| Editar transação | `/transactions/[id]/edit` | ✓ |
| Configurações | `/settings` | Pendente |
| Logout | `/logout` | Pendente |

---

## 5. Resumo de Alterações

| Arquivo | Mudança |
|--------|--------|
| `sidebar.tsx` | Adicionar `usePathname` para rota ativa, atualizar rotas de transactions |
| `sidebaritem.tsx` | Manter praticamente igual |
| `public/images/` | Criar pasta para imagens |

---

A sidebar já utiliza as cores e tokens do design system (background, card, accent, primary, muted-foreground, etc.).