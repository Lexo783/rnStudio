import {createSlice} from '@reduxjs/toolkit';

export const ImageSlice = createSlice({
  name: 'image',
  initialState: {
    image: '',
  },
  reducers: {
    setImageData: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const {setImageData, test} = ImageSlice.actions;

export default ImageSlice.reducer;
