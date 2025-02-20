import React from "react";
import { ChevronRight, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface VotingSession {
  // Use a different name to avoid conflict
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  owner_id: string;
}

function ActiveSession({
  activeSessions,
}: {
  activeSessions: VotingSession[];
}) {
  const navigate = useNavigate();
  return (
    <div className="mb-8">
      {/* <h2 className="text-xl font-semibold mb-4">Active Sessions</h2> */}
      <div className="grid gap-4">
        {activeSessions.map((session) => (
          <div
            key={session.id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-1">{session.name}</h3>
                <div className="text-sm text-gray-400">
                  {session.description}
                </div>
                <div className="text-sm text-gray-500">
                  Created on {new Date(session.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                  <QrCode size={20} />
                </button>
                <button
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition"
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveSession;

// interface Session {
//     id: string; // UUID from Supabase
//     name: string;
//     owner_id: string; // The user who created the session
//     participants: number; // Can be a count field
//     created_at: string; // Timestamp from Supabase
//     end_date: string; // When the session ends
//     status: "active" | "completed"; // Restrict status to these two values
//   }
