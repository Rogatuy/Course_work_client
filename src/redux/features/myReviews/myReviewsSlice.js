import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  myReviews: [],
  isLoading: false,
  status: null,
};

export const getMyReviews = createAsyncThunk(
  'reviews/getMyReviews',
  async ({name}) => { 
    try{
      const {data} = await axios.post('/review/get-review-author', {
        name,
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async ({title, name, nameOfPiece, group, tags, text, image, grade}) => { 
    try{
      const {data} = await axios.post('/review/add-review', {
        title,
        name,
        nameOfPiece,
        group,
        tags,
        text,
        image,
        grade
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const correctReview = createAsyncThunk(
  'reviews/correctReview',
  async ({title, name, nameOfPiece, tags, text, image, grade, _id}) => { 
    try{
      const {data} = await axios.post('/review/correct-review', {
        name,
        title,
        nameOfPiece,
        tags,
        text,
        image,
        grade,
        _id
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async ({_id, name}) => { 
    try{
      const {data} = await axios.post('/review/delete-review', {
        _id,
        name
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const myReviewsSlice = createSlice({
  name: 'myReviews',
  initialState,
  reducers: {},
  extraReducers: {
    //Get all reviews
    [getMyReviews.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMyReviews.fulfilled]: (state, action) => {
      state.myReviews = action.payload.myReviews;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [getMyReviews.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Add review
    [addReview.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [addReview.fulfilled]: (state, action) => {
      state.myReviews = action.payload.myReviews;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [addReview.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Correct review
    [correctReview.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [correctReview.fulfilled]: (state, action) => {
      state.myReviews = action.payload.myReviews;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [correctReview.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Delete review
    [deleteReview.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [deleteReview.fulfilled]: (state, action) => {
      state.myReviews = action.payload.myReviews;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [deleteReview.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  }
})

export default myReviewsSlice.reducer;
