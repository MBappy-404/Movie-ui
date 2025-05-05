import MovieDetails from '@/components/Movies/MovieDetails'
import { getCurrentUser } from '@/services/AuthServices'
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
