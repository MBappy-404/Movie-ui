"use client";

import { useGetAllContentQuery } from "@/components/redux/features/content/contentApi";
import { motion } from "framer-motion";
import { PlayIcon } from "lucide-react";

const ComingSoonManagement = () => {
  const { data: contentData, isLoading } = useGetAllContentQuery(undefined);
  const movies = contentData?.data || [];

  // Filter out movies where isAvailable is false (coming soon)
  const inActiveMovies = movies.filter((movie: any) => !movie.isAvailable);

  const cardVariants = {
    hidden: { opacity: 1, y: 50 },
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
      className="min-h-screen bg-cover bg-center bg-no-repeat py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url('/movie-bg.png')` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 tracking-widest">
            COMING SOON
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Exciting new movies are on the way! Stay tuned and be the first to
            watch the latest releases as they arrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading &&
            [...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-full h-96 bg-gray-700 animate-pulse rounded-xl"
              ></div>
            ))}

          {inActiveMovies.map((movie: any) => (
            <motion.div
              key={movie.id}
              className="relative group cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Discount Badge */}
              {movie?.percentage && (
                <div
                  className={`absolute top-3 ${
                    movie?.isActive ? "right-3" : "left-3"
                  } bg-red-600 px-4 py-1 rounded-full flex items-center justify-center backdrop-blur-sm z-10`}
                >
                  <span className="text-white text-[12px] font-semibold">
                    {movie?.percentage}% OFF
                  </span>
                </div>
              )}

              {/* Thumbnail */}
              <img
                src={movie?.thumbnail}
                alt={movie?.title}
                className="w-full h-96 object-cover rounded-xl shadow-2xl"
              />

              {/* Overlay on Hover */}
              <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={overlayVariants}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                <motion.div
                  variants={playIconVariants}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
                  {/* <PlayIcon className="w-16 h-16 text-white/90 hover:text-white transition-colors" /> */}
                </motion.div>

                <motion.div
                  variants={infoVariants}
                  className="absolute bottom-0 left-0 right-0 p-3"
                >
                  <div className="bg-black/50 backdrop-blur-xs rounded-xl p-3">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg truncate font-bold text-white">
                        {movie?.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-gray-300 text-sm">
                        {movie?.genre?.genreName}
                      </span>
                      <span className="text-gray-300 text-sm">
                        {movie?.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ComingSoonManagement;
