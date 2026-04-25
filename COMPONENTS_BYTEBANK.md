# Componentes ByteBank — Implementação

Guia de implementação dos componentes React e Storybook para o design system ByteBank.

**Estrutura de pastas:**
```
src/components/ui/
├── button/
│   ├── index.tsx          ← componente
│   └── button.stories.tsx ← storybook
├── badge/
│   ├── index.tsx
│   └── badge.stories.tsx
├── input/
│   ├── index.tsx
│   └── input.stories.tsx
└── card/
    ├── index.tsx
    └── card.stories.tsx
```

**Nota:** Use imports com path alias → `import { Button } from '@/components/ui/button'`

---

## 1. Button (Botão)

### 1.1 Tipos de Botões

| Tipo | Estilo | Hover |
|------|--------|------|
| Primário | Gradiente pink→purple | -1px Y + shadow |
| Secundário | bg white/5%, border white/12% | — |
| Outline | border cyan/25% | bg cyan/10% |
| Perigo | bg red/10%, text #F87171 | — |

### 1.2 Tamanhos

| Tamanho | Padding |
|---------|---------|
| Default | 10×20px |
| Sm | 6×13px |
| Lg | 12×26px |

### 1.3 Implementação (src/components/ui/button/index.tsx)

```tsx
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-r12 transition-all duration-200';
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-pink to-neon-purple text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neon-pink/25',
    secondary: 'bg-white/5 border border-white/12 text-foreground hover:bg-white/8',
    outline: 'border border-neon-cyan/25 text-neon-cyan hover:bg-neon-cyan/10',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 1.4 Storybook (src/components/ui/button/button.stories.tsx)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Excluir',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large',
  },
};
```

---

## 2. Badge

### 2.1 Regras

- **Fundo:** cor neon em 10% de opacidade
- **Border:** cor neon em 20% de opacidade
- **Texto:** cor neon
- **Border-radius:** 999px (pill)
- **Fonte:** JetBrains Mono 600
- **Tamanho:** 9.5px

### 2.2 Exemplos

| Badge | Cor | Conteúdo |
|-------|-----|---------|
| Depósito | `neon-green` | ↑ depósito |
| Transferência | `neon-cyan` | transferência |
| Pagamento | `neon-purple` | pagamento |
| Saque | `neon-red` | ↓ saque |
| Positivo | `neon-green` | ↑ +3,2% |
| Negativo | `neon-red` | ↓ -1,8% |

### 2.3 Implementação (src/components/ui/badge/index.tsx)

```tsx
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant: 'cyan' | 'purple' | 'pink' | 'green' | 'red' | 'blue';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  const colors = {
    cyan: 'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan',
    purple: 'bg-neon-purple/10 border-neon-purple/20 text-neon-purple',
    pink: 'bg-neon-pink/10 border-neon-pink/20 text-neon-pink',
    green: 'bg-neon-green/10 border-neon-green/20 text-neon-green',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
    blue: 'bg-neon-blue/10 border-neon-blue/20 text-neon-blue',
  };

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] font-mono font-semibold uppercase tracking-wider border', colors[variant], className)}>
      {children}
    </span>
  );
}
```

### 2.4 Storybook (src/components/ui/badge/badge.stories.tsx)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['cyan', 'purple', 'pink', 'green', 'red', 'blue'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Deposito: Story = {
  args: {
    variant: 'green',
    children: '↑ depósito',
  },
};

export const Transferencia: Story = {
  args: {
    variant: 'cyan',
    children: 'transferência',
  },
};

export const Pagamento: Story = {
  args: {
    variant: 'purple',
    children: 'pagamento',
  },
};

export const Saque: Story = {
  args: {
    variant: 'red',
    children: '↓ saque',
  },
};

export const Positivo: Story = {
  args: {
    variant: 'green',
    children: '↑ +3,2%',
  },
};

export const Negativo: Story = {
  args: {
    variant: 'red',
    children: '↓ -1,8%',
  },
};
```

---

## 3. Input (Campo de Texto)

### 3.1 Regras

- **Fundo:** `bg-surface` (rgba white/5%)
- **Border:** `border-white/12`
- **Border-radius:** 12px (r12)
- **Padding:** 12×16px
- **Foco:** ring cyan/30%, border cyan/50%

### 3.2 Implementação (src/components/ui/input/index.tsx)

```tsx
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}
      <input 
        className={cn(
          'w-full px-4 py-3 rounded-r12',
          'bg-white/5 border border-white/12',
          'text-foreground placeholder:text-muted-foreground',
          'focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/30',
          'outline-none transition-all duration-200',
          error && 'border-red-500/50',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-[10px] text-red-400">{error}</span>
      )}
    </div>
  );
}
```

### 3.3 Storybook (src/components/ui/input/input.stories.tsx)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'Seu nome',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'email-invalido',
    error: 'Email inválido',
  },
};

export const Password: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
  },
};
```

---

## 4. Card

### 4.1 Regras

- **Fundo:** `bg-surface`
- **Border:** `border-white/8`
- **Border-radius:** 16px (r16)
- **Padding:** 20–24px

### 4.2 Implementação (src/components/ui/card/index.tsx)

```tsx
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-surface border border-white/8 rounded-r16 p-5', className)}>
      {children}
    </div>
  );
}
```

### 4.3 Storybook (src/components/ui/card/card.stories.tsx)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/components/ui/card';

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Conteúdo do card',
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <>
        <h3 className="text-lg font-semibold text-foreground mb-2">Título do Card</h3>
        <p className="text-sm text-muted-foreground">Descrição do card aqui.</p>
      </>
    ),
  },
};
```

---

## 5. Utilitários

### 5.1 Função cn (className merger)

Crie o arquivo `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Instalação needed:**
```bash
npm install clsx tailwind-merge
```

---

## 6. Resumo de Uso

### 6.1 Cores com Opacidade

```tsx
// Exemplos de uso
<div className="bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan">
<div className="bg-neon-purple/10 border-neon-purple/20 text-neon-purple">
<div className="bg-neon-pink/10 text-neon-pink">
<div className="bg-neon-green/10 text-neon-green">
<div className="bg-red-500/10 text-red-400">
```

### 6.2 Classes Úteis

```tsx
// Border radius
rounded-r8 rounded-r12 rounded-r16 rounded-r20 rounded-r24 rounded-pill

// Fonts
font-sans font-mono

// Sombras
shadow-glow-cyan shadow-glow-purple shadow-glow-pink
```

**Nota:** Os componentes usam as cores HSL do globals.css:
- `background`, `foreground`, `surface`, `muted-foreground`
- Cores neon com opacity: `bg-neon-cyan/10`, `text-neon-purple`, etc.

---

Fim do guia de componentes. Use `@/components/ui/[componente]` para importar.