// components/layout/sidebar-item.tsx

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
      {/* indicador lateral (ativo) */}
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

      {/* ícone */}
      <span className="transition-transform group-hover:scale-110">
        {icon}
      </span>

      {/* label */}
      <span>{label}</span>
    </Link>
  );
}