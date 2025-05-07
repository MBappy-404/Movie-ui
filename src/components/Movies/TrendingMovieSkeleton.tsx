import { PlayIcon } from "lucide-react";

const TrendingMovieSkeletonSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen  not-last-of-type:">
      <div className="relative">
        {/* Glowing circle */}
        <div className="w-24 h-24 rounded-full border-t-4 border-r-4 border-purple-500 animate-spin shadow-[0_0_30px_#a855f7]"></div>

        {/* Center icon or logo */}
        <div className="absolute inset-0 flex items-center justify-center">
        <PlayIcon className="h-10 w-10 text-white/90" />
        </div>
      </div>
    </div>
    );
  };
  
  export default TrendingMovieSkeletonSpinner;
  