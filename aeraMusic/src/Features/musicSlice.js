import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMood: "All",
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setSelectedMood: (state, action) => {
      state.selectedMood = action.payload;
    },
  },
});

export const { setSelectedMood } = musicSlice.actions;

export default musicSlice.reducer;
