'use client';

import React, { useState } from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import moviePoster from "@/assets/images/movieposter.jpg"
import manvector from "@/assets/images/manvector.png"

import ReactPlayer from 'react-player';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { movies } from '../Shared/movieDemo';
const MovieDetails = () => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const videoUrl =
        "https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/e5fe3013604cf504ace84b84d91b1f5a/downloads/default.mp4"


    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!name || !email || !review || rating === 0) {
            alert('Please fill in all the fields.');
            return;
        }

        const reviewData = { name, email, rating, review, isChecked }

        console.log(reviewData)

        // Clear the form after submission
        setName('');
        setEmail('');
        setReview('');
        setRating(0);
        setIsChecked(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen container mx-auto text-white p-6 pt-24">

            {/* 🎬 Trial Video Section */}
            <div className="w-full lg:-mb-15 md:mb-20 -mb-5">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <ReactPlayer
                        url={videoUrl} // Local or external (e.g. https://youtu.be/...)
                        controls
                        width="100%"
                        height="80%"
                        light="https://streamvid.jwsuperthemes.com/wp-content/uploads/2023/06/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" // Optional: poster thumbnail before play
                    />
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-start gap-8">
                <motion.div
                    className="w-full md:w-1/4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Image
                        src={moviePoster} // Replace with actual image path
                        alt="Spider Man Memo Poster"
                        width={600}
                        height={400}
                        className="rounded-xl"
                    />
                    <div className="flex justify-between mt-4">
                        <button className="text-sm text-gray-400 hover:text-white">👍 0 likes</button>
                        <button className="text-sm text-gray-400 hover:text-white">🔗 Share</button>
                        <button className="text-sm text-gray-400 hover:text-white">⭐ Watchlist</button>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full md:w-3/4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold mb-2">Spider Man Memo</h1>
                    <p className="text-sm text-gray-400 mb-2 flex gap-1 items-center">
                        <Rating
                            style={{ maxWidth: 80 }}
                            value={3}
                            onChange={setRating}
                            readOnly
                        /> 8.5 | 👁️ 2684 Views | 📅 2022 | ⏱️ 1hr 25 min | 🧑‍💼 TV-MA
                    </p>
                    <p className="mb-4 text-sm text-gray-300">Action • Anime</p>
                    <p className="mb-4 text-sm text-gray-300">
                        Suspendisse eu porta quam, sit amet tristique sem... [truncated for demo]
                    </p>
                    <div className='space-y-3'>
                        <p className="text-sm text-gray-400">Cast: <span className="text-white">Richard Cant</span></p>
                        <p className="text-sm text-gray-400">Crew: <span className="text-white">Alaya Pacheco, Ricky Aleman</span></p>
                        <p className="text-sm text-gray-400">Tags: <span className="text-white">Comic, Hero</span></p>
                    </div>

                    <h2 className="mt-8 text-xl font-semibold text-white">Recommended For You</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {movies.map((movie, i) => (
                            <motion.div
                                key={i}
                                className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                            >
                                {/* Fixed-height image */}
                                <img
                                    src={movie.imageUrl}
                                    alt={movie.title}
                                    className="w-full h-40 object-cover"
                                />

                                {/* Title below image */}
                                <div className="p-2 h-16 flex items-center">
                                    <h3 className="text-white text-sm font-semibold line-clamp-2">{movie.title}</h3>
                                </div>

                                {/* Hover Overlay Panel */}
                                <motion.div
                                    variants={{
                                        rest: { x: "100%", opacity: 0 },
                                        hover: { x: "0%", opacity: 1 },
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 bg-[#0f172a] text-white p-4 flex flex-col justify-center pointer-events-none"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">{movie.year} ・ {movie.duration}</p>
                                        <p className="text-sm mt-2 text-gray-300">{movie.description || "No description available."}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    <h2 className="mt-10 text-xl font-semibold">Add a review</h2>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        {/* Rating Component */}
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                        />

                        {/* Review Textarea */}
                        <textarea
                            className="w-full mt-4 p-2 bg-gray-800 border border-gray-600 rounded"
                            rows={4}
                            placeholder="Your review *"
                            required
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />

                        {/* Name and Email Input */}
                        <div className="mt-4 flex flex-col md:flex-row gap-4">
                            <input
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                                placeholder="Name *"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                                placeholder="Email *"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Checkbox for saving info */}
                        <div className="mt-2">
                            <label className="text-sm">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                Save my name, email, and website in this browser for the next time I comment.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isChecked}
                            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                            Submit
                        </button>

                        {/* Success Message */}
                        {submitted && (
                            <div className="mt-4 text-green-500">
                                <h3>Thank you for your review!</h3>
                            </div>
                        )}
                    </form>

                    {/* Display Submitted Review */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
                        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0">
                                <Image
                                    src={manvector} // Replace with actual avatar image path
                                    alt="Reviewer Avatar"
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2">
                                    <Rating style={{ maxWidth: 80 }} value={5} readOnly />
                                    <p className="text-sm text-gray-400">September 20, 2024</p>
                                </div>
                                <p className="font-semibold text-white mt-1">Jane Doe</p>
                                <p className="mt-2 text-gray-300 text-sm">
                                    <span className="font-medium text-white">Spider-Man: Into the Spider-Verse</span> is a visually stunning,
                                    groundbreaking animated film that redefines superhero storytelling. Its unique animation style, compelling characters,
                                    and inventive multiverse concept make it a standout. With a mix of humor, heart, and action, it’s a refreshing,
                                    must-see experience for both Spider-Man fans and newcomers.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default MovieDetails