import { Request, Response } from "express";
import { supabase } from "../config/supabase";

// Add a Candidate
// export const addCandidate = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { session_id, name } = req.body;
//     const user_id = req.user?.id; // Assuming req.user is set by auth middleware

//     if (!session_id || !name) {
//        res.status(400).json({ error: "Session ID and name are required" });
//        return
//     }

//     // Check if session exists & user owns it
//     const { data: session, error: sessionError } = await supabase
//       .from("sessions")
//       .select("id, owner_id")
//       .eq("id", session_id)
//       .single();

//     if (sessionError || !session) {
//        res.status(404).json({ error: "Session not found" });
//        return
//     }
//     if (session.owner_id !== user_id) {
//        res.status(403).json({ error: "You do not own this session" });
//        return
//     }

//     // Check if session already has 10 candidates
//     const { count, error: countError } = await supabase
//       .from("candidates")
//       .select("id", { count: "exact" })
//       .eq("session_id", session_id);

//     if (countError) {
//        res.status(500).json({ error: "Error checking candidate count" });
//        return
//     }
//     if (count === null || 1){
//          res.status(400).json({ error: "Candidates cannot be less than 2" });
//          return
//     }
//     if (count >= 10) {
//        res.status(400).json({ error: "Max 10 candidates allowed per session" });
//     }

//     // Insert candidate
//     const { data: candidate, error: insertError } = await supabase
//       .from("candidates")
//       .insert([{ session_id, name, votes: 0 }])
//       .select()
//       .single();

//     if (insertError) {
//        res.status(500).json({ error: "Error adding candidate" });
//        return
//     }

//     res.status(201).json({ message: "Candidate added successfully", candidate });
//   } catch (error) {
//     console.error("Error adding candidate:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// export const addCandidate = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { session_id, candidates } = req.body;
//     const user_id = req.user?.id;

//     if (!session_id || !Array.isArray(candidates) || candidates.length === 0) {
//       res.status(400).json({ error: "Session ID and at least one candidate name are required" });
//       return;
//     }

//     // Check if session exists
//     const { data: session, error: sessionError } = await supabase
//       .from("sessions")
//       .select("id, owner_id")
//       .eq("id", session_id)
//       .single();

//     if (sessionError || !session) {
//       res.status(404).json({ error: "Session not found" });
//       return;
//     }
//     if (session.owner_id !== user_id) {
//       res.status(403).json({ error: "You do not own this session" });
//       return;
//     }

//     // Check candidate count
//     const { count, error: countError } = await supabase
//       .from("candidates")
//       .select("id", { count: "exact" })
//       .eq("session_id", session_id);

//     if (countError) {
//       res.status(500).json({ error: "Error checking candidate count" });
//       return;
//     }
//     if (count !== null && count + candidates.length > 10) {
//       res.status(400).json({ error: "Max 10 candidates allowed per session" });
//       return;
//     }
//     if (count !== null && count < 1) {
//       res.status(400).json({ error: "Candidates cannot be less than 2" });
//       return;
//     }

//     // Insert multiple candidates
//     const candidateEntries = candidates.map((name) => ({
//       session_id,
//       name,
//       votes: 0,
//     }));

//     const { data: insertedCandidates, error: insertError } = await supabase
//       .from("candidates")
//       .insert(candidateEntries)
//       .select();

//     if (insertError) {
//       res.status(500).json({ error: "Error adding candidates" });
//       return;
//     }

//     res.status(201).json({ message: "Candidates added successfully", candidates: insertedCandidates });
//   } catch (error) {
//     console.error("Error adding candidates:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const addCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received request payload:", req.body);

    const { session_id, candidates } = req.body;
    const user_id = req.user?.id;

    if (!session_id || !Array.isArray(candidates) || candidates.length === 0) {
      console.error("Invalid request format:", req.body);
      res.status(400).json({ error: "Session ID and at least one candidate name are required" });
      return;
    }

    // Check if session exists
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id, owner_id")
      .eq("id", session_id)
      .single();

    if (sessionError || !session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }
    if (session.owner_id !== user_id) {
      res.status(403).json({ error: "You do not own this session" });
      return;
    }

    console.log("Adding candidates:", candidates);

    const candidateEntries = candidates.map((name) => ({
      session_id,
      name,
      votes: 0,
    }));

    const { data: insertedCandidates, error: insertError } = await supabase
      .from("candidates")
      .insert(candidateEntries)
      .select();

    if (insertError) {
      console.error("Database error inserting candidates:", insertError);
      res.status(500).json({ error: "Error adding candidates" });
      return;
    }

    res.status(201).json({ message: "Candidates added successfully", candidates: insertedCandidates });
  } catch (error) {
    console.error("Error adding candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Get Candidates for a Session
export const getCandidatesBySession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id } = req.params;

    // Fetch candidates linked to the session
    const { data: candidates, error } = await supabase
      .from("candidates")
      .select("*")
      .eq("session_id", session_id);

    if (error) {
      res.status(500).json({ error: "Error fetching candidates" });
      return 
    }

    res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
