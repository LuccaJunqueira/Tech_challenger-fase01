# Componentes ByteBank — Implementação

Guia de implementação dos componentes React reutilizáveis do design system ByteBank.

**Pré-requisito — instale antes de começar:**

```bash
npm install clsx tailwind-merge
```

## Estrutura de pastas

```
src/
├── lib/
│   └── utils.ts
└── components/
    └── ui/
        ├── button/
        │   ├── index.tsx
        │   └── button.stories.tsx
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

Use path alias em todos os imports: `import { Button } from '@/components/ui/button'`

---

## 1. Utilitário cn (crie primeiro — todos os componentes dependem dele)

`src/lib/utils.ts`

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// cn() combina classes condicionais (clsx) e resolve conflitos do Tailwind (twMerge)
// Exemplo: cn('px-4', condicao && 'py-2', 'px-6') → 'py-2 px-6' (px-4 sobrescrito)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 2. Button

### 2.1 Variantes

| Variante | Estilo |
|----------|--------|
| Primário | Gradiente pink → purple, hover sobe -1px |
| Secundário | Fundo sutil branco/5%, borda branco/10% |
| Outline | Borda cyan/25%, hover fundo cyan/10% |
| Danger | Fundo vermelho/10%, borda vermelho/20%, texto vermelho |

### 2.2 Tamanhos

| Tamanho | Padding |
|---------|---------|
| sm | 6×12px |
| md | 10×20px |
| lg | 12×26px |

### 2.3 src/components/ui/button/index.tsx

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
    const base = [
      'inline-flex items-center justify-center gap-2',
      'font-semibold rounded-r12',
      'transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    ];

    const variants = {
      primary: [
        'bg-gradient-to-r from-neon-pink to-neon-purple',
        'text-white',
        'hover:-translate-y-px hover:shadow-glow-pink',
      ],
    secondary: [
      'bg-white/5 border border-white/10',
      'text-foreground',
      'hover:bg-white/10',
    ],
    outline: [
      'border border-neon-cyan/25',
      'text-neon-cyan',
      'hover:bg-neon-cyan/10',
    ],
    danger: [
      'bg-red-500/10 border border-red-500/20',
      'text-red-400',
      'hover:bg-red-500/20',
    ],
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 2.4 src/components/ui/button/button.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Confirmar' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Cancelar' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Filtrar' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Excluir' } };
export const Small: Story = { args: { variant: 'primary', size: 'sm', children: 'Small' } };
export const Large: Story = { args: { variant: 'primary', size: 'lg', children: 'Large' } };
export const Disabled: Story = {
  args: { variant: 'primary', children: 'Desabilitado', disabled: true },
};
```

---

## 3. Badge

### 3.1 Regras visuais

- Fundo: cor neon a 10% de opacidade
- Borda: cor neon a 20% de opacidade
- Texto: cor neon
- Border-radius: rounded-pill (999px)
- Fonte: JetBrains Mono, 600, 9.5px, uppercase

### 3.2 src/components/ui/badge/index.tsx

```tsx
import { cn } from '@/lib/utils';

type BadgeVariant = 'cyan' | 'purple' | 'pink' | 'green' | 'red' | 'blue';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  const colors: Record<BadgeVariant, string> = {
    cyan:   'bg-neon-cyan/10   border-neon-cyan/20   text-neon-cyan',
    purple: 'bg-neon-purple/10 border-neon-purple/20 text-neon-purple',
    pink:   'bg-neon-pink/10   border-neon-pink/10   text-neon-pink',
    green:  'bg-neon-green/10  border-neon-green/20  text-neon-green',
    red:    'bg-red-500/10     border-red-500/20     text-red-400',
    blue:   'bg-neon-blue/10   border-neon-blue/20   text-neon-blue',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5',
        'rounded-pill border',
        'text-[9.5px] font-mono font-semibold uppercase tracking-wider',
        colors[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

### 3.3 src/components/ui/badge/badge.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '.';

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

export const Deposito: Story = { args: { variant: 'green', children: '↑ dep' } };
export const Transferencia: Story = { args: { variant: 'cyan', children: 'tra' } };
export const Pagamento: Story = { args: { variant: 'purple', children: 'pag' } };
export const Saque: Story = { args: { variant: 'red', children: '↓ saque' } };
export const Positivo: Story = { args: { variant: 'green', children: '↑ +3,2%' } };
export const Negativo: Story = { args: { variant: 'red', children: '↓ -1,8%' } };
```

---

## 4. Input

### 4.1 Regras visuais

- Fundo: bg-white/5
- Borda: border-white/10
- Border-radius: rounded-r12
- Padding: 12×16px
- Foco: ring cyan/30%, borda cyan/50%
- Label: JetBrains Mono, 10px, uppercase, tracking-wider
- htmlFor associado automaticamente ao id do input (acessibilidade)

### 4.2 src/components/ui/input/index.tsx

```tsx
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3 rounded-r12',
          'bg-white/5 border border-white/10',
          'text-foreground placeholder:text-muted-foreground text-sm',
          'focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/30',
          'transition-all duration-200',
          error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20',
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

### 4.3 src/components/ui/input/input.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Digite algo...' } };
export const WithLabel: Story = { args: { label: 'Nome completo', placeholder: 'Seu nome' } };
export const WithError: Story = {
  args: { label: 'Email', defaultValue: 'email-invalido', error: 'Email inválido' },
};
export const Password: Story = {
  args: { label: 'Senha', type: 'password', placeholder: '••••••••' },
};
```

---

## 5. Card

### 5.1 Regras visuais

- Fundo: bg-card
- Borda: border-white/8 (sutil)
- Border-radius: rounded-r16
- Padding padrão: 20px

### 5.2 src/components/ui/card/index.tsx

```tsx
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-card border border-white/8 rounded-r16 p-5', className)}>
      {children}
    </div>
  );
}
```

### 5.3 src/components/ui/card/card.stories.tsx

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '.';

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { children: 'Conteúdo do card' },
};

export const WithContent: Story = {
  args: {
    children: (
      <>
        <h3 className="text-base font-semibold text-foreground mb-1">Título</h3>
        <p className="text-sm text-muted-foreground">Descrição do card.</p>
      </>
    ),
  },
};
```