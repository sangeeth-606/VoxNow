import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Session {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

const SessionDetails = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/session/${session_id}`);
        setSession(response.data);
      } catch (err) {
        setError("Error fetching session details");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [session_id]);

  if (loading) return <p className="text-white">Loading session details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-800 rounded-lg max-w-lg mx-auto mt-24">
      {session ? (
        <>
          <h2 className="text-2xl font-semibold text-white mb-4">{session.name}</h2>
          <p className="text-gray-300 mb-2">{session.description}</p>
          <p className="text-gray-400">Status: {session.status}</p>
          <p className="text-gray-400">Created at: {new Date(session.created_at).toLocaleString()}</p>

          <button
            onClick={() => navigate(`/candidates/${session.id}`)}
            className="mt-4 p-2 bg-blue-500 rounded-lg text-white w-full"
          >
            See Candidates
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-2 p-2 bg-gray-600 rounded-lg text-white w-full"
          >
            Back to Dashboard
          </button>
        </>
      ) : (
        <p className="text-gray-400">Session not found.</p>
      )}
    </div>
  );
};

export default SessionDetails;
