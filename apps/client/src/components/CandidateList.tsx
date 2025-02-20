
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Candidate {
  id: string;
  name: string;
  votes: number;
}

interface Session {
  id: string;
  name: string;
}

const CandidateList = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Fetch session details
        const sessionRes = await axios.get<{ id: string; name: string }>(
          `http://localhost:5000/api/session/${session_id}`
        );
        setSession(sessionRes.data);

        // Fetch candidates
        const candidatesRes = await axios.get<{ candidates: Candidate[] }>(
          `http://localhost:5000/api/candidates/${session_id}`
        );
        setCandidates(candidatesRes.data.candidates);
      } catch (err: any) {
        setError("Error fetching candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [session_id]);

  if (loading) return <p className="text-white">Loading candidates...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-800 rounded-lg max-w-lg mx-auto mt-24">
      {session && (
        <h2 className="text-2xl font-semibold text-white mb-4">
          {session.name} - Candidates
        </h2>
      )}
      {candidates.length > 0 ? (
        <ul className="space-y-2">
          {candidates.map((candidate) => (
            <li
              key={candidate.id}
              className="p-3 bg-gray-700 rounded-lg text-white flex justify-between"
            >
              <span>{candidate.name}</span>
              <span>{candidate.votes} votes</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No candidates found.</p>
      )}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-4 p-2 bg-blue-500 rounded-lg text-white w-full"
      >
        Go Back
      </button>
    </div>
  );
};

export default CandidateList;
