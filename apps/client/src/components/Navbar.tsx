
// import React from "react";
// import { Link } from "react-router-dom";
// import { Menu, Settings, User } from "lucide-react";

// interface NavbarProps {
//   isSidebarOpen: boolean;
//   setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
//   return (
//     <nav className="w-full h-16 bg-gray-900 fixed top-0 left-0 shadow-lg z-50">
//       <div className="h-full px-4 md:px-6 w-full flex items-center justify-between max-w-7xl mx-auto">
//         {/* Left section */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setSidebarOpen(!isSidebarOpen)}
//             className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
//             aria-label="Toggle sidebar"
//           >
//             <Menu className="w-5 h-5 text-gray-300" />
//           </button>
//           <Link 
//             to="/dashboard" 
//             className="flex items-center"
//           >
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
//               VoxNow
//             </span>
//           </Link>
//         </div>

//         {/* Right section */}
//         <div className="flex items-center space-x-2 md:space-x-4">
//           <button 
//             className="p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
//             aria-label="Settings"
//           >
//             <Settings className="w-5 h-5" />
//           </button>
//           <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//               <User className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-sm font-medium text-gray-300 hidden md:block">
//               John Doe
//             </span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Settings, User } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <nav className="w-full h-16 bg-gray-900 fixed top-0 left-0 shadow-lg z-50">
      <div className="h-full px-4 md:px-6 mx-auto flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
          <Link 
            to="/dashboard" 
            className="flex items-center"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              VoxNow
            </span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            className="p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300 hidden md:block">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;