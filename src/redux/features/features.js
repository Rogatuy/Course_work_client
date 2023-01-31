import { changeHobbie } from "./activeHobbie/activeHobbieSlice";
import { getAllReviews } from "./allReviews/allReviewsSlice";
import { changeTags } from "./tagsFilter/tagsFilterSlice";
import { changePaginationMain, changePaginationMyAccount, changePaginationSearch } from "./pagination/paginationSlice";
import { deleteReview, getMyReviews } from "./myReviews/myReviewsSlice";
import { addLike, addRating, deleteComment } from "./fullReview/fullReviewSlice";
import { getFullReview } from "./fullReview/fullReviewSlice";
import { checkIsAuth } from "./auth/authSlice";
import { logOut } from "./auth/authSlice";
import { correctComment } from "./fullReview/fullReviewSlice";
import { correctReview } from './myReviews/myReviewsSlice';
import { deleteUrl, uploadImage } from './uploadImage/uploadImageSlice';
import { addComment } from "./fullReview/fullReviewSlice";
import { addReview } from "./myReviews/myReviewsSlice";
import { changeSortOrder, changeSortType } from './sortReviews/sortReviewsSlice';

export {changeHobbie, getAllReviews, changeTags, changePaginationMain, deleteReview, deleteComment, getFullReview, logOut, checkIsAuth, correctComment, correctReview, deleteUrl, uploadImage, addComment, addReview, changeSortOrder, changeSortType, addLike, addRating, getMyReviews, changePaginationMyAccount, changePaginationSearch};