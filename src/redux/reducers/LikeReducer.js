import {createSlice} from '@reduxjs/toolkit';

export const LikeSlice = createSlice({
  name: 'like',
  initialState: {
    like: [],
  },
  reducers: {
    setLikeData: (state, action) => {
      state.like = action.payload;
    },
  },
});

export const {setLikeData, test} = LikeSlice.actions;

export default LikeSlice.reducer;
