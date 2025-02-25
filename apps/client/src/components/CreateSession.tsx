// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { supabase } from "../config/supabaseClient";


// function CreateSession() {
//   const [sessionName, setSessionName] = useState("");
//   const [description, setDescription] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate();
//   //add on down ,req: MyRequest, res: Response
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setIsLoading(true);
//     setError("");

//     try {
      
//       const { data } = await supabase.auth.getSession();

//       const token = data?.session?.access_token;
//       // console.log(token);

//       if (!token) {
//         throw new Error("you must be loggen in to create a session");
//       }

//       const response = await axios.post(
//         "http://localhost:5000/api/session/create",
//         {
//           name: sessionName,
//           description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response)
//       const session_id = response.data.session.id;
      

//       setSuccess(true);

//       setTimeout(() => {
//         navigate(`/add-candidate/${session_id}`);
//       }, 1500);
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "An error occurred while creating the session"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Create a Voting Session
//       </h1>

//       {success ? (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           Session created successfully! Redirecting to dashboard...
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           <div className="mb-4">
//             <label
//               htmlFor="sessionName"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Session Name
//             </label>
//             <input
//               type="text"
//               id="sessionName"
//               value={sessionName}
//               onChange={(e) => setSessionName(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-2 px-4 rounded-md ${
//               isLoading
//                 ? "bg-blue-300 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 text-white"
//             } transition-colors duration-300`}
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Creating...
//               </span>
//             ) : (
//               "Create Session"
//             )}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default CreateSession;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { supabase } from "../config/supabaseClient";

// function CreateSession() {
//   const [sessionName, setSessionName] = useState("");
//   const [description, setDescription] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setIsLoading(true);
//     setError("");

//     try {
//       const { data } = await supabase.auth.getSession();
//       const token = data?.session?.access_token;

//       if (!token) {
//         throw new Error("You must be logged in to create a session");
//       }

//       const response = await axios.post(
//         "http://localhost:5000/api/session/create",
//         {
//           name: sessionName,
//           description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const session_id = response.data.session.id;
//       setSuccess(true);

//       setTimeout(() => {
//         navigate(`/add-candidate/${session_id}`);
//       }, 1500);
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "An error occurred while creating the session"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-8 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
//       <h1 className="text-3xl font-bold mb-8 text-center text-white">
//         Create a Voting Session
//       </h1>

//       {success ? (
//         <div className="bg-green-400/10 border border-green-400 text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//           <span>Session created successfully! Redirecting to dashboard...</span>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <span>{error}</span>
//             </div>
//           )}

//           <div className="mb-6">
//             <label
//               htmlFor="sessionName"
//               className="block text-gray-400 font-medium mb-3"
//             >
//               Session Name
//             </label>
//             <input
//               type="text"
//               id="sessionName"
//               value={sessionName}
//               onChange={(e) => setSessionName(e.target.value)}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
//               placeholder="Enter session name"
//               required
//             />
//           </div>

//           <div className="mb-8">
//             <label
//               htmlFor="description"
//               className="block text-gray-400 font-medium mb-3"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 h-40"
//               placeholder="Enter session description"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 px-6 rounded-lg font-semibold ${
//               isLoading
//                 ? "bg-blue-700 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 text-white"
//             } transition-colors duration-300 flex items-center justify-center`}
//           >
//             {isLoading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Creating...
//               </>
//             ) : (
//               "Create Session"
//             )}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default CreateSession;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../config/supabaseClient";
import {  Vote,  AlertCircle } from "lucide-react";

function CreateSession() {
  const [sessionName, setSessionName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;

      if (!token) {
        throw new Error("You must be logged in to create a session");
      }

      const response = await axios.post(
        "http://localhost:5000/api/session/create",
        {
          name: sessionName,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const session_id = response.data.session.id;
      setSuccess(true);

      setTimeout(() => {
        navigate(`/add-candidate/${session_id}`);
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the session"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl px-4">
        {success ? (
          <div className="animate-float bg-gray-800/50 p-12 rounded-[2rem] shadow-lg backdrop-blur-xl border border-gray-700">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-green-400/20"></div>
                <div className="relative bg-gray-700 p-4 rounded-full">
                  <Vote className="h-12 w-12 text-green-400" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white text-center">
                Success!
              </h2>
              <p className="text-gray-400 text-center text-lg">
                Your voting session has been created. Preparing your journey to the next step...
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute -inset-1 bg-gray-800 rounded-[2.5rem] blur opacity-30 group-hover:opacity-40 animate-pulse"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-2xl border border-gray-700 p-12 rounded-[2rem] shadow-lg">
              <div className="flex flex-col items-center mb-12">
                <div className="bg-gray-700 p-4 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Vote className="h-12 w-12 text-white" />
                </div>
                <h1 className="mt-8 text-5xl font-bold text-white">
                  Create Your Session
                </h1>
                <div className="mt-4 h-1 w-24 bg-gray-700 rounded-full"></div>
              </div>

              {error && (
                <div className="mb-8 bg-gray-800/50 backdrop-blur-xl border border-red-500 rounded-xl p-6 text-red-500">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 bg-gray-700 p-3 rounded-lg">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <p className="text-lg">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="group">
                  <label className="block text-lg font-medium text-gray-400 mb-3 ml-1">
                    Session Name
                  </label>
                  <input
                    type="text"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
                    placeholder="Give your session a memorable name"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-lg font-medium text-gray-400 mb-3 ml-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50 h-40 resize-none"
                    placeholder="What's this session all about? Let others know..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    w-full mt-8 py-6 rounded-xl font-bold text-lg relative overflow-hidden transition-all duration-300
                    ${isLoading 
                      ? 'bg-gray-700 cursor-not-allowed text-gray-600'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                  <span className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-6 w-6 border-3 border-gray-600 border-t-white rounded-full" />
                        <span>Creating Your Session...</span>
                      </>
                    ) : (
                      <>
                        <Vote className="h-6 w-6" />
                        <span>Launch Voting Session</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSession;