import React from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-20 bg-[#000a3a]/95 backdrop-blur-sm border-b border-[#00175f]/50 p-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-100">Dashboard Overview</h2>
          <p className="text-sm text-purple-400/70 mt-1">Welcome back, Admin</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#00031b] px-4 py-2 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-[#00175f]/50 text-gray-300 placeholder-gray-500"
          />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-purple-400">👤</span>
            </div>
            <span className="text-gray-300">John Doe</span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 rounded-lg bg-[#000a3a] hover:bg-[#00175f] transition-colors"
      >
        ☰
      </button>
    </header>
  );
};

export default Header;
