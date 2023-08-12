import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { dbConnect } from "./src/config/dbconfig.js";

const app = express();

// Dynamic port for broadcasting
const PORT = process.env.PORT || 8080;

// database connection
dbConnect();

app.use("/", (req, res) => {
  res.json({
    message: "You do not have access here",
  });
});

// global error handler

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.errorCode || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

// boradcasting the api
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server is running at http://localhost:${PORT}`);
});
