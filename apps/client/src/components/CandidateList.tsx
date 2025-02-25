

// frontend/components/CandidateList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/config/supabaseClient";

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

interface CandidateListProps {
  sessionId: string;
}

const CandidateList = ({ sessionId }: CandidateListProps) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleVote = async (candidateId: string) => {
    setLoading(true);
    setError("");

    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      if (!token) {
        setError("Auth token missing.");
        setLoading(false);
        return;
      }

      const voterId = (await supabase.auth.getUser()).data.user?.id;
      if (!voterId) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const payload = { sessionId, candidateId, voterId };
      // console.log("Request payload:", payload);

      const response = await axios.post(
        `http://localhost:5000/api/candidates/vote`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Vote submitted successfully:", response.data);

      // Update the candidate list with the new vote count
      const updatedCandidates = candidates.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      );
      setCandidates(updatedCandidates);
    } catch (error: any) {
      console.error("Error in handleVote:", error.response?.data || error.message);

      // Handle 400 error (user already voted)
      if (error.response?.status === 400) {
        alert(error.response.data.error || "You have already voted in this session.");
      } else {
        alert("Something went wrong. Please try again.");
      }

      setError(error.response?.data?.error || "Failed to vote for candidate.");
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data: user, error: authError } = await supabase.auth.getUser();
        if (authError || !user?.user) {
          setError("Unauthorized: Please log in.");
          setLoading(false);
          return;
        }

        const token = (await supabase.auth.getSession()).data.session
          ?.access_token;
        if (!token) {
          setError("Auth token missing.");
          setLoading(false);
          return;
        }

        const response = await axios.get<{ candidates: Candidate[] }>(
          `http://localhost:5000/api/candidates/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCandidates(response.data.candidates);
      } catch (err) {
        setError("Error fetching candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [sessionId]);

  if (loading) {
    return <p className="text-gray-600">Loading candidates...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {candidates.length > 0 ? (
        <ul className="space-y-2">
          {candidates.map((candidate) => (
            <li
              key={candidate.id}
              className="p-3 bg-gray-100 rounded-lg text-gray-800 flex justify-between"
            >
              <span>{candidate.name}</span>
              <div>
                <span>{candidate.votes} votes</span>
                <button
                  onClick={() => handleVote(candidate.id)}
                  disabled={loading}
                  className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Vote
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No candidates found.</p>
      )}
    </div>
  );
};

export default CandidateList;
