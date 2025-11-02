# 🚀 AI Stock War Room - Quick Start Guide

## ✅ What's Working Now

### Features Implemented:
- ✅ **User Authentication** - Register/Login with JWT
- ✅ **Real-time Stock Prices** - WebSocket updates every 30 seconds
- ✅ **AI Stock Analysis** - Powered by Ollama
- ✅ **Crypto Stocks** - BTC, ETH, BNB, SOL, ADA, DOT
- ✅ **Traditional Stocks** - AAPL, GOOGL, TSLA, MSFT, AMZN
- ✅ **Beautiful UI** - Tailwind CSS with gradient backgrounds

## 🎯 Quick Start

### 1. Backend (Already Running!)
```bash
cd backend
pnpm run dev
```
✅ Backend running on http://localhost:3001

### 2. Frontend (Start Now!)
```bash
cd frontend
pnpm dev
```
✅ Frontend running on http://localhost:3000

### 3. Ollama (Optional but Recommended)
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama service
ollama serve

# Download model (in new terminal)
ollama pull llama3.2:1b
```
✅ AI Analysis works without Ollama (falls back to mock data)

## 📊 How to Use

### Login/Register
1. Open http://localhost:3000
2. Enter any email and password
3. Click "Register" (or "Login" if already registered)

### View Stocks
- You'll see 12 stocks (6 crypto + 6 traditional)
- Prices update in real-time every 30 seconds
- WebSocket connection shows green when connected

### Get AI Analysis
1. Click "🤖 Get AI Analysis" on any stock
2. Wait a few seconds for AI to analyze
3. Read the analysis with sentiment and recommendations

## 🎨 UI Features

### Modern Dark Theme
- **Glass Morphism Design** - Transparent blur effects with gradients
- **Dark Background** - Purple-gray gradient for premium feel
- **Smooth Animations** - Professional transitions and hover effects

### Dashboard
- **Stock Cards** - Beautiful glass cards with mini charts
- **AI Analysis Panel** - Expandable panel with AI insights
- **Connection Status** - Green/Red indicator for WebSocket
- **Tab Navigation** - Switch between All Stocks and Watchlists

### New Features
- **Live Price Charts** - Mini charts on each stock card
- **Watchlists Tab** - Create and manage custom watchlists
- **Gradient Design** - Purple to pink gradients throughout
- **Responsive** - Works on all screen sizes

### Real-time Updates
- Prices change automatically every 30 seconds
- WebSocket broadcasts to all connected users
- Charts update in real-time
- No page refresh needed!

## 🔧 Troubleshooting

### "Failed to fetch" Error
- Make sure backend is running on port 3001
- Check: `curl http://localhost:3001/`

### No Stocks Showing
- Run seed: `npx ts-node backend/src/lib/seed.ts`
- Check database connection in `.env`

### AI Analysis Not Working
- Install Ollama: `curl -fsSL https://ollama.ai/install.sh | sh`
- Start service: `ollama serve`
- Download model: `ollama pull llama3.2:1b`
- Or it will use fallback mock analysis

### WebSocket Not Connecting
- Check browser console for errors
- Ensure backend WebSocket is on port 3001/ws
- Try refreshing the page

## 📝 Test Accounts

You can use any email/password to register:
- Email: `test@example.com`
- Password: `password123`

## 🎉 What to Expect

1. **Fast Loading** - Stocks load instantly on login
2. **Live Updates** - Watch prices change in real-time
3. **AI Insights** - Get professional stock analysis
4. **Smooth UI** - Beautiful gradient design
5. **Responsive** - Works on mobile and desktop

## 🚀 Next Steps

- Add more stocks to database
- Create watchlists
- Set price alerts
- Add portfolio tracking
- Deploy to production

## 🆘 Need Help?

Check the main `README.md` for detailed setup instructions!

---

**Ready to go!** Start the frontend and enjoy your AI Stock War Room! 🎉
