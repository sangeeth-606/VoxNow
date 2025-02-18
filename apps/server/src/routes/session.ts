import {  Router } from "express";
import { createSession,getUserSessions,getSessionById } from "../controllers/sessionController";

import { authenticateUser } from "../middleware/auth";

const router = Router();

router.post("/create",authenticateUser,createSession)
router.get("/user",authenticateUser,getUserSessions)
router.get("/:id",authenticateUser,getSessionById)

export default router