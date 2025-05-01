"use client";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";

interface MovieCardProps {
  title: string;
  rating: number;
  description: string;
  imageUrl: string;
  genre: string;
  year: number;
  duration: string;
}

const TrendingMovies = () => {
  const movies: MovieCardProps[] = [
    {
      title: "Inception",
      rating: 8.8,
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      imageUrl: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Sci-Fi/Action",
      year: 2024,
      duration: "2h 28m"
    },
    {
      title: "The Dark Knight",
      rating: 9.0,
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Action/Drama",
      year: 2024,
      duration: "2h 32m"
    },
    {
      title: "Inception",
      rating: 8.8,
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      imageUrl: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Sci-Fi/Action",
      year: 2024,
      duration: "2h 28m"
    },
    {
      title: "The Dark Knight",
      rating: 9.0,
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl: "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Action/Drama",
      year: 2024,
      duration: "2h 32m"
    },
    // Add more movies here
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Trending Now</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map((movie, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer"
            whileHover="hover"
            initial="rest"
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-96 object-cover rounded-xl shadow-2xl"
            />
            
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 rounded-xl overflow-hidden"
              variants={{
                hover: { opacity: 1 },
                rest: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
              
              {/* Play Button */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                variants={{
                  hover: { scale: 1, opacity: 1 },
                  rest: { scale: 0.8, opacity: 0 }
                }}
                transition={{ delay: 0.1 }}
              >
                <PlayIcon className="w-16 h-16 text-white/90 -translate-y-10 hover:text-white transition-colors" />
              </motion.div>

              {/* Bottom Info Panel */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-3"
                variants={{
                  hover: { y: 0 },
                  rest: { y: 100 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-black/50   backdrop-blur-xs rounded-xl p-3">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                    <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                      <span className="text-yellow-400 text-sm">{movie.rating}/10</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-blue-400 text-sm">{movie.year}</span>
                    <span className="text-gray-300 text-sm">{movie.genre}</span>
                    <span className="text-gray-300 text-sm">{movie.duration}</span>
                  </div>

                  <p className="text-gray-300 text-sm line-clamp-2">
                    {movie.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;