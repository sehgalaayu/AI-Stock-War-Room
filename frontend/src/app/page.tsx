'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
}

interface Watchlist {
  id: string;
  name: string;
  userId: string;
}

interface PriceHistory {
  timestamp: string;
  price: number;
}

interface Analysis {
  symbol: string;
  analysis: string;
  timestamp: string;
}

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'stocks' | 'watchlists'>('stocks');
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [priceHistory, setPriceHistory] = useState<Record<string, PriceHistory[]>>({});
  
  const API_URL = 'http://localhost:3001';

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:3001/ws');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'stock-update') {
        const stockUpdate = message.data;
        setStocks(prevStocks =>
          prevStocks.map(stock =>
            stock.symbol === stockUpdate.symbol
              ? { ...stock, price: stockUpdate.price }
              : stock
          )
        );

        // Update price history
        setPriceHistory(prev => {
          const existing = prev[stockUpdate.symbol] || [];
          return {
            ...prev,
            [stockUpdate.symbol]: [...existing, {
              timestamp: stockUpdate.timestamp,
              price: stockUpdate.price
            }].slice(-20) // Keep last 20 points
          };
        });
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setConnected(false);
    };

    setSocket(ws);
  };

  const fetchStocks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stocks`);
      const data = await response.json();
      setStocks(Array.isArray(data) ? data : (data.stocks || []));
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const fetchWatchlists = async () => {
    try {
      const response = await fetch(`${API_URL}/api/watchlists`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setWatchlists(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching watchlists:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        fetchStocks();
        fetchWatchlists();
        connectWebSocket();
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: email }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        fetchStocks();
        fetchWatchlists();
        connectWebSocket();
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const handleGetAnalysis = async (symbol: string) => {
    setLoadingAnalysis(true);
    setSelectedStock(symbol);
    try {
      const response = await fetch(`${API_URL}/api/analysis/${symbol}`);
      const data = await response.json();
      if (data.success && data.data) {
        setAnalysis(data.data);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis({
        symbol,
        analysis: 'Failed to get AI analysis. Please check if Ollama is running.',
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleCreateWatchlist = async () => {
    if (!newWatchlistName.trim()) return;
    try {
      const response = await fetch(`${API_URL}/api/watchlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newWatchlistName }),
      });
      const data = await response.json();
      if (data.id) {
        setWatchlists([...watchlists, data]);
        setNewWatchlistName('');
      }
    } catch (error) {
      console.error('Error creating watchlist:', error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchStocks();
      fetchWatchlists();
      connectWebSocket();
    }
  }, []);

  if (!token) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Stock War Room
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 rounded-lg hover:bg-white/20 transition font-semibold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Stock War Room
            </h1>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg backdrop-blur-sm ${connected ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                {connected ? '🟢 Live' : '🔴 Offline'}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  setToken('');
                  socket?.close();
                }}
                className="px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-2 mb-6 border border-white/20 flex gap-2">
          <button
            onClick={() => setActiveTab('stocks')}
            className={`flex-1 py-3 rounded-lg transition font-semibold ${
              activeTab === 'stocks'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            📊 All Stocks
          </button>
          <button
            onClick={() => setActiveTab('watchlists')}
            className={`flex-1 py-3 rounded-lg transition font-semibold ${
              activeTab === 'watchlists'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            ⭐ Watchlists
          </button>
        </div>

        {/* Stocks Tab */}
        {activeTab === 'stocks' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {stocks.map((stock) => (
                <div key={stock.id} className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 hover:bg-white/15 transition border border-white/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{stock.symbol}</h2>
                      <p className="text-gray-400 text-sm">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                    ${stock.price.toFixed(2)}
                  </div>
                  
                  {/* Mini Chart */}
                  {priceHistory[stock.symbol] && priceHistory[stock.symbol].length > 1 && (
                    <ResponsiveContainer width="100%" height={80}>
                      <AreaChart data={priceHistory[stock.symbol]}>
                        <defs>
                          <linearGradient id={`color${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill={`url(#color${stock.symbol})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  
                  <button
                    onClick={() => handleGetAnalysis(stock.symbol)}
                    disabled={loadingAnalysis && selectedStock === stock.symbol}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:from-gray-600 disabled:to-gray-700 font-semibold"
                  >
                    {loadingAnalysis && selectedStock === stock.symbol ? '🤖 Analyzing...' : '🤖 AI Analysis'}
                  </button>
                </div>
              ))}
            </div>

            {/* AI Analysis Panel */}
            {analysis && (
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    🤖 AI Analysis for {analysis.symbol}
                  </h2>
                  <button
                    onClick={() => setAnalysis(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/20">
                  <p className="text-gray-200 whitespace-pre-wrap">{analysis.analysis}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Generated: {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Watchlists Tab */}
        {activeTab === 'watchlists' && (
          <div>
            {/* Create Watchlist */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 mb-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Create New Watchlist</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Watchlist name..."
                  value={newWatchlistName}
                  onChange={(e) => setNewWatchlistName(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
                <button
                  onClick={handleCreateWatchlist}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
                >
                  Create
                </button>
              </div>
            </div>

            {/* Watchlists List */}
            <div className="space-y-4">
              {watchlists.length === 0 ? (
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-8 text-center border border-white/20">
                  <p className="text-gray-400">No watchlists yet. Create one above!</p>
                </div>
              ) : (
                watchlists.map((watchlist) => (
                  <div key={watchlist.id} className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">{watchlist.name}</h3>
                    <p className="text-gray-400 text-sm">Watchlist ID: {watchlist.id}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}