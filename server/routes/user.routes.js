import express from "express";
import { getUsers, logOut } from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.js";

const UserRouter = express.Router();

UserRouter.get("/get-users", auth, getUsers);
UserRouter.post("/logout", logOut);

export default UserRouter;