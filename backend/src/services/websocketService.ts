// Simple WebSocket service for broadcasting messages to all connected clients
let clients: Map<string, any> = new Map();

export function setClients(clientsMap: Map<string, any>) {
  clients = clientsMap;
}

export function broadcast(message: any) {
  const data = JSON.stringify(message);
  clients.forEach((ws, clientId) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    } else {
      clients.delete(clientId);
    }
  });
}

export function broadcastToSubscribers(symbol: string, message: any) {
  const data = JSON.stringify(message);
  clients.forEach((ws, clientId) => {
    if (ws.readyState === ws.OPEN && ws.stockSymbols?.includes(symbol)) {
      ws.send(data);
    } else if (ws.readyState !== ws.OPEN) {
      clients.delete(clientId);
    }
  });
}
