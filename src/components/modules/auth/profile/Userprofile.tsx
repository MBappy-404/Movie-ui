"use client";
import { useState } from 'react';

interface UserData {
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  bio: string;
  stats: {
    watched: number;
    watching: number;
    lists: number;
  };
}

interface WatchlistItem {
  id: number;
  title: string;
  poster: string;
  rating: number;
  genre: string;
  progress: number;
}

const UserProfile = ({userData}: any) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'watchlist'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserData>({
    name: 'John Doe',
    email: 'john@movielovers.com',
    joinDate: 'January 2023',
    avatar: 'https://streamvid.jwsuperthemes.com/wp-content/uploads/2023/06/Brooke-Mulford2-305x305.jpg',
    bio: 'Film connoisseur & cinema enthusiast',
    stats: {
      watched: 427,
      watching: 12,
      lists: 8
    }
  });

 

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { id: 1, title: 'Inception', poster: 'https://via.placeholder.com/300x450', rating: 4.8, genre: 'Sci-Fi', progress: 75 },
    { id: 2, title: 'The Dark Knight', poster: 'https://via.placeholder.com/300x450', rating: 4.9, genre: 'Action', progress: 90 },
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-28 from-[#00031b] to-[#0a0b2a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative bg-[#00031b]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-spin-slow blur-2xl opacity-30"></div>
                <img 
                  src={userData?.profilePhoto ? userData?.profilePhoto : user?.avatar} 
                  alt={userData?.name ? userData?.name : user?.name} 
                  className="w-36 h-36 rounded-full border-4 border-white/10 shadow-xl object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                  {userData?.name ? userData?.name : user?.name}
                </h1>
                <p className="mt-2 text-gray-300 flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Member since {user?.joinDate}
                </p>
                
                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold text-blue-400">{user.stats.watched}</div>
                    <div className="text-sm text-gray-400">Movies Watched!</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold text-purple-400">{user.stats.watching}</div>
                    <div className="text-sm text-gray-400">Watching Now</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-2xl font-bold text-pink-400">{user.stats.lists}</div>
                    <div className="text-sm text-gray-400">Custom Lists</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-2 mb-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-t-xl font-medium flex items-center gap-2 transition-all ${
                  activeTab === 'profile' 
                    ? 'text-white bg-white/10 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Profile
              </button>
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`px-6 py-3 rounded-t-xl font-medium flex items-center gap-2 transition-all ${
                  activeTab === 'watchlist' 
                    ? 'text-white bg-white/10 border-b-2 border-purple-400' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                Watchlist ({watchlist.length})
              </button>
            </div>

            {/* Content */}
            {activeTab === 'profile' ? (
              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">Full Name</label>
                    <input
                      type="text"
                      value={userData?.name ? userData?.name : user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 text-white bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      value={userData?.email ? userData?.email : user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 text-white bg-white/10  border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="space-y-4 col-span-full">
                    <label className="block text-sm font-medium text-gray-300">Bio</label>
                    <textarea
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-3 text-white bg-white/10  border border-white/10 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-white/10 pt-8">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-opacity"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlist.map((movie) => (
                  <div key={movie.id} className="group relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all">
                    <div className="relative">
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="w-full h-80 object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-300">{movie.genre}</span>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span>{movie.rating}</span>
                            </div>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
                              style={{ width: `${movie.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-100">{movie.title}</h3>
                      <button
                        onClick={() => setWatchlist(watchlist.filter(m => m.id !== movie.id))}
                        className="mt-4 w-full py-2 text-sm font-medium bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Remove from Watchlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;