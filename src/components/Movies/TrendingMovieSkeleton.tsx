const TrendingMovieSkeletonSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen  not-last-of-type:">
      <div className="relative">
        {/* Glowing circle */}
        <div className="w-24 h-24 rounded-full border-t-4 border-r-4 border-purple-500 animate-spin shadow-[0_0_30px_#a855f7]"></div>

        {/* Center icon or logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h3.28a1 1 0 01.948.684l.894 2.684a1 1 0 00.948.684h6.672a1 1 0 01.948.684l1.342 4.026a1 1 0 01-.948 1.316H9.28a1 1 0 00-.948.684l-.894 2.684a1 1 0 01-.948.684H4a1 1 0 01-1-1V4z"
            />
          </svg>
        </div>
      </div>
    </div>
    );
  };
  
  export default TrendingMovieSkeletonSpinner;
  