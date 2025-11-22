import express from "express";
import upload from "../middleware/upload.js";
import { analyzeFood } from "../controller/analyze.js";
const analysisrouter = express.Router();

analysisrouter.post("/", upload.single("image"), analyzeFood);

export default analysisrouter;
