
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { supabase } from "@/config/supabaseClient";
// import { TrophySpin } from "react-loading-indicators";

// interface SessionData {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
//   created_at: string;
// }

// const SessionDetails = () => {
//   const { session_id } = useParams();
//   const navigate = useNavigate();
//   const [session, setSession] = useState<SessionData | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSessionDetails = async () => {
//       try {
//         const { data: user, error: authError } = await supabase.auth.getUser();
//         if (authError || !user?.user) {
//           setError("Unauthorized: Please log in.");
//           setLoading(false);
//           return;
//         }

//         const token = (await supabase.auth.getSession()).data.session
//           ?.access_token;
//         if (!token) {
//           setError("Auth token missing.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get<{ session: SessionData }>(
//           `http://localhost:5000/api/session/${session_id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data) {
//           setSession(response.data.session);
//         } else {
//           setError("Session not found.");
//         }
//       } catch (err) {
//         setError("Error fetching session details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSessionDetails();
//   }, [session_id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <TrophySpin color="#7183ad" size="medium" text="" textColor="" />
//       </div>
//     );
//   }
  
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6 bg-gray-800 rounded-lg max-w-lg mx-auto mt-24">
//       {session ? (
//         <>
//           <h2 className="text-2xl font-semibold text-white mb-4">
//             {session.name || "Unnamed Session"}
//           </h2>
//           <p className="text-gray-300">
//             {session.description || "No description available."}
//           </p>
//           <p className="text-gray-400">Status: {session.status}</p>
//           <p className="text-gray-400">
//             Created at:{" "}
//             {session.created_at
//               ? new Date(session.created_at).toLocaleString()
//               : "Unknown"}
//           </p>
//           <button
//             onClick={() => navigate(`/candidates/${session.id}`)}
//             className="mt-4 p-2 bg-blue-500 rounded-lg text-white w-full"
//           >
//             Vote.
//           </button>
//         </>
//       ) : (
//         <p className="text-gray-400">No session details available.</p>
//       )}
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="mt-4 p-2 bg-gray-600 rounded-lg text-white w-full"
//       >
//         Back to Dashboard
//       </button>
//     </div>
//   );
// };

// export default SessionDetails;
//==================================================================================================

//claude code 
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { supabase } from "@/config/supabaseClient";
// import { ArrowLeft, Calendar, CheckCircle2, Clock, Info, X } from "lucide-react";

// interface SessionData {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
//   created_at: string;
// }

// const SessionDetails = () => {
//   const { session_id } = useParams();
//   const navigate = useNavigate();
//   const [session, setSession] = useState<SessionData | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showVoteModal, setShowVoteModal] = useState(false);
//   const [voteAnimation, setVoteAnimation] = useState(false);

//   useEffect(() => {
//     const fetchSessionDetails = async () => {
//       try {
//         const { data: user, error: authError } = await supabase.auth.getUser();
//         if (authError || !user?.user) {
//           setError("Unauthorized: Please log in.");
//           setLoading(false);
//           return;
//         }

//         const token = (await supabase.auth.getSession()).data.session
//           ?.access_token;
//         if (!token) {
//           setError("Auth token missing.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get<{ session: SessionData }>(
//           `http://localhost:5000/api/session/${session_id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data) {
//           setSession(response.data.session);
//         } else {
//           setError("Session not found.");
//         }
//       } catch (err) {
//         setError("Error fetching session details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSessionDetails();
//   }, [session_id]);

//   const handleVoteClick = () => {
//     setVoteAnimation(true);
//     setTimeout(() => {
//       setVoteAnimation(false);
//       setShowVoteModal(true);
//     }, 600);
//   };

//   const getStatusColor = (status:string | undefined) => {
//     switch (status?.toLowerCase()) {
//       case 'active': return 'bg-green-500';
//       case 'pending': return 'bg-yellow-500';
//       case 'closed': return 'bg-red-500';
//       default: return 'bg-blue-500';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
//         <div className="w-16 h-16 relative">
//           <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-blue-200 animate-spin"></div>
//         </div>
//         <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading session details...</p>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full">
//           <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900">
//             <Info className="w-8 h-8 text-red-600 dark:text-red-300" />
//           </div>
//           <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Error</h2>
//           <p className="text-center text-gray-600 dark:text-gray-300">{error}</p>
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="mt-6 w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium flex items-center justify-center"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Navigation and breadcrumb */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Dashboard
//           </button>
//         </div>
        
//         {session ? (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
//             {/* Session header with status badge */}
//             <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 sm:p-10">
//               <div className="absolute right-6 top-6">
//                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(session.status)}`}>
//                   {session.status}
//                 </span>
//               </div>
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 {session.name || "Unnamed Session"}
//               </h1>
//               <div className="flex items-center space-x-4 text-blue-100">
//                 <div className="flex items-center">
//                   <Calendar className="w-4 h-4 mr-1.5" />
//                   <span>
//                     {session.created_at
//                       ? new Date(session.created_at).toLocaleDateString('en-US', {
//                           month: 'short',
//                           day: 'numeric',
//                           year: 'numeric'
//                         })
//                       : "Unknown date"}
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="w-4 h-4 mr-1.5" />
//                   <span>
//                     {session.created_at
//                       ? new Date(session.created_at).toLocaleTimeString('en-US', {
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })
//                       : "Unknown time"}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Session content */}
//             <div className="px-6 py-8 sm:p-10">
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Description</h2>
//                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                   {session.description || "No description available for this session."}
//                 </p>
//               </div>
              
//               <div className="mt-10">
//                 <button
//                   onClick={handleVoteClick}
//                   className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg text-white 
//                     transition-all duration-300 overflow-hidden
//                     ${voteAnimation ? 'scale-95 bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'}`}
//                 >
//                   <div className="relative z-10 flex items-center justify-center">
//                     <CheckCircle2 className={`w-6 h-6 mr-2 ${voteAnimation ? 'animate-pulse' : ''}`} />
//                     Cast Your Vote
//                   </div>
//                   {voteAnimation && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-4 h-4 rounded-full bg-indigo-300 animate-ping"></div>
//                       <div className="absolute w-16 h-16 rounded-full bg-indigo-200 opacity-75 animate-pulse"></div>
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
//             <p className="text-gray-600 dark:text-gray-400 text-lg">No session details available.</p>
//           </div>
//         )}
//       </div>

//       {/* Innovative Vote Modal */}
//       {showVoteModal && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
//             </div>

//             {/* Modal panel with animations */}
//             <div 
//               className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full px-6 py-6 sm:p-8 animate-fadeIn"
//               style={{animation: "fadeInZoom 0.3s ease-out"}}
//             >
//               <style>{`
//                 @keyframes fadeInZoom {
//                   from {
//                     opacity: 0;
//                     transform: scale(0.95);
//                   }
//                   to {
//                     opacity: 1;
//                     transform: scale(1);
//                   }
//                 }
//                 .animate-fadeIn {
//                   animation: fadeInZoom 0.3s ease-out;
//                 }
//               `}</style>

//               <div className="absolute top-4 right-4">
//                 <button 
//                   onClick={() => setShowVoteModal(false)}
//                   className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
//                   <CheckCircle2 className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Vote for Session</h3>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">
//                   {session?.name || "This session"}
//                 </p>
//               </div>

//               {/* Placeholder for actual voting component */}
//               <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 mb-6">
//                 <div className="text-center py-8">
//                   <p className="text-gray-700 dark:text-gray-300 mb-4">
//                     Your voting component will appear here
//                   </p>
//                   <div className="w-full h-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
//                   <div className="w-3/4 h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mx-auto mt-4"></div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 mt-6">
//                 <button
//                   onClick={() => setShowVoteModal(false)}
//                   className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowVoteModal(false);
//                     navigate(`/candidates/${session?.id}`);
//                   }}
//                   className="flex-1 py-3 px-4 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-colors"
//                 >
//                   Continue to Vote
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SessionDetails;

// claude update code 
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "@/config/supabaseClient";
import { ArrowLeft, Calendar, CheckCircle2, Clock, Info, X } from "lucide-react";

interface SessionData {
  id: string;
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
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteAnimation, setVoteAnimation] = useState(false);

  useEffect(() => {
    const fetchSessionDetails = async () => {
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

        const response = await axios.get<{ session: SessionData }>(
          `http://localhost:5000/api/session/${session_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const handleVoteClick = () => {
    setVoteAnimation(true);
    setTimeout(() => {
      setVoteAnimation(false);
      setShowVoteModal(true);
    }, 600);
  };

  const getStatusColor = (status:string |undefined) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-blue-600 text-white';
      case 'pending': return 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500';
      case 'closed': return 'bg-gray-200 text-gray-600';
      default: return 'bg-blue-600 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-gray-200 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading session details...</p>
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Error</h2>
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
    <div className="min-h-screen bg-white">
      {/* Top navigation bar */}
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
          {/* Session header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {session.name || "Unnamed Session"}
              </h1>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                {session.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>
                  {session.created_at
                    ? new Date(session.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : "Unknown date"}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>
                  {session.created_at
                    ? new Date(session.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : "Unknown time"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Session content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {session.description || "No description available for this session."}
                </p>
              </div>
              
              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Session Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-gray-900">{session.status}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Created</span>
                    <span className="font-medium text-gray-900">
                      {session.created_at
                        ? new Date(session.created_at).toLocaleString()
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Session ID</span>
                    <span className="font-medium text-gray-900">{session.id}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Actions</h2>
                <button
                  onClick={handleVoteClick}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-white 
                    transition-all duration-300
                    ${voteAnimation ? 'scale-95 bg-blue-700' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                >
                  <div className="flex items-center justify-center">
                    <CheckCircle2 className={`w-5 h-5 mr-2 ${voteAnimation ? 'animate-pulse' : ''}`} />
                    Cast Your Vote
                  </div>
                </button>
                
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Info className="w-4 h-4 text-yellow-500 mr-2" />
                    Session Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    This session is currently {session.status?.toLowerCase() || "active"}. 
                    You can cast your vote or view details about this voting session.
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

      {/* Vote Modal */}
      {showVoteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>

            {/* Modal panel */}
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
                  <h3 className="text-xl font-semibold text-gray-900">Vote for Session</h3>
                  <p className="mt-2 text-gray-500">
                    {session?.name || "This session"}
                  </p>
                </div>
              </div>

              {/* Placeholder for actual voting component */}
              <div className="px-6 py-4">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">
                      Your voting component will appear here
                    </p>
                    <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mx-auto mt-4"></div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex flex-row-reverse gap-3">
                <button
                  onClick={() => {
                    setShowVoteModal(false);
                    navigate(`/candidates/${session?.id}`);
                  }}
                  className="py-2 px-4 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Vote
                </button>
                <button
                  onClick={() => setShowVoteModal(false)}
                  className="py-2 px-4 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
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