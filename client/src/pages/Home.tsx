import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bot,
  ChevronRight,
  CircleHelp,
  Database,
  Filter,
  Gauge,
  Layers3,
  Link2,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Waves,
} from "lucide-react";
import { demoSnapshot, type EventType, type MarketEvent, type MarketSnapshot } from "@shared/market";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

const typeStyles: Record<EventType, { icon: typeof Activity; tone: string; dot: string }> = {
  wallet_flow: { icon: WalletCards, tone: "bg-[#e4f1ee] text-[#0f5a58]", dot: "bg-[#16827d]" },
  publication: { icon: Sparkles, tone: "bg-[#eee9fb] text-[#5c4a98]", dot: "bg-[#8064c4]" },
  market: { icon: Waves, tone: "bg-[#e7f0fb] text-[#28598a]", dot: "bg-[#4d83be]" },
  news: { icon: Bell, tone: "bg-[#fbefe3] text-[#a85e2b]", dot: "bg-[#d68143]" },
};

const relevanceLabel = { high: "Alta", medium: "Média", low: "Baixa" } as const;
const relevanceTone = { high: "bg-[#e4f1ee] text-[#0f5a58]", medium: "bg-[#fff4dd] text-[#956116]", low: "bg-[#f2f3f3] text-[#6a7477]" } as const;

function ConfidenceRing({ value, small = false }: { value: number; small?: boolean }) {
  const radius = small ? 16 : 22;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (value / 100);
  return (
    <div className={`relative flex shrink-0 items-center justify-center ${small ? "h-10 w-10" : "h-14 w-14"}`}>
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#e7eceb" strokeWidth="4" />
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#0f4c5c" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} />
      </svg>
      <span className={`font-mono font-bold text-[#17343d] ${small ? "text-[10px]" : "text-xs"}`}>{value}%</span>
    </div>
  );
}

function MiniSparkline({ direction }: { direction: "up" | "down" }) {
  const stroke = direction === "up" ? "#16827d" : "#c75e53";
  const points = direction === "up" ? "0,27 12,24 24,26 36,17 48,20 60,9 72,14 84,5 96,8" : "0,8 12,12 24,9 36,18 48,13 60,24 72,20 84,29 96,26";
  return <svg viewBox="0 0 96 34" className="h-8 w-24" aria-hidden="true"><polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function EventCard({ event, selected, onSelect }: { event: MarketEvent; selected: boolean; onSelect: () => void }) {
  const style = typeStyles[event.type];
  const Icon = style.icon;
  return (
    <button onClick={onSelect} className={`group w-full rounded-2xl border p-4 text-left transition-all ${selected ? "border-[#0f4c5c] bg-[#f7fbfa] shadow-[0_8px_24px_rgba(15,76,92,0.08)]" : "border-[#e5ebea] bg-white hover:-translate-y-0.5 hover:border-[#b7ceca] hover:shadow-[0_8px_24px_rgba(15,76,92,0.06)]"}`}>
      <div className="flex gap-3">
        <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.tone}`}><Icon size={17} strokeWidth={1.8} /></div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6d7a7c]">{event.asset} · {event.ageLabel}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${relevanceTone[event.relevance]}`}>{relevanceLabel[event.relevance]}</span>
          </div>
          <h3 className="pr-2 text-[14px] font-semibold leading-snug text-[#17343d]">{event.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#6a7477]">{event.summary}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] text-[#7b888a]">{event.source}</span>
            <div className="flex items-center gap-1.5"><span className="text-[10px] font-semibold text-[#49666a]">{event.confidence}% confiável</span><ChevronRight size={14} className="text-[#9aabac] transition-transform group-hover:translate-x-0.5" /></div>
          </div>
        </div>
      </div>
    </button>
  );
}

function StatCard({ label, value, detail, icon: Icon, accent }: { label: string; value: string; detail: string; icon: typeof Activity; accent: string }) {
  return <div className="rounded-2xl border border-[#e5ebea] bg-white p-4 shadow-[0_4px_16px_rgba(24,54,61,0.025)]"><div className="flex items-start justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#819092]">{label}</p><p className="mt-2 text-[25px] font-semibold tracking-tight text-[#17343d]">{value}</p></div><div className={`rounded-xl p-2.5 ${accent}`}><Icon size={17} /></div></div><p className="mt-3 text-xs text-[#6d7a7c]">{detail}</p></div>;
}

function SourceHealth({ source }: { source: MarketSnapshot["sources"][number] }) {
  const state = source.status === "connected" ? "Conectada" : source.status === "demo" ? "Dados demo" : "Pendente";
  const tone = source.status === "connected" ? "bg-[#d9f1e8] text-[#14725b]" : source.status === "demo" ? "bg-[#e8f1f6] text-[#39647b]" : "bg-[#f1f2f2] text-[#758083]";
  return <div className="flex items-center gap-3 border-b border-[#edf0ef] py-3 last:border-0"><div className={`h-2 w-2 rounded-full ${source.status === "pending" ? "bg-[#b7c0c1]" : "bg-[#3caa84]"}`} /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-xs font-semibold text-[#27464d]">{source.name}</p><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${tone}`}>{state}</span></div><p className="mt-1 truncate text-[10px] text-[#879395]">{source.category} · {source.coverage}</p></div><span className="font-mono text-[10px] text-[#7b888a]">{source.freshness}</span></div>;
}

export default function Home() {
  const snapshotQuery = trpc.market.snapshot.useQuery(undefined, { staleTime: 30_000 });
  const refreshMutation = trpc.market.refresh.useMutation();
  const [selectedId, setSelectedId] = useState(demoSnapshot.events[0].id);
  const [filter, setFilter] = useState<"all" | "high" | "validated">("all");
  const snapshot = snapshotQuery.data ?? demoSnapshot;
  const selected = snapshot.events.find(event => event.id === selectedId) ?? snapshot.events[0];
  const filteredEvents = useMemo(() => snapshot.events.filter(event => filter === "all" || (filter === "high" ? event.relevance === "high" : event.status === "validated")), [filter, snapshot.events]);

  const refresh = async () => {
    await refreshMutation.mutateAsync();
    await snapshotQuery.refetch();
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-[#17343d]">
      <aside className="fixed inset-y-0 left-0 hidden w-[232px] flex-col border-r border-[#e1e9e7] bg-[#fbfcfb] px-5 py-6 lg:flex">
        <div className="flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f4c5c] text-white shadow-[0_6px_15px_rgba(15,76,92,0.2)]"><Layers3 size={18} /></div><div><div className="text-[15px] font-bold tracking-tight text-[#17343d]">Signal Lab</div><div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#7a888a]">contexto antes do candle</div></div></div>
        <div className="mt-10 space-y-1"><p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#99a4a5]">Observatório</p><button className="flex w-full items-center gap-3 rounded-xl bg-[#e7f1ef] px-3 py-2.5 text-left text-xs font-semibold text-[#0f5a58]"><Activity size={16} /> Visão geral</button><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#718082] hover:bg-[#f1f5f4]"><Database size={16} /> Fontes e conectores</button><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#718082] hover:bg-[#f1f5f4]"><Gauge size={16} /> Simulações</button><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#718082] hover:bg-[#f1f5f4]"><Link2 size={16} /> Integrações</button></div>
        <div className="mt-auto rounded-2xl border border-[#dfe9e6] bg-[#f2f8f5] p-3.5"><div className="flex items-center gap-2 text-[#19785f]"><ShieldCheck size={15} /><span className="text-[11px] font-bold">Modo seguro</span></div><p className="mt-2 text-[11px] leading-relaxed text-[#6a7e79]">Somente leitura e simulação. Nenhuma ordem será enviada.</p></div>
      </aside>

      <main className="lg:ml-[232px]">
        <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-[#e4ebe9] bg-[#f6f8f7]/90 px-5 backdrop-blur-xl sm:px-8"><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a9899]">Quarta-feira · 15 outubro 2026</p><h1 className="mt-1 text-xl font-semibold tracking-tight text-[#17343d]">Bom fim de tarde, observador.</h1></div><div className="flex items-center gap-2"><span className="hidden items-center gap-2 rounded-full border border-[#dce8e4] bg-white px-3 py-2 text-[10px] font-semibold text-[#4c6c6d] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#3caa84]" /> dados demo ativos</span><Button variant="outline" size="sm" onClick={refresh} disabled={snapshotQuery.isFetching || refreshMutation.isPending} className="h-9 rounded-xl border-[#dce5e3] bg-white text-xs text-[#4b686b]"><RefreshCw size={14} className={snapshotQuery.isFetching ? "mr-2 animate-spin" : "mr-2"} /> Atualizar</Button><button className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#dce5e3] bg-white text-[#688082]"><Bell size={16} /></button></div></header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8">
          <div className="mb-7 flex flex-col justify-between gap-4 xl:flex-row xl:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#4f777a]"><span className="h-1.5 w-1.5 rounded-full bg-[#16827d]" /> inteligência de dados</div><h2 className="text-[29px] font-semibold tracking-[-0.04em] text-[#17343d]">O que mudou fora do gráfico?</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6c7b7d]">Eventos, fluxos e publicações filtrados por relevância antes de chegarem à sua leitura técnica.</p></div><div className="flex items-center gap-2 rounded-2xl border border-[#e2eae8] bg-white px-3.5 py-2.5 text-xs text-[#718082]"><Bot size={16} className="text-[#0f4c5c]" /><span>Pipeline IA</span><span className="font-mono font-semibold text-[#0f5a58]">triagem ativa</span></div></div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Eventos monitorados" value={String(snapshot.summary.eventsToday)} detail="últimas 24 horas · 6 alta relevância" icon={Activity} accent="bg-[#e7f1ef] text-[#0f6d68]" /><StatCard label="Confiança média" value={`${snapshot.summary.avgConfidence}%`} detail="após cruzamento de fontes" icon={ShieldCheck} accent="bg-[#eaf0f8] text-[#35628a]" /><StatCard label="Fontes operacionais" value={`${snapshot.summary.sourcesOnline}/4`} detail="3 demo · 1 aguardando conexão" icon={Database} accent="bg-[#f4eee5] text-[#a36532]" /><StatCard label="Janela de reação" value="30–120m" detail="comparação evento → gráfico" icon={Waves} accent="bg-[#eeeafb] text-[#69529f]" /></div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.75fr)]">
            <section><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-sm font-bold text-[#27464d]">Trilha de eventos</h3><p className="mt-1 text-xs text-[#829091]">Informação com origem, contexto e evidência.</p></div><div className="flex items-center gap-2"><div className="hidden items-center gap-2 rounded-xl border border-[#e3eae8] bg-white px-3 py-2 text-xs text-[#839092] sm:flex"><Search size={14} /> buscar eventos</div><div className="flex rounded-xl border border-[#e2e9e7] bg-white p-1"><button onClick={() => setFilter("all")} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${filter === "all" ? "bg-[#e7f1ef] text-[#0f5a58]" : "text-[#839092]"}`}>Todos</button><button onClick={() => setFilter("high")} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${filter === "high" ? "bg-[#e7f1ef] text-[#0f5a58]" : "text-[#839092]"}`}>Alta</button><button onClick={() => setFilter("validated")} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${filter === "validated" ? "bg-[#e7f1ef] text-[#0f5a58]" : "text-[#839092]"}`}>Validados</button></div></div></div><div className="space-y-3">{filteredEvents.map(event => <EventCard key={event.id} event={event} selected={selected?.id === event.id} onSelect={() => setSelectedId(event.id)} />)}</div></section>

            <aside className="space-y-6"><section className="rounded-2xl border border-[#e3ebe9] bg-white p-5"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b9899]">Evento selecionado</p><h3 className="mt-2 text-lg font-semibold tracking-tight text-[#17343d]">{selected?.asset} · {selected?.typeLabel}</h3></div>{selected && <ConfidenceRing value={selected.confidence} />}</div>{selected && <><p className="mt-4 text-sm font-semibold leading-snug text-[#294951]">{selected.title}</p><div className="mt-4 rounded-xl bg-[#f6f9f8] p-3.5"><div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#849193]">reação observada</span><span className={`flex items-center gap-1 font-mono text-xs font-semibold ${selected.priceReaction.direction === "down" ? "text-[#b3544e]" : selected.priceReaction.direction === "up" ? "text-[#16827d]" : "text-[#7c898b]"}`}>{selected.priceReaction.direction === "down" ? <ArrowDownRight size={13} /> : selected.priceReaction.direction === "up" ? <ArrowUpRight size={13} /> : null}{selected.priceReaction.percentage > 0 ? "+" : ""}{selected.priceReaction.percentage.toFixed(2).replace(".", ",")}%</span></div><div className="flex items-center justify-between"><span className="text-xs text-[#728082]">janela de {selected.priceReaction.window}</span><MiniSparkline direction={selected.priceReaction.direction === "down" ? "down" : "up"} /></div></div><div className="mt-5"><div className="mb-2 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#849193]">evidências</p><span className="font-mono text-[10px] text-[#859294]">{selected.confirmations} confirmações</span></div><div className="space-y-2">{selected.evidence.map((item, index) => <div key={item} className="flex gap-2.5 text-xs leading-relaxed text-[#657477]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16827d]" />{item}</div>)}</div></div><div className="mt-5 flex items-center justify-between border-t border-[#edf0ef] pt-4"><span className="font-mono text-[10px] text-[#8b9899]">{selected.source}</span><span className="rounded-full bg-[#e7f1ef] px-2.5 py-1 text-[10px] font-semibold text-[#0f5a58]">{selected.status === "validated" ? "validado" : selected.status === "simulated" ? "simulado" : "em observação"}</span></div></>}</section>

              <section className="rounded-2xl border border-[#e3ebe9] bg-white p-5"><div className="mb-2 flex items-center justify-between"><div><h3 className="text-sm font-bold text-[#27464d]">Saúde das fontes</h3><p className="mt-1 text-xs text-[#829091]">Última atualização e cobertura.</p></div><button className="rounded-lg p-1.5 text-[#92a0a0] hover:bg-[#f3f6f5]"><Filter size={15} /></button></div><div>{snapshot.sources.map(source => <SourceHealth key={source.name} source={source} />)}</div></section>

              <section className="rounded-2xl border border-[#dce9e4] bg-[#f1f8f5] p-5"><div className="flex items-center gap-2 text-[#176d5d]"><CircleHelp size={15} /><h3 className="text-xs font-bold">Leitura responsável</h3></div><p className="mt-3 text-xs leading-relaxed text-[#648078]">Um evento relevante é uma pista, não uma certeza. O Signal Lab mostra a origem e a reação posterior para você validar a hipótese no seu analisador de gráficos.</p></section></aside>
          </div>

          <section className="mt-7 rounded-2xl border border-[#e3ebe9] bg-white p-5"><div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><h3 className="text-sm font-bold text-[#27464d]">Participantes monitorados</h3><p className="mt-1 text-xs text-[#829091]">Ranking por histórico realizado, consistência e risco — sem alegações isoladas.</p></div><Button variant="ghost" size="sm" className="w-fit text-xs text-[#0f5a58]">Ver histórico completo <ChevronRight size={14} className="ml-1" /></Button></div><div className="grid gap-3 md:grid-cols-3">{snapshot.participants.map((participant, index) => <div key={participant.label} className="flex items-center gap-3 rounded-xl border border-[#edf1ef] bg-[#fbfcfb] p-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edf4f1] font-mono text-xs font-bold text-[#0f5a58]">0{index + 1}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-[#34545a]">{participant.label}</p><div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-[#7c898b]"><span>{participant.winRate} acerto</span><span className="text-[#b4c0bf]">·</span><span className="text-[#16827d]">{participant.realized}</span></div></div><div className="text-right"><p className="text-[10px] font-semibold text-[#456268]">{participant.signal}</p><p className="mt-1 text-[10px] text-[#8a9798]">risco {participant.risk}</p></div></div>)}</div></section>

          <footer className="flex flex-col justify-between gap-2 py-7 text-[10px] text-[#94a0a1] sm:flex-row"><span>Signal Lab · dados demonstrativos · atualizado {snapshot.asOf}</span><span className="flex items-center gap-1.5"><ShieldCheck size={12} /> somente leitura · sem execução de ordens</span></footer>
        </div>
      </main>
    </div>
  );
}
