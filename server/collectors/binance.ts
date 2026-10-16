import { Binance } from 'binance-api-node';
import { db } from '../db';
import { rawEvents } from '../../../drizzle/schema';

const client = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
  httpBase: 'https://api3.binance.com'
});

async function collectBinanceData() {
  try {
    // Coleta dados de preço de ativos
    const prices = await client.prices();
    
    // Coleta dados de transações recentes
    const trades = await client.recentTrades({ symbol: 'BTCUSDT', limit: 10 });
    
    // Coleta dados de ordem do livro
    const orderBook = await client.orderBook({ symbol: 'BTCUSDT', limit: 10 });
    
    // Salva dados brutos no banco de dados
    const [priceEvent, tradeEvent, orderBookEvent] = await db.insert(rawEvents).values([
      {
        source: 'binance',
        externalId: `binance-prices-${Date.now()}`,
        rawData: JSON.stringify(prices),
      },
      {
        source: 'binance',
        externalId: `binance-trades-${Date.now()}`,
        rawData: JSON.stringify(trades),
      },
      {
        source: 'binance',
        externalId: `binance-orderbook-${Date.now()}`,
        rawData: JSON.stringify(orderBook),
      },
    ]).returning();
    
    console.log('Dados coletados e salvos com sucesso:', priceEvent, tradeEvent, orderBookEvent);
  } catch (error) {
    console.error('Erro ao coletar dados da Binance:', error);
  }
}

// Executa a coleta periodicamente
setInterval(collectBinanceData, 60000);

// Executa a coleta imediatamente na inicialização
collectBinanceData();