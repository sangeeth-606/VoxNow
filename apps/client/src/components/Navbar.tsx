// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Settings, User } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <nav className="bg-gray-800/50 border-b border-gray-700 fixed top-0 left-0 right-0 z-10">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <Menu size={20} />
            </button>
            <Link to="/dashboard">
              <span className="text-xl font-bold">VoxNow</span>
            </Link>
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
  );
};

export default Navbar;
