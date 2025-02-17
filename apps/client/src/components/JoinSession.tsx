import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LockKeyhole,
  Users
} from 'lucide-react';

const JoinSession = () => {
  const [step, setStep] = useState(1);
  
  // Sample session data
  const sessionData = {
    name: "Board Election 2025",
    organizer: "John Doe",
    participants: 45,
    status: "Active",
    endTime: "2h 30m remaining",
    candidates: [
      { id: 1, name: "Sarah Johnson", position: "Board Member" },
      { id: 2, name: "Michael Chen", position: "Board Member" },
      { id: 3, name: "Elena Rodriguez", position: "Board Member" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <nav className="bg-gray-800/50 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">VoxNow</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={16} />
                {sessionData.endTime}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {/* Session Info */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold mb-4">{sessionData.name}</h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Users size={16} />
                {sessionData.participants} participants
              </div>
              <div className="flex items-center gap-2">
                <LockKeyhole size={16} />
                Secure Blockchain Voting
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Organized by {sessionData.organizer}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1: Verification */}
            <div className={`bg-gray-800/50 border ${step === 1 ? 'border-blue-500' : 'border-gray-700'} rounded-lg p-6`}>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-4">Verify Your Identity</h2>
                  {step === 1 ? (
                    <div className="space-y-4">
                      <input 
                        type="text"
                        placeholder="Enter your verification code"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <button 
                        onClick={() => setStep(2)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
                      >
                        Verify <ArrowRight size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle size={16} />
                      Verified
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Cast Vote */}
            <div className={`bg-gray-800/50 border ${step === 2 ? 'border-blue-500' : 'border-gray-700'} rounded-lg p-6 ${step < 2 ? 'opacity-50' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-4">Cast Your Vote</h2>
                  {step === 2 && (
                    <div className="space-y-4">
                      {sessionData.candidates.map(candidate => (
                        <div 
                          key={candidate.id}
                          className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition"
                        >
                          <h3 className="font-medium">{candidate.name}</h3>
                          <p className="text-sm text-gray-400">{candidate.position}</p>
                        </div>
                      ))}
                      <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                      >
                        Submit Vote
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
            <div className="text-sm">
              <span className="font-medium text-yellow-500">Important:</span>
              <span className="text-gray-400"> Your vote is anonymous and will be securely recorded on the blockchain. Once submitted, it cannot be changed.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinSession;