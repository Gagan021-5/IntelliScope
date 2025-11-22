import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash-latest",
});
