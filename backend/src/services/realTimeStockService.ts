import { broadcast } from './websocketService';
import prisma from '../lib/prisma';

let interval: NodeJS.Timeout | null = null;

export function startPriceUpdates() {
  if (interval) return;
  
  console.log('📈 Starting real-time stock price updates...');
  
  interval = setInterval(async () => {
    try {
      const stocks = await prisma.stock.findMany();
      
      for (const stock of stocks) {
        const volatility = 0.02;
        const changePercent = (Math.random() - 0.5) * volatility * 2;
        const oldPrice = stock.price || 100;
        const change = oldPrice * changePercent;
        const newPrice = Math.max(0.01, oldPrice + change);

        await prisma.stock.update({
          where: { id: stock.id },
          data: { price: newPrice }
        });

        broadcast({
          type: 'stock-update',
          data: {
            symbol: stock.symbol,
            price: newPrice,
            change: change,
            changePercent: changePercent * 100,
            timestamp: new Date().toISOString()
          }
        });
      }

      console.log(`📊 Updated prices for ${stocks.length} stocks`);
    } catch (error) {
      console.error('Price update error:', error);
    }
  }, 30000);
}

export function stopPriceUpdates() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    console.log('📈 Stopped real-time stock price updates');
  }
}
