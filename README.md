# AI Stock War Room - MVP

A real-time stock tracking application with AI-powered analysis, built with modern web technologies.

## 🚀 Tech Stack

**Backend:**

- Node.js + Express + TypeScript
- PostgreSQL (Neon) + Prisma ORM
- JWT Authentication (bcrypt)
- WebSocket for real-time updates
- Ollama for AI analysis

**Frontend:**

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS

## 📁 Project Structure

```
ai-stock-war-room/
├── backend/              # Express API server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic & AI
│   │   ├── lib/          # Utilities & auth
│   │   ├── middleware/   # Auth middleware
│   │   └── index.ts      # Server entry
│   ├── prisma/           # Database schema
│   └── package.json
├── frontend/             # Next.js app
│   ├── src/app/          # Pages & layouts
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+
- pnpm installed globally
- PostgreSQL database (Neon or local)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
pnpm install

# Create .env file
echo "DATABASE_URL='your-neon-database-url'
JWT_SECRET='your-secret-key'
PORT=3001" > .env

# Set up database
pnpm exec prisma generate
pnpm exec prisma migrate dev

# Seed database with sample stocks
npx ts-node src/lib/seed.ts

# Start backend server
pnpm run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Start frontend server
pnpm dev
```

### 3. Ollama Setup (Optional but Recommended)

For AI-powered stock analysis:

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama service
ollama serve

# Download model (in new terminal)
ollama pull llama3.2:1b
```

### 4. Run Application

- Backend: http://localhost:3001
- Frontend: http://localhost:3000
- WebSocket: ws://localhost:3001/ws

## 📊 Features

✅ User Authentication (JWT + bcrypt)
✅ Stock Watchlist Management
✅ Real-time Stock Price Updates (WebSocket)
✅ AI-Powered Stock Analysis (Ollama)
✅ Responsive UI (Tailwind CSS)

## 🎯 API Endpoints

**Authentication:**

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

**Stocks:**

- GET `/api/stocks` - Get all stocks
- GET `/api/stocks/:symbol` - Get specific stock

**Watchlists:**

- GET `/api/watchlists` - Get user watchlists
- POST `/api/watchlists` - Create watchlist
- POST `/api/watchlists/:id/stocks` - Add stock to watchlist

**Analysis:**

- GET `/api/analysis/:symbol` - Get AI analysi

## 🔌 WebSocket Events

**Client → Server:**

- `subscribe` - Subscribe to stock updates
- `ping` - Keep-alive

**Server → Client:**

- `stock-update` - Real-time price updates
- `analysis-update` - AI analysis results
- `connection` - Connection established

## 📝 Environment Variables

**Backend (.env):**

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=development
```

## 🧪 Testing

1. Register a new user
2. View stocks dashboard
3. Watch real-time price updates
4. Get AI analysis for stocks
5. Create and manage watchlists

## 🐛 Troubleshooting

**WebSocket not connecting:**

- Check if backend is running on port 3001
- Verify WebSocket endpoint: ws://localhost:3001/ws

**No stocks showing:**

- Run seed script: `npx ts-node src/lib/seed.ts`
- Check database connection

**Ollama not working:**

- Ensure Ollama is running: `ollama serve`
- Check model is downloaded: `ollama list`

## 🚀 Next Steps

1. Add more stock data sources
2. Implement advanced AI features
3. Add price alerts
4. Create mobile app
5. Deploy to production

## 📄 License

MIT

## 👨‍💻 Author

Built as an MVP project for learning modern full-stack development.
