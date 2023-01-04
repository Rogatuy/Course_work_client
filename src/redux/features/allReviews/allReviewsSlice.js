import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  allReviews: [],
  isLoading: false,
  status: null,
};

export const getAllReviews = createAsyncThunk(
  'reviews/getAllreviews',
  async () => { 
    try{
      const {data} = await axios.get('/review/get-all-review');
      return data;
    } catch(error) {
      console.log(error);
    }
})

export const allReviewsSlice = createSlice({
  name: 'allReviews',
  initialState,
  reducers: {},
  extraReducers: {
    //Get all reviews
    [getAllReviews.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getAllReviews.fulfilled]: (state, action) => {
      state.allReviews = action.payload.allReviews;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [getAllReviews.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  }
})

export default allReviewsSlice.reducer;
