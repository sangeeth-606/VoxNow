import React, { useState } from "react";
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

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Sample data
  const activeSessions = [
    {
      id: 1,
      name: "Board Election 2025",
      participants: 45,
      status: "Active",
      endDate: "2025-03-01",
    },
    {
      id: 2,
      name: "Budget Approval",
      participants: 23,
      status: "Active",
      endDate: "2025-02-28",
    },
  ];

  const completedSessions = [
    {
      id: 3,
      name: "Team Lead Selection",
      participants: 15,
      status: "Completed",
      endDate: "2025-01-15",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800/50 border-b border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-700 rounded-lg transition"
              >
                <Menu size={20} />
              </button>
              <span className="text-xl font-bold">VoxNow</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                <Settings size={20} />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
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
          <div className="flex gap-5"  >
            <Link to="/createSession" className="mb-8 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Plus size={20} />
              Create Session
            </Link>
            <Link to='/joinSession' className="mb-8 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Plus size={20} />
              Join sessoin
            </Link>
          </div>

          {/* Active Sessions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
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
                        {session.participants} participants • Ends{" "}
                        {session.endDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                        <QrCode size={20} />
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition">
                        View Details
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Sessions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Completed Sessions</h2>
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
                        {session.participants} participants • Ended{" "}
                        {session.endDate}
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                      View Results
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
