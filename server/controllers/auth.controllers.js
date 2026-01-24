import { generateToken } from "../config/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    try {
        const { userName, email, password, bio } = req.body;
        if (!userName || !email || !password || !bio) {
            return res.status(400).json({ message: "Please fill in all the details" });
        }

        const findUserName = await User.findOne({ userName });
        if (findUserName) {
            return res.status(400).json({ message: "User is already taken" });
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: "User is already register" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            userName,
            email,
            password: hashedPassword,
            bio,
        });

        const token = generateToken(createdUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        const userWithOutPassword = createdUser.toObject();
        delete userWithOutPassword.password;

        return res.status(201).json(userWithOutPassword);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all the details" });
        }

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "email or password is incorrect" });
        }

        const token = await generateToken(findUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        const userWithOutPassword = findUser.toObject();
        delete userWithOutPassword.password;

        return res.status(200).json(userWithOutPassword);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}