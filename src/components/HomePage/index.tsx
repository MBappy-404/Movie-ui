import React from "react";
import HeroSection from "./Hero";
import TrendingMovies from "./TrendingMovies";
import NewReleases from "./NewRelease";
import HomeBanner from "./HomeBanner";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrendingMovies />
      <NewReleases />
      <HomeBanner />
    </div>
  );
};

export default HomePage;
