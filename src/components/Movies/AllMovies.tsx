"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllContentQuery } from "../redux/features/content/contentApi";
import { useGetAllGenresQuery } from "../redux/features/genre/genreApi";
import Link from "next/link";
import { GenreFilter } from "@/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "sonner";
import {
  addToWatchList,
  watchListSelector,
} from "../redux/features/watchListSlice";
import { TMovie } from "../types/movie";



interface Genre {
  genreName: string;
}

export const AllMovies = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("title");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const dispatch = useAppDispatch();

  // Set initial genre from URL parameter
  useEffect(() => {
    const genreFromUrl = searchParams.get('genre');
    if (genreFromUrl) {
      setSelectedGenre(genreFromUrl);
    }
  }, [searchParams]);

  // Create filter params
  const filterParams = [
    { name: 'page', value: currentPage.toString() },
    { name: 'limit', value: itemsPerPage.toString() },
    { name: 'isAvailable', value: "true" }
  ];

  // Add search filter if query exists
  if (searchQuery.trim()) {
    switch (searchType) {
      case 'title':
        filterParams.push({ name: 'searchTerm', value: searchQuery });
        filterParams.push({ name: 'searchType', value: 'title' });
        break;
      case 'director':
        filterParams.push({ name: 'searchTerm', value: searchQuery });
        filterParams.push({ name: 'searchType', value: 'director' });
        break;
      case 'genre':
        filterParams.push({ name: 'searchTerm', value: searchQuery });
        filterParams.push({ name: 'searchType', value: 'genre' });
        break;
      case 'actor':
        filterParams.push({ name: 'searchTerm', value: searchQuery });
        filterParams.push({ name: 'searchType', value: 'actor' });
        break;
      case 'actress':
        filterParams.push({ name: 'searchTerm', value: searchQuery });
        filterParams.push({ name: 'searchType', value: 'actress' });
        break;
      case 'platform':
        filterParams.push({ name: 'searchTerm', value: searchQuery });
        filterParams.push({ name: 'searchType', value: 'platform' });
        break;
    }
  }

  // Add platform filter if selected
  if (selectedPlatform && selectedPlatform !== "All") {
    filterParams.push({ name: 'platform', value: selectedPlatform });
  }

  // Add genre filter if not "All"
  if (selectedGenre !== "All") {
    filterParams.push({ name: 'genre', value: selectedGenre });
  }

  // Add year filter if not "All"
  if (selectedYear !== "All") {
    filterParams.push({ name: 'releaseYear', value: selectedYear });
  }

  // Add sort parameters
  switch (sortBy) {
    case "Latest":
      filterParams.push({ name: 'sortBy', value: 'latest' });
      filterParams.push({ name: 'sortOrder', value: 'desc' });
      break;
    case "Oldest":
      filterParams.push({ name: 'sortBy', value: 'latest' });
      filterParams.push({ name: 'sortOrder', value: 'asc' });
      break;
    case "Name":
      filterParams.push({ name: 'sortBy', value: 'title' });
      filterParams.push({ name: 'sortOrder', value: 'asc' });
      break;
    case "Price Low to High":
      filterParams.push({ name: 'sortBy', value: 'price' });
      filterParams.push({ name: 'sortOrder', value: 'asc' });
      break;
    case "Price High to Low":
      filterParams.push({ name: 'sortBy', value: 'price' });
      filterParams.push({ name: 'sortOrder', value: 'desc' });
      break;
  }

  
  // Fetch data
  const { data: genresData, isLoading: genresLoading } = useGetAllGenresQuery(undefined);
  const { data: contentData, isLoading: contentLoading } = useGetAllContentQuery(filterParams);
  const movies = contentData?.data || [];

  // Format genres data
  const genres = useMemo(() => {
    const allGenres = [{ genreName: "All" }];
    if (genresData?.data) {
      return [...allGenres, ...genresData.data];
    }
    return allGenres;
  }, [genresData]);

  // Loading states
  const isLoading = genresLoading || contentLoading;

  // Get unique release years from content data
  const getYears = () => {
    const allYears = ["All"];
    if (movies.length > 0) {
      const uniqueYears = [...new Set(movies.map((movie: TMovie) => movie.releaseYear))] as string[];
      return [...allYears, ...uniqueYears.sort((a, b) => {
        if (a === "All") return -1;
        if (b === "All") return 1;
        return parseInt(b) - parseInt(a);
      })];
    }
    return allYears;
  };

  const sortOptions = [
    "All",
    "Name",
    "Latest",
    "Oldest",
    "Price Low to High",
    "Price High to Low",
  ];

  // Remove client-side filtering since it's handled by the API
  const filteredMovies = movies;

  // Calculate pagination using total from API response
  const totalPages = Math.ceil((contentData?.meta?.total || 0) / itemsPerPage);

  const handleGenreClick = (genreName: string) => {
    setSelectedGenre(genreName);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // add to watch list
  const movieList = useAppSelector(watchListSelector);
  const handleWatchlist = (data: TMovie) => {
    const isExistInWatchList = movieList.some((item) => item.id === data.id);

    if (isExistInWatchList) {
      toast.warning("Already Added to Watchlist");
      return;
    }

    dispatch(addToWatchList(data));
    toast.success("Added to Watchlist", {
      icon: "⭐",
    });
  };

  return (
    <div className="min-h-screen   text-white pt-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          {isSidebarOpen ? (
            <>
              <XMarkIcon className="w-5 h-5" />
              <span>Close Filters</span>
            </>
          ) : (
            <>
              <Bars3Icon className="w-5 h-5" />
              <span>Open Filters</span>
            </>
          )}
        </button>

        {/* Breadcrumb */}
        <div className="text-sm mb-6 lg:mb-8">
          <span className="text-gray-400">Home / Movies / {selectedGenre}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div
            className={`
            lg:w-64 space-y-8 
            fixed lg:relative 
            inset-0 
            bg-[#0F0F1E] lg:bg-transparent 
            z-50 lg:z-auto 
            p-4 lg:p-0
            overflow-y-auto mt-14
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
          >
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Rest of the sidebar content remains the same */}
            {/* Genres */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                Genres
              </h2>
              <div className="space-y-2 lg:space-y-3">
                {isLoading ? (
                  // Loading state for genres
                  Array.from({ length: 12 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-5 w-3/4 bg-gray-700/50 rounded animate-pulse"
                    />
                  ))
                ) : (
                  genres.map((genre: Genre) => (
                    <div
                      key={genre?.genreName}
                      onClick={() => handleGenreClick(genre?.genreName)}
                      className={`cursor-pointer ${
                        selectedGenre === genre.genreName ? "text-purple-500" : "text-gray-400"
                      } hover:text-purple-500 transition-colors`}
                    >
                      {genre?.genreName}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Movies by year */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                Release Year
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {isLoading ? (
                  // Loading state for years
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-8 bg-gray-700/50 rounded animate-pulse"
                    />
                  ))
                ) : (
                  (getYears() as string[]).map((year: string) => (
                    <div
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-2 sm:px-3 py-1 border ${
                        selectedYear === year
                          ? "border-purple-500 text-purple-500"
                          : "border-gray-700 text-gray-400"
                      } rounded text-center text-sm cursor-pointer hover:border-purple-500 hover:text-purple-500 transition-colors`}
                    >
                      {year}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Top 5 Movies - Desktop Only */}
            <div className="hidden lg:block mb-5">
              <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                Top 5 Movies
              </h2>
              <div className="space-y-4">
                {isLoading ? (
                  // Loading state for desktop Top 5 Movies
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
                    >
                      <div className="w-16 h-24 bg-gray-700/50 rounded animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 bg-gray-700/50 rounded animate-pulse" />
                        <div className="h-3 w-1/2 bg-gray-700/50 rounded animate-pulse" />
                      </div>
                    </div>
                  ))
                ) : (
                  filteredMovies.slice(0, 5).map((movie: TMovie) => (
                    <Link
                      href={`/movies/${movie.id}`}
                      key={movie.id}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
                    >
                      <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{movie.title}</h3>
                        <p className="text-sm text-gray-400">
                          {movie?.genre?.genreName}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 lg:mb-8 mt-8">
              {/* Compact Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Mobile Layout */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {/* First row: Genre and Year */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <select
                        className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={selectedGenre}
                        onChange={(e) => handleGenreClick(e.target.value)}
                      >
                        {genres.map((genre: Genre) => (
                          <option key={genre?.genreName} value={genre?.genreName}>
                            {genre?.genreName}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                    <div className="relative">
                      <select
                        className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                      >
                        {getYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  {/* Second row: Latest and Title */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <select
                        className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        {sortOptions.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                    <div className="relative">
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                      >
                        <option value="title">Title</option>
                        <option value="genre">Genre</option>
                        <option value="director">Director</option>
                        <option value="actor">Actor</option>
                        <option value="actress">Actress</option>
                        <option value="platform">Platform</option>
                      </select>
                      <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  {/* Third row: Search bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`Search by ${searchType}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#1C1C3A] border border-gray-700 text-white text-sm placeholder-gray-400 rounded-lg py-2.5 px-4 pl-9 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>

                  {/* Fourth row: Results */}
                  <div>
                    <p className="text-gray-400 text-sm">
                      {filteredMovies.length} results
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex flex-row gap-4">
                  {/* Left side filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="grid grid-cols-2 sm:flex gap-2 sm:w-[340px]">
                      <div className="relative flex-1 min-w-[100px]">
                        <select
                          className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedGenre}
                          onChange={(e) => handleGenreClick(e.target.value)}
                        >
                          {genres.map((genre: Genre) => (
                            <option key={genre?.genreName} value={genre?.genreName}>
                              {genre?.genreName}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                      </div>
                      <div className="relative flex-1 min-w-[100px]">
                        <select
                          className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                        >
                          {getYears().map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                      </div>
                    </div>
                    <div className="relative flex-1 min-w-[100px]">
                      <select
                        className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        {sortOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                    </div>
                  </div>

                  {/* Search bar and results count */}
                  <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full">
                      <input
                        type="text"
                        placeholder={`Search by ${searchType}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#1C1C3A] border border-gray-700border border-gray-700 text-white text-sm placeholder-gray-400 rounded-lg py-2.5 px-4 pl-9 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <p className="text-gray-400 text-sm whitespace-nowrap">
                        {filteredMovies.length} results
                      </p>
                      <div className="relative min-w-[120px]">
                        <select
                          value={searchType}
                          onChange={(e) => setSearchType(e.target.value)}
                          className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          <option value="title">Title</option>
                          <option value="genre">Genre</option>
                          <option value="director">Director</option>
                          <option value="actor">Actor</option>
                          <option value="actress">Actress</option>
                          <option value="platform">Platform</option>
                        </select>
                        <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 lg:grid-cols-3 xl:grid-cols-4   gap-3 ">
              {isLoading &&
                [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <div
                    key={index + 1}
                    className="group cursor-pointer transition-all border border-gray-700 rounded-lg duration-300"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4 bg-gray-700 animate-pulse">
                      <div className="w-full h-full   animate-pulse"></div>

                      <div className="absolute bottom-0  left-0 right-0 p-4  ">
                        <div className="flex items-center space-x-2">
                          <div className="h-6 w-6 rounded-full bg-gray-600 animate-pulse"></div>

                          <div className="h-4 w-16 bg-gray-600 rounded-md animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    <div className="px-3 mb-2">
                      <div className="h-5 w-3/4 bg-gray-600 rounded-md animate-pulse"></div>
                    </div>

                    <div className="flex  items-center justify-between p-3">
                      <div className="h-4 w-12 bg-gray-600 rounded-md animate-pulse"></div>
                      <div className="h-4 w-10 bg-gray-600 rounded-md animate-pulse"></div>
                    </div>
                  </div>
                ))}

              {!isLoading &&
                filteredMovies.map((movie: TMovie) => (
                  <Link
                    href={`/movies/${movie.id}`}
                    key={movie.id}
                    className="group cursor-pointer transition-all border border-gray-900 rounded-lg duration-300"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4">
                      <img
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center space-x-2">
                          <img
                            src={movie.platform.platformLogo}
                            alt={movie.platform.platformName}
                            className="h-6 w-auto"
                          />
                          <span className="text-sm">{movie.duration}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg px-3 font-semibold  group-hover:text-purple-500 transition-colors line-clamp-1">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-sm text-gray-400">
                        {movie?.genre?.genreName}
                      </span>
                      <span className="text-sm font-semibold">
                        ${movie.price}
                      </span>
                    </div>
                    <div className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(),
                            e.preventDefault(),
                            handleWatchlist(movie);
                        }}
                        className="pb-2 cursor-pointer w-full py-2 text-sm font-medium bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Add to Watchlist
                      </button>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1C1C3A]  cursor-pointer text-white rounded-lg border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2C2C4A] transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg border cursor-pointer  transition-colors ${
                        currentPage === page
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-[#1C1C3A] text-white border-gray-700 hover:bg-[#2C2C4A]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#1C1C3A] cursor-pointer  text-white rounded-lg border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2C2C4A] transition-colors"
                >
                  Next
                </button>
              </div>
            )}

            {/* Top 5 Movies - Mobile and Tablet Only */}
            <div className="mt-12 lg:hidden mb-5">
              <h2 className="text-2xl font-bold mb-6">Top 5 Movies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isLoading ? (
                  // Loading state for mobile Top 5 Movies
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className="w-24 h-32 flex-shrink-0 bg-gray-700/50 rounded-lg animate-pulse" />
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="h-6 bg-gray-700/50 rounded-md w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-700/50 rounded-md w-1/2 animate-pulse" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-gray-700/50 rounded-full animate-pulse" />
                            <div className="h-4 bg-gray-700/50 rounded-md w-12 animate-pulse" />
                          </div>
                          <div className="h-4 bg-gray-700/50 rounded-md w-8 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  filteredMovies.slice(0, 5).map((movie: TMovie) => (
                    <Link
                      href={`/movies/${movie.id}`}
                      key={movie.id}
                      className="flex items-center gap-4 p-3 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className="w-24 h-32 flex-shrink-0">
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {movie.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {movie?.genre?.genreName}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={movie.platform.platformLogo}
                              alt={movie.platform.platformName}
                              className="h-4 w-auto"
                            />
                            <span className="text-sm text-gray-400">
                              {movie.duration}
                            </span>
                          </div>
                          <span className="text-sm font-semibold">
                            ${movie.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
