import { db } from '../db';
import { marketEvents } from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';

async function integrateBinanceData() {
  try {
    // Busca eventos de mercado não integrados
    const events = await db.select().from(marketEvents).where(eq(marketEvents.status, 'validated'));
    
    for (const event of events) {
      // Envia dados para o analisador de gráficos
      console.log('Enviando evento para o analisador de gráficos:', event);
      
      // Marca evento como integrado
      await db.update(marketEvents).set({ status: 'simulated' }).where(eq(marketEvents.id, event.id));
    }
  } catch (error) {
    console.error('Erro ao integrar dados da Binance:', error);
  }
}

// Executa a integração periodicamente
setInterval(integrateBinanceData, 60000);

// Executa a integração imediatamente na inicialização
integrateBinanceData();