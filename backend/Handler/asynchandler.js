import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export const searchhandler = async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ msg: "Query is required!" });

  try {
    const wikiResponse = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "User-Agent": "StudentWikiAI/1.0 (https://github.com/gagan)",
          Accept: "application/json",
        },
      }
    );

    const data = wikiResponse.data;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Summarize the following Wikipedia topic in clear, simple terms suitable for students.
Rules:
- Output plain text only (no *, #, -, or markdown).
- Keep it concise, under 100 words.

Topic: ${query}
Wikipedia Info: ${data.extract || "No info found"}`;

    const result = await model.generateContent(prompt);
    const ai_summary = result.response.text();
    console.log(ai_summary);

    res.json({
      title: data.title || query,
      ai_summary,
      source_summary: data.extract,
      link: data.content_urls?.desktop?.page || null,
      thumbnail: data.thumbnail?.source || null,
    });
  } catch (err) {
    console.error("Error fetching Wikipedia data:", err.message);
    res.status(500).json({ msg: "Failed to fetch data or generate summary." });
  }
};


