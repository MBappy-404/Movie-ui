"use client";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useGetAllContentQuery } from "../redux/features/content/contentApi";

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
      description:
        "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Sci-Fi/Action",
      year: 2024,
      duration: "2h 28m",
    },
    {
      title: "The Dark Knight",
      rating: 9.0,
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Action/Drama",
      year: 2024,
      duration: "2h 32m",
    },
    {
      title: "The Dark Knight",
      rating: 9.0,
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Action/Drama",
      year: 2024,
      duration: "2h 32m",
    },
    {
      title: "The Dark Knight",
      rating: 9.0,
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Action/Drama",
      year: 2024,
      duration: "2h 32m",
    },
  ];

  // const lastTrending = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { data } = useGetAllContentQuery([
    { name: "sortBy", value: "reviews" },
    { name: "sortOrder", value: "desc" },
    {
      name: "createdAt",
      value: "desc",
    },
  ]);
   

  const moviesData = data?.data?.slice(0, 4)

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.2 } },
  };

  const playIconVariants = {
    rest: { scale: 0.8, opacity: 0 },
    hover: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
  };

  const infoVariants = {
    rest: { y: 100 },
    hover: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="container mx-auto px-4 py-12"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-8"
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 100 },
          },
        }}
      >
        Trending Now
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {moviesData?.map((movie: any) => (
          <motion.div
            key={movie?.id}
            className="relative group cursor-pointer"
            variants={cardVariants}
          >
            <img
              src={movie?.thumbnail}
              alt={movie?.title}
              className="w-full h-96 object-cover rounded-xl shadow-2xl"
            />

            <motion.div
              className="absolute inset-0 rounded-xl overflow-hidden"
              initial="rest"
              whileHover="hover"
              variants={overlayVariants}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

              <motion.div
                variants={playIconVariants}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <PlayIcon className="w-16 h-16 text-white/90 hover:text-white transition-colors" />
              </motion.div>

              <motion.div
                variants={infoVariants}
                className="absolute bottom-0 left-0 right-0 p-3"
              >
                <div className="bg-black/50 backdrop-blur-xs rounded-xl p-3">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {movie.title}
                    </h3>
                    <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                      <span className="text-yellow-400 text-sm">
                        {movie.rating}/10
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-blue-400 text-sm">{movie.year}</span>
                    <span className="text-gray-300 text-sm">{movie.genre}</span>
                    <span className="text-gray-300 text-sm">
                      {movie.duration}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm line-clamp-2">
                    {movie.synopsis}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrendingMovies;
