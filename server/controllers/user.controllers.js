import User from "../models/User.js";
import Message from "../models/Message.js";

export const getUsers = async (req, res) => {
    try {
        const userId = req.UserId;
        const users = await User.findById(userId).populate("users");


        const unSeenMessagesCount = {};
        await Promise.all(users.users.map(async (user) => {
            const count = await Message.countDocuments({ senderId: user._id, receiverId: userId, seen: false });
            if (count > 0) {
                unSeenMessagesCount[user._id] = count;
            }
        }))

        return res.status(200).json({ users, unSeenMessagesCount })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        return res.status(200).json({ message: "Log out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}