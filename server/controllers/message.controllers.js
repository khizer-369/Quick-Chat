import imageUploader from "../config/cloudinary.js";
import Message from "../models/Message.js";
import { io, getReceiverSocketId } from "../index.js";
import User from "../models/User.js";

export const selectedUserMessages = async (req, res) => {
    try {
        const userId = req.UserId;
        const { selectedUserId } = req.body;
        if (!selectedUserId) {
            return res.status(400).json({ message: "Please give user id" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: userId }
            ]
        });

        await Message.updateMany({ senderId: selectedUserId, receiverId: userId }, { seen: true });

        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.UserId;
        const { receiverId, text } = req.body;
        if (!receiverId) {
            return res.status(400).json({ message: "Please give user id" });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver.users.some(id => id.toString() === senderId)) {
            return res.status(400).json({ message: "This user is not in your contacts" });
        }

        if (!text && !req.file) {
            return res.status(400).json({ message: "You can't send empty message" });
        }

        const newMessage = { senderId, receiverId };
        if (text) {
            newMessage.text = text;
        }

        let imageUrl;
        if (req.file) {
            const filePath = req.file.path;
            imageUrl = await imageUploader(filePath);
            newMessage.imageUrl = imageUrl;
        }

        const createdMessage = await Message.create(newMessage);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("message", createdMessage);
        }

        return res.status(200).json(createdMessage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const messageSeen = async (req, res) => {
    try {
        const { messageId } = req.body;
        await Message.findByIdAndUpdate(messageId, { seen: true });
        return res.status(201);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}