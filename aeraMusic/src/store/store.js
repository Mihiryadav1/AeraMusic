import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "../Features/playerSlice";
import musicReducer from "../Features/musicSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    music: musicReducer,
  },
});

export default store;