import express, { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router: Router = express.Router();

//GET - api/stocks/ : get all stocks
router.get("/", async (req: Request, res: Response) => {
  try {
    const stocks = await prisma.stock.findMany();
    res.json({
      stocks: stocks,
      message: "Stocks api working",
    });
  } catch (error) {
    console.log("Stock api crashed with error: ", error);
    res.status(500).json({
      message: `Failed to fetch stocks : ${error}`,
    });
  }
});
//GET - api/stocks/:symbol : get specific stock
router.get("/:symbol", async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    if (!symbol) {
      return res.status(400).json({ message: "Stock symbol is required" });
    }
    const stock = await prisma.stock.findUnique({
      where: { symbol: symbol.toUpperCase() },
    });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json(stock);
    res.json({
      message: symbol + " stock api working",
    });
  } catch (error) {
    console.log(`Stock api crashed with error: `, error);
    res.status(500).json({
      message: `Failed to fetch stock : ${error}`,
    });
  }
});

export default router;
