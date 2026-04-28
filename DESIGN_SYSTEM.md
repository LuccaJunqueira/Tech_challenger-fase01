# Design System ByteBank — Tokens Visuais

Guia de referência dos tokens visuais do design system ByteBank para Figma e implementação Next.js + Tailwind v4.

> **Nota sobre Tailwind v4:** A configuração migrou do `tailwind.config.ts` para CSS nativo via diretiva `@theme`. Não existe mais arquivo de configuração de cores e fontes em TypeScript — tudo vive no `globals.css`. Isso simplifica a stack e elimina a duplicação entre CSS vars e config JS.

---

## 1. Paleta de Cores

### 1.1 Cores de Fundo (Background)

| Token | HSL | Hex | Uso |
|-------|-----|-----|-----|
| `--color-bg-deep` | 229 84% 4.9% | `#020617` | Fundo principal (deep) |
| `--color-bg-base` | 222 47.4% 11.2% | `#0F172A` | Cards e painéis (base) |
| `--color-bg-panel` | 222 38% 18% | `#1A2540` | Painéis extras |
| `--color-bg-surface` | 223 42.2% 17.6% | `#1E293B` | Superfícies (surface) |

### 1.2 Cores Neon

| Token | HSL | Hex | Prioridade | Uso |
|-------|-----|-----|------------|-----|
| `--color-neon-cyan` | 188 85.7% 53.3% | `#22D3EE` | ① | Acento principal (cyan) |
| `--color-neon-purple` | 271 91% 65.1% | `#A855F7` | ② | Dominante visual (purple) |
| `--color-neon-pink` | 330 81.2% 60.4% | `#EC4899` | ③ | CTAs, botões principais (pink) |
| `--color-neon-green` | 165 100% 40.8% | `#00D09C` | ④ | Sucesso, depósitos (green) |
| `--color-neon-blue` | 217 91% 60% | `#3B82F6` | ⑤ | Informações, links |

### 1.3 Cores de Texto

| Token | HSL | Hex | Uso |
|-------|-----|-----|-----|
| `--color-text-1` | 210 40% 96.1% | `#F1F5F9` | Texto principal |
| `--color-text-2` | 214 32% 61% | `#94A3B8` | Texto secundário |
| `--color-text-3` | 215 19% 35% | `#475569` | Labels, placeholders |

> **Atenção:** `text-2` é `#94A3B8` — não confundir com `#64748B`. Consultar sempre o design system como fonte de verdade.

---

## 2. Tipografia

### 2.1 Fontes

| Família | Fonte | Variável CSS | Uso |
|---------|-------|-------------|-----|
| Sans | **Sora** | `var(--font-sans)` | Todo texto |
| Mono | **JetBrains Mono** | `var(--font-mono)` | Valores, labels, KPIs |

### 2.2 Tamanhos e Pesos

| Estilo | Tamanho | Peso | Letter-spacing | Uso |
|--------|---------|------|---------------|-----|
| Display | 38px | 800 | -1.8px | Títulos hero (gradient cyan→purple→pink) |
| H1 | 24px | 700 | -0.5px | Page titles |
| H2 | 17px | 600 | -0.2px | Panel headers |
| Body Medium | 13px | 500 | 0 | Nav items, tx names |
| Body Regular | 13px | 400 | 0 | Descrições (line-height 1.75) |
| Mono 700 | 21px | 700 | -0.8px | Valores monetários |
| Labels | 10px | 700 | 1.3px (uppercase) | Form labels, KPIs, nav section titles |

---

## 3. Sistema de Ícones SVG

### 3.1 Regras Gerais

- **stroke-width:** 1.6–1.8px
- **stroke-linecap:** round
- **Tamanho do ícone:** 14–18px
- **Container (ico-wrap):** 34–40px
- **Cor:** cor neon da categoria
- **Fundo:** `neon/10%` + border `neon/18%`

### 3.2 Ícones por Categoria

| Ícone | Cor neon | SVG path |
|-------|----------|----------|
| Depósito | `neon-green` | `<path d="M7.5 2v11M3 6.5l4.5-4.5 4.5 4.5"/>` |
| Transferência | `neon-cyan` | `<path d="M2 7.5h11M9 4l4 3.5-4 3.5M5 4L1 7.5 5 11"/>` |
| Pagamento | `neon-purple` | `<rect x="2" y="4" width="11" height="8" rx="2"/><path d="M2 7h11"/><circle cx="5" cy="10.5" r=".8"/>` |
| Saque | `neon-red` | `<path d="M7.5 13V4M3 8l4.5 4.5L12 8"/>` |
| Filtrar | `neon-cyan` | `<path d="M1 3h14M3 6h10M5 9h6"/>` |
| Histórico | `neon-purple` | `<circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>` |
| Adicionar | `neon-pink` | `<path d="M8 2v12M2 8h12"/>` |
| Editar | `neon-cyan` | `<path d="M7 1l2 2-5 5H2V6l5-5z"/><path d="M9 3l4 4"/>` |
| Excluir | `neon-red` | `<path d="M3 5h10l-1 8H4L3 5z"/><path d="M6 5V3h4v2"/><path d="M1 5h14"/>` |
| Confirmar | `neon-green` | `<path d="M3 8l3 3 7-7"/>` |

---

## 4. Botões

| Variante | Estilo | Tamanho |
|----------|--------|---------|
| Primário | gradient pink→purple · hover: -1px Y + glow-pink | — |
| Secundário | `bg white/5%` · `border white/10%` | — |
| Outline cyan | `border cyan/25%` · hover `bg cyan/10%` | — |
| Excluir | `bg red/10%` · text `#F87171` | — |
| Sm | padding `6px 13px` | pequeno |
| Large | padding `12px 26px` | grande |

---

## 5. Badges

| Tipo | Cor neon |
|------|----------|
| ↑ depósito | neon-green |
| transferência | neon-cyan |
| pagamento | neon-purple |
| ↓ saque | neon-red |
| informação | neon-pink |
| ↑ +3,2% | neon-green |
| ↓ -1,8% | neon-red |

**Fórmula:** `bg neon/10%` · `border neon/20%` · `text neon` · `border-radius: 999px` · JetBrains Mono 600 · 9.5px

---

## 6. Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-badge` | 8px | Badges, chips |
| `--radius-input` | 12px | Inputs, buttons |
| `--radius-card` | 16px | Float cards |
| `--radius-panel` | 20px | Panels, KPIs |
| `--radius-modal` | 24px | Modals, hero |
| `--radius-pill` | 999px | Badges, pills |

---

## 7. Efeitos e Sombras

### 7.1 Glow Effects

| Nome | CSS |
|------|-----|
| glow-cyan | `box-shadow: 0 0 24px color-mix(in srgb, #22D3EE 20%, transparent)` |
| glow-purple | `box-shadow: 0 0 32px color-mix(in srgb, #A855F7 22%, transparent)` |
| glow-pink | `box-shadow: 0 0 24px color-mix(in srgb, #EC4899 22%, transparent)` |

### 7.2 Glassmorphism

```css
.glass {
  background: color-mix(in srgb, white 4%, transparent);
  backdrop-filter: blur(12px);
  border: 1px solid color-mix(in srgb, white 8%, transparent);
}
```

### 7.3 Gradient Effects

| Nome | CSS |
|------|-----|
| kpi highlight | `background: linear-gradient(135deg, color-mix(in srgb, #22D3EE 7%, transparent), color-mix(in srgb, #A855F7 5%, transparent))` |
| visual panel | `background: linear-gradient(160deg, color-mix(in srgb, #A855F7 12%, transparent), color-mix(in srgb, #22D3EE 4%, transparent))` |

> **Nota:** No Tailwind v4 e CSS moderno, prefira `color-mix(in srgb, ...)` ao invés de `rgba()` — é a forma nativa de manipular opacidade de cores, e os utility modifiers do Tailwind (`/10`, `/20`) geram exatamente isso por baixo dos panos.

---

## 8. Configuração Tailwind v4

### 8.1 globals.css — configuração completa

No Tailwind v4, toda a configuração de tema vive no CSS via `@theme`. Não há mais `tailwind.config.ts` para cores, fontes e border-radius.

```css
@import 'tailwindcss';
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

@theme {
  /* --- Fontes -------------------- */
  --font-sans: 'Sora', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* --- Cores de fundo ---------- */
  --color-bg-deep:    #020617;
  --color-bg-base:    #0F172A;
  --color-bg-panel:   #1A2540;
  --color-bg-surface: #1E293B;

  /* --- Cores neon ------------ */
  --color-neon-cyan:   #22D3EE;
  --color-neon-purple: #A855F7;
  --color-neon-pink:   #EC4899;
  --color-neon-green:  #00D09C;
  --color-neon-blue:   #3B82F6;
  --color-neon-red:    #F87171;

  /* --- Cores de texto --------- */
  --color-text-1: #F1F5F9;
  --color-text-2: #94A3B8;
  --color-text-3: #475569;

  /* --- Semântica (foreground/background) */
  --color-background:       var(--color-bg-deep);
  --color-foreground:       var(--color-text-1);
  --color-muted:            var(--color-bg-surface);
  --color-muted-foreground: var(--color-text-2);
  --color-primary:          var(--color-neon-pink);
  --color-secondary:        var(--color-neon-purple);
  --color-accent:           var(--color-neon-cyan);
  --color-success:          var(--color-neon-green);
  --color-destructive:      var(--color-neon-red);

  /* --- Border radius -------- */
  --radius-badge:  8px;
  --radius-input:  12px;
  --radius-card:   16px;
  --radius-panel:  20px;
  --radius-modal:  24px;
  --radius-pill:   999px;

  /* --- Sombras / glow ----- */
  --shadow-glow-cyan:   0 0 24px color-mix(in srgb, var(--color-neon-cyan) 20%, transparent);
  --shadow-glow-purple: 0 0 32px color-mix(in srgb, var(--color-neon-purple) 22%, transparent);
  --shadow-glow-pink:   0 0 24px color-mix(in srgb, var(--color-neon-pink) 22%, transparent);

  /* --- Spacing semântico -- */
  --spacing-xs:  4px;
  --spacing-sm:  8px;
  --spacing-md:  12px;
  --spacing-lg:  16px;
  --spacing-xl:  24px;
  --spacing-2xl: 32px;
}

/* --- Reset de borda usando o token correto --- */
*,
::before,
::after {
  border-color: color-mix(in srgb, var(--color-foreground) 7%, transparent);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}
```

### 8.2 Instalação das fontes via next/font (alternativa ao Google Fonts CDN)

Para melhor performance em produção, prefira `next/font` ao `@import` direto:

```tsx
// src/app/layout.tsx
import { Sora, JetBrains_Mono } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

> **Importante:** Se usar `next/font`, remova o `@import url('...')` do `globals.css`. Os dois juntos causam carregamento duplicado das fontes.

---

## 9. Uso das classes no JSX

No Tailwind v4, as cores definidas em `@theme` ficam disponíveis automaticamente como classes utilitárias. Os opacity modifiers (`/10`, `/20` etc.) funcionam nativamente com as cores declaradas em `@theme`.

### 9.1 Cores com opacidade

```tsx
// Fundos neon com transparência
bg-neon-cyan/10     // fundo para ícone de transferência
bg-neon-purple/10   // fundo para ícone de pagamento
bg-neon-pink/10     // fundo para botão de adicionar
bg-neon-green/10    // fundo para ícone de depósito
bg-neon-red/10      // fundo para botão de excluir

// Borders neon com transparência
border-neon-cyan/18    // border do container de ícone
border-neon-purple/20  // border do badge de pagamento

// Texto neon direto
text-neon-cyan
text-neon-purple
text-neon-pink
text-neon-green
```

### 9.2 Border radius

```tsx
rounded-badge   // 8px  — badges, chips
rounded-input   // 12px — inputs, buttons
rounded-card    // 16px — float cards
rounded-panel   // 20px — panels, KPIs
rounded-modal   // 24px — modals, hero
rounded-pill    // 999px — badges arredondados
```

### 9.3 Sombras / glow

```tsx
shadow-glow-cyan
shadow-glow-purple
shadow-glow-pink
```

### 9.4 Cores semânticas

```tsx
bg-background          // fundo geral (#020617)
bg-muted               // superfície (#1E293B)
text-foreground        // texto principal (#F1F5F9)
text-muted-foreground  // texto secundário (#94A3B8)
bg-primary             // neon-pink
bg-secondary           // neon-purple
bg-accent              // neon-cyan
bg-success             // neon-green
bg-destructive         // neon-red
```

---

## 10. Exemplo completo — TransactionItem

```tsx
function DepositIcon() {
  return (
    <div className="
      w-10 h-10
      flex items-center justify-center
      rounded-panel
      bg-neon-green/10
      border border-neon-green/18
      shadow-glow-cyan
    ">
      <svg
        width="16" height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#00D09C"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <path d="M7.5 2v11M3 6.5l4.5-4.5 4.5 4.5"/>
      </svg>
    </div>
  );
}

function DepositBadge() {
  return (
    <span className="
      font-mono font-semibold text-[9.5px] uppercase tracking-wide
      px-2 py-0.5
      rounded-pill
      bg-neon-green/10
      border border-neon-green/20
      text-neon-green
    ">
      ↑ depósito
    </span>
  );
}

function MoneyValue({ value }: { value: string }) {
  return (
    <span className="font-mono font-bold text-[21px] tracking-[-0.8px] text-text-1">
      {value}
    </span>
  );
}
```

---

Fim do guia de tokens visuais. Para implementação de componentes, veja `COMPONENTS.md`.