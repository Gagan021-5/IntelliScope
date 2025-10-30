import { Router } from "express";
import { searchhandler } from "../Handler/asynchandler.js";
const searchroute = Router();


searchroute.post("/search",searchhandler);

export default searchroute;