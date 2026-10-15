# Signal Lab — Plano do MVP

## Objetivo

Construir a primeira versão funcional de um aplicativo de inteligência de dados para criptomoedas. O MVP não executará ordens nem tentará adivinhar o mercado: ele exibirá dados demonstrativos estruturados como eventos, evidências, sinais contextuais e reações de preço para validar o fluxo de coleta → filtragem → interpretação → teste.

## Escopo da primeira entrega

### Incluído

- Dashboard de inteligência de mercado em português brasileiro.
- Visão resumida de ativos observados, eventos recentes, fontes ativas e qualidade dos dados.
- Feed de eventos externos com origem, horário, tipo, ativo, impacto observado, evidências e nível de confiança.
- Camada de filtragem visual: relevância, confirmação entre fontes, recência, liquidez e status de validação.
- Comparação evento → reação de preço/volume com dados demonstrativos.
- Ranking inicial de participantes/carteiras com desempenho realizado, consistência e risco.
- Estado explícito de `simulação / somente leitura`, sem execução de ordens.
- API interna/tRPC com dados demo e estrutura pronta para substituir por conectores reais.
- Esquema inicial Drizzle para ativos, fontes, eventos e resultados de análise.
- Manifesto de rotas e health check.

### Fora do escopo nesta etapa

- Chaves reais da Binance ou de provedores on-chain.
- Scraping ou coleta de informação não autorizada.
- Execução automática de ordens.
- Promessa de rentabilidade ou recomendação financeira personalizada.
- Treinamento de modelo próprio.
- Integração final com o analisador de gráficos externo; nesta versão será definido um contrato de saída demonstrativo.

## Arquitetura de implementação

- **Frontend:** React + TypeScript + Tailwind, uma tela operacional com navegação lateral e painéis de evidência.
- **Backend:** Express + tRPC; procedimentos públicos para dados demonstrativos e status de fontes.
- **Persistência:** Drizzle/MySQL com tabelas incrementais para fontes, ativos, eventos e análises; o dashboard mantém fallback demo para funcionar mesmo antes da primeira carga do banco.
- **Camada de dados:** adaptadores futuros para Binance, APIs de blockchain, notícias e publicações; cada adaptador deverá retornar registros normalizados com origem e timestamp.
- **IA:** a integração real com o LLM será adicionada depois que o contrato dos eventos estiver estável; o MVP simula a saída estruturada para validar UX e pipeline.
- **Validação:** backtest/paper trading será representado como estado e resultado de simulação, sem efeitos colaterais externos.

## Contrato conceitual de evento

```ts
{
  id: string,
  asset: string,
  type: "wallet_flow" | "publication" | "market" | "news",
  title: string,
  summary: string,
  source: string,
  occurredAt: string,
  relevance: "high" | "medium" | "low",
  confidence: number,
  confirmations: number,
  priceReaction: { window: string, direction: "up" | "down" | "flat", percentage: number },
  status: "new" | "validated" | "simulated"
}
```

## Design

### Alternativas consideradas

1. **Terminal editorial escuro** — 0,07: uma sala de operações silenciosa, com tipografia monoespaçada e sinais de alta densidade.
2. **Observatório de evidências** — 0,05: uma interface clara, com camadas de fontes, relações e confiança visualizadas como um mapa investigativo.
3. **Caderno quantitativo** — 0,08: um painel leve e tabelar, inspirado em research notebooks e relatórios de mercado.

### Escolha: Observatório de evidências

- **Design Movement:** editorial de dados / observatório investigativo.
- **Core Principles:** rastreabilidade, calma analítica, hierarquia de evidências e leitura rápida sem alarmismo.
- **Color Philosophy:** fundo marfim muito claro para reduzir a sensação de cassino; azul petróleo como assinatura de confiança; verde e coral apenas como estados semânticos, nunca como decoração.
- **Layout Paradigm:** composição assimétrica em duas colunas: uma trilha vertical de eventos à esquerda e uma coluna de diagnóstico/evidências à direita; sem grande hero central.
- **Signature Elements:** marcador de confiança em forma de “anel”, linha do tempo de eventos e chips de fonte com timestamp.
- **Interaction Philosophy:** cada sinal deve mostrar de onde veio, por que foi classificado e o que ainda falta confirmar; filtros mudam a densidade, não escondem a proveniência.
- **Animation:** transições curtas e discretas; novas evidências entram pela trilha com fade/slide de poucos pixels; nenhum efeito pulsante que simule urgência de trading.
- **Typography System:** Manrope para títulos e interface; IBM Plex Mono para timestamps, símbolos, percentuais e IDs de eventos.
- **Brand Essence:** “contexto antes do candle”, para quem precisa transformar informação dispersa em evidência verificável; analítico, sóbrio, rastreável.
- **Brand Voice:** direta, cuidadosa e sem promessas. Exemplos: “O que mudou fora do gráfico?” e “Sinal sem evidência não passa.”
- **Wordmark & Logo:** wordmark “Signal Lab” com o “a” substituído por um pequeno nó de conexão entre fontes.
- **Signature Brand Color:** azul petróleo `#0F4C5C`.

## Estrutura de pastas

- `client/src/pages/Home.tsx`: dashboard principal.
- `client/src/index.css`: sistema visual e responsividade.
- `client/public/manus-routes.json`: manifesto de rotas.
- `server/routers.ts`: procedimentos tRPC do dashboard.
- `server/db.ts`: consultas de persistência.
- `drizzle/schema.ts`: tabelas de dados de mercado.
- `shared/`: tipos compartilhados, se necessário.
- `plan.md`: decisões de produto, implementação e design.
- `TODO.md`: resultados e critérios de aceitação.

## Fluxo de construção

1. Substituir a tela exemplo pelo dashboard do observatório.
2. Adicionar tipos e dados demo compartilhados.
3. Expor status/eventos por tRPC com fallback seguro.
4. Criar tabelas incrementais sem apagar dados existentes.
5. Rodar diagnóstico TypeScript, `pnpm check`, `pnpm build` e testes disponíveis.
6. Iniciar `pnpm dev`, verificar `/api/health` e `/manus-routes.json`.
7. Corrigir problemas confirmados e salvar um checkpoint no repositório canônico.
8. Entregar a URL de Preview e explicar o que já está pronto e o que depende de credenciais/conectores.
