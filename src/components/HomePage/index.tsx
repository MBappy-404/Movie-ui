import React from "react";
import HeroSection from "./Hero";
import TrendingMovies from "./TrendingMovies";
import NewReleases from "./NewRelease";
import HomeBanner from "./HomeBanner";
import TopArtists from "./TopArtists";
import TopNews from "./TopNews";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrendingMovies />
      <NewReleases />
      <HomeBanner />
      <TopArtists />
      <TopNews />
    </div>
  );
};

export default HomePage;
