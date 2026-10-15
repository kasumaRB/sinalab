# Signal Lab — Entregas do MVP

## Dashboard de inteligência de dados — concluído no MVP

- [x] Exibir uma visão operacional em português brasileiro com ativos observados, eventos recentes, fontes ativas e qualidade dos dados.
- [x] Deixar explícito que a primeira versão está em modo `simulação / somente leitura` e não executa ordens.
- [x] Permitir leitura rápida sem esconder a origem, o timestamp ou a justificativa de cada evento.

## Pipeline de eventos e evidências — concluído no MVP com dados demo

- [x] Representar eventos de mercado, blockchain, publicações e notícias com ativo, tipo, origem, horário, relevância, confiança e status.
- [x] Exibir evidências, confirmações e reação posterior de preço/volume sem afirmar causalidade automaticamente.
- [x] Separar dados demonstrativos de conectores reais, deixando claro quando uma fonte ainda não está conectada.

## Persistência e contrato de dados — concluído no MVP

- [x] Criar tabelas incrementais para ativos, fontes, eventos e resultados de análise sem apagar a tabela de usuários existente.
- [x] Manter dados brutos e tratados com origem, timestamp e metadados suficientes para consulta e auditoria.
- [x] Definir formato de saída compatível com a futura integração ao analisador de gráficos.

## IA e conectores — planejado

- [ ] Preparar a camada para receber conectores autorizados da Binance, dados on-chain, publicações e notícias.
- [ ] Preparar a camada para trocar o modelo de IA sem acoplar a interface a um fornecedor.
- [ ] Adicionar interpretação contextual e classificação de relevância somente após o contrato dos eventos estar estável.

## Testes e operação segura — planejado

- [ ] Registrar resultados de backtest e paper trading sem operar capital real.
- [ ] Incluir evidências, incertezas e nível de confiança nas análises.
- [ ] Não coletar nem processar informação não pública obtida indevidamente.
- [ ] Validar `/api/health`, `/manus-routes.json`, `pnpm check` e `pnpm build` antes do checkpoint.
