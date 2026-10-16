import { db } from '../db';
import { rawEvents, marketEvents } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';

async function processBinanceData() {
  try {
    // Busca dados brutos não processados da Binance
    const rawData = await db.select().from(rawEvents).where(eq(rawEvents.processed, 'pending'));
    
    for (const data of rawData) {
      // Processa dados de preço
      if (data.externalId.includes('prices')) {
        const prices = JSON.parse(data.rawData);
        for (const [symbol, price] of Object.entries(prices)) {
          await db.insert(marketEvents).values({
            externalId: `binance-price-${symbol}-${Date.now()}`,
            asset: symbol,
            eventType: 'market',
            title: `Preço atualizado para ${symbol}`,
            summary: `O preço de ${symbol} é ${price}`,
            source: 'binance',
            occurredAt: new Date(),
            relevance: 'high',
            confidence: 100,
            confirmations: 1,
            reactionWindow: 'immediate',
            reactionDirection: 'flat',
            reactionPercentage: '0%',
            status: 'validated',
            evidence: JSON.stringify({ price }),
          });
        }
      }
      
      // Processa dados de transações
      if (data.externalId.includes('trades')) {
        const trades = JSON.parse(data.rawData);
        for (const trade of trades) {
          await db.insert(marketEvents).values({
            externalId: `binance-trade-${trade.id}-${Date.now()}`,
            asset: trade.symbol,
            eventType: 'wallet_flow',
            title: `Transação de ${trade.symbol}`,
            summary: `Transação de ${trade.quantity} ${trade.symbol} por ${trade.price}`,
            source: 'binance',
            occurredAt: new Date(trade.time),
            relevance: 'high',
            confidence: 100,
            confirmations: 1,
            reactionWindow: 'immediate',
            reactionDirection: 'flat',
            reactionPercentage: '0%',
            status: 'validated',
            evidence: JSON.stringify(trade),
          });
        }
      }
      
      // Processa dados do livro de ordens
      if (data.externalId.includes('orderbook')) {
        const orderBook = JSON.parse(data.rawData);
        await db.insert(marketEvents).values({
          externalId: `binance-orderbook-${orderBook.lastUpdateId}-${Date.now()}`,
          asset: orderBook.symbol,
          eventType: 'market',
          title: `Livro de ordens atualizado para ${orderBook.symbol}`,
          summary: `Livro de ordens para ${orderBook.symbol} atualizado`,
          source: 'binance',
          occurredAt: new Date(),
          relevance: 'high',
          confidence: 100,
          confirmations: 1,
          reactionWindow: 'immediate',
          reactionDirection: 'flat',
          reactionPercentage: '0%',
          status: 'validated',
          evidence: JSON.stringify(orderBook),
        });
      }
      
      // Marca dados como processados
      await db.update(rawEvents).set({ processed: 'completed' }).where(eq(rawEvents.id, data.id));
    }
  } catch (error) {
    console.error('Erro ao processar dados da Binance:', error);
  }
}

// Executa o processamento periodicamente
setInterval(processBinanceData, 60000);

// Executa o processamento imediatamente na inicialização
processBinanceData();