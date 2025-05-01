import React from 'react';
import HeroSection from './Hero';
import TrendingMovies from './TrendingMovies';
import NewReleases from './NewRelease';

const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <TrendingMovies/>
            <NewReleases/>
        </div>
    );
};

export default HomePage;