import { Request, Response } from "express";
import { supabase } from "../config/supabase";


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


export const voteForCandidate = async (req: Request, res: Response): Promise<void> => {
  console.log("Received vote request:", req.body);
  
  const { sessionId, candidateId, voterId } = req.body;

  try {
    // Step 1: Validate the session
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session || session.status !== 'active') {
      res.status(400).json({ error: 'Invalid or inactive session' });
      return;
    }

    // Step 2: Check if the user has already voted in this session

const { data: existingVote, error: voteError } = await supabase
.from('votes')
.select('*')
.eq('session_id', sessionId)
.eq('voter_id', voterId)
.single();

console.log("Existing vote check:", { existingVote, voteError });

if (existingVote) {
console.log("User has already voted:", { voterId, sessionId });
res.status(400).json({ error: 'You have already voted in this session' });
return;
}


    // Step 3: Record the vote in the `votes` table
    const { data: vote, error: insertError } = await supabase
      .from('votes')
      .insert([{ session_id: sessionId, candidate_id: candidateId, voter_id: voterId }])
      .select()
      .single();

    if (insertError) {
      res.status(500).json({ error: 'Failed to record vote' });
      return;
    }

    // Step 4: Increment the vote count for the candidate
    const { data: candidate, error: candidateError } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', candidateId)
      .single();

    if (candidateError || !candidate) {
      res.status(400).json({ error: 'Candidate not found' });
      return;
    }

    const updatedVotes = candidate.votes + 1;
    const { data: updatedCandidate, error: updateError } = await supabase
      .from('candidates')
      .update({ votes: updatedVotes })
      .eq('id', candidateId)
      .select()
      .single();

    if (updateError) {
      res.status(500).json({ error: 'Failed to update vote count' });
      return;
    }

    res.status(200).json({ message: 'Vote submitted successfully', candidate: updatedCandidate });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit vote' });
    return;
  }
};


