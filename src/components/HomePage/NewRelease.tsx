"use client";
import { motion, useInView } from "framer-motion";
import { PlayIcon, ClockIcon, TicketIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

interface MovieCardProps {
  title: string;
  rating: number;
  description: string;
  imageUrl: string;
  genre: string;
  year: number;
  duration: string;
}

const NewReleases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const movies: MovieCardProps[] = [
    {
      title: "Cyber Nexus",
      rating: 9.2,
      description:
        "In a dystopian future, a rogue AI threatens humanity's last hope. A team of enhanced hackers must breach the neural network to save mankind.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Cyberpunk/Thriller",
      year: 2024,
      duration: "2h 12m",
    },
    {
      title: "Eclipse of Titans",
      rating: 8.9,
      description:
        "Ancient gods return to reclaim Earth in this epic fantasy adventure. Humanity's last stand begins at the celestial alignment.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Fantasy/Adventure",
      year: 2024,
      duration: "2h 45m",
    },
    {
      title: "Cyber Nexus",
      rating: 9.2,
      description:
        "In a dystopian future, a rogue AI threatens humanity's last hope. A team of enhanced hackers must breach the neural network to save mankind.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Cyberpunk/Thriller",
      year: 2024,
      duration: "2h 12m",
    },
    {
      title: "Eclipse of Titans",
      rating: 8.9,
      description:
        "Ancient gods return to reclaim Earth in this epic fantasy adventure. Humanity's last stand begins at the celestial alignment.",
      imageUrl:
        "https://streamvid.jwsuperthemes.com/wp-content/uploads/2024/12/7I6VUdPj6tQECNHdviJkUHD2u89-scaled-630x400.jpg",
      genre: "Fantasy/Adventure",
      year: 2024,
      duration: "2h 45m",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const hoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative  py-20 ">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-end justify-between"
        >
          <h2 className="text-4xl font-bold text-white">
            New Releases
            <span className="ml-4 text-blue-500">2024</span>
          </h2>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            <TicketIcon className="h-5 w-5" />
            View All
          </button>
        </motion.div>

        <div className="flex   gap-8 overflow-x-auto pb-8 ">
          {movies.map((movie, index) => (
            <motion.div
              key={index}
              className="group relative w-[300px] flex-shrink-0 cursor-pointer  md:w-[400px]"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={index}
              //   whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                variants={hoverVariants}
                className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover object-center"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    NEW
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm">
                    <ClockIcon className="h-4 w-4" />
                    {movie.duration}
                  </span>
                </div>

                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 0.3 + index * 0.1 },
                  }}
                >
                  <div className="rounded-full bg-white/10 p-4 backdrop-blur-md transition-all group-hover:bg-blue-600/90 group-hover:scale-110">
                    <PlayIcon className="h-12 w-12 text-white/90" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 space-y-4 p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.4 + index * 0.1 },
                    }}
                  >
                    <h3 className="text-2xl font-bold text-white">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>{movie.year}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-400" />
                      <span>{movie.genre}</span>
                    </div>
                  </motion.div>

                  {/* Rating Progress */}
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.5 + index * 0.1 },
                    }}
                  >
                    <div className="relative h-3 w-full rounded-full bg-white/10">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-blue-600"
                        style={{ width: `${movie.rating * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-blue-500">
                      {movie.rating}/10
                    </span>
                  </motion.div>

                  <motion.p
                    className="text-sm text-gray-300 line-clamp-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.6 + index * 0.1 },
                    }}
                  >
                    {movie.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewReleases;
