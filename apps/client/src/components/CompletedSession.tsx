import React from "react";
import { ChevronRight } from "lucide-react";
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

function CompletedSession({
  completedSessions,
}: {
  completedSessions: VotingSession[];
}) {
  const navigate = useNavigate();
  return (
    <div>
      {/* <h2 className="text-xl font-semibold mb-4">Completed Sessions</h2> */}
      <div className="grid gap-4">
        {completedSessions.map((session) => (
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
              <button
                onClick={() => navigate(`/session/${session.id}`)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition"
              >
                View Results
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedSession;
