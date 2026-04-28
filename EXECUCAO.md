# Guia de Execução — Projeto ByteBank

Este documento contém o passo a passo completo para configurar, executar e testar o projeto ByteBank.

---

## 1. Visão Geral do Projeto

### 1.1 O que é o ByteBank?

O ByteBank é um sistema de gerenciamento de transações financeiras com as seguintes funcionalidades:

- **Lista de transações** — Visualização de entradas, saídas e saldo
- **Criação de transações** — Formulário para adicionar novas transações
- **Edição de transações** — Editar transações existentes
- **Exclusão de transações** — Remover transações com confirmação
- **Filtros** — Filtrar por tipo (depósito, transferência, pagamento, saque)
- **Cálculos dinâmicos** — Saldo, entradas e saídas atualizados em tempo real

### 1.2 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | App Router | Framework React |
| TypeScript | — | Linguagem tipada |
| Tailwind CSS | v4 | Estilização (@theme) |
| Storybook | v10 | Documentação de componentes |
| React Context | — | Estado global |

---

## 2. Estrutura de Pastas

```
src/
├── app/                          # Páginas do Next.js (App Router)
│   ├── layout.tsx                # Layout raiz com Sidebar + Provider
│   ├── error.tsx                 # Página de erro
│   ├── globals.css               # Tokens do design system (@theme)
│   └── transactions/
│       ├── page.tsx              # Lista de transações
│       ├── new/page.tsx          # Criar transação
│       └── [id]/edit/page.tsx     # Editar transação
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx            # Menu Lateral
│   │   └── sidebar-item.tsx        # Item do menu
│   └── ui/                       # Componentes reutilizáveis
│       ├── button/
│       ├── badge/
│       ├── input/
│       └── card/
│
├── context/
│   └── transactions-context.tsx  # Estado global de transações
│
├── data/
│   └── transactions.ts           # Dados mock (10 transações)
│
└── lib/
    └── utils.ts                   # Função utilitária cn()
```

---

## 3. Pré-requisitos

### 3.1 Instalações Necessárias

```bash
# Dependencies principais
npm install

# Dependencies de desenvolvimento
npm install clsx tailwind-merge

# Storybook (se necessário)
npx storybook@latest init --yes
```

### 3.2 Verificar node_modules

Se a pasta `node_modules` não existir:

```bash
npm install
```

---

## 4. Como Executar o Projeto

### 4.1 Executar em Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:3000**

### 4.2 Executar Storybook

```bash
npm run storybook
```

O Storybook estará disponível em: **http://localhost:6006**

### 4.3 Build de Produção

```bash
npm run build
```

---

## 5. Testando as Funcionalidades

### 5.1 Página Inicial (Dashboard)

1. Execute `npm run dev`
2. Acesse http://localhost:3000/transactions
3. Verifique se a **Sidebar** aparece à esquerda
4. Verifique se os **KPIs** mostram:
   - Saldo disponível
   - Entradas
   - Saídas

### 5.2 Criar Nova Transação

1. Na lista de transações, clique em **"+ Nova transação"**
2. Preencha os campos:
   - Tipo (depósito, transferência, pagamento, saque)
   - Valor
   - Descrição
   - Categoria
   - Data
3. Clique em **"Salvar"**
4. Você será redirecionado para a lista
5. A nova transação deve aparecer no topo

### 5.3 Editar Transação

1. Na lista, clique em **"Editar"** em qualquer transação
2. Você será redirecionado para a página de edição
3. Altere algum campo
4. Clique em **"Salvar"**
5. Verifique se a transação foi atualizada na lista

### 5.4 Excluir Transação

1. Na lista, clique em **"Excluir"**
2. Aparece um botão de **confirmação**
3. Clique em **"Confirmar"** para excluir
4. Ou **"Cancelar"** para cancelar

### 5.5 Usar Filtros

1. Na lista de transações, clique em um filtro:
   - Todos
   - Depósito
   - Transferência
   - Pagamento
   - Saque
2. A lista deve mostrar apenas transações do tipo selecionado

---

## 6. Componentes do Design System

### 6.1 Button (Botão)

| Variante | Uso |
|----------|-----|
| `primary` | Ações principais (Salvar, Confirmar) |
| `secondary` | Ações secundárias (Cancelar) |
| `outline` | Ações de edição (Editar) |
| `danger` | Ações de exclusão (Excluir) |

**Tamanhos:** `sm`, `md`, `lg`

### 6.2 Badge (Etiqueta)

| Variante | Cor | Uso |
|----------|-----|-----|
| `cyan` | Neon cyan | Transferência |
| `purple` | Neon purple | Pagamento |
| `pink` | Neon pink | Destaque |
| `green` | Neon green | Depósito/Entrada |
| `red` | Neon red | Saque/Error |
| `blue` | Neon blue | Informação |

### 6.3 Input (Campo de formulário)

- Label automático (htmlFor)
- Suporte a erro
-Estilos de foco com anel cyan

### 6.4 Card (Cartão)

- Fundo: bg-card
- Borda sutil (border-white/8)
- Border-radius: rounded-r16

---

## 7. Context API — Explicação

### 7.1 Por que usar Context?

As páginas de transações (`/transactions`, `/transactions/new`, `/transactions/[id]/edit`) são rotas separadas. Sem o Context, cada página teria seu próprio estado e as mudanças não se sincronizariam.

### 7.2 Como usar o Context

```tsx
import { useTransactions } from '@/context/transactions-context';

// Dentro de qualquer componente
const { transactions, addTransaction, updateTransaction, deleteTransaction, totals } = useTransactions();

// transactions: array com todas as transações
// addTransaction(data): adicionar nova transação
// updateTransaction(id, data): editar transação
// deleteTransaction(id): excluir transação
// totals: { income, expense, balance }
```

---

## 8. Tokens do Design System

### 8.1 Cores (globals.css)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-deep` | #020617 | Fundo principal |
| `--color-bg-surface` | #1E293B | Superfície (cards) |
| `--color-neon-cyan` | #22D3EE | Acento (transferência) |
| `--color-neon-purple` | #A855F7 | Secundário (pagamento) |
| `--color-neon-pink` | #EC4899 | Primário (CTAs) |
| `--color-neon-green` | #00D09C | Sucesso (depósito) |
| `--color-text-1` | #F1F5F9 | Texto principal |
| `--color-text-2` | #94A3B8 | Texto secundário |

### 8.2 Border Radius

| Token | Valor |
|-------|-------|
| `--radius-badge` | 8px |
| `--radius-input` | 12px |
| `--radius-card` | 16px |
| `--radius-pill` | 999px |

### 8.3 Sombras

| Token | CSS |
|-------|-----|
| `--shadow-glow-cyan` | 0 0 24px color-mix(in srgb, #22D3EE 20%, transparent) |
| `--shadow-glow-purple` | 0 0 32px color-mix(in srgb, #A855F7 22%, transparent) |
| `--shadow-glow-pink` | 0 0 24px color-mix(in srgb, #EC4899 22%, transparent) |

---

## 9. Rotas do Projeto

| Rota | Página |
|------|--------|
| `/transactions` | Lista de transações |
| `/transactions/new` | Nova transação |
| `/transactions/[id]/edit` | Editar transação |

---

## 10. Solução de Problemas

### 10.1 Erro ao importar componentes

**Problema:** `Module not found: @/components/ui/button`

**Solução:** Verifique se o `tsconfig.json` tem o path alias:

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

### 10.2 Erro de tipagem

**Problema:** TypeScript erro

**Solução:**

```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install
```

### 10.3 Storybook não carrega estilos

**Problema:** Estilos do Tailwind não aparecem

**Solução:** Verifique se o `.storybook/preview.ts` tem o import do globals.css:

```ts
import '../src/app/globals.css';
```

---

## 11. Próximos Passos

1. **Executar o projeto** — `npm run dev`
2. **Testar todas as funcionalidades** — Criar, editar, excluir transações
3. **Ver Storybook** — `npm run storybook` para ver componentes
4. **Personalizar** — Editar tokens no globals.css

---

## 12. Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

---

Fim do guia de execução. O projeto está pronto para uso!