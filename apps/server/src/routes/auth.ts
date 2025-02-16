import {  Router } from "express";
import { signUp, Login, logout } from "../controllers/authController";

const router = Router();

router.post("/signup", signUp);
router.post("/login", Login);
router.post("/logout", logout);

export default router;
