# Design System ByteBank — Tokens Visuais

Guia de referência dos tokens visuais do design system ByteBank para Figma e implementação Next.js + Tailwind.

---

## 1. Paleta de Cores

### 1.1 Cores de Fundo (Background)

| Token | HSL | Hex | Uso |
|------|-----|-----|-----|
| `background` | 229 84% 4.9% | `#020617` | Fundo principal (deep) |
| `card` | 222 47.4% 11.2% | `#0F172A` | Cards e painéis (base) |
| `bg-panel` | — | `#1A2540` | Painéis extras |
| `muted` | 223 42.2% 17.6% | `#1E293B` | Superfícies (surface) |

### 1.2 Cores Neon

| Token | HSL | Hex | Prioridade | Uso |
|------|-----|-----|------------|-----|
| `accent` | 188 85.7% 53.3% | `#22D3EE` | ① | Acento principal (cyan) |
| `secondary` | 271 91% 65.1% | `#A855F7` | ② | Dominante visual (purple) |
| `primary` | 330 81.2% 60.4% | `#EC4899` | ③ | CTAs, botões principais (pink) |
| `success` | 165 100% 40.8% | `#00D09C` | ④ | Sucesso, depósitos (green) |
| `neon-blue` | — | `#3B82F6` | ⑤ | Informações, links |

### 1.3 Cores de Texto

| Token | HSL | Hex | Uso |
|------|-----|-----|-----|
| `foreground` | 210 40% 96.1% | `#F1F5F9` | Texto principal |
| `muted-foreground` | 215 20.2% 65.1% | `#64748B` | Texto secundário |
| `text-3` | — | `#475569` | Labels, placeholders |

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
| Display | 38px | 800 | -1.8px | Títulos hero |
| H1 | 24px | 700 | -0.5px | Page titles |
| H2 | 17px | 600 | -0.2px | Panel headers |
| Body Medium | 13px | 500 | 0 | Nav items |
| Body Regular | 13px | 400 | 0 | Descrições (line-height 1.75) |
| Mono 700 | 21px | 700 | -0.8px | Valores monetários |
| Labels | 10px | 700 | 1.3px (uppercase) | Form labels, KPIs |

---

## 3. Sistema de Ícones SVG

### 3.1 Regras Gerais

- **stroke-width:** 1.6–1.8px
- **stroke-linecap:** round
- **Tamanho do ícone:** 14–18px
- **Container:** 34–40px
- **Cor:** cor neon da categoria
- **Fundo:** neon/10% + border neon/18%

### 3.2 Ícones por Categoria

| Ícone | Cor | SVG |
|-------|-----|-----|
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

## 4. Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `r8` | 8px | Badges, chips |
| `r12` | 12px | Inputs, buttons |
| `r16` | 16px | Float cards |
| `r20` | 20px | Panels, KPIs |
| `r24` | 24px | Modals, hero |
| `pill` | 999px | Badges, pills |

---

## 5. Efeitos e Sombras

### 5.1 Glow Effects

| Nome | CSS |
|------|-----|
| glow-cyan | `box-shadow: 0 0 24px rgba(34, 211, 238, 0.2)` |
| glow-purple | `box-shadow: 0 0 32px rgba(168, 85, 247, 0.22)` |
| glow-pink | `box-shadow: 0 0 24px rgba(236, 72, 153, 0.22)` |

### 5.2 Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### 5.3 Gradient Effects

| Nome | CSS |
|------|-----|
| kpi highlight | `background: linear-gradient(135deg, rgba(34, 211, 238, 0.07), rgba(168, 85, 247, 0.05))` |
| visual panel | `background: linear-gradient(160deg, rgba(168, 85, 247, 0.12), rgba(34, 211, 238, 0.04))` |

---

## 6. Configuração Tailwind

### 6.1 tailwind.config.ts

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#22D3EE',
        'neon-purple': '#A855F7',
        'neon-pink': '#EC4899',
        'neon-green': '#00D09C',
        'neon-blue': '#3B82F6',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'r8': '8px',
        'r12': '12px',
        'r16': '16px',
        'r20': '20px',
        'r24': '24px',
        'pill': '999px',
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(34, 211, 238, 0.2)',
        'glow-purple': '0 0 32px rgba(168, 85, 247, 0.22)',
        'glow-pink': '0 0 24px rgba(236, 72, 153, 0.22)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 6.2 globals.css

```css
@import 'tailwindcss';

:root {
  /* Cores - usando HSL para integração com Tailwind */
  --background: 229 84% 4.9%;    /* #020617 */
  --foreground: 210 40% 96.1%;   /* #F1F5F9 */
  --card: 222 47.4% 11.2%;         /* #0F172A */
  --card-foreground: 210 40% 96.1%;
  --primary: 330 81.2% 60.4%;    /* #EC4899 - neon-pink */
  --primary-foreground: 229 84% 4.9%;
  --secondary: 271 91% 65.1%;     /* #A855F7 - neon-purple */
  --secondary-foreground: 210 40% 96.1%;
  --muted: 223 42.2% 17.6%;     /* #1E293B */
  --muted-foreground: 215 20.2% 65.1%; /* #64748B */
  --accent: 188 85.7% 53.3%;     /* #22D3EE - neon-cyan */
  --accent-foreground: 229 84% 4.9%;
  --destructive: 0 84.2% 60.2%;   /* #EF4444 */
  --destructive-foreground: 210 40% 96.1%;
  --success: 165 100% 40.8%;     /* #00D09C - neon-green */
  --success-foreground: 229 84% 4.9%;
  --border: 0 0% 100%;
  --input: 0 0% 100%;
  --ring: 188 85.7% 53.3%;
  
  /* Fontes */
  --font-sans: 'Sora', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  
  /* Border radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
}

@theme inline {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

* {
  border-color: hsl(var(--border) / 0.07);
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

**Nota:** As cores usam nomenclatura HSL padrão (background, foreground, primary, etc.) para compatibilidade com Tailwind via `hsl(var(--nome))`. As cores neon são usadas via opacity modifiers (ex: `bg-neon-cyan/10`).

---

## 7. Resumo de Uso

### 7.1 Cores com Opacidade

```tsx
// Exemplos
bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan
bg-neon-purple/10 border-neon-purple/20 text-neon-purple
bg-neon-pink/10 text-neon-pink
bg-neon-green/10 text-neon-green
bg-red-500/10 text-red-400
```

### 7.2 Classes Úteis

```tsx
// Border radius
rounded-r8 rounded-r12 rounded-r16 rounded-r20 rounded-r24 rounded-pill

// Fonts
font-sans font-mono

// Sombras
shadow-glow-cyan shadow-glow-purple shadow-glow-pink
```

---

## 8. Instalação das Fontes (Next.js)

```tsx
import { Sora, JetBrains_Mono } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

Fim do guia de tokens visuais. Para implementação de componentes, veja `COMPONENTS_BYTEBANK.md`.