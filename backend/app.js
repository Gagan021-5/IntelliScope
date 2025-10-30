import express from "express";
const app = express();
const port = 3000;
import cors from "cors";

//middleware
app.use(
  (cors({
    origin: "http://localhost:5173",
    credentials : true,
  }))
);
app.use(express.json());


//public route
app.get("/", (req, res) => {
  res.send("Hello World!");
});



//routers
import searchroute from "./routes/searchroute.js";

app.use("/user",searchroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
