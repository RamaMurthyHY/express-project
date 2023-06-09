import express from "express";
const router = express.Router();
import UserControllers from "../controllers/users.controllers";
import { auth } from "../helpers";

const userControllers = new UserControllers();
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/current", auth.verifyAccessToken, userControllers.current);
export default router;
