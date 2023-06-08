import express from "express";
const router = express.Router();
import UserControllers from "../controllers/users.controllers";

const userControllers = new UserControllers();
router.route("/register").post(userControllers.register);
router.route("/login").post(userControllers.login);
export default router;
