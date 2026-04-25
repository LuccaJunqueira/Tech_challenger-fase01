import { Sidebar } from "@/components/layout/sidebar";

export default function Home() {
  return <Sidebar />;
}
 // /**
//  * Home — Página inicial do ByteBank (landing)
//  *
//  * Estrutura fiel ao briefing:
//  * - Topbar com logo + nav + CTAs
//  * - Hero: texto à esquerda | visual do cartão neon à direita (full bleed)
//  * - Feature cards: Instant Payments, Expense Management, Advanced Technology
//  * - Footer simples
//  *
//  * Acessibilidade:
//  * - skip-to-content no topo
//  * - landmarks semânticos (header, main, nav, section, footer)
//  * - heading hierarchy: h1 → h2 → h3
//  * - aria-labels em links e botões de ícone
//  * - prefers-reduced-motion respeitado via globals.css
//  * - imagens com alt descritivo (ou aria-hidden se decorativas)
//  */

// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Badge }  from '@/components/ui/badge'

// // ─── ÍCONES SVG (inline, sem dependência externa) ─────────
// function IconCard() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
//          aria-hidden="true">
//       <rect x="1" y="4" width="14" height="10" rx="2"/>
//       <path d="M1 8h14"/>
//       <circle cx="4.5" cy="12" r=".8" fill="currentColor"/>
//     </svg>
//   )
// }
// function IconCheck() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
//          aria-hidden="true">
//       <circle cx="8" cy="8" r="6"/>
//       <path d="M5 8l2.5 2.5L11 5.5"/>
//     </svg>
//   )
// }
// function IconChart() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
//          aria-hidden="true">
//       <path d="M2 12l3.5-4 3 2.5L12 5M14 5h-3M14 5v3"/>
//     </svg>
//   )
// }
// function IconArrow() {
//   return (
//     <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
//          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
//          aria-hidden="true">
//       <path d="M2 7h10M8 3l4 4-4 4"/>
//     </svg>
//   )
// }
// function IconStar() {
//   return (
//     <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
//          aria-hidden="true">
//       <circle cx="5" cy="5" r="2"/>
//     </svg>
//   )
// }

// // ─── DADOS ESTÁTICOS ──────────────────────────────────────
// const FEATURES = [
//   {
//     icon:    <IconCard />,
//     color:   'purple',
//     title:   'Instant Payments',
//     desc:    'Depósitos, transferências e pagamentos processados em tempo real, sem burocracia.',
//     border:  'hover:border-[var(--border-purple)]',
//     iconBg:  'bg-[var(--purple-10)] border-[rgba(168,85,247,0.18)] text-[var(--neon-purple)]',
//   },
//   {
//     icon:    <IconCheck />,
//     color:   'pink',
//     title:   'Expense Management',
//     desc:    'Categorize e acompanhe cada saída com clareza. Seu dinheiro sob controle total.',
//     border:  'hover:border-[var(--border-pink)]',
//     iconBg:  'bg-[var(--pink-10)] border-[rgba(236,72,153,0.18)] text-[var(--neon-pink)]',
//   },
//   {
//     icon:    <IconChart />,
//     color:   'cyan',
//     title:   'Advanced Technology',
//     desc:    'Interface construída com Next.js e design system consistente para máxima usabilidade.',
//     border:  'hover:border-[var(--border-cyan)]',
//     iconBg:  'bg-[var(--cyan-10)] border-[rgba(34,211,238,0.18)] text-[var(--neon-cyan)]',
//   },
// ] as const

// const STATS = [
//   { value: '+12k',  label: 'Usuários ativos',          color: 'text-[var(--neon-cyan)]'   },
//   { value: 'R$2M+', label: 'Transações gerenciadas',   color: 'text-[var(--neon-purple)]' },
//   { value: '99.9%', label: 'Uptime garantido',         color: 'text-[var(--neon-green)]'  },
// ] as const

// const NAV_LINKS = [
//   { href: '#recursos',   label: 'Recursos'   },
//   { href: '#seguranca',  label: 'Segurança'  },
//   { href: '#precos',     label: 'Preços'     },
//   { href: '#sobre',      label: 'Sobre'      },
// ] as const

// // ─── COMPONENTE: BARRA DE NAVEGAÇÃO ───────────────────────
// function Topbar() {
//   return (
//     <header
//       className="relative z-20 flex items-center justify-between
//                  px-6 md:px-12 py-4
//                  border-b border-[var(--border-dim)]"
//     >
//       {/* Logo */}
//       <div className="flex items-center gap-2.5">
//         <div
//           aria-hidden="true"
//           className="w-9 h-9 rounded-[10px] flex items-center justify-center
//                      bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)]"
//         >
//           <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
//                stroke="#020617" strokeWidth="2.5" strokeLinecap="round">
//             <path d="M2 9h14M9 2v14M4 5l10 8M14 5L4 13"/>
//           </svg>
//         </div>
//         <span className="text-lg font-bold tracking-tight">
//           <span className="text-[var(--text-primary)]">Byte</span>
//           <span className="text-grad-cyan-purple">bank</span>
//         </span>
//       </div>

//       {/* Nav central — oculta em mobile */}
//       <nav aria-label="Navegação principal">
//         <ul className="hidden md:flex items-center gap-7 list-none">
//           {NAV_LINKS.map(({ href, label }) => (
//             <li key={href}>
//               <a
//                 href={href}
//                 className="text-sm text-[var(--text-secondary)]
//                            hover:text-[var(--text-primary)]
//                            transition-colors duration-150"
//               >
//                 {label}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* CTAs */}
//       <div className="flex items-center gap-2.5">
//         <Button variant="ghost" size="sm" asChild>
//           <Link href="/login">Entrar</Link>
//         </Button>
//         <Button variant="primary" size="sm" asChild>
//           <Link href="/login">Criar conta grátis</Link>
//         </Button>
//       </div>
//     </header>
//   )
// }

// // ─── COMPONENTE: CARTÃO NEON (hero visual) ────────────────
// // Representa a imagem 1 do briefing — cartão neon com moedas e gráfico
// // Substituir o div.card-placeholder pelo <img> quando tiver o arquivo
// function NeonCardVisual() {
//   return (
//     <div
//       aria-hidden="true"
//       className="relative w-full h-full flex items-center justify-center"
//     >
//       {/* Glow de fundo */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full
//                         bg-[var(--neon-purple)] opacity-20 blur-[80px]" />
//         <div className="absolute bottom-1/3 right-1/3 w-52 h-52 rounded-full
//                         bg-[var(--neon-cyan)] opacity-12 blur-[60px]" />
//       </div>

//       {/*
//         ── SUBSTITUIÇÃO ──────────────────────────────────────
//         Para usar a imagem real, substitua todo este bloco por:

//         <img
//           src="/images/hero-card.png"
//           alt=""
//           aria-hidden="true"
//           className="w-full h-full object-contain object-center
//                      drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
//         />
//         ─────────────────────────────────────────────────────
//       */}

//       {/* Cartão neon SVG */}
//       <div className="relative z-10 flex flex-col items-center gap-6">
//         {/* Moedas flutuantes */}
//         <div className="relative w-[340px]">
//           {/* Coin top-left */}
//           <div className="absolute -top-6 -left-4 w-11 h-11 rounded-full
//                           bg-[var(--neon-cyan)] flex items-center justify-center
//                           text-[var(--bg-deep)] text-xs font-bold font-mono
//                           shadow-[0_0_16px_rgba(34,211,238,0.7)]
//                           animate-[float_3s_ease-in-out_infinite]">
//             $
//           </div>
//           {/* Coin top-right */}
//           <div className="absolute -top-2 right-0 w-9 h-9 rounded-full
//                           bg-[var(--neon-purple)] flex items-center justify-center
//                           text-white text-xs font-bold font-mono
//                           shadow-[0_0_14px_rgba(168,85,247,0.7)]
//                           animate-[float_4s_ease-in-out_infinite_0.5s]">
//             ₿
//           </div>
//           {/* Coin bottom-right */}
//           <div className="absolute -bottom-4 right-8 w-10 h-10 rounded-full
//                           bg-[var(--neon-pink)] flex items-center justify-center
//                           text-white text-xs font-bold font-mono
//                           shadow-[0_0_14px_rgba(236,72,153,0.7)]
//                           animate-[float_3.5s_ease-in-out_infinite_1s]">
//             €
//           </div>

//           {/* Cartão principal */}
//           <div className="relative w-full rounded-2xl px-6 py-5 overflow-hidden
//                           bg-gradient-to-br from-[rgba(168,85,247,0.18)] to-[rgba(34,211,238,0.10)]
//                           border border-[rgba(168,85,247,0.4)]
//                           shadow-[0_0_40px_rgba(168,85,247,0.25)]">
//             {/* Grid lines decorativas */}
//             <div
//               className="absolute inset-0 opacity-[0.04] pointer-events-none"
//               style={{
//                 backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 28px)',
//               }}
//             />
//             {/* Chip */}
//             <div className="w-9 h-6 rounded-[4px] mb-5
//                             bg-gradient-to-br from-[rgba(34,211,238,0.5)] to-[rgba(168,85,247,0.4)]
//                             border border-[rgba(34,211,238,0.4)]
//                             shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
//             {/* Número */}
//             <p className="font-mono text-sm tracking-[2px]
//                           text-[rgba(255,255,255,0.7)] mb-4">
//               1234 5678 9876 5432
//             </p>
//             {/* Rodapé do cartão */}
//             <div className="flex items-end justify-between">
//               <div>
//                 <p className="font-mono text-[10px] uppercase tracking-widest
//                               text-[rgba(255,255,255,0.4)] mb-0.5">
//                   CARDHOLDER
//                 </p>
//                 <p className="font-mono text-sm text-[rgba(255,255,255,0.7)]">
//                   Thamiris A.
//                 </p>
//               </div>
//               <div className="w-9 h-9 rounded-full
//                               bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-pink)]
//                               opacity-80 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />
//             </div>
//           </div>
//         </div>

//         {/* Gráfico de barras neon */}
//         <div className="flex items-end gap-1.5" aria-hidden="true">
//           {[24,36,28,44,32,52,40,58,38,64].map((h, i) => {
//             const colors = [
//               'rgba(34,211,238,0.5)', 'rgba(168,85,247,0.5)',
//               'rgba(34,211,238,0.4)', 'rgba(168,85,247,0.6)',
//               'rgba(34,211,238,0.5)', 'rgba(236,72,153,0.5)',
//               'rgba(168,85,247,0.5)', 'rgba(34,211,238,0.6)',
//               'rgba(168,85,247,0.4)', 'rgba(34,211,238,0.7)',
//             ]
//             return (
//               <div
//                 key={i}
//                 className="w-3 rounded-t-[3px] transition-all duration-300"
//                 style={{
//                   height: `${h}px`,
//                   background: colors[i],
//                   boxShadow: `0 0 8px ${colors[i]}`,
//                 }}
//               />
//             )
//           })}
//         </div>
//       </div>

//       {/* Float card — saldo sobreposto */}
//       <div className="absolute bottom-12 left-0 z-20
//                       bg-[rgba(2,6,23,0.92)] border border-[var(--border-cyan)]
//                       rounded-[var(--r-lg)] px-4 py-3
//                       backdrop-blur-md
//                       shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(34,211,238,0.12)]">
//         <p className="text-[9.5px] font-mono font-bold uppercase tracking-[0.8px]
//                       text-[var(--text-muted)] mb-1">
//           Saldo disponível
//         </p>
//         <p className="text-xl font-bold font-mono text-[var(--neon-cyan)]">
//           R$ 12.480,90
//         </p>
//         <Badge tone="green" className="mt-1.5">↑ +3,2% este mês</Badge>
//       </div>
//     </div>
//   )
// }

// // ─── PÁGINA ───────────────────────────────────────────────
// export default function HomePage() {
//   return (
//     <>
//       {/* Skip to content — acessibilidade teclado */}
//       <a href="#main-content" className="skip-to-content">
//         Ir para o conteúdo principal
//       </a>

//       <div className="min-h-screen bg-[var(--bg-deep)] overflow-x-hidden">

//         {/* Orbs de fundo — decorativos */}
//         <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//           <div className="absolute -top-40 -right-20 w-[560px] h-[560px] rounded-full
//                           bg-[var(--neon-purple)] opacity-[0.14] blur-[100px]
//                           animate-pulse-glow" />
//           <div className="absolute -bottom-32 -left-20 w-[480px] h-[480px] rounded-full
//                           bg-[var(--neon-cyan)] opacity-[0.11] blur-[90px]
//                           animate-pulse-glow [animation-delay:2s]" />
//           <div className="absolute top-[45%] left-[46%] w-64 h-64 rounded-full
//                           bg-[var(--neon-pink)] opacity-[0.09] blur-[80px]
//                           animate-pulse-glow [animation-delay:4s]" />
//         </div>

//         {/* ── TOPBAR ── */}
//         <Topbar />

//         {/* ── MAIN ── */}
//         <main id="main-content" className="relative z-10">

//           {/* ── HERO ─────────────────────────────────────────── */}
//           <section
//             aria-labelledby="hero-heading"
//             className="grid grid-cols-1 lg:grid-cols-2
//                        min-h-[calc(100vh-73px)]"
//           >
//             {/* Esquerda — texto */}
//             <div className="flex flex-col justify-center
//                             px-6 md:px-12 py-16 lg:py-0 gap-7">

//               {/* Eyebrow */}
//               <div className="inline-flex items-center gap-2 self-start
//                               px-3.5 py-1.5 rounded-pill
//                               bg-[var(--cyan-10)] border border-[var(--border-cyan)]">
//                 <IconStar />
//                 <span className="text-[10.5px] font-mono font-semibold
//                                  text-[var(--neon-cyan)] tracking-[0.5px]">
//                   Controle financeiro inteligente
//                 </span>
//               </div>

//               {/* Headline */}
//               <h1
//                 id="hero-heading"
//                 className="text-5xl md:text-[56px] font-extrabold
//                            leading-[1.06] tracking-[-2px]
//                            text-[var(--text-primary)]"
//               >
//                 Money<br />Transfers<br />
//                 <span className="text-grad-full">Made Simple.</span>
//               </h1>

//               {/* Sub */}
//               <p className="text-base text-[var(--text-secondary)]
//                             leading-[1.75] max-w-[440px]">
//                 Gerencie suas transações, acompanhe seu saldo e organize
//                 suas finanças — em uma plataforma moderna, segura e sem
//                 complicações.
//               </p>

//               {/* CTAs */}
//               <div className="flex flex-wrap gap-3">
//                 <Button variant="primary" size="lg" rightIcon={<IconArrow />} asChild>
//                   <Link href="/login">Começar agora</Link>
//                 </Button>
//                 <Button variant="ghost" size="lg" asChild>
//                   <Link href="#recursos">Ver demonstração</Link>
//                 </Button>
//               </div>

//               {/* Feature mini-cards — igual ao arquivo de referência */}
//               <div
//                 role="list"
//                 aria-label="Principais funcionalidades"
//                 className="grid grid-cols-3 gap-3 mt-1"
//               >
//                 {FEATURES.map(f => (
//                   <div
//                     key={f.title}
//                     role="listitem"
//                     className={[
//                       'flex flex-col items-center text-center gap-2',
//                       'p-3.5 rounded-[var(--r-lg)]',
//                       'border border-[var(--border-dim)]',
//                       'bg-[var(--bg-glass)]',
//                       'transition-all duration-200',
//                       f.border,
//                     ].join(' ')}
//                   >
//                     <div className={[
//                       'w-9 h-9 rounded-[var(--r-sm)] border',
//                       'flex items-center justify-center',
//                       f.iconBg,
//                     ].join(' ')}>
//                       {f.icon}
//                     </div>
//                     <span className="text-[10.5px] font-semibold text-[var(--text-primary)]
//                                      leading-tight">
//                       {f.title}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Stats */}
//               <div
//                 aria-label="Números do ByteBank"
//                 className="flex divide-x divide-[var(--border-dim)]
//                            border border-[var(--border-dim)] rounded-[var(--r-lg)]
//                            bg-[var(--bg-glass)] self-start overflow-hidden"
//               >
//                 {STATS.map(({ value, label, color }) => (
//                   <div key={label} className="px-5 py-3">
//                     <p className={`text-xl font-bold font-mono tracking-tight ${color}`}>
//                       {value}
//                     </p>
//                     <p className="text-[10.5px] text-[var(--text-muted)] mt-0.5">
//                       {label}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Direita — visual do cartão neon (full bleed) */}
//             <div
//               className="relative hidden lg:block overflow-hidden"
//               aria-hidden="true"
//             >
//               {/* Fade suave para a esquerda — integra com coluna de texto */}
//               <div className="absolute left-0 top-0 bottom-0 w-28 z-10
//                               bg-gradient-to-r from-[var(--bg-deep)] to-transparent
//                               pointer-events-none" />
//               <NeonCardVisual />
//             </div>
//           </section>

//           {/* ── FEATURES SECTION ───────────────────────────── */}
//           <section
//             id="recursos"
//             aria-labelledby="features-heading"
//             className="px-6 md:px-12 pb-20 pt-4"
//           >
//             <h2 id="features-heading" className="sr-only">
//               Recursos principais
//             </h2>

//             <div
//               role="list"
//               className="grid grid-cols-1 md:grid-cols-3 gap-4"
//             >
//               {FEATURES.map(f => (
//                 <article
//                   key={f.title}
//                   role="listitem"
//                   className={[
//                     'flex flex-col gap-3 p-6',
//                     'rounded-[var(--r-xl)]',
//                     'bg-[var(--bg-glass)] border border-[var(--border-dim)]',
//                     'transition-all duration-200 group',
//                     f.border,
//                   ].join(' ')}
//                 >
//                   <div className={[
//                     'w-10 h-10 rounded-[var(--r-sm)] border',
//                     'flex items-center justify-center',
//                     f.iconBg,
//                   ].join(' ')}>
//                     {f.icon}
//                   </div>
//                   <h3 className="text-sm font-semibold text-[var(--text-primary)]">
//                     {f.title}
//                   </h3>
//                   <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
//                     {f.desc}
//                   </p>
//                 </article>
//               ))}
//             </div>
//           </section>
//         </main>

//         {/* ── FOOTER ── */}
//         <footer
//           className="relative z-10 border-t border-[var(--border-dim)]
//                      px-6 md:px-12 py-6
//                      flex flex-col md:flex-row items-center justify-between
//                      gap-4"
//         >
//           <p className="text-xs text-[var(--text-muted)]">
//             © 2026 ByteBank · Projeto acadêmico POSTECH
//           </p>
//           <nav aria-label="Links do rodapé">
//             <ul className="flex gap-6 list-none">
//               {['Contato', 'Social', 'Endereço', 'Termos'].map(item => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-xs text-[var(--text-muted)]
//                                hover:text-[var(--text-secondary)]
//                                transition-colors duration-150"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </footer>
//       </div>

//       {/* Animação float para as moedas */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-8px); }
//         }
//       `}</style>
//     </>
//   )
// }
