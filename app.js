import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
dotenv.config();
const app = express();

app.use(express.json());
// import routes
app.use("/api", router);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Building Management API is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
