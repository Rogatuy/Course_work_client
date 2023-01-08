import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  paginationMain: 1,
  paginationMyAccount: 1,

};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {    
    changePaginationMain: (state, action) => {
      state.paginationMain = action.payload;
    },
    changePaginationMyAccount: (state, action) => {
      state.paginationMyAccount = action.payload;
    },
  }, 
  extraReducers: {},   
})

export default paginationSlice.reducer;
export const { changePaginationMain } = paginationSlice.actions;
export const { changePaginationMyAccount } = paginationSlice.actions;
