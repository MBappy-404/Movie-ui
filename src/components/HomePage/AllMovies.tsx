"use client";

import React, { useState, useMemo } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetAllContentQuery } from "../redux/features/content/contentApi";

interface Genre {
  id: string;
  genreName: string;
  createdAt: string;
  updatedAt: string;
}

interface Platform {
  id: string;
  platformName: string;
  platformLogo: string;
  createdAt: string;
  updatedAt: string;
}

interface Movie {
  id: string;
  title: string;
  releaseYear: string;
  duration: string;
  thumbnail: string;
  price: number;
  director: string;
  producer: string;
  actor: string;
  actress: string;
  spoilerWarning: string;
  synopsis: string;
  isAvailable: boolean;
  platformId: string;
  genreId: string;
  createdAt: string;
  updatedAt: string;
  genre: Genre;
  platform: Platform;
}

interface GenreFilter {
  name: string;
  active: boolean;
}

export const AllMovies = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("title");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Latest");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [genres, setGenres] = useState<GenreFilter[]>([
    { name: "All", active: true },
    { name: "Action", active: false },
    { name: "Adventure", active: false },
    { name: "Anime", active: false },
    { name: "Comedy", active: false },
    { name: "Crime", active: false },
    { name: "Documentary", active: false },
    { name: "Drama", active: false },
    { name: "Family", active: false },
    { name: "History", active: false },
    { name: "Horror", active: false },
    { name: "Romance", active: false },
    { name: "Sci-Fi", active: false },
    { name: "Thriller", active: false },
  ]);

  const years = [
    "All",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];
  const sortOptions = [
    "Latest",
    "Oldest",
    "Name",
    "Price Low to High",
    "Price High to Low",
  ];

   
  const { data, isLoading } = useGetAllContentQuery({ undefined });
  const demoMovies: Movie[] = data?.data || [];

  const handleGenreClick = (genreName: string) => {
    setGenres((prevGenres) =>
      prevGenres.map((g) => ({
        ...g,
        active: g.name === genreName,
      }))
    );
    setSelectedGenre(genreName);
  };

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let filtered = [...demoMovies];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      switch (searchType) {
        case "title":
          filtered = filtered.filter((movie) =>
            movie.title.toLowerCase().includes(query)
          );
          break;
        case "genre":
          filtered = filtered.filter((movie) =>
            movie.genre.genreName.toLowerCase().includes(query)
          );
          break;
        case "director":
          filtered = filtered.filter((movie) =>
            movie.director.toLowerCase().includes(query)
          );
          break;
        case "actor":
          filtered = filtered.filter((movie) =>
            movie.actor.toLowerCase().includes(query)
          );
          break;
        case "actress":
          filtered = filtered.filter((movie) =>
            movie.actress.toLowerCase().includes(query)
          );
          break;
        case "platform":
          filtered = filtered.filter((movie) =>
            movie.platform.platformName.toLowerCase().includes(query)
          );
          break;
        default:
          filtered = filtered.filter(
            (movie) =>
              movie.title.toLowerCase().includes(query) ||
              movie.genre.genreName.toLowerCase().includes(query) ||
              movie.director.toLowerCase().includes(query) ||
              movie.actor.toLowerCase().includes(query) ||
              movie.actress.toLowerCase().includes(query) ||
              movie.platform.platformName.toLowerCase().includes(query)
          );
      }
    }

    // Filter by genre
    if (selectedGenre !== "All") {
      filtered = filtered.filter(
        (movie) => movie.genre.genreName === selectedGenre
      );
    }

    // Filter by year
    if (selectedYear !== "All") {
      filtered = filtered.filter((movie) => movie.releaseYear === selectedYear);
    }

    // Sort movies
    switch (sortBy) {
      case "Latest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "Oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "Name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Price Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [
    demoMovies,
    searchQuery,
    selectedGenre,
    selectedYear,
    sortBy,
    searchType,
  ]);

  const handleMovieClick = (movieId: string) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="min-h-screen   text-white pt-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden mb-4 text-gray-400 hover:text-white transition-colors"
        >
          {isSidebarOpen ? "Filter" : "Filter"}
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
              className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              Close
            </button>

            {/* Rest of the sidebar content remains the same */}
            {/* Genres */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                Genres
              </h2>
              <div className="space-y-2 lg:space-y-3">
                {genres.map((genre) => (
                  <div
                    key={genre.name}
                    onClick={() => handleGenreClick(genre.name)}
                    className={`cursor-pointer ${
                      genre.active ? "text-purple-500" : "text-gray-400"
                    } hover:text-purple-500 transition-colors`}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Movies by year */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                Release Year
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
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
                ))}
              </div>
            </div>

            {/* Top 5 Movies - Desktop Only */}
            <div className="hidden lg:block">
              <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                Top 5 Movies
              </h2>
              <div className="space-y-4">
                {filteredMovies.slice(0, 5).map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{movie.title}</h3>
                      <p className="text-sm text-gray-400">
                        {movie.genre.genreName}
                      </p>
                      <div className="flex items-center mt-1">
                        <img
                          src={movie.platform.platformLogo}
                          alt={movie.platform.platformName}
                          className="h-4 w-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 lg:mb-8 mt-8">
              {/* Compact Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Left side filters */}
                <div className="flex gap-2 sm:w-[340px]">
                  <div className="relative flex-1 min-w-[100px]">
                    <select
                      className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={selectedGenre}
                      onChange={(e) => handleGenreClick(e.target.value)}
                    >
                      {genres.map((genre) => (
                        <option key={genre.name} value={genre.name}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                  </div>
                  <div className="relative flex-1 min-w-[100px]">
                    <select
                      className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                  </div>
                  <div className="relative flex-1 min-w-[100px]">
                    <select
                      className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                <div className="flex-1 flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={`Search by ${searchType}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#1C1C3A] text-white text-sm placeholder-gray-400 rounded-lg py-2 px-4 pl-9 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-400 text-sm whitespace-nowrap">
                      {filteredMovies.length} results
                    </p>
                    <div className="relative min-w-[120px]">
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="w-full bg-[#1C1C3A] text-white text-sm border border-gray-700 rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
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

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {isLoading &&
                [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <div
                    key={index + 1}
                    className="group cursor-pointer transition-all border border-gray-900 rounded-lg duration-300"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4 bg-[#00031b]/80 animate-pulse">
                      <div className="w-full h-full bg-gradient-to-br from-[#00052a] via-[#000a3a] to-[#00031b] animate-pulse"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#00031b]/90 to-transparent">
                        <div className="flex items-center space-x-2">
                          <div className="h-6 w-6 rounded-full bg-[#000a3a] animate-pulse"></div>

                          <div className="h-4 w-16 bg-[#000a3a] rounded-md animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    <div className="px-3 mb-2">
                      <div className="h-5 w-3/4 bg-[#000a3a] rounded-md animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between p-3">
                      <div className="h-4 w-12 bg-[#000a3a] rounded-md animate-pulse"></div>
                      <div className="h-4 w-10 bg-[#000a3a] rounded-md animate-pulse"></div>
                    </div>
                  </div>
                ))}

              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
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
                      {movie.genre.genreName}
                    </span>
                    <span className="text-sm font-semibold">
                      ${movie.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Top 5 Movies - Mobile and Tablet Only */}
            <div className="mt-12 lg:hidden mb-5">
              <h2 className="text-2xl font-bold mb-6">Top 5 Movies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {!isLoading && (
                  <div className="flex items-center gap-4 p-3 cursor-pointer hover:bg-white/5 rounded-lg transition-colors">
                    {/* Image placeholder */}
                    <div className="w-24 h-32 flex-shrink-0 bg-gray-200 animate-pulse rounded-lg"></div>

                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Title placeholder */}
                      <div className="h-6 bg-gray-200 animate-pulse rounded-md w-3/4"></div>

                      {/* Genre placeholder */}
                      <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/2"></div>

                      {/* Bottom row placeholders */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Platform logo placeholder */}
                          <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
                          {/* Duration placeholder */}
                          <div className="h-4 bg-gray-200 animate-pulse rounded-md w-12"></div>
                        </div>
                        {/* Price placeholder */}
                        <div className="h-4 bg-gray-200 animate-pulse rounded-md w-8"></div>
                      </div>
                    </div>
                  </div>
                )}
                {filteredMovies.slice(0, 5).map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
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
                        {movie.genre.genreName}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
