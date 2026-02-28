import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";

const appReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "HYDRATE_STATE") {
    return action.payload;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
