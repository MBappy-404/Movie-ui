import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userState";
import watchListSlice from "./features/watchListSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

const watchListPersistConfig = {
  key: "watchList",
  storage,
};

const persistedWatchListReducer = persistReducer(
  watchListPersistConfig,
  watchListSlice
);

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      [baseApi.reducerPath]: baseApi.reducer,
      watchList: persistedWatchListReducer,
    },
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
};

export const persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
