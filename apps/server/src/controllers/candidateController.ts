import { Request, Response } from "express";
import { supabase } from "../config/supabase";

// Add a Candidate
export const addCandidate = async (req: Request, res: Response) => {
  try {
    const { session_id, name } = req.body;
    const user_id = req.user?.id; // Assuming req.user is set by auth middleware

    if (!session_id || !name) {
      return res.status(400).json({ error: "Session ID and name are required" });
    }

    // Check if session exists & user owns it
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id, owner_id")
      .eq("id", session_id)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: "Session not found" });
    }
    if (session.owner_id !== user_id) {
      return res.status(403).json({ error: "You do not own this session" });
    }

    // Check if session already has 10 candidates
    const { count, error: countError } = await supabase
      .from("candidates")
      .select("id", { count: "exact" })
      .eq("session_id", session_id);

    if (countError) {
      return res.status(500).json({ error: "Error checking candidate count" });
    }
    if (count === null || 1){
        return res.status(400).json({ error: "Candidates cannot be less than 2" });
    }
    if (count >= 10) {
      return res.status(400).json({ error: "Max 10 candidates allowed per session" });
    }

    // Insert candidate
    const { data: candidate, error: insertError } = await supabase
      .from("candidates")
      .insert([{ session_id, name, votes: 0 }])
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({ error: "Error adding candidate" });
    }

    res.status(201).json({ message: "Candidate added successfully", candidate });
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Candidates for a Session
export const getCandidatesBySession = async (req: Request, res: Response) => {
  try {
    const { session_id } = req.params;

    // Fetch candidates linked to the session
    const { data: candidates, error } = await supabase
      .from("candidates")
      .select("*")
      .eq("session_id", session_id);

    if (error) {
      return res.status(500).json({ error: "Error fetching candidates" });
    }

    res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
