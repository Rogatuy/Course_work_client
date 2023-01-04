import { sectionHobbiesValue } from "../../../const";
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedHobbie: `${sectionHobbiesValue.All}`,
};

const activeHobbieSlice = createSlice({
  name: 'activeHobbie',
  initialState,
  reducers: {    
    changeHobbie: (state, action) => {
      state.selectedHobbie = action.payload;
    },
  }, 
  extraReducers: {},   
})

export default activeHobbieSlice.reducer;
export const { changeHobbie } = activeHobbieSlice.actions;
