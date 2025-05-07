'use client';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/components/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import TrendingMovieSkeletonSpinner from "@/components/Movies/TrendingMovieSkeleton";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<TrendingMovieSkeletonSpinner/>} persistor={persistor}>
        <>
          {children}
          <Toaster
            position="top-center"
            duration={2000}
            richColors
          />
        </>
      </PersistGate>
    </Provider>
  );
};
