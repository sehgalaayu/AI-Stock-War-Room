import axios, { options } from "axios";

export async function analyseStock(symbol: string, stockData: any) {
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
      model: "llama.3.2:3b",
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7, // controls creativity (higher = more creative)
        max_tokens: 200,
      },
    });
  } catch (error) {}
}
