"use client";

import { motion } from "framer-motion";
import { useGetAllContentQuery } from "../redux/features/content/contentApi";
import { Movie } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";

const EditorsPicks = () => {
    const { data, isLoading } = useGetAllContentQuery([
        { name: "sortBy", value: "reviews" },
        { name: "sortOrder", value: "desc" },
        { name: "limit", value: "4" }
    ]);

    const topRatedMovies = data?.data || [];

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
            className="container mx-auto px-4 pb-12 "
        >
            <motion.div
                className="flex items-center gap-4 mb-8"
                variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: {
                        opacity: 1,
                        x: 0,
                        transition: { type: "spring", stiffness: 100 },
                    },
                }}
            >
                <div className=" rounded-full" />
                <div>
                    <h2 className="text-3xl text-left -ml-4 md:text-4xl font-bold text-white">
                        Editor’s Picks
                    </h2>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {isLoading &&
                    [...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-96 bg-gray-700 animate-pulse rounded-xl"
                        ></div>
                    ))}

                {topRatedMovies.map((movie: Movie) => (
                    <Link href={`/movies/${movie?.id}`} key={movie?.id}>
                        <motion.div
                            variants={cardVariants}
                            className="group relative w-full h-96 rounded-xl overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={movie.thumbnail}
                                alt={movie.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            <motion.div
                                variants={overlayVariants}
                                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                            />

                            <motion.div
                                variants={playIconVariants}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            >
                                <PlayIcon className="w-16 h-16 text-white" />
                            </motion.div>

                            <motion.div
                                variants={infoVariants}
                                className="absolute bottom-0 left-0 right-0 p-6"
                            >
                                <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-white">
                                            {movie.title}
                                        </h3>
                                        <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                                            <span className="text-yellow-400 text-sm">
                                                {movie.averageRating}/5
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-blue-400 text-sm">
                                            {movie.releaseYear}
                                        </span>
                                        <span className="text-gray-300 text-sm">
                                            {movie.genre?.genreName}
                                        </span>
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
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

export default EditorsPicks; 