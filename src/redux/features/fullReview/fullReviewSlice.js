import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  fullReview: {
    _id: '',
    title: '',
    name: '',
    ratings: [],
    nameOfPiece: '',
    group: '',
    likes: [],
    tags: [],
    text: '',
    image: '',
    grade: null,
    comments: [],
  },
  isLoading: false,
  status: null,
};

export const getFullReview = createAsyncThunk(
  'reviews/postFullReview',
  async ({_id}) => { 
    try{
      const {data} = await axios.post('/review/get-review', {
        _id,
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const addComment = createAsyncThunk(
  'review/addComment',
  async ({name, textComment, _id}) => { 
    try{
      const {data} = await axios.post('/review/add-comment', {
        name,
        textComment,
        _id,
      });
      
      return data;
    } catch(error) {
      console.log(error);
    }
})

export const correctComment = createAsyncThunk(
  'review/correctComment',
  async ({userId, textComment, _id}) => { 
    try{
      const {data} = await axios.post('/review/correct-comment', {
        userId,
        textComment,
        _id,
      });
      
      return data;
    } catch(error) {
      console.log(error);
    }
})

export const deleteComment = createAsyncThunk(
  'review/deleteComment',
  async ({userId, _id}) => { 
    try{
      const {data} = await axios.post('/review/delete-comment', {
        userId,
        _id,
      });
      
      return data;
    } catch(error) {
      console.log(error);
    }
})

export const addRating = createAsyncThunk(
  'review/addRating',
  async ({name, _id, rating}) => { 
    try{
      const {data} = await axios.post('/review/add-rating', {
        name,
        _id,
        rating,
      });
      
      return data;
    } catch(error) {
      console.log(error);
    }
})

export const addLike = createAsyncThunk(
  'review/addLike',
  async ({_id, nameLike, isLike}) => { 
    try{
      const {data} = await axios.post('/review/add-like', {
        _id, 
        nameLike, 
        isLike
      });
      
      return data;
    } catch(error) {
      console.log(error);
    }
})

export const fullReviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: {
    //Get full review
    [getFullReview.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getFullReview.fulfilled]: (state, action) => {
      state.fullReview._id = action.payload.review?._id;
      state.fullReview.title = action.payload.review?.title;
      state.fullReview.name = action.payload.review?.name;
      state.fullReview.ratings = action.payload.review?.ratings;
      state.fullReview.nameOfPiece = action.payload.review?.nameOfPiece;
      state.fullReview.group = action.payload.review?.group;
      state.fullReview.likes = action.payload.review?.likes;
      state.fullReview.tags = action.payload.review?.tags;
      state.fullReview.text = action.payload.review?.text;
      state.fullReview.image = action.payload.review?.image;
      state.fullReview.grade = action.payload.review?.grade;
      state.fullReview.comments = action.payload.review?.comments;
      state.isLoading = false;
      state.status = action.payload?.message;    
    },
    [getFullReview.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Add comment
    [addComment.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [addComment.fulfilled]: (state, action) => {
      state.fullReview.comments = action.payload.review.comments;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [addComment.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    [getFullReview.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Correct comment
    [correctComment.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [correctComment.fulfilled]: (state, action) => {
      state.fullReview.comments = action.payload.review.comments;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [correctComment.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Delete comment
    [deleteComment.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.fullReview.comments = action.payload.review.comments;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [deleteComment.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Add rating
    [addRating.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [addRating.fulfilled]: (state, action) => {
      state.fullReview.ratings = action.payload.review.ratings;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [addRating.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Add likes
    [addLike.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [addLike.fulfilled]: (state, action) => {
      state.fullReview.likes = action.payload.review.likes;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [addRating.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  }
})

export default fullReviewSlice.reducer;
