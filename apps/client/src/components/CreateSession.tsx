import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from "../config/supabaseClient";

// interface MyRequest extends Request{
//     headers:{
//         authorization?:string;
//     }
// }
// interface MyRequest extends Omit<Request, 'headers'> {
//     headers: {
//       authorization?: string;
//     }
//   }
  // ...existing code...

function CreateSession() {
    const [sessionName,setSessionName] = useState('');
    const [description,setDescription] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError]= useState('');
    const [ success,setSuccess]= useState(false);

    const navigate= useNavigate();
    //add on down ,req: MyRequest, res: Response
    const handleSubmit= async (e:React.FormEvent)=>{
        e.preventDefault();
        

        setIsLoading(true);
        setError('')

        try{
            // const token = req.headers.authorization?.split(" ")[1];
            const { data } = await supabase.auth.getSession();
            const token = data?.session?.access_token;
            // console.log(token); 

            if (!token){
                throw new Error('you must be loggen in to create a session')
            }

            const response = await axios.post(
                "http://localhost:5000/api/session/create", {
                    name:sessionName,description
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }
                }
              )

              setSuccess(true)

              setTimeout(() => {
                navigate('/dashboard');
              }, 1500);

        }catch (err){
            setError(err instanceof Error ? err.message : 'An error occurred while creating the session');

        }finally{
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a Voting Session</h1>
      
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Session created successfully! Redirecting to dashboard...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="sessionName" className="block text-gray-700 font-medium mb-2">
              Session Name
            </label>
            <input
              type="text"
              id="sessionName"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md ${
              isLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors duration-300`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Session'
            )}
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateSession