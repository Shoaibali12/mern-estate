import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const uri = "mongodb://localhost:27017";
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.use("/api/auth", authRouter);
