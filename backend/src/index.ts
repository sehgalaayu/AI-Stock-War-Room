import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import stocksRouter from "./routes/stocks";
import watchlistsRouter from "./routes/watchlists";
import analysisRouter from "./routes/analysis";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();

app.use("/api/auth", authRouter);
app.use("/api/stocks", stocksRouter);
app.use("/api/watchlists", watchlistsRouter);
app.use("/api/analysis", analysisRouter);

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Ai stock room api working",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Port listening on ${port}`);
});
