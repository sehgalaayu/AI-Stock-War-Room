import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

//GET - api/stocks/
router.get("/", async (req: Request, res: Response) => {
  try {
    res.json({
      message: "Stocks api working",
    });
  } catch (error) {
    console.log("Stock api crashed with error: ", error);
    res.status(500).json({
      message: `Failed to fetch stocks : ${error}`,
    });
  }
});
//GET - api/stocks/:symbol
router.get("/:symbol", async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params.symbol;
    res.json({
      message: symbol + "stock api working",
    });
  } catch (error) {
    console.log(`Stock api crashed with error: `, error);
    res.status(500).json({
      message: `Failed to fetch stock : ${error}`,
    });
  }
});

export default router;
