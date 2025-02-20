
import React, { useEffect, useState } from "react";
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
              <span>{candidate.votes} votes</span>
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
