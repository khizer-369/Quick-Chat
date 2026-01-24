import express from "express";
import { login, signUp } from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up", signUp);
authRoutes.post("/login", login);

export default authRoutes;