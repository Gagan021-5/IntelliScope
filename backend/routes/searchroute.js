import { Router } from "express";
import { searchhandler } from "../Handler/asynchandler.js";
import { dailyLearnBite } from "../Handler/dailylearner.js";
const searchroute = Router();


searchroute.post("/search",searchhandler);
searchroute.get("/daily", dailyLearnBite);

export default searchroute;