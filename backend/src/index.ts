import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import stocksRouter from "./routes/stocks";
import watchlistsRouter from "./routes/watchlists";
import analysisRouter from "./routes/analysis";
import authRouter from "./routes/auth";
import axios from "axios";
import { WebSocketServer } from "ws";
import { createServer } from "http";

dotenv.config();

const app = express();
const server = createServer(app);

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

//websocket server
const wss = new WebSocketServer({
  server,
  path: "/ws",
});

const clients = new Map();

wss.on("connection", (ws: WebSocket, req: Request) => {
  const clientId = Math.random().toString(36).substring(2, 9);
  clients.set(clientId, ws);

  console.log(`Client ${clientId} connected. Total clients: ${clients.size}`);
});

app.get("/api/health/ollama", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2:1b",
      prompt: "Hello",
      stream: false,
    });

    res.json({
      status: "OK",
      ollama: "Running",
      model: "llama3.2:1b",
    });
  } catch (error) {
    res.status(503).json({
      status: "Error",
      ollama: "Not running",
      error: "Ollama service unavailable",
    });
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Port listening on ${port}`);
});
