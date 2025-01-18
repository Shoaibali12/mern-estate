import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
