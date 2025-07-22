import express from "express";
import cors from "cors";
import dbConnect from "./db.js";
import taskRoute from "./routes/taskRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});