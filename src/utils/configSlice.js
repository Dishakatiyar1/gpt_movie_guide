import {createSlice} from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "lang",
  initialState: {
    lang: "en",
  },
  reducers: {
    chooseLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const {chooseLanguage} = configSlice.actions;
export default configSlice.reducer;
