import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/connectDb.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api", authRoutes);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server started on ${PORT}`);
});