// import React, { useState } from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/config/supabaseClient";
import { Loader2 } from "lucide-react";
import { TrophySpin } from "react-loading-indicators";
interface VotingSession {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  owner_id: string;
}

import {
  Home,
  LogOut,
  Plus,
  User,
  Settings,
  Activity,
  Clock,
  CheckCircle,
  QrCode,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ActiveSession from "./ActiveSession";
import CompletedSession from "./CompletedSession";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeSessions, setActiveSessions] = useState<VotingSession[]>([]);
  const [completedSessions, setCompletedSessions] = useState<VotingSession[]>(
    []
  );

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error("Error fetching user:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("sessions")
        .select("id, name, description, status, created_at, owner_id") // Explicitly select only needed fields
        .eq("owner_id", userData.user.id);

      if (error) {
        console.error("Error fetching sessions:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Use VotingSession instead of conflicting "Session"
        const formattedSessions: VotingSession[] = data.map((session) => ({
          id: session.id,
          name: session.name,
          description: session.description,
          status: session.status,
          created_at: session.created_at,
          owner_id: session.owner_id,
        }));

        setActiveSessions(
          formattedSessions.filter((s) => s.status === "active")
        );
        setCompletedSessions(
          formattedSessions.filter((s) => s.status === "completed")
        );
      }
      setLoading(false);
    };

    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen  bg-gray-900 text-white">
      {/* Navbar */}
      <nav >
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} bg-gray-800/30 border-r border-gray-700 transition-all duration-300`}
        >
          <div className="p-4">
            <nav className="space-y-2">
              {[
                { icon: Home, label: "Dashboard" },
                { icon: Activity, label: "Active Sessions" },
                { icon: CheckCircle, label: "Completed" },
                { icon: Clock, label: "History" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition"
                >
                  <item.icon size={20} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">
              Manage your voting sessions and view results
            </p>
          </div>

          {/* Create New Session Button */}
          <div className="flex gap-5">
            <Link
              to="/createSession"
              className="mb-8 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              Create Session
            </Link>
            <Link
              to="/joinSession"
              className="mb-8 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              Join sessoin
            </Link>
          </div>

          {/* Active Sessions */}
          {/* Active Sessions */}
          <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
          {loading ? (
            <div className="flex flex-col justify-center items-center py-8 space-y-4">
              <TrophySpin color="#7183ad" size="medium" text="" textColor="" />
              
            </div>
          ) : (
            <div className="transition-all duration-300 ease-in-out">
              <ActiveSession activeSessions={activeSessions} />
            </div>
          )}

          {/* Completed Sessions */}
          <h2 className="text-xl font-semibold mb-4">Completed Sessions</h2>
          {loading ? (
            <div className="flex flex-col justify-center items-center py-8 space-y-4">
              <TrophySpin color="#7183ad" size="medium" text="" textColor="" />
              
            </div>
          ) : (
            <div className="transition-all duration-300 ease-in-out">
              <CompletedSession completedSessions={completedSessions} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
