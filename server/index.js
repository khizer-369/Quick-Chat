import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/connectDb.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("<h1>Hello Wolrd</h1>");
});

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server started on ${PORT}`);
});