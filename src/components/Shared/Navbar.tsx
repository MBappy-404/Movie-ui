"use client";
import { useState, useEffect } from "react";
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
  SunIcon,
  MoonIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
 
import { useUser } from "../context/UserContext";
import { logout } from "@/services/AuthServices";
 
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { user, setIsLoading } = useUser();

  const navLinks = [
    { name: "Home", path: "/", icon: HomeModernIcon },
    { name: "Movies", path: "/movies", icon: FilmIcon },
    { name: "Series", path: "/series", icon: TvIcon },
    { name: "Watchlist", path: "/list", icon: BookmarkIcon },
  ];

  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setIsScrolled(scroll > 10);
      document.documentElement.style.setProperty(
        "--scroll-opacity",
        Math.min(scroll / 80, 1).toString()
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    hover: { scale: 1.05, color: "#818cf8" },
    tap: { scale: 0.95 },
  };

  return (
    <nav
 
      className={`fixed w-full z-50 
      bg-gray-900 md:bg-none  
 
      className={`fixed w-full z-[990]
      bg-gray-900 bg-none  
 
      transition-all duration-500
      ${
        isScrolled
          ? "md:backdrop-blur-md md:bg-gray-900/90"
 
          : "md:bg-transparent"
 
          : "bg-transparent"
 
      }`}
    >
      <div className="container mx-auto px-4 xl:px-12">
        <div className="flex items-center justify-between h-16 xl:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
 
          >
            CineVerse
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link key={name} href={path}>
                <motion.a
                  className="flex items-center gap-2   text-gray-300 hover:text-indigo-400 group"
                  variants={navItemVariants}
                  whileHover="hover"
                  
                >
                  <Icon className="w-5 h-5 transition-colors" />
                  <span className="font-bold text-lg">{name}</span>
                  <div className="absolute translate-y-1 bottom-0 left-0 w-full h-0.5 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </motion.a>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
 
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-300 hover:text-indigo-400 transition-colors"
            >
              {darkMode ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>

            {user ? (
 
             

            {isLoggedIn ? (
 
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="p-2 text-gray-300 hover:text-indigo-400">
                  <UserCircleIcon className="w-7 h-7" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-2xl py-2 border border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium text-gray-200">
                          john@example.com
                        </p>
                      </div>
                      <a
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        <UserCircleIcon className="w-5 h-5" />
                        Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href={"/login"}>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-indigo-400"
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

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                className="absolute right-0 top-0 h-full w-[75%] bg-gray-900 shadow-2xl border-l border-gray-800"
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
                      className="p-2 text-gray-400 hover:text-indigo-400"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {navLinks.map(({ name, path, icon: Icon }) => (
                      <motion.a
                        key={name}
                        href={path}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
                        onClick={() => setIsOpen(false)}
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
 
                        transition={{ type: "spring" }}
 
                        transition={{ type: "spring"  } }
 
                      >
                        <Icon className="w-6 h-6 text-indigo-400" />
                        <span className="text-gray-200 font-medium">
                          {name}
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <div className="flex flex-col gap-4">
 
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
                      >
                        {darkMode ? (
                          <SunIcon className="w-6 h-6 text-indigo-400" />
                        ) : (
                          <MoonIcon className="w-6 h-6 text-indigo-400" />
                        )}
                        <span className="text-gray-200">Theme</span>
                      </button>
 
                      <a
                        href="/support"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
                      >
                        <QuestionMarkCircleIcon className="w-6 h-6 text-indigo-400" />
                        <span className="text-gray-200">Support</span>
                      </a>
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
