import express, { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router: Router = express.Router();

//GET - /api/watchlists : get user's watchlists
router.get("/", async (req: Request, res: Response) => {
  try {
    const wachlists = await prisma.watchlist.findMany({
      include: {
        items: {
          include: {
            stock: true, //also bring me the full stock object connected to this item.
          },
        },
      },
    });
    res.json(wachlists);
  } catch (error) {
    console.log("watchlists api crashed", error);
    res.status(500).json({
      error: "Failed to fetch watchlists",
    });
  }
});
//POST - /api/watchlists : create new watchlist
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newWatclist = await prisma.watchlist.create({
      data: { name },
    });
    res.json({
      message: name + "watchlist created",
    });
  } catch (error) {
    console.log("watchlists creation crashed", error);
    res.status(500).json({
      error: "Failed to create watchlist",
    });
  }
});
//POST- api/watchlists/:id/stocks - for adding stock to watchlist
router.post("/:id/stocks", async (req, res) => {
  try {
    const { id } = req.params;
    const { stockSymbol } = req.body;

    res.json({ watchlistId: id, stockSymbol, message: "Stock added!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add stock" });
  }
});
export default router;
