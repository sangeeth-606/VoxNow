import {  Router } from "express";
import { createSession,getUserSessions,getSessionById } from "../controllers/sessionController";

import { authenticateUser } from "../middleware/auth";

const router = Router();

router.post("/create",authenticateUser,createSession)

// import { Router } from "express";
// import { createSession } from "../controllers/sessionController";
// import { authenticateUser } from "../middleware/auth";

// const router = Router();

// router.post("/create", createSession); // ✅ Correct usage

// export default router;
