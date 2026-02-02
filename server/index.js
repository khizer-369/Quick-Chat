import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/connectDb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import RequestRouter from "./routes/request.routes.js";
import UserRouter from "./routes/user.routes.js";
import ProfileRouter from "./routes/profile.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", RequestRouter);
app.use("/api", UserRouter);
app.use("/api", ProfileRouter);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server started on ${PORT}`);
});