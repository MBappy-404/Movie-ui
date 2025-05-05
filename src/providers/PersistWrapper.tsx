'use client';

import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/components/redux/store';
import TrendingMovieSkeletonSpinner from '@/components/Movies/TrendingMovieSkeleton';

const PersistWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <PersistGate loading={<TrendingMovieSkeletonSpinner/>} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

export default PersistWrapper;
