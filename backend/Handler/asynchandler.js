import "dotenv/config";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
const serpapi = process.env.SERPAPI;
const ninjasapi = process.env.APININJAS;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

export const searchhandler = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ msg: "Query is required!" });
  }

  try {
    const response =await axios.get(
      `https://api.api-ninjas.com/v1/wikipedia?query=${query}`,
      {
        headers: { "X-Api-Key": ninjasapi },
      }
    );
    const data = response.data[0] || {};

    const model = genAI.GoogleGenerativeAI({
      model: "gemini-1.5-flash",
    });

    const prompt = `Summarize this in simple, verified terms for a student :Topic ${query}  Wikipedia Info: ${
      data.summary || "No info found"
    }`;

    const result = await model.generateContent(prompt);
    const aisummary = result.response.text();

    res.json({
      title: data.title || query,
      ai_summary: aisummary,
      source_summary: data.summary,
      link: wikiData.link || null,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(505)
      .json({ mgs: "Cant extract information. Internal Server Error" });
  }
};
