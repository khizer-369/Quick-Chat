import express from "express";
import { auth } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { profileUpdate } from "../controllers/profile.controller.js";

const ProfileRouter = express.Router();

ProfileRouter.post("/profile-update", auth, upload.single("profilePhoto"), profileUpdate);

export default ProfileRouter;