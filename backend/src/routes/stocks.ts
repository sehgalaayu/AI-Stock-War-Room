import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

//GET - api/stocks/
router.get("/", async (req: Request, res: Response) => {});
//POST - api/stocks/
router.post("/", async (req: Request, res: Response) => {});

export default router;
