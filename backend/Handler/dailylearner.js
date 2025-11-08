import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export const dailyLearnBite = async (req, res) => {
  try {
    const { data } = await axios.get("https://api.currentsapi.services/v1/latest-news", {
      params: { 
        apiKey: process.env.CURRENT_API,
        language: "en",
        limit: 5
      }
    });

    const topNews = data.news || [];

    const results = await Promise.all(
      topNews.map(async (item) => {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Give a short, simple summary for students. Avoid special symbols.
Topic: ${item.title}
Info: ${item.description || ""}`;

        const aiSummary = await model.generateContent(prompt);

        return {
          title: item.title,
          ai_summary: aiSummary.response.text(),
          link: item.url,
          source: item.source,
          image: item.image || null,
          category: item.category,
          published: item.published
        };
      })
    );

    res.json(results);
  } catch (err) {
    console.error("Error generating daily learn bites:", err.message);
    res.status(500).json({ msg: "Failed to fetch Daily Learn Bites" });
  }
};
