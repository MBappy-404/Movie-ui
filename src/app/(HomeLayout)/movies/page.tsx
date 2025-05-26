import { AllMovies } from '@/components/Movies/AllMovies'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "All Movies | CineVerse - Explore the Latest and Popular Movies",
  description: "Discover a wide selection of movies at CineVerse. Browse through new releases, popular films, and find your next favorite movie with ease.",
};



const moviesPage = () => {
  
  return (
    <div>
      <AllMovies/>
    </div>
  )
}

export default moviesPage
