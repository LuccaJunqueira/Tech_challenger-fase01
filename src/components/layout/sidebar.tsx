// components/layout/sidebar.ts
import { CirclePlus, House, LogOut, Settings, Wallet } from "lucide-react";

import { SidebarItem } from "./sidebaritem";

export function Sidebar() {
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
        <span className="text-lg font-semibold text-foreground tracking-wide">
          Bytebank
        </span>
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
              href="/"
              active
            />
            <SidebarItem
              icon={<Wallet size={18} />}
              label="Transações"
              href="/transactions"
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
              href="/new"
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
              href="/settings"
            />
            <SidebarItem
              icon={<LogOut size={18} />}
              label="Sair"
              href="/logout"
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="
          p-space-lg
          border-t border-border/50
          flex items-center gap-space-sm
        "
      >
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
