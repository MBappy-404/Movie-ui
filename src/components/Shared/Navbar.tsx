"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  HomeModernIcon,
  FilmIcon,
  TvIcon,
  BookmarkIcon,
  ArrowRightEndOnRectangleIcon,
  QuestionMarkCircleIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LucideLayoutDashboard } from "lucide-react";
import Cookies from 'js-cookie';
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentToken, logout } from "../redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();


  const token = useAppSelector(selectCurrentToken);
  let user
  if (token) {
    user = verifyToken(token)
  }

  console.log(user)



  const navLinks = [
    { name: "Home", path: "/", icon: HomeModernIcon },
    { name: "Movies", path: "/movies", icon: FilmIcon },
    { name: "Watchlist", path: "/watchlist", icon: BookmarkIcon },
  ];

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out successfully");
    Cookies.remove('accessToken'); // Replace 'accessToken' with the actual cookie name(s) you're using
    Cookies.remove('refreshToken'); // Replace 'refreshToken' with the actual cookie name(s) you're using
    router.push("/login");
    setDropdownOpen(false);
  };

  // Desktop scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        // Only for desktop
        setIsScrolled(window.scrollY > 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu body lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [isOpen]);

  const mobileMenuVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    hover: { scale: 1.05, color: "#818cf8" },
    rest: { scale: 1, color: "#e5e7eb" },
  };

  return (
    <nav
      className={`fixed w-full z-[990] ${
        isScrolled
          ? "backdrop-blur-md bg-[#101828]"
          : "bg-[#101828] md:bg-transparent"
      } transition-all duration-500`}
    >
      <div className="container mx-auto px-4 xl:px-12">
        <div className="flex items-center justify-between h-16 xl:h-20">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            CineVerse
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link key={name} href={path}>
                <motion.div
                  className="relative group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    variants={navItemVariants}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        pathname === path ? "text-indigo-400" : "text-gray-200"
                      }`}
                    />
                    <span
                      className={`font-bold text-lg ${
                        pathname === path ? "text-indigo-400" : "text-gray-200"
                      }`}
                    >
                      {name}
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400"
                    initial={{ scaleX: pathname === path ? 1 : 0 }}
                    animate={{ scaleX: pathname === path ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
              {user && (<div ref={dropdownRef} className="relative">
                <button
                  className="p-2 cursor-pointer text-gray-300 hover:text-indigo-400 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <UserCircleIcon className="w-7 h-7 md:w-10 md:h-10" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-48 md:w-52 h-auto bg-gray-800 rounded-lg shadow-2xl py-2 border border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm md:text-base  text-gray-200 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex text-sm md:text-base items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <UserCircleIcon className="w-5 h-5" />
                        Profile
                      </Link>
  
                        {user.role === "ADMIN" && (<Link
                          href="/dashboard"
                          className="flex text-sm md:text-base items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <LucideLayoutDashboard className="w-5 h-5" />
                          Dashboard
                        </Link>) }
                      <button
                        onClick={handleLogout}
                        className="flex text-sm md:text-base cursor-pointer items-center gap-2 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>)}

              {!user && (<Link href="/login">
                <motion.button
                  className="px-4 py-2 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                   
                >
                  Sign In
                </motion.button>
              </Link>)}

            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-indigo-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Sidebar - Always has solid background */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[1000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                className="absolute right-0 top-0 h-full w-[75%] bg-gray-900 shadow-2xl border-l border-gray-800 overflow-y-auto"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="h-full flex flex-col p-6">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-bold text-indigo-400">
                      CineVerse
                    </span>
                    <button
                      className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {navLinks.map(({ name, path, icon: Icon }) => (
                      <Link
                        key={name}
                        href={path}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            pathname === path
                              ? "text-indigo-400"
                              : "text-gray-200"
                          }`}
                        />
                        <span
                          className={`${
                            pathname === path
                              ? "text-indigo-400"
                              : "text-gray-200"
                          } font-medium`}
                        >
                          {name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <div className="flex flex-col gap-4">
                      <Link
                        href="/support"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <QuestionMarkCircleIcon className="w-6 h-6 text-indigo-400" />
                        <span className="text-gray-200">Support</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
