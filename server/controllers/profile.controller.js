import imageUploader from "../config/cloudinary.js";
import User from "../models/User.js";

export const profileUpdate = async (req, res) => {
    try {
        const userId = req.UserId;
        const { userName, bio } = req.body;
        if (!userName || !bio) {
            return res.status(400).json({ message: "Please fill in all the details" });
        }

        const user = await User.findOne({ userName, _id: { $ne: userId } });
        if (user) {
            return res.status(400).json({ message: "User name is already taken" });
        }

        if (req.file) {
            const filePath = req.file.path;
            const profilePhotoUrl = await imageUploader(filePath);
            await User.findByIdAndUpdate(userId, {
                userName,
                bio,
                profilePhotoUrl,
            });

            return res.status(200).json({ message: "Profile updated successfully" });
        }

        await User.findByIdAndUpdate(userId, {
            userName,
            bio,
        });

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}