# Storybook ByteBank — Configuração

Guia completo para configurar o Storybook com o design system ByteBank em projeto Next.js.

---

## 1. Instalação

### 1.1 Instalar dependências

```bash
npx storybook@latest init
```

Selecione as opções:
- **Framework:** React (Next.js)
- **TypeScript:** Sim

### 1.2 Dependências adicionais (recomendadas)

```bash
npm install -D @storybook/addon-interactions @storybook/addon-links @storybook/addon-onboarding
```

---

## 2. Estrutura de Pastas

```
tech-challenger01/
├── .storybook/
│   ├── main.ts          ← configuração principal
│   ├── preview.tsx     ← decorators globais
│   └── storybook.css   ← estilos do preview
├── src/
│   └── components/ui/
│       ├── button/
│       ├── badge/
│       ├── input/
│       └── card/
└── stories/             ← pasta opcional para histórias globais
```

---

## 3. .storybook/main.ts

```ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

---

## 4. .storybook/preview.tsx

```tsx
import type { Preview } from '@storybook/react';
import '@/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color|stroke)/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'background',
          value: '#020617', // --background
        },
        {
          name: 'surface',
          value: '#1E293B', // --muted (surface)
        },
        {
          name: 'card',
          value: '#0F172A', // --card
        },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'var(--font-sans)' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

---

## 5. .storybook/storybook.css

Estilos para o ambiente de preview do Storybook:

```css
@import '@/app/globals.css';

/* Override do background do Storybook */
#root {
  background-color: hsl(var(--background));
}

.sb-wrapper {
  padding: 2rem;
}

/* Preview container customizado */
.storybook-preview {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: hsl(var(--muted));
  border: 1px solid hsl(var(--border) / 0.1);
}

/* Componentes em modo escuro no preview */
.storybook-preview button,
.storybook-preview input,
.storybook-preview span {
  font-family: var(--font-sans);
}

/* Labels dos controls */
.storybook-controls {
  --sg-bg: hsl(var(--card)) !important;
}

/* Sidebar customizada */
[data-sidebar='true'] {
  background-color: hsl(var(--background));
}
```

---

## 6. Configuração de Alias

### 6.1 tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Nota:** O Next.js já configura o alias `@/*` automaticamente para a pasta `src/`. Verifique se o `tsconfig.json` já possui essa configuração.

---

## 7. Scripts npm

Adicione ao `package.json`:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

## 8. Executar o Storybook

### 8.1 Desenvolvimento

```bash
npm run storybook
# ou
npm run storybook -- -p 6006
```

O Storybook estará disponível em: `http://localhost:6006`

### 8.2 Build estático

```bash
npm run build-storybook
```

Gera uma build estática em `storybook-static/`.

---

## 9. Configuração de Decorators Globais

Exemplo de decorators adicionais no `preview.tsx`:

```tsx
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    // Decorator para centered layout
    (Story, context) => {
      if (context.parameters.layout === 'centered') {
        return (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            padding: '2rem',
          }}>
            <Story />
          </div>
        );
      }
      return <Story />;
    },
    // Decorator para Font family
    (Story) => (
      <div style={{ fontFamily: 'var(--font-sans)' }}>
        <Story />
      </div>
    ),
  ],
  // Parâmetros globais
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#020617' },
        { name: 'light', value: '#1E293B' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

---

## 10. Troubleshooting

### 10.1 Erro de importação

Se tiver erro com `@/components/ui/...`, verifique:
1. `tsconfig.json` tem os paths corretos (já configurado pelo Next.js)
2. Reinicie o servidor: `Ctrl+C` e `npm run storybook`

### 10.2 Estilos não carregam

Verifique que o `globals.css` está importado em `preview.tsx`:
```ts
import '@/app/globals.css';
```

### 10.3 Cores não aparecem

O Tailwind precisa das cores HSL definidas no `globals.css`.
Consulte `DESIGN_SYSTEM_BYTEBANK.md` para a configuração completa.

### 10.4 Problemas com Next.js

Se houver conflitos com Next.js:
- Use framework específico: `@storybook/nextjs`
- O Storybook criará um `next.config.mjs` temporário para build

---

## 11. Resumo

| Arquivo | Função |
|---------|--------|
| `.storybook/main.ts` | Configuração principal, stories, addons (Next.js) |
| `.storybook/preview.tsx` | Decorators, parameters, backgrounds |
| `.storybook/storybook.css` | Estilos do ambiente preview |
| `tsconfig.json` | Paths alias `@/` (Next.js já configura) |

---

Após configuração, os componentes em `src/components/ui/` estarão disponíveis no Storybook em `http://localhost:6006`.