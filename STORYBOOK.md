# Storybook ByteBank — Configuração

Guia para configurar o Storybook com o design system ByteBank em projeto Next.js + Tailwind v4.

## 1. Instalação

```bash
npx storybook@latest init
```

Quando perguntado:

- **Framework:** Next.js
- **TypeScript:** Sim

Dependências adicionais:

```bash
npm install -D @storybook/addon-interactions @storybook/addon-links
```

## 2. Estrutura de Pastas

```
.storybook/
├── main.ts
└── preview.tsx
src/
└── components/ui/
    ├── button/
    ├── badge/
    ├── input/
    └── card/
```

## 3. .storybook/main.ts

Por que ../src e não ../../src?
A pasta .storybook fica na raiz do projeto, um nível acima de src.
Dois ../ subiria um nível a mais e não encontraria os arquivos.

```ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-interactions',
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

## 4. .storybook/preview.tsx

```tsx
import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

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
        { name: 'dark',    value: '#020617' },
        { name: 'surface', value: '#1E293B' },
        { name: 'card',    value: '#0F172A' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'var(--font-sans)', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

**Nota:** O import do globals.css garante que os tokens do @theme e as fontes estejam disponíveis no preview do Storybook.

## 5. tsconfig.json — Path Alias

O Next.js já configura @/* apontando para src/ automaticamente.
Verifique se existe:

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

## 6. Scripts npm (package.json)

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

## 7. Executar

```bash
# Desenvolvimento
npm run storybook
# → http://localhost:6006

# Build estático (necessário para entrega)
npm run build-storybook
```

## 8. Troubleshooting

| Problema | Solução |
|----------|---------|
| Erro de importação @/... | Verifique tsconfig.json e reinicie o servidor |
| Estilos não carregam | Confirme o import do globals.css no preview.tsx |
| Cores neon não aparecem | Verifique se o Tailwind está processando os arquivos .stories.tsx |
| Conflito com Next.js | Use sempre @storybook/nextjs como framework |