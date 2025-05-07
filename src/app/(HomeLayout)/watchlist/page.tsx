import WatchList from "@/components/watchList/watchlist";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Watchlist | CineVerse - Keep Track of Your Favorite Movies",
  description: "Create and manage your personal watchlist on CineVerse. Add movies you're interested in and keep track of upcoming releases and top picks.",
};


const WatchListPage = () => {
  return (
    <div className="container mx-auto p-2  md:p-6 pt-20 bg-[#00031b]">
      <WatchList/>
    </div>
  );
};

export default WatchListPage;
