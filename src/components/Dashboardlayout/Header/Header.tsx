import React, { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/components/redux/hooks";
import { logout } from "@/components/redux/features/user/userState";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { selectCurrentToken } from "@/components/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useGetUserQuery } from "@/components/redux/features/user/userApi";
import Cookies from "js-cookie";
import Link from "next/link";
import { Home, User } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector(selectCurrentToken);
  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data: UserData } = useGetUserQuery(user?.id);

  // console.log(UserData)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    Cookies.remove("refreshToken"); // Replace 'refreshToken' with the actual cookie name(s) you're using
    Cookies.remove("accessToken"); // Replace 'accessToken' with the actual cookie name(s) you're using
    router.push("/login");
  };

   

  return (
    <header className="sticky top-0 z-20 bg-[#000a3a]/95 backdrop-blur-sm border-b border-[#00175f]/50 p-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex-1 hidden sm:block">
          <h2 className="text-xl font-semibold text-gray-100 pl-10 md:pl-10 lg:pl-0 pt-1">
            Dashboard Overview
          </h2>
          <p className="text-sm text-purple-400/70 mt-1 pl-10 md:pl-10 lg:pl-0">
            Welcome back, {UserData?.data?.name || "Admin"}
          </p>
        </div>

        <div className="flex justify-end gap-4 w-full md:w-auto">
          {/* <input
            type="text"
            placeholder="Search..."
            className="bg-[#00031b] px-4 py-2 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-[#00175f]/50 text-gray-300 placeholder-gray-500"
          /> */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2  cursor-pointer hover:bg-[#00175f]/30 p-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full  bg-purple-500/20 flex items-center justify-center">
                {UserData?.data?.profilePhoto ? (
                  <img
                    src={UserData?.data?.profilePhoto}
                    alt={UserData?.data?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-purple-400">👤</span>
                )}
              </div>
              <span className="text-gray-300">
                {UserData?.data?.name || "User"}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0  mt-2 w-48 bg-[#000a3a] border border-[#00175f] rounded-lg shadow-lg py-2">
                <Link
                  href={"/"}
                  className="w-full px-3 py-2 text-left text-gray-300 hover:bg-[#00175f]/30 transition-colors flex items-center gap-2"
                >
                  <Home className="text-white w-5 h-5" />
                  Home
                </Link>
                <Link
                    href={"/profile"}
                  className="w-full px-3 py-2 cursor-pointer   text-gray-300 hover:bg-[#00175f]/30 transition-colors flex items-center gap-2"
                >
                  <User className=" w-5 h-5" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 cursor-pointer  py-2 text-left text-gray-300 hover:bg-[#00175f]/30 transition-colors flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-red-400" />
                  Logout
                </button>
              </div>
            )}
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
