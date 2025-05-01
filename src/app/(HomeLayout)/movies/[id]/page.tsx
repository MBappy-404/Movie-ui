import MovieDetails from '@/components/HomePage/MovieDetails'
import React from 'react'

const MovieDetailsPage = async({ params }: any) => {
    const {id} = await params
  return (
    <div>
        <MovieDetails/>
    </div>
  )
}

export default MovieDetailsPage
