'use client';

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/components/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          {children}
          <Toaster
            position="top-right"
            duration={1000}
            toastOptions={{
              style: {
                backgroundColor: '#fb5770',
                color: '#ffffff',
                borderRadius: '8px',
              },
            }}
          />
        </>
      </PersistGate>
    </Provider>
  );
};
