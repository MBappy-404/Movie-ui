const MovieDetailsSkeleton = () => {
    return (
        <div className="min-h-screen container mx-auto text-white p-6 pt-24">
            {/* Video Skeleton */}
            <div className="w-full lg:-mb-15 md:mb-20 mb-10">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-700 animate-pulse"></div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 pt-24">
                {/* Poster Skeleton */}
                <div className="w-full md:w-1/4">
                    <div className="w-full aspect-[3/4] rounded-xl bg-gray-700 animate-pulse"></div>
                    <div className="flex justify-between mt-4">
                        <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-20 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="w-full md:w-3/4">
                    <div className="h-10 w-3/4 bg-gray-700 rounded animate-pulse mb-4"></div>
                    <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse mb-4"></div>
                    <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse mb-4"></div>
                    <div className="h-20 w-full bg-gray-700 rounded animate-pulse mb-4"></div>
                    
                    <div className="space-y-3">
                        <div className="h-4 w-1/3 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-1/3 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-1/3 bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    <div className="h-8 w-48 bg-gray-700 rounded animate-pulse mt-8 mb-4"></div>
                    
                    {/* Recommended Movies Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="relative w-full h-64 bg-gray-700 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailsSkeleton