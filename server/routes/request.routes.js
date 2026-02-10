import express from "express";
import { auth } from "../middlewares/auth.js";
import { cancelRequest, acceptRequest, sendRequest, deleteUser } from "../controllers/request.controllers.js";

const RequestRouter = express.Router();

RequestRouter.post("/send-request", auth, sendRequest);
RequestRouter.post("/accept-request", auth, acceptRequest);
RequestRouter.post("/cancel-request", auth, cancelRequest);
RequestRouter.delete("/delete-user", auth, deleteUser);

export default RequestRouter;