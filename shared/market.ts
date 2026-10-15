export type EventType = "wallet_flow" | "publication" | "market" | "news";
export type Relevance = "high" | "medium" | "low";
export type EventStatus = "new" | "validated" | "simulated";
export type Direction = "up" | "down" | "flat";

export type MarketAsset = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changeDirection: "up" | "down";
  volume: string;
  confidence: number;
};

export type MarketEvent = {
  id: string;
  asset: string;
  type: EventType;
  typeLabel: string;
  title: string;
  summary: string;
  source: string;
  occurredAt: string;
  ageLabel: string;
  relevance: Relevance;
  confidence: number;
  confirmations: number;
  priceReaction: {
    window: string;
    direction: Direction;
    percentage: number;
  };
  status: EventStatus;
  evidence: string[];
};

export type MarketSource = {
  name: string;
  category: string;
  status: "connected" | "demo" | "pending";
  coverage: string;
  freshness: string;
};

export type Participant = {
  label: string;
  kind: "wallet" | "trader";
  winRate: string;
  realized: string;
  risk: "baixo" | "médio" | "alto";
  signal: string;
};

export type MarketSnapshot = {
  mode: "demo" | "live";
  asOf: string;
  assets: MarketAsset[];
  events: MarketEvent[];
  sources: MarketSource[];
  participants: Participant[];
  summary: {
    eventsToday: number;
    highRelevance: number;
    sourcesOnline: number;
    avgConfidence: number;
  };
};

export const demoSnapshot: MarketSnapshot = {
  mode: "demo",
  asOf: "15 out 2026 · 18:36 BRT",
  assets: [
    { symbol: "BTC", name: "Bitcoin", price: "$108.642", change: "+2,84%", changeDirection: "up", volume: "$42,8 bi", confidence: 86 },
    { symbol: "ETH", name: "Ethereum", price: "$4.012", change: "+1,26%", changeDirection: "up", volume: "$19,4 bi", confidence: 74 },
    { symbol: "SOL", name: "Solana", price: "$238,16", change: "-0,42%", changeDirection: "down", volume: "$6,9 bi", confidence: 68 },
    { symbol: "LINK", name: "Chainlink", price: "$26,48", change: "+4,17%", changeDirection: "up", volume: "$1,2 bi", confidence: 79 },
  ],
  events: [
    {
      id: "evt-001",
      asset: "BTC",
      type: "wallet_flow",
      typeLabel: "Fluxo de carteira",
      title: "Acumulação de BTC em carteiras de alta liquidez",
      summary: "Entradas líquidas em 18 carteiras monitoradas, com concentração em corretoras de primeira linha.",
      source: "On-chain / demo",
      occurredAt: "2026-10-15T18:22:00-03:00",
      ageLabel: "14 min atrás",
      relevance: "high",
      confidence: 86,
      confirmations: 4,
      priceReaction: { window: "30 min", direction: "up", percentage: 0.92 },
      status: "validated",
      evidence: ["18 carteiras com histórico de alta liquidez", "Volume agregado acima da média de 30 dias", "Movimento confirmado por 4 fontes internas"],
    },
    {
      id: "evt-002",
      asset: "LINK",
      type: "publication",
      typeLabel: "Publicação",
      title: "Trader monitorado publica entrada escalonada",
      summary: "Publicação descreve uma entrada em três etapas, mas ainda depende de confirmação de liquidez no mercado.",
      source: "Binance Feed / demo",
      occurredAt: "2026-10-15T17:48:00-03:00",
      ageLabel: "48 min atrás",
      relevance: "medium",
      confidence: 71,
      confirmations: 2,
      priceReaction: { window: "60 min", direction: "up", percentage: 1.18 },
      status: "simulated",
      evidence: ["Histórico do perfil: 63% de acerto em 41 sinais", "Texto indica condição de entrada, não garantia", "Sem confirmação independente de fluxo"],
    },
    {
      id: "evt-003",
      asset: "ETH",
      type: "market",
      typeLabel: "Mercado",
      title: "Volume à vista supera média de 7 dias",
      summary: "Aumento de volume ocorreu junto com redução de spread; ainda não há evidência de tendência sustentada.",
      source: "Binance Market / demo",
      occurredAt: "2026-10-15T16:55:00-03:00",
      ageLabel: "1 h 41 min atrás",
      relevance: "medium",
      confidence: 78,
      confirmations: 3,
      priceReaction: { window: "90 min", direction: "flat", percentage: 0.08 },
      status: "validated",
      evidence: ["Volume spot +34% contra a média de 7 dias", "Spread mediano recuou 12%", "Reação de preço ainda lateral"],
    },
    {
      id: "evt-004",
      asset: "SOL",
      type: "news",
      typeLabel: "Notícia",
      title: "Atualização de rede entra em janela de observação",
      summary: "Notícia pública pode afetar liquidez e sentimento; o sistema aguarda confirmação de impacto on-chain.",
      source: "Publicações públicas / demo",
      occurredAt: "2026-10-15T15:40:00-03:00",
      ageLabel: "2 h 56 min atrás",
      relevance: "low",
      confidence: 54,
      confirmations: 1,
      priceReaction: { window: "120 min", direction: "down", percentage: -0.63 },
      status: "new",
      evidence: ["Fonte pública identificada", "Sem confirmação de fluxo de carteiras", "Impacto observado ainda inconclusivo"],
    },
  ],
  sources: [
    { name: "Binance Market", category: "Preço e volume", status: "demo", coverage: "Spot · futuros", freshness: "14 min" },
    { name: "Binance Feed", category: "Publicações", status: "demo", coverage: "Perfis monitorados", freshness: "48 min" },
    { name: "On-chain monitor", category: "Carteiras", status: "demo", coverage: "BTC · ETH · SOL", freshness: "14 min" },
    { name: "News index", category: "Contexto externo", status: "pending", coverage: "Fontes públicas", freshness: "não conectado" },
  ],
  participants: [
    { label: "Carteiras de alta liquidez", kind: "wallet", winRate: "—", realized: "+18,4%", risk: "médio", signal: "Acumulação" },
    { label: "Trader monitorado #17", kind: "trader", winRate: "63%", realized: "+11,9%", risk: "médio", signal: "Entrada escalonada" },
    { label: "Carteiras de longo prazo", kind: "wallet", winRate: "—", realized: "+8,7%", risk: "baixo", signal: "Sem alteração" },
  ],
  summary: { eventsToday: 27, highRelevance: 6, sourcesOnline: 3, avgConfidence: 73 },
};
