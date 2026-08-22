import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  isPlaying: false,
  isFavourite: false,
  isDataLoading: false,
  tracks: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,

  reducers: {
    playTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },

    pauseTrack: (state) => {
      state.isPlaying = false;
    },

    markFavourite: (state) => {
      state.isFavourite = !state.isFavourite;
    },
    setDataLoading: (state, action) => {
      state.isDataLoading = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
  },
});

export const {
  playTrack,
  pauseTrack,
  markFavourite,
  setPlaying,
  setTracks,
  setCurrentTrack,
} = playerSlice.actions;

export default playerSlice.reducer;
