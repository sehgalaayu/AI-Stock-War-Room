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
import { setClients } from "./services/websocketService";
import { startPriceUpdates } from "./services/realTimeStockService";

dotenv.config();

const app = express();
const server = createServer(app);

// Middleware setup (order matters!)
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/stocks", stocksRouter);
app.use("/api/watchlists", watchlistsRouter);
app.use("/api/analysis", analysisRouter);

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
setClients(clients);

wss.on("connection", (ws: any, req: Request) => {
  const clientId = Math.random().toString(36).substring(2, 9);
  clients.set(clientId, ws);

  console.log(`Client ${clientId} connected. Total clients: ${clients.size}`);

  ws.send(JSON.stringify({
    type: 'connection',
    clientId,
    message: 'Connected to AI Stock War Room'
  }));

  ws.on('message', (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      
      switch (message.type) {
        case 'subscribe':
          ws.stockSymbols = message.symbols || [];
          ws.send(JSON.stringify({
            type: 'subscription',
            symbols: ws.stockSymbols,
            message: 'Subscribed to stock updates'
          }));
          break;
        case 'ping':
          ws.send(JSON.stringify({ type: 'pong' }));
          break;
      }
    } catch (error) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid JSON message'
      }));
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log(`Client ${clientId} disconnected. Total clients: ${clients.size}`);
  });

  ws.on('error', (error: Error) => {
    console.error(`WebSocket error for client ${clientId}:`, error);
    clients.delete(clientId);
  });
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

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`🚀 AI Stock War Room API running on port ${port}`);
  console.log(`⚡ WebSocket server ready on ws://localhost:${port}/ws`);
  
  // Start real-time stock updates
  startPriceUpdates();
});
