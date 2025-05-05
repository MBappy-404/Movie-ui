"use client";
import { useGetUserQuery, useUpdateUserMutation } from "@/components/redux/features/user/userApi";
import { useState, useRef } from "react";
import React from "react";
import { toast } from "sonner";

interface UserData {
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  bio: string;
  contactNumber?: string;
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

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
}

const UserProfile = ({ userData }: any) => {
  const userId = userData?.id;
  const { data } = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"profile" | "watchlist">(
    "profile"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactNumber: "",
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [user, setUser] = useState<UserData>({
    name: "John Doe",
    email: "john@movielovers.com",
    joinDate: "January 2023",
    avatar:
      "https://streamvid.jwsuperthemes.com/wp-content/uploads/2023/06/Brooke-Mulford2-305x305.jpg",
    bio: "Film connoisseur & cinema enthusiast",
    stats: {
      watched: 427,
      watching: 12,
      lists: 8,
    },
  });

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      id: 1,
      title: "Inception",
      poster: "https://via.placeholder.com/300x450",
      rating: 4.8,
      genre: "Sci-Fi",
      progress: 75,
    },
    {
      id: 2,
      title: "The Dark Knight",
      poster: "https://via.placeholder.com/300x450",
      rating: 4.9,
      genre: "Action",
      progress: 90,
    },
  ]);

  // Update formData when user data is loaded
  React.useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        email: data.data.email || "",
        contactNumber: data.data.contactNumber || "",
      });
      setPreviewImage(data.data.profilePhoto || "");
    }
  }, [data]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage("");
    setThumbnail(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Profile...");

    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const userData = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(userData));
      
      if (thumbnail) {
        formDataToSend.append("file", thumbnail);
      }

      const response = await updateUser({
        id: userId,
        data: formDataToSend
      }).unwrap();

      if (response?.data) {
        setFormData(prev => ({
          ...prev,
          name: response.data.name || prev.name,
          email: response.data.email || prev.email,
          contactNumber: response.data.contactNumber || prev.contactNumber
        }));

        if (response.data.profilePhoto) {
          setPreviewImage(response.data.profilePhoto);
        }

        setIsEditing(false);
        toast.success("Profile updated successfully!", { id: toastId });
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error("Failed to update profile", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-28 from-[#00031b] to-[#0a0b2a] py-12  px-2 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative bg-[#00031b]/80 backdrop-blur-xl rounded-3xl p-2 md:p-8 shadow-2xl border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full animate-spin-slow blur-2xl opacity-30"></div>
                <img
                  src={previewImage || user?.avatar}
                  alt={formData.name || user?.name}
                  className="w-36 h-36 rounded-full border-4 border-white/10 shadow-xl object-cover"
                />
                {isEditing && (
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    {previewImage && (
                      <button
                        type="button"
                        onClick={clearImage}
                        className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                  {data?.data?.name ? data?.data?.name : user?.name}
                </h1>
                <p className="mt-2 text-gray-300 flex items-center justify-center md:justify-start gap-2">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Member since{" "}
                  {data?.data?.createdAt
                    ? data?.data?.createdAt.slice(0, 10)
                    : user?.joinDate}
                </p>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-lg md:text-2xl font-bold text-blue-400">
                      {user.stats.watched}
                    </div>
                    <div className="text-sm text-gray-400">Movies Watched!</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-lg md:text-2xl font-bold text-purple-400">
                      {user.stats.watching}
                    </div>
                    <div className="text-sm text-gray-400">Watching Now</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-lg md:text-2xl font-bold text-pink-400">
                      {user.stats.lists}
                    </div>
                    <div className="text-sm text-gray-400">Custom Lists</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-2 mb-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-3 rounded-t-xl font-medium cursor-pointer flex items-center gap-2 transition-all ${
                  activeTab === "profile"
                    ? "text-white bg-white/10 border-b-2 border-blue-400"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </button>
              <button
                onClick={() => setActiveTab("watchlist")}
                className={`px-6 py-3 rounded-t-xl cursor-pointer font-medium flex items-center gap-2 transition-all ${
                  activeTab === "watchlist"
                    ? "text-white bg-white/10 border-b-2 border-purple-400"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
               Purchase History ({watchlist.length})
              </button>
            </div>

            {/* Content */}
            {activeTab === "profile" ? (
              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 text-white bg-white/10 border border-white/10 rounded-xl focus:border-gray-500 outline-none transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 text-white bg-white/10 border border-white/10 rounded-xl focus:ring-purple-400 focus:border-gray-500 outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 text-white bg-white/10 border border-white/10 rounded-xl focus:border-gray-500 outline-none transition-all disabled:opacity-50"
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
                        className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-opacity"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlist.map((movie) => (
                  <div
                    key={movie.id}
                    className="group relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
                  >
                    <div className="relative">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-80 object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-300">
                              {movie.genre}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                      <h3 className="text-lg font-semibold text-gray-100">
                        {movie.title}
                      </h3>
                      <button
                        onClick={() =>
                          setWatchlist(
                            watchlist.filter((m) => m.id !== movie.id)
                          )
                        }
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
