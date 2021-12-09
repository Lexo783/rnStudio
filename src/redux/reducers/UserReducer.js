import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    like: [],
    image: '',
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setLikeData: (state, action) => {
      state.like = action.payload;
    },
    setImageData: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const {setUserData, setLikeData, setImageData} = userSlice.actions;

export default userSlice.reducer;
