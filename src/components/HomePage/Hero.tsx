"use client";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const videoUrl =
    "https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/e5fe3013604cf504ace84b84d91b1f5a/downloads/default.mp4";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 20;
      video.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden  ">
      {/* Video Background with Overlays */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute -top-20 md:-top-5 left-0 w-full h-full  object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-b from-[#00031bbf] via-[#00051fcb] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-[#00031b] via-[#00051f] to-transparent" />

        <div className="absolute top-0 left-0 h-full w-[80%] md:w-[80%] bg-gradient-to-r from-[#000317] to-transparent" />
      </div>

      <div className="relative z-10 flex items-center pl-2 md:pl-10 pt-0 md:pt-16 justify-start h-full">
        <motion.div
          className="text-left px-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-4xl md:text-7xl font-bold text-white mb-3 md:mb-6 font-['Bebas_Neue'] tracking-wide"
          >
            Welcome to <span className="  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
  CineVerse
</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-base md:text-2xl font-semibold text-gray-200 mb-4 font-['Open_Sans'] max-w-2xl"
          >
            Dive into a world of movies, reviews, and trailers
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-sm md:text-lg text-gray-300 mb-6 font-['Open_Sans'] max-w-2xl"
          >
            Discover trending films, get expert reviews, and watch high-quality
            trailers in one place. Whether you're a movie buff or just looking
            for your next watch, CineVerse brings entertainment closer to you.
          </motion.p>

          <button className="px-6 py-3 mt-5 cursor-pointer flex gap-2 items-center rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:opacity-90 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 text-sm md:text-lg   duration-300">
            Explore Now <ArrowRightIcon className="w-5 h-5 font-bold" />
          </button>
        </motion.div>
      </div>

      {/* Subtle Zoom Animation */}
      {/* <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div> */}
    </section>
  );
};

export default HeroSection;
