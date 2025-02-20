import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "@/config/supabaseClient";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  X,
} from "lucide-react";
import CandidateList from "./CandidateList";

interface SessionData {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

const SessionDetails = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isloading, setisLoading] = useState(false);
  const [iserror, setisError] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const { data: user, error: authError } = await supabase.auth.getUser();
        if (authError || !user?.user) {
          setError("Unauthorized: Please log in.");
          setLoading(false);
          return;
        }

        // console.log(user.user.id)

        const token = (await supabase.auth.getSession()).data.session
          ?.access_token;
        if (!token) {
          setError("Auth token missing.");
          setLoading(false);
          return;
        }

        const response = await axios.get<{ session: SessionData }>(
          `http://localhost:5000/api/session/${session_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (user.user.id === response.data.session.owner_id) {
          // console.log("confirmed");
        }
        setIsOwner(user.user.id === response.data.session.owner_id);
        // console.log(setIsOwner)
        // console.log(response.data.session.owner_id)

        if (response.data) {
          setSession(response.data.session);
        } else {
          setError("Session not found.");
        }
      } catch (err) {
        setError("Error fetching session details.");
      } finally {
        setLoading(false);
      }
    };



    fetchSessionDetails();
  }, [session_id]);

  const handleCompleteSession = async () => {
    setisLoading(true);
    setisError("");

    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      if (!token) {
        setError("Auth token missing.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/session/${session_id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (err) {
      setError("Failed to complete session.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-blue-600 text-white";
      case "pending":
        return "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500";
      case "completed":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-blue-600 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-gray-200 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading session details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-gray-100">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-50">
            <Info className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Error
          </h2>
          <p className="text-center text-gray-600">{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-16">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </header>

      {session ? (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {session.name || "Unnamed Session"}
              </h1>
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}
              >
                {session.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>{formatDate(session.created_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{formatTime(session.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {session.description ||
                    "No description available for this session."}
                </p>
              </div>

              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Session Details
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-gray-900">
                      {session.status}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium text-gray-900">
                      {new Date(session.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Session ID</span>
                    <span className="font-medium text-gray-900">
                      {session.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Actions
                </h2>

                {session.status !== 'completed' && (
  <button
    onClick={() => setShowVoteModal(true)}
    className="w-full py-4 px-6 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all duration-300"
  >
    <div className="flex items-center justify-center">
      <CheckCircle2 className="w-5 h-5 mr-2" />
      Cast Your Vote
    </div>
  </button>
)}
                {isOwner && (
                  <>
                    {session.status === "active" ? (
                      <button
                        onClick={handleCompleteSession}
                        disabled={loading}
                        className="bg-red-500 ml-32 mt-1 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isloading ? "Completing..." : "End this session"}
                      </button>
                    ) : (
                      <button
                        disabled={true}
                        className="bg-gray-500 ml-32 mt-1 text-white px-4 py-2 rounded cursor-not-allowed"
                      >
                        Session completed
                      </button>
                    )}
                  </>
                )}
                {iserror && <p className="text-red-500">{error}</p>}

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Info className="w-4 h-4 text-yellow-500 mr-2" />
                    Session Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    This session is currently{" "}
                    {session.status?.toLowerCase() || "active"}. You can cast
                    your vote or view details about this voting session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 text-lg">No session details available.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 py-2 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      )}

      {showVoteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowVoteModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="px-6 pt-6 pb-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Vote for Session
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {session?.name || "This session"}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4">
                {session_id ? (
                  <CandidateList sessionId={session_id} />
                ) : (
                  <div className="text-center text-gray-500">
                    No session ID available
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex flex-row-reverse gap-3">
                <button
                  onClick={() => setShowVoteModal(false)}
                  className="py-2 px-4 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetails;
