import express from "express";
import { auth } from "../middlewares/auth.js";
import { messageSeen, selectedUserMessages, sendMessage } from "../controllers/message.controllers.js";
import upload from "../middlewares/multer.js";

const MessageRouter = express.Router();

MessageRouter.post("/selected-user-messages", auth, selectedUserMessages);
MessageRouter.post("/send-message", auth, upload.single("image"), sendMessage);
MessageRouter.post("/message-seen", auth, messageSeen);

export default MessageRouter;