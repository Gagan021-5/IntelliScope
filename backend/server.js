import express from "express";
import cors from "cors";
import analysisrouter from "./router/analyzeroutes.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/analyze", analysisrouter);

app.get("/", (req, res) => {
  res.send({ msg: "Nutri-Guard Backend Running!" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at port ${process.env.PORT || 3000}`)
);
