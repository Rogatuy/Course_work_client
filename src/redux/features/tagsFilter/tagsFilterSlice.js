import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  activeTags: [],
};

const tagsFilterSlice = createSlice({
  name: 'tagsFilter',
  initialState,
  reducers: {    
    changeTags: (state, action) => {
      state.activeTags = action.payload;
    },
  }, 
  extraReducers: {},   
})

export default tagsFilterSlice.reducer;
export const { changeTags } = tagsFilterSlice.actions;
