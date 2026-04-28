# Sidebar — Implementação

Guia para implementar a sidebar conforme o layout ByteBank.

## 1. Estrutura de Pastas

```
src/components/layout/
├── sidebar.tsx
└── sidebar-item.tsx
```

## 2. Visual de Referência

| Estado | Estilo |
|--------|--------|
| Ativo | Fundo bg-white/5, bullet • em text-neon-cyan, texto text-foreground |
| Inativo | Sem fundo, bullet • em text-muted-foreground, texto text-muted-foreground |
| Hover (inativo) | Texto muda para text-foreground |

Sem bordas, sem glow, sem ícones — apenas bullet colorido e fundo sutil.

## 3. src/components/layout/sidebar-item.tsx

```tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  label: string;
  href: string;
  active?: boolean;
}

export function SidebarItem({ label, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-r8',
        'text-sm transition-colors duration-150',
        active
          ? 'bg-white/5 text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {/* Bullet indicator */}
      <span
        className={cn(
          'text-base leading-none select-none',
          active ? 'text-neon-cyan' : 'text-muted-foreground'
        )}
        aria-hidden="true"
      >
        •
      </span>
      {label}
    </Link>
  );
}
```

## 4. src/components/layout/sidebar.tsx

```tsx
'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SidebarItem } from './sidebar-item';

const navGroups = [
  {
    label: 'PRINCIPAL',
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Transações', href: '/transactions' },
    ],
  },
  {
    label: 'AÇÕES',
    items: [
      { label: 'Nova transação', href: '/transactions/new' },
    ],
  },
  {
    label: 'SISTEMA',
    items: [
      { label: 'Configurações', href: '/settings' },
      { label: 'Sair', href: '/logout' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/transactions/new') return pathname === '/transactions/new';
    if (href === '/transactions') return pathname === '/transactions' || pathname.startsWith('/transactions/');
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
          src="/images/Logo.webp"
          alt="ByteBank"
          width={120}
          height={32}
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
          <p className="text-sm font-medium text-foreground truncate">Thamiris A.</p>
          <p className="text-xs text-muted-foreground">Conta corrente</p>
        </div>
      </div>
    </aside>
  );
}
```

## 5. Rotas do Sistema

| Página | Rota |
|--------|-----|
| Transações (lista) | /transactions |
| Nova transação | /transactions/new |
| Editar transação | /transactions/[id]/edit |
| Configurações | /settings |
| Sair | /logout |

## 6. Lógica de rota ativa

A função isActive trata dois casos especiais:

- `/transactions/new` é verificado antes de `/transactions` para evitar falso positivo
- `/transactions` captura também sub-rotas como `/transactions/1/edit`