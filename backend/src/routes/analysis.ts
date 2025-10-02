import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

//GET - /api/analysis/:symbol
router.get("/", async (req: Request, res: Response) => {});

export default router;
