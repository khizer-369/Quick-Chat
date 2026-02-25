import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/connectDb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import RequestRouter from "./routes/request.routes.js";
import UserRouter from "./routes/user.routes.js";
import ProfileRouter from "./routes/profile.route.js";
import cors from "cors";
import MessageRouter from "./routes/message.routes.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    }
});

const onlineUsers = {};

export const getReceiverSocketId = (receiverId) => {
    return onlineUsers[receiverId];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        onlineUsers[userId] = socket.id;
        io.emit("online-users", Object.keys(onlineUsers));
    }

    socket.on("disconnect", () => {
        delete onlineUsers[userId];
        io.emit("online-users", Object.keys(onlineUsers));
    })
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", RequestRouter);
app.use("/api", UserRouter);
app.use("/api", ProfileRouter);
app.use("/api", MessageRouter);

server.listen(PORT, () => {
    dbConnect();
    console.log(`Server started on ${PORT}`);
});