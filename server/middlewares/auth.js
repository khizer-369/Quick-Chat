import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({message: "You do not have token"});
        }

        const getUser = jwt.verify(token, process.env.JWT_SECRET);
        if(!getUser){
            return res.status(400).json({message: "Invalid token"});
        }

        req.UserId = getUser.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error"});
    }
}