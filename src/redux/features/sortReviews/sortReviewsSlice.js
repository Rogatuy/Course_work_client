import {createSlice} from '@reduxjs/toolkit';
import { sortOrderSettings, sortTypeSettings } from '../../../const';

const initialState = {
  sortType: sortTypeSettings.default,
  sortOrder: sortOrderSettings.default,

};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {    
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    changeSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  }, 
  extraReducers: {},   
})

export default sortSlice.reducer;
export const { changeSortType } = sortSlice.actions;
export const { changeSortOrder } = sortSlice.actions;
