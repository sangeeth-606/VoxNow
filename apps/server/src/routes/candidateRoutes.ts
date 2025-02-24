import express from "express";
import { addCandidate, getCandidatesBySession, voteForCandidate } from "../controllers/candidateController";
import { authenticateUser } from "../middleware/auth"; // Ensure user is authenticated

const router = express.Router();

// Route to add a candidate (Protected)
router.post("/add", authenticateUser, addCandidate);
router.post('/vote', authenticateUser,voteForCandidate);
// Route to get candidates for a specific session
router.get("/:session_id", getCandidatesBySession);
    
export default router;
