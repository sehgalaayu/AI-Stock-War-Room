import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

//GET - /api/watchlists
router.get("/", async (req: Request, res: Response) => {});
//POST - /api/watchlists
router.post("/", async (req: Request, res: Response) => {});
//POST- api/watchlists/:id/stocks - for adding stock to watchlist
router.post("/", async (req: Request, res: Response) => {});
export default router;
