import prisma from "./prisma";

async function seedStocks() {
  const stocks = [
    { symbol: "AAYU", name: "Aayu Pvt Ltd.", price: 9900.0 },
    { symbol: "AAPL", name: "Apple Inc.", price: 150.0 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.0 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 800.0 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 350.0 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 3200.0 },
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
