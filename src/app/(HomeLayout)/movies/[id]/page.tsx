import MovieDetails from '@/components/Movies/MovieDetails'
import { getCurrentUser } from '@/services/AuthServices'
import React, { Suspense } from 'react'

const MovieDetailsPage = async ({ params }: any) => {
  const { id } = await params
  const currentUser = await getCurrentUser()
  return (
    <div>
      <Suspense>
        <MovieDetails currentUser={currentUser} />
      </Suspense>
    </div>
  )
}

export default MovieDetailsPage
