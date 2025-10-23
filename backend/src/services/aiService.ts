import axios from "axios";

export async function analyzeStock(symbol: string, stockData: any) {
  try {
    const prompt = `
    Analyze the stock ${symbol} with current price $${stockData.price}.
    Provide a brief analysis including:
    1. Overall sentiment (Bullish/Bearish/Neutral)
    2. Risk assessment (Low/Medium/High)
    3. Brief recommendation
    
    Keep it concise and professional.
    `;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2:1b",
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7, // more temp -> more creativity
        max_tokens: 200,
      },
    });

    return {
      symbol,
      analysis: response.data.response,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Ollama Analysis Error:", error);

    return {
      symbol,
      analysis: `${symbol} analysis: Current price $${stockData.price}. Market shows mixed signals. Sentiment: Neutral. Risk: Medium. Consider your investment goals.`,
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getMarketSentiment() {
  try {
    const prompt = `
    Provide a brief market sentiment analysis for today:
    - Overall market trend
    - Key sectors to watch
    - General advice
    
    Keep it concise.
    `;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3.2:1b",
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 150,
      },
    });

    return {
      sentiment: response.data.response,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Market Sentiment Error:", error);
    return {
      sentiment: "Market sentiment unavailable. Please check your connection.",
      timestamp: new Date().toISOString(),
    };
  }
}
