import express from "express";
import { updateUser } from "../controller/user.contriller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);

export default router;
