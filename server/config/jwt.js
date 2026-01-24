import jwt from "jsonwebtoken";

export const generateToken = async (id) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}