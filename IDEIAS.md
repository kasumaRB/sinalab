# IDEIAS DO PROJETO SIGNAL LAB

> Documento consolidado da reunião. A transcrição não faz parte deste arquivo.


**1. Resumo da Reunião:**
A reunião trata da proposta de um aplicativo de inteligência de dados para apoiar decisões no mercado de criptomoedas. O objetivo central não é adivinhar o mercado, mas obter informações de fontes confiáveis, filtrar e interpretar esses dados com uma IA e acompanhar movimentos que possam ajudar a explicar reações posteriores no gráfico. A solução deverá coletar informações sobre moedas, grandes investidores, movimentações relevantes, transações em blockchain e publicações de traders de alto desempenho, especialmente dentro da Binance. Para isso, será necessário desenvolver um script de pesquisa e ingestão capaz de acessar APIs ou fontes autorizadas, coletar dados de locais específicos e armazená-los em um banco de dados. Após a conclusão e validação dessa estrutura de coleta e análise, ela deverá ser integrada ao analisador de gráficos já existente no projeto. A combinação entre contexto externo, dados fundamentais, sinais de mercado e leitura técnica deverá ajudar a separar informação relevante de ruído e produzir análises ou cenários para testes e apoio à decisão, sem substituir a análise e a responsabilidade do investidor.

**2. Pontos Principais:**
*   **Proposta de Projeto:** Desenvolver uma ferramenta ou método para analisar informações de criptomoedas.
*   **Público-Alvo da Análise:** Traders com maior margem de lucro.
*   **Estratégia:** Acompanhar o estilo de operação ("trade") desses profissionais, seguindo dicas e sinais de investimento (ex: "faz isso aqui que vai dar bom").
*   **Plataforma Foco:** A análise deve ser feita preferencialmente dentro da Binance, observando as postagens de investimentos de usuários bem-sucedidos da plataforma.
*   **Necessidade central:** Coletar, filtrar e cruzar diversas fontes de informação para apoiar decisões de entrada e saída.
*   **Foco em inteligência de dados:** O valor principal esperado está em acompanhar acontecimentos e movimentos fora do gráfico que possam anteceder ou explicar uma reação de preço, e não em tentar prever o mercado de forma infalível.
*   **Redução de ruído:** A IA deverá ajudar a distinguir eventos, sinais e informações relevantes de padrões gráficos isolados, opiniões sem evidência e excesso de dados.
*   **Visão ampla do ativo:** A avaliação de uma moeda deverá considerar contexto de mercado, fluxo de capital, notícias, publicações, dados on-chain e demais eventos externos, além de preço e padrões técnicos.
*   **Relação entre evento e reação:** O sistema deverá registrar o momento das informações e comparar posteriormente sua ocorrência com volume, preço e comportamento do gráfico, evitando assumir causalidade sem evidência.
*   **Cobertura ampla de eventos:** O sistema deverá monitorar o maior conjunto viável de eventos relevantes, incluindo mercado, blockchain, publicações, notícias, carteiras e movimentações de participantes.
*   **Filtragem antes da conclusão:** A grande quantidade de dados deverá passar por deduplicação, validação de fonte, avaliação de relevância, cruzamento entre fontes e comparação histórica antes de gerar uma conclusão.
*   **Conclusões baseadas em evidências:** O resultado final deverá apresentar evidências, contexto, incertezas e nível de confiança. Uma conclusão operacional não deverá ser tratada como certeza ou garantia de resultado.
*   **Grandes movimentações:** Investigar o possível impacto da entrada de investidores de grande porte no preço, no volume e no comportamento do gráfico.
*   **Desafio do timing:** Identificar o momento adequado para entrar em uma operação é considerado um dos principais problemas a serem resolvidos.
*   **Análise contextual:** A IA deverá interpretar o contexto completo das publicações — não apenas palavras-chave ou recomendações isoladas — e comparar as indicações com dados de mercado.
*   **Previsões e cenários:** O sistema poderá gerar previsões probabilísticas, cenários e indicadores de confiança; não deverá apresentar resultados como garantias de rentabilidade.
*   **Análise on-chain:** Além de dados da Binance e de outras fontes de mercado, o projeto deverá investigar transações registradas em blockchains, como movimentações de carteiras, fluxos de ativos e alterações relevantes de posição.
*   **Múltiplas fontes:** Devem ser avaliadas fontes que reúnam dados de investimento, sinais, carteiras, transações e histórico de operações, respeitando disponibilidade, qualidade e autorização de uso.
*   **Ranqueamento de participantes:** O sistema deverá procurar os traders ou endereços mais relevantes com base em resultados efetivamente realizados, consistência, período de análise, risco e qualidade do histórico — e não apenas em alegações ou ganhos pontuais.
*   **Trades recentes:** Após identificar participantes relevantes, a solução deverá localizar operações ou sinais recentes e cruzá-los com o contexto atual do mercado para estimar sua aplicabilidade.
*   **Testes antes da execução:** As estratégias encontradas deverão ser submetidas a backtests e simulação (paper trading) antes de qualquer possibilidade de execução real, com registro de resultados e riscos.
*   **Script especializado:** O projeto deverá contar com um script para acessar fontes definidas, coletar informações, aplicar filtros iniciais, organizar os dados e disponibilizá-los para análise.
*   **Banco de dados de pesquisa:** Os dados brutos, dados tratados, sinais, resultados dos testes e metadados de coleta deverão ser persistidos para permitir consultas, auditoria e repetição dos experimentos.
*   **Pipeline de análise e testes:** O fluxo esperado é obter a informação, validar sua qualidade, filtrar e contextualizar com IA, gerar hipóteses ou sinais, executar testes históricos ou simulados e registrar os resultados.
*   **Objetivo do aplicativo:** Centralizar a obtenção de dados de boas fontes e transformar informações brutas em análises estruturadas por meio de IA.
*   **Separação de responsabilidades:** A primeira etapa do projeto deve concentrar-se na coleta, filtragem, análise e validação dos dados; a integração com outro sistema será realizada posteriormente.
*   **Integração futura:** A estrutura deverá ser construída com interfaces e formatos de saída que permitam conectá-la a outro componente do projeto sem refazer o pipeline de dados e análise.
*   **Analisador de gráficos existente:** A nova estrutura deverá fornecer informações e sinais ao analisador de gráficos já disponível, combinando análise contextual e fundamental com leitura técnica.
*   **Potencial de ganho e descoberta:** A expectativa registrada é que a combinação de informações relevantes com a análise gráfica amplie a capacidade de identificar oportunidades; essa expectativa deverá ser verificada por testes objetivos, sem presumir aumento de rentabilidade.
*   **Informação privilegiada e conformidade:** O sistema deverá utilizar somente dados públicos, licenciados ou obtidos de forma autorizada. Informação não pública obtida indevidamente não deverá ser coletada, processada ou usada para negociação; a terminologia e os limites legais deverão ser definidos antes dos testes.
*   **Escolha da IA:** A seleção do modelo deverá considerar capacidade de programação, raciocínio sobre dados, extração estruturada, custo, latência, privacidade, integração com APIs e desempenho em testes próprios. Não é necessário depender de uma única IA para todas as etapas.
*   **Arquitetura modular de IA:** O sistema poderá combinar um modelo para desenvolvimento e orquestração, modelos menores para classificação e filtragem em escala e componentes determinísticos para cálculos, indicadores e validação financeira.
*   **Critério de decisão:** GPT, Claude, Gemini, Grok ou modelos open source deverão ser comparados por um conjunto de testes reproduzíveis com dados históricos, sem escolher apenas por reputação ou marketing.
*   **Papel do gráfico:** O gráfico será um componente de confirmação e observação da reação do mercado, enquanto a coleta de contexto externo será a principal lacuna que o novo aplicativo deverá preencher.
*   **Qualidade acima de volume:** Coletar o máximo possível é uma meta de cobertura, mas o sistema deverá priorizar informação rastreável, relevante e corroborada para evitar excesso de dados e falsos sinais.

**3. Participantes:**
*   Orador 1 (Identidade desconhecida)

**4. Tarefas e próximos passos:**
| Tarefa | Descrição | Responsável | Status |
|---|---|---|---|
| Definir o escopo do projeto | Especificar quais dados de mercado, perfis e sinais serão analisados. | A definir | Pendente |
| Avaliar fontes de dados | Verificar a API da Binance e outras fontes públicas ou autorizadas. | A definir | Pendente |
| Investigar fontes on-chain | Identificar redes, exploradores, APIs e provedores capazes de fornecer transações, fluxos de carteiras e movimentações relevantes. | A definir | Pendente |
| Desenvolver script de coleta | Criar o componente responsável por acessar APIs ou fontes autorizadas, coletar dados de forma controlada e registrar data, origem e parâmetros da coleta. | A definir | Pendente |
| Consolidar e normalizar dados | Reunir dados de mercado, publicações, carteiras e blockchains em um formato comum, tratando duplicidades, atrasos e inconsistências. | A definir | Pendente |
| Classificar relevância das informações | Criar critérios para separar eventos relevantes de ruído, opiniões sem evidência, duplicidades e dados de baixa qualidade. | A definir | Pendente |
| Correlacionar eventos e reações | Registrar eventos com timestamp e comparar sua ocorrência com mudanças posteriores de preço, volume e volatilidade, sem presumir causalidade. | A definir | Pendente |
| Criar monitoramento de eventos | Definir categorias, frequência de atualização, janela histórica e mecanismos de alerta para acompanhar acontecimentos relevantes. | A definir | Pendente |
| Criar avaliação de evidências | Exigir fonte, timestamp, confirmação independente, contexto e nível de confiança antes de promover uma informação a sinal ou conclusão. | A definir | Pendente |
| Projetar o banco de dados | Definir o armazenamento de dados brutos e tratados, histórico de sinais, resultados, metadados e trilha de auditoria dos experimentos. | A definir | Pendente |
| Mapear sinais de grandes investidores | Definir como detectar entradas relevantes de capital, alterações de volume e outras movimentações potencialmente significativas. | A definir | Pendente |
| Estruturar a coleta de publicações | Identificar como obter publicações de traders de alto desempenho e quais critérios serão usados para avaliar histórico, consistência e relevância. | A definir | Pendente |
| Criar ranking de histórico | Classificar traders e carteiras por desempenho realizado, consistência, risco, recência e qualidade dos dados disponíveis. | A definir | Pendente |
| Analisar operações recentes | Comparar trades recentes dos participantes selecionados com preço, volume, liquidez, sentimento e contexto on-chain. | A definir | Pendente |
| Definir o modelo de timing | Estabelecer quais indicadores, períodos e condições serão usados para estimar possíveis pontos de entrada e saída. | A definir | Pendente |
| Definir os critérios de desempenho | Estabelecer como identificar traders de maior rentabilidade e como comparar seus resultados. | A definir | Pendente |
| Planejar o componente de IA | Determinar como a IA compreenderá o contexto das publicações, cruzará dados e apresentará cenários, indicadores, alertas e nível de confiança. | A definir | Pendente |
| Comparar modelos de IA | Testar modelos candidatos em extração, classificação, análise contextual, geração estruturada, custo, velocidade e estabilidade das respostas. | A definir | Pendente |
| Definir a arquitetura de modelos | Decidir quais tarefas serão realizadas por LLMs, quais por modelos estatísticos ou de machine learning e quais por regras e cálculos determinísticos. | A definir | Pendente |
| Criar validação histórica | Testar se sinais e previsões teriam funcionado em dados passados, evitando confundir correlação com capacidade preditiva. | A definir | Pendente |
| Implementar paper trading | Simular a execução dos sinais recentes, incluindo custos, slippage, liquidez, atrasos e limites de risco, antes de considerar execução real. | A definir | Pendente |
| Criar ambiente de experimentação | Permitir aplicação dos sinais sobre dados armazenados, comparação de estratégias, repetição de testes e registro de métricas sem operar capital real. | A definir | Pendente |
| Definir contrato de integração | Especificar APIs, formatos de dados, sinais, indicadores, níveis de confiança e eventos que serão enviados ao componente futuro. | A definir | Pendente |
| Preparar integração futura | Organizar a arquitetura para que o aplicativo de coleta e análise possa ser conectado posteriormente ao outro sistema do projeto. | A definir | Pendente |
| Integrar ao analisador de gráficos | Definir como os dados filtrados, sinais, eventos e níveis de confiança serão enviados ao analisador técnico já existente. | A definir | Pendente |
| Definir controles de execução | Caso a execução seja futuramente considerada, estabelecer aprovação humana, limites de exposição, stop-loss, bloqueios e auditoria. | A definir | Pendente |
| Validar aspectos de conformidade e risco | Avaliar limites de uso da API, privacidade, termos das plataformas e o caráter informativo das análises. | A definir | Pendente |
| Delimitar fontes permitidas | Separar dados públicos, licenciados e autorizados de qualquer informação não pública ou obtida de forma irregular. | A definir | Pendente |
