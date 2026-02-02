import User from "../models/User.js";

export const sendRequest = async (req, res) => {
    try {
        const senderId = req.UserId;
        const { receiverId } = req.body;
        if (!receiverId) {
            return res.status(400).json({ message: "Please give receiver id" });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(400).json({ message: "Email not found" });
        }

        if (receiver._id.toString() === senderId) {
            return res.status(400).json({ message: "You can't send a request to yourself" });
        }

        if (receiver.requests.some(id => id.toString() === senderId)) {
            return res.status(400).json({ message: "You have already sent the request" });
        }

        receiver.requests.push(senderId);
        await receiver.save();

        return res.status(200).json({ message: "Request sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const acceptRequest = async (req, res) => {
    try {
        const receiverId = req.UserId;
        const { senderId } = req.body;

        if (!senderId) {
            return res.status(400).json({ message: "Please give sender id" });
        }

        const sender = await User.findById(senderId);
        if (!sender) {
            return res.status(400).json({ message: "User not found" });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver.requests.some(id => id.toString() === senderId)) {
            return res.status(400).json({ message: `${sender.userName} didn't send request` });
        }

        if (receiver.users.some(id => id.toString() === senderId)) {
            return res.status(400).json({ message: "Already in your list" });
        }

        receiver.requests = receiver.requests.filter(id => id.toString() !== senderId);

        receiver.users.push(senderId);
        await receiver.save();

        sender.users.push(receiverId);
        await sender.save();

        return res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const cancelRequest = async (req, res) => {
    try {
        const receiverId = req.UserId;
        const { senderId } = req.body;
        if (!senderId) {
            return res.status(400).json({ message: "Please give sender id" });
        }

        const sender = await User.findById(senderId);
        if (!sender) {
            return res.status(400).json({ message: "User not found" });
        }

        const receiver = await User.findById(receiverId);
        if (!receiver.requests.some(id => id.toString() === senderId)) {
            return res.status(400).json({ message: `${sender.userName} didn't send request` });
        }

        receiver.requests = receiver.requests.filter(id => id.toString() !== senderId);
        await receiver.save();

        return res.status(200).json({ message: "Request canceled successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}