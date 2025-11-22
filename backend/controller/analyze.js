import axios from "axios";
import fs from "fs";
import { geminiModel } from "../services/googleservices.js";
import imageToBase64 from "../utils/imgconversion.js";
import getMimeType from "../utils/getmemetype.js";
export const analyzeFood = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No image file provided" });

    if (!req.body.condition)
      return res.status(400).json({ error: "No condition provided" });

    const imagePath = req.file.path;
    const condition = req.body.condition;

    // Identify food
    const base64 = imageToBase64(imagePath);
    const mimeType = getMimeType(imagePath);

    const identify = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { data: base64, mimeType } },
            { text: "Identify the dish. Output ONLY the name." },
          ],
        },
      ],
    });

    const foodName =
      identify.response.candidates[0].content.parts[0].text.trim();

    // Nutrition API
    const nutrition = await axios.get(
      "https://api.api-ninjas.com/v1/nutrition",
      {
        params: { query: foodName },
        headers: { "X-Api-Key": process.env.NINJA_API_KEY },
      }
    );

    // Analysis Prompt
    const analysisPrompt = `
      Analyze nutritional info for "${foodName}" for someone with "${condition}".
      Output ONLY JSON:
      {
        "traffic_light": "green" | "yellow" | "red",
        "verdict_title": "",
        "reason": "",
        "suggestion": ""
      }
    `;

    const analysis = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: analysisPrompt }] }],
    });

    const analysisText =
      analysis.response.candidates[0].content.parts[0].text.trim();

    const cleanJson = JSON.parse(
      analysisText.replace(/```json|```/g, "").trim()
    );

    fs.unlinkSync(imagePath);

    res.json({
      food_name: foodName,
      ...cleanJson,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Analysis failed",
      message: err.message,
    });
  }
};
