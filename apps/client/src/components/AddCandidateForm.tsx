import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/config/supabaseClient";
import axios from "axios";

function AddCandidateForm() {
  const { session_id } = useParams(); //passed it from createSession.tsx
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<string[]>([]);

  // const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); //atleast one input field

  //to handle inputchange
  const handleCandidateChange = (index: number, value: string) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = value;
    setCandidates(updatedCandidates);
  };

  // Remove a candidate field
  const removeCandidateField = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
  };

  // Add a new input field (max 10)
  const addCandidateField = () => {
    if (candidates.length < 10) {
      setCandidates([...candidates, ""]);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");
  
  //   try {
  //     const { data: sessionData } = await supabase.auth.getSession();
  //     const token = sessionData?.session?.access_token;
  
  //     if (!token) {
  //       throw new Error("You must be logged in to add candidates");
  //     }
  
  //     // Filter out empty candidate names
  //     const validCandidates = candidates.filter((candidate) => candidate.trim() !== "");
  
  //     if (validCandidates.length < 2) {
  //       throw new Error("At least 2 candidates are required.");
  //     }
  
  //     const response = await axios.post(
  //       "http://localhost:5000/api/candidates/add",
  //       { session_id, candidates: validCandidates },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     console.log("Candidates added:", response.data);
  
  //     navigate(`/session/${session_id}`);
  //   } catch (err: any) {
  //     setError(err.response?.data?.error || "An error occurred while adding candidates");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const { data: sessionData } = await supabase.auth.getSession();
  //     const token = sessionData?.session?.access_token;

  //     if (!token) {
  //       throw new Error("You must be logged in to add a candidate");
  //     }

  //     const response = await axios.post(
  //       "http://localhost:5000/api/candidates/add",
  //       { session_id, name },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("Candidate added:", response.data);

  //     // Navigate back to session details page
  //     navigate(`/session/${session_id}`);
  //   } catch (err: any) {
  //     setError(err.response?.data?.error || "An error occurred while adding the candidate");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
  
      if (!token) {
        throw new Error("You must be logged in to add candidates");
      }
  
      const validCandidates = candidates.filter((candidate) => candidate.trim() !== "");
  
      if (validCandidates.length < 2) {
        throw new Error("At least 2 candidates are required.");
      }
  
      // Log the request payload before sending
      console.log("Sending request to backend with payload:", {
        session_id,
        candidates: validCandidates,
      });
  
      const response = await axios.post(
        "http://localhost:5000/api/candidates/add",
        { session_id, candidates: validCandidates },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Candidates added:", response.data);
      // navigate(`/session/${session_id}`);
      navigate("/dashboard")
    } catch (err: any) {
      console.error("Error response from backend:", err.response?.data);
      setError(err.response?.data?.error || "An error occurred while adding candidates");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="p-6 bg-gray-800 rounded-lg max-w-lg mx-auto mt-24 ">
      <h2 className="text-2xl font-semibold text-white mb-4">Add Candidates</h2>
      <form className="space-y-3 ">
        {candidates.map((candidate, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={candidate}
              onChange={(e) => handleCandidateChange(index, e.target.value)}
              className="w-full p-2 bg-gray-700 rounded-lg text-white"
              placeholder={`Candidate ${index + 1}`}
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeCandidateField(index)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        {candidates.length < 10 && (
          <button
            type="button"
            onClick={addCandidateField}
            className="w-full p-2 bg-blue-500 rounded-lg text-white"
          >
            ➕ Add Candidate
          </button>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          // disabled={isLoading}
          className="w-full p-2 bg-green-500 rounded-lg text-white"
        >
          Submit
          {/* {isLoading ? "Submiting..." : "Add Candidate"} */}
        </button>
      </form>
    </div>
  );
}

export default AddCandidateForm;
