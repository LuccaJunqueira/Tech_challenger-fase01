// 'use client'

// /**
//  * /transactions — Página completa de transações (App Router)
//  *
//  * Por que página em vez de modal:
//  * - URL própria → navegação por histórico, link direto, botão voltar
//  * - App Router: mais idiomático, sem portal/modal global
//  * - Acessibilidade superior: landmarks, heading hierarchy sem focus trap manual
//  *
//  * Funcionalidades:
//  * - KPIs: saldo total, entradas, saídas
//  * - Busca por descrição
//  * - Filtro por tipo (chip group)
//  * - Ordenação por data ou valor
//  * - Modal: adicionar, editar, excluir com confirmação
//  * - aria-live region para feedback
//  *
//  * Acessibilidade:
//  * - skip-to-content
//  * - <main id="main-content">
//  * - h1 → h2 hierarchy
//  * - role="status" + aria-live nos contadores e feedback
//  * - aria-pressed nos filtros
//  * - aria-label em botões de ícone
//  * - Validação com aria-describedby por campo
//  */

// import React, { useState, useMemo, useCallback, useId } from 'react';
// import Link from 'next/link';
// import { Button }             from '@/components/ui/button'
// import { Input, Select }      from '@/components/ui/input'
// import { Modal, ModalFooter } from '@/components/ui/modal'
// import { TransactionItem }    from '@/components/ui/transaction-item'
// import type { Transaction, TransactionType } from '@/components/ui/transaction-item'

// // ─── DADOS MOCK ───────────────────────────────────────────
// const INITIAL: Transaction[] = [
//   { id:'1', type:'deposit',    description:'Depósito recebido',     amount:  3000,   date:'2026-04-12T14:32:00' },
//   { id:'2', type:'transfer',   description:'Transferência — João',  amount: -450,    date:'2026-04-11T09:15:00' },
//   { id:'3', type:'payment',    description:'Pagamento de boleto',   amount: -189.90, date:'2026-04-10T18:00:00' },
//   { id:'4', type:'deposit',    description:'Depósito — Salário',    amount:  5200,   date:'2026-04-05T08:00:00' },
//   { id:'5', type:'withdrawal', description:'Saque — Caixa 24h',    amount: -300,    date:'2026-04-03T12:00:00' },
//   { id:'6', type:'payment',    description:'Netflix',               amount: -44.90,  date:'2026-04-01T10:00:00' },
//   { id:'7', type:'transfer',   description:'Transferência — Maria', amount: -800,    date:'2026-03-28T16:20:00' },
//   { id:'8', type:'deposit',    description:'Rendimento CDB',        amount:  342.50, date:'2026-03-25T08:00:00' },
// ]

// const FILTERS = [
//   { value:'',           label:'Todos'         },
//   { value:'deposit',    label:'Depósito'      },
//   { value:'transfer',   label:'Transferência' },
//   { value:'payment',    label:'Pagamento'     },
//   { value:'withdrawal', label:'Saque'         },
// ]

// const SORT_OPTS = [
//   { value:'date-desc',   label:'Data (mais recente)' },
//   { value:'date-asc',    label:'Data (mais antiga)'  },
//   { value:'amount-desc', label:'Valor (maior)'       },
//   { value:'amount-asc',  label:'Valor (menor)'       },
// ]

// const TYPE_OPTS = [
//   { value:'deposit',    label:'Depósito'      },
//   { value:'transfer',   label:'Transferência' },
//   { value:'payment',    label:'Pagamento'     },
//   { value:'withdrawal', label:'Saque'         },
// ]

// type SortKey = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
// interface FormState { type:string; description:string; amount:string; date:string }
// const emptyForm: FormState = { type:'', description:'', amount:'', date:'' }

// function fmt(v: number) {
//   return new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(Math.abs(v))
// }

// function validate(f: FormState) {
//   const e: Partial<FormState> = {}
//   if (!f.type)                                              e.type        = 'Selecione o tipo'
//   if (!f.description.trim())                                e.description = 'Informe uma descrição'
//   if (!f.amount || isNaN(Number(f.amount)) || +f.amount<=0) e.amount      = 'Informe um valor maior que zero'
//   if (!f.date)                                              e.date        = 'Selecione a data'
//   return e
// }

// // ── ícones inline ──
// const IcoPlus   = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6.5 1v11M1 6.5h11"/></svg>
// const IcoSearch = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="6" cy="6" r="4.5"/><path d="M10 10l3 3"/></svg>
// const IcoBack   = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 7H2M6 3L2 7l4 4"/></svg>
// const IcoTrash  = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M1.5 3.5h10M4 3.5V2.5a1 1 0 011-1h3a1 1 0 011 1v1M10 3.5l-.7 7a1 1 0 01-1 .9H4.7a1 1 0 01-1-.9L3 3.5"/></svg>
// const IcoEmpty  = () => <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><rect x="5" y="10" width="30" height="24" rx="4"/><path d="M5 18h30M13 26h4M21 26h6"/></svg>
// const IcoFilter = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" className="text-[var(--text-muted)] self-center"><path d="M1 3h11M3 6.5h7M5 10h3"/></svg>

// // ── formulário compartilhado add/edit ──
// function TxForm({ form, errors, onChange }: {
//   form: FormState
//   errors: Partial<FormState>
//   onChange: (k: keyof FormState, v: string) => void
// }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <Select id="f-type" label="Tipo de transação" required
//         options={TYPE_OPTS} placeholder="Selecione..." value={form.type}
//         error={errors.type} className="sm:col-span-2"
//         onChange={e => onChange('type', e.target.value)} />
//       <Input id="f-desc" label="Descrição" required
//         placeholder="Ex: Salário, Netflix..." value={form.description}
//         error={errors.description} className="sm:col-span-2"
//         onChange={e => onChange('description', e.target.value)} />
//       <Input id="f-amount" label="Valor (R$)" required
//         type="number" step="0.01" min="0.01" placeholder="0,00"
//         value={form.amount} error={errors.amount}
//         hint="Para saídas, o sinal é aplicado automaticamente"
//         onChange={e => onChange('amount', e.target.value)} />
//       <Input id="f-date" label="Data" required type="date"
//         value={form.date} error={errors.date}
//         onChange={e => onChange('date', e.target.value)} />
//     </div>
//   )
// }

// // ─── PÁGINA ───────────────────────────────────────────────
// export default function TransactionsPage() {
//   const liveId = useId()

//   const [txs,       setTxs]       = useState<Transaction[]>(INITIAL)
//   const [filter,    setFilter]    = useState('')
//   const [sort,      setSort]      = useState<SortKey>('date-desc')
//   const [search,    setSearch]    = useState('')
//   const [liveMsg,   setLiveMsg]   = useState('')

//   // modals
//   const [addOpen,    setAddOpen]    = useState(false)
//   const [addForm,    setAddForm]    = useState<FormState>(emptyForm)
//   const [addErr,     setAddErr]     = useState<Partial<FormState>>({})
//   const [editOpen,   setEditOpen]   = useState(false)
//   const [editId,     setEditId]     = useState<string|null>(null)
//   const [editForm,   setEditForm]   = useState<FormState>(emptyForm)
//   const [editErr,    setEditErr]    = useState<Partial<FormState>>({})
//   const [delOpen,    setDelOpen]    = useState(false)
//   const [delId,      setDelId]      = useState<string|null>(null)
//   const delTx = txs.find(t => t.id === delId)

//   const announce = useCallback((msg: string) => {
//     setLiveMsg('')
//     requestAnimationFrame(() => setLiveMsg(msg))
//   }, [])

//   const displayed = useMemo(() => {
//     let list = [...txs]
//     if (filter) list = list.filter(t => t.type === filter)
//     if (search.trim()) list = list.filter(t =>
//       t.description.toLowerCase().includes(search.trim().toLowerCase()))
//     list.sort((a, b) => {
//       if (sort === 'date-desc')   return +new Date(b.date) - +new Date(a.date)
//       if (sort === 'date-asc')    return +new Date(a.date) - +new Date(b.date)
//       if (sort === 'amount-desc') return Math.abs(b.amount) - Math.abs(a.amount)
//       return Math.abs(a.amount) - Math.abs(b.amount)
//     })
//     return list
//   }, [txs, filter, sort, search])

//   const kpis = useMemo(() => {
//     const entries = txs.filter(t => t.amount > 0).reduce((s,t) => s+t.amount, 0)
//     const exits   = txs.filter(t => t.amount < 0).reduce((s,t) => s+Math.abs(t.amount), 0)
//     return { balance: entries - exits, entries, exits }
//   }, [txs])

//   // CRUD helpers
//   function isOut(type: string) { return ['transfer','payment','withdrawal'].includes(type) }

//   function handleAdd() {
//     const errs = validate(addForm)
//     if (Object.keys(errs).length) { setAddErr(errs); return }
//     const tx: Transaction = {
//       id: crypto.randomUUID(), type: addForm.type as TransactionType,
//       description: addForm.description.trim(),
//       amount: isOut(addForm.type) ? -Math.abs(+addForm.amount) : Math.abs(+addForm.amount),
//       date: new Date(addForm.date + 'T12:00:00').toISOString(),
//     }
//     setTxs(p => [tx, ...p])
//     announce(`Transação "${tx.description}" adicionada.`)
//     setAddOpen(false); setAddForm(emptyForm); setAddErr({})
//   }

//   function handleEditOpen(id: string) {
//     const tx = txs.find(t => t.id === id); if (!tx) return
//     setEditId(id)
//     setEditForm({ type:tx.type, description:tx.description,
//       amount:String(Math.abs(tx.amount)), date:tx.date.slice(0,10) })
//     setEditErr({}); setEditOpen(true)
//   }

//   function handleEditSave() {
//     const errs = validate(editForm)
//     if (Object.keys(errs).length) { setEditErr(errs); return }
//     if (!editId) return
//     setTxs(p => p.map(t => t.id !== editId ? t : {
//       ...t, type: editForm.type as TransactionType,
//       description: editForm.description.trim(),
//       amount: isOut(editForm.type) ? -Math.abs(+editForm.amount) : Math.abs(+editForm.amount),
//       date: new Date(editForm.date + 'T12:00:00').toISOString(),
//     }))
//     announce(`"${editForm.description}" atualizada.`)
//     setEditOpen(false); setEditId(null); setEditForm(emptyForm)
//   }

//   function handleDelOpen(id: string) { setDelId(id); setDelOpen(true) }

//   function handleDelConfirm() {
//     const desc = delTx?.description ?? 'Transação'
//     setTxs(p => p.filter(t => t.id !== delId))
//     announce(`"${desc}" excluída.`)
//     setDelOpen(false); setDelId(null)
//   }

//   // ─── RENDER ───────────────────────────────────────────────────
//   return (
//     <>
//       <a href="#main-content" className="skip-to-content">Ir para o conteúdo principal</a>

//       {/* live region */}
//       <div id={liveId} role="status" aria-live="polite" aria-atomic="true" className="sr-only">
//         {liveMsg}
//       </div>

//       <div className="min-h-screen bg-[var(--bg-deep)]">

//         {/* orbs */}
//         <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//           <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-[var(--neon-purple)] opacity-[0.12] blur-[100px]" />
//           <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[var(--neon-cyan)] opacity-[0.09] blur-[90px]" />
//         </div>

//         <main id="main-content" aria-label="Gerenciamento de transações"
//               className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-10">

//           {/* ── cabeçalho ── */}
//           <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
//             <div>
//               <nav aria-label="Localização" className="mb-2">
//                 <Link href="/dashboard"
//                   className="inline-flex items-center gap-1.5 text-xs font-mono
//                              text-[var(--text-muted)] hover:text-[var(--neon-cyan)]
//                              transition-colors duration-150">
//                   <IcoBack /> Dashboard
//                 </Link>
//               </nav>
//               <h1 className="text-2xl font-bold tracking-tight">Transações</h1>
//               <p role="status" aria-live="polite"
//                  className="text-sm text-[var(--text-secondary)] mt-1">
//                 {displayed.length} registro{displayed.length !== 1 ? 's' : ''}
//                 {filter ? ` · ${FILTERS.find(o => o.value === filter)?.label}` : ''}
//               </p>
//             </div>
//             <Button variant="primary" leftIcon={<IcoPlus />}
//               onClick={() => { setAddForm(emptyForm); setAddErr({}); setAddOpen(true) }}
//               aria-label="Adicionar nova transação">
//               Nova transação
//             </Button>
//           </div>

//           {/* ── KPIs ── */}
//           <section aria-label="Resumo financeiro" className="mb-8">
//             <h2 className="sr-only">Resumo financeiro</h2>
//             <div className="grid grid-cols-3 gap-3">
//               <div aria-label={`Saldo: ${fmt(kpis.balance)}`}
//                    className="relative overflow-hidden rounded-[var(--r-xl)] p-4
//                               bg-gradient-to-br from-[var(--cyan-10)] to-[var(--purple-10)]
//                               border border-[var(--border-cyan)]">
//                 <div aria-hidden="true" className="absolute -top-6 -right-6 w-16 h-16 rounded-full
//                                                    bg-[radial-gradient(circle,rgba(34,211,238,0.15),transparent_70%)]"/>
//                 <p className="text-[9.5px] font-mono font-bold uppercase tracking-[0.8px]
//                               text-[var(--text-muted)] mb-2">Saldo total</p>
//                 <p className="text-xl font-bold font-mono tracking-tight text-[var(--neon-cyan)]">
//                   {fmt(kpis.balance)}
//                 </p>
//               </div>
//               <div aria-label={`Entradas: ${fmt(kpis.entries)}`}
//                    className="rounded-[var(--r-xl)] p-4 bg-[var(--green-10)] border border-[var(--border-dim)]">
//                 <p className="text-[9.5px] font-mono font-bold uppercase tracking-[0.8px]
//                               text-[var(--text-muted)] mb-2">Entradas</p>
//                 <p className="text-xl font-bold font-mono tracking-tight text-[var(--neon-green)]">
//                   {fmt(kpis.entries)}
//                 </p>
//               </div>
//               <div aria-label={`Saídas: ${fmt(kpis.exits)}`}
//                    className="rounded-[var(--r-xl)] p-4 bg-[var(--red-10)] border border-[var(--border-dim)]">
//                 <p className="text-[9.5px] font-mono font-bold uppercase tracking-[0.8px]
//                               text-[var(--text-muted)] mb-2">Saídas</p>
//                 <p className="text-xl font-bold font-mono tracking-tight text-[var(--text-red)]">
//                   {fmt(kpis.exits)}
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* ── busca + sort + filtros ── */}
//           <section aria-label="Filtrar e ordenar" className="mb-5">
//             <h2 className="sr-only">Filtros e busca</h2>

//             <div className="flex flex-col sm:flex-row gap-3 mb-3">
//               <div className="flex-1">
//                 <Input id="tx-search" label="Buscar" placeholder="Buscar por descrição..."
//                   value={search} leftIcon={<IcoSearch />}
//                   onChange={e => setSearch(e.target.value)} />
//               </div>
//               <div className="sm:w-56">
//                 <Select id="tx-sort" label="Ordenar por" options={SORT_OPTS}
//                   value={sort} onChange={e => setSort(e.target.value as SortKey)} />
//               </div>
//             </div>

//             <div role="group" aria-label="Filtrar por tipo"
//                  className="flex gap-2 flex-wrap items-center">
//               <IcoFilter />
//               {FILTERS.map(opt => (
//                 <button key={opt.value} onClick={() => setFilter(opt.value)}
//                   aria-pressed={filter === opt.value}
//                   className={[
//                     'px-3 py-1 rounded-pill text-[10.5px] font-mono font-semibold',
//                     'border transition-all duration-150',
//                     'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--neon-cyan)]',
//                     filter === opt.value
//                       ? 'bg-[var(--cyan-10)] text-[var(--neon-cyan)] border-[var(--border-cyan)]'
//                       : 'text-[var(--text-muted)] border-[var(--border-dim)] hover:text-[var(--text-primary)] hover:border-[var(--border-soft)]',
//                   ].join(' ')}>
//                   {opt.label}
//                 </button>
//               ))}
//             </div>
//           </section>

//           {/* ── lista ── */}
//           <section aria-label="Lista de transações">
//             <h2 className="sr-only">Transações</h2>

//             {displayed.length === 0 ? (
//               <div role="status" className="flex flex-col items-center justify-center py-20 gap-3 text-center">
//                 <IcoEmpty />
//                 <p className="text-sm text-[var(--text-muted)]">Nenhuma transação encontrada</p>
//                 {(filter || search) && (
//                   <Button variant="ghost" size="sm"
//                     onClick={() => { setFilter(''); setSearch('') }}>
//                     Limpar filtros
//                   </Button>
//                 )}
//               </div>
//             ) : (
//               <ul aria-label="Transações"
//                   className="bg-[var(--bg-glass)] border border-[var(--border-dim)]
//                              rounded-[var(--r-xl)] overflow-hidden">
//                 {displayed.map(tx => (
//                   <TransactionItem key={tx.id} transaction={tx}
//                     onEdit={handleEditOpen} onDelete={handleDelOpen} />
//                 ))}
//               </ul>
//             )}
//           </section>

//         </main>
//       </div>

//       {/* ── MODAL: adicionar ── */}
//       <Modal open={addOpen} onClose={() => setAddOpen(false)}
//              title="Nova transação" subtitle="Preencha os dados para registrar" size="md">
//         <TxForm form={addForm} errors={addErr}
//           onChange={(k, v) => {
//             setAddForm(p => ({ ...p, [k]: v }))
//             if (addErr[k]) setAddErr(p => ({ ...p, [k]: undefined }))
//           }} />
//         <ModalFooter>
//           <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancelar</Button>
//           <Button variant="primary" onClick={handleAdd}>Salvar transação</Button>
//         </ModalFooter>
//       </Modal>

//       {/* ── MODAL: editar ── */}
//       <Modal open={editOpen} onClose={() => setEditOpen(false)}
//              title="Editar transação" subtitle="Altere os dados e confirme" size="md">
//         <TxForm form={editForm} errors={editErr}
//           onChange={(k, v) => {
//             setEditForm(p => ({ ...p, [k]: v }))
//             if (editErr[k]) setEditErr(p => ({ ...p, [k]: undefined }))
//           }} />
//         <ModalFooter>
//           <Button variant="danger" leftIcon={<IcoTrash />}
//             onClick={() => { setEditOpen(false); if (editId) handleDelOpen(editId) }}>
//             Excluir
//           </Button>
//           <Button variant="ghost" onClick={() => setEditOpen(false)}>Cancelar</Button>
//           <Button variant="primary" onClick={handleEditSave}>Salvar alterações</Button>
//         </ModalFooter>
//       </Modal>

//       {/* ── MODAL: confirmar exclusão ── */}
//       <Modal open={delOpen} onClose={() => setDelOpen(false)}
//              title="Confirmar exclusão"
//              subtitle={`Deseja excluir "${delTx?.description ?? ''}"?`} size="sm">
//         <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
//           Esta ação não pode ser desfeita. O saldo será recalculado automaticamente.
//         </p>
//         <ModalFooter>
//           <Button variant="ghost" onClick={() => setDelOpen(false)}>Cancelar</Button>
//           <Button variant="danger" leftIcon={<IcoTrash />} onClick={handleDelConfirm}>
//             Sim, excluir
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </>
//   )
// }