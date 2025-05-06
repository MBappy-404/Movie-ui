import MovieDetails from '@/components/Movies/MovieDetails'
import React, { Suspense } from 'react'

const MovieDetailsPage = async ({ params }: any) => {
  return (
    <div>
      <Suspense>
        <MovieDetails  />
      </Suspense>
    </div>
  )
}

export default MovieDetailsPage
