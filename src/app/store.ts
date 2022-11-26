import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import mainReducer from "../features/main/mainSlice";
import settingsReducer from "../features/settings/settingsSlice";
import battleReducer from "../features/battle/battleSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    settings: settingsReducer,
    battle: battleReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
