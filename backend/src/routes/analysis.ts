import express, { Router } from "express";
import prisma from "../lib/prisma";
import { analyzeStock } from "../services/aiService";

const router: Router = express.Router();

// GET /api/analysis/:symbol - Get AI analysis for stock
router.get("/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // Get stock data from database
    const stock = await prisma.stock.findUnique({
      where: { symbol: symbol.toUpperCase() }
    });

    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    // Get AI analysis
    const analysis = await analyzeStock(symbol, stock);

    res.json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ 
      error: "Failed to analyze stock",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
