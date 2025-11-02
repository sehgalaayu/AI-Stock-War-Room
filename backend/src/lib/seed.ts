import prisma from "./prisma";

async function seedStocks() {
  const stocks = [
    // Traditional Stocks
    { symbol: "AAYU", name: "Aayu Pvt Ltd.", price: 9900.0 },
    { symbol: "AAPL", name: "Apple Inc.", price: 150.0 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.0 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 800.0 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 350.0 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 3200.0 },
    // Crypto Stocks/ETFs (they trade like stocks)
    { symbol: "BTC", name: "Bitcoin", price: 45000.0 },
    { symbol: "ETH", name: "Ethereum", price: 2500.0 },
    { symbol: "BNB", name: "Binance Coin", price: 350.0 },
    { symbol: "SOL", name: "Solana", price: 120.0 },
    { symbol: "ADA", name: "Cardano", price: 0.50 },
    { symbol: "DOT", name: "Polkadot", price: 7.50 },
  ];

  for (const stock of stocks) {
    await prisma.stock.upsert({
      //update if it exists, insert if it doesn’t.
      where: { symbol: stock.symbol },
      update: {},
      create: stock,
    });
  }

  console.log("✅ Sample stocks added!");
}

seedStocks();
