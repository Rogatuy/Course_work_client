import {configureStore} from '@reduxjs/toolkit';
import activeHobbieSlice from './features/activeHobbie/activeHobbieSlice';
import allReviewsSlice from './features/allReviews/allReviewsSlice';
import authSlice from './features/auth/authSlice';
import fullReviewSlice from './features/fullReview/fullReviewSlice';
import myReviewsSlice from './features/myReviews/myReviewsSlice';
import paginationSlice from './features/pagination/paginationSlice';
import sortReviewsSlice from './features/sortReviews/sortReviewsSlice';
import tagsFilterSlice from './features/tagsFilter/tagsFilterSlice';
import uploadImageSlice from './features/uploadImage/uploadImageSlice';

export const store = configureStore({
  reducer: {
    activeHobbie: activeHobbieSlice,
    auth: authSlice,
    allReviews: allReviewsSlice,
    fullReview: fullReviewSlice,
    myReviews: myReviewsSlice,
    uploadImage: uploadImageSlice,
    tagsFilter: tagsFilterSlice,
    pagination: paginationSlice,
    sort: sortReviewsSlice,
  },
})