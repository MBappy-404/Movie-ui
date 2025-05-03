import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#23234d] p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-[#7b5cff]">1,245</div>
          <div className="text-gray-400 mt-2">Total Users</div>
        </div>
        <div className="bg-[#23234d] p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-[#7b5cff]">320</div>
          <div className="text-gray-400 mt-2">Movies</div>
        </div>
        <div className="bg-[#23234d] p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-[#7b5cff]">2,100</div>
          <div className="text-gray-400 mt-2">Active Subscriptions</div>
        </div>
      </div>
      <div className="bg-[#23234d] p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="text-gray-300 space-y-2">
          <li>
            User <span className="text-[#7b5cff]">john_doe</span> added a new
            movie.
          </li>
          <li>
            Movie <span className="text-[#7b5cff]">Inception</span> was updated.
          </li>
          <li>
            User <span className="text-[#7b5cff]">emma</span> subscribed to
            premium.
          </li>
        </ul>
      </div>
    </div>

    // <div>
    //   <h1 className="text-2xl font-bold mb-6">Manage Movies</h1>
    //   <button className="mb-4 px-4 py-2 bg-[#7b5cff] text-white rounded hover:bg-[#5a3fd7]">
    //     Add Movie
    //   </button>
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full bg-[#23234d] rounded-lg">
    //       <thead>
    //         <tr>
    //           <th className="px-4 py-2 text-left">Title</th>
    //           <th className="px-4 py-2 text-left">Genre</th>
    //           <th className="px-4 py-2 text-left">Year</th>
    //           <th className="px-4 py-2 text-left">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr className="border-t border-[#18183a]">
    //           <td className="px-4 py-2">Inception</td>
    //           <td className="px-4 py-2">Sci-Fi</td>
    //           <td className="px-4 py-2">2010</td>
    //           <td className="px-4 py-2">
    //             <button className="text-[#7b5cff] hover:underline mr-2">
    //               Edit
    //             </button>
    //             <button className="text-red-400 hover:underline">Delete</button>
    //           </td>
    //         </tr>
    //         {/* More rows... */}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    // <div>
    //   <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full bg-[#23234d] rounded-lg">
    //       <thead>
    //         <tr>
    //           <th className="px-4 py-2 text-left">Username</th>
    //           <th className="px-4 py-2 text-left">Email</th>
    //           <th className="px-4 py-2 text-left">Role</th>
    //           <th className="px-4 py-2 text-left">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr className="border-t border-[#18183a]">
    //           <td className="px-4 py-2">john_doe</td>
    //           <td className="px-4 py-2">john@example.com</td>
    //           <td className="px-4 py-2">User</td>
    //           <td className="px-4 py-2">
    //             <button className="text-[#7b5cff] hover:underline mr-2">
    //               Edit
    //             </button>
    //             <button className="text-red-400 hover:underline">Delete</button>
    //           </td>
    //         </tr>
    //         {/* More rows... */}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default Dashboard;
