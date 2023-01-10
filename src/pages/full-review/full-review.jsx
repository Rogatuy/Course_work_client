import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from '../loading-screen/loading-screen';
import Comment from '../../components/comment/comment';
import RatingStars from '../../components/rating-stars/rating-stars';
import ModalNewComment from '../../components/modal-new-comment/modal-new-comment';

import { getAllReviews } from '../../redux/features/allReviews/allReviewsSlice';
import { addLike, addRating, getFullReview } from '../../redux/features/fullReview/fullReviewSlice';

import { getColorFullReview, scrollOnTop, getAllLikes } from '../../utils/utils';
import { COMMENTS_STEP} from '../../const';

import './full-review.scss';
import FormRatingLikes from '../../components/form-rating-likes/form-rating-likes';

const FullReview = () => {
  const {id} = useParams();
  const review = useSelector(state => state.fullReview.fullReview);
  const isReviewLoading = useSelector(state => state.fullReview.isLoading);
  const isReviewsLoading = useSelector(state => state.allReviews.isLoading);
  const isAuth = useSelector(state => state.auth.name);
  const allReviews = useSelector((state) => state.allReviews.allReviews);
  const ratingUser = review.ratings.find((element) => element.name === isAuth) || false;  
  const userLike = review.likes.includes(isAuth);
  const startLikesAuthor = getAllLikes(allReviews, review.name);
     
  const dispatch = useDispatch();  
  
  const [commentsCount, setCommentsCount] = useState(COMMENTS_STEP);
  const [rating, setRating] = useState(ratingUser.rating);
  const [isLike, setIsLike] = useState(userLike); 
  const [likesAuthor, setLikesAuthor] = useState(startLikesAuthor);

  useEffect(() => {
    dispatch(getFullReview({_id: id}));
    dispatch(getAllReviews());
  }, [dispatch, id]);

  useEffect(() => {
    document.title = `${review.title}`;
  }, [review.title]);

  useEffect(() => {
     setLikesAuthor(getAllLikes(allReviews, review.name));
  }, [allReviews, review.name]);

  useEffect(() => {
    setIsLike(userLike)
  }, [userLike]);

  useEffect(() => {
     setRating(() => {
      const ratingUser = review.ratings.find((element) => element.name === isAuth);
      ratingUser ? setRating(ratingUser.rating) : setRating(false);
    });
  }, [isAuth, review.ratings]);

  const handleMoreComment = () => {
    setCommentsCount(commentsCount + Math.min(COMMENTS_STEP, review.comments.length));
  };

  const handleLikeChange = () => {
    const likeClick = !isLike;    
    dispatch(addLike({_id: id, nameLike: isAuth, isLike:likeClick})).then(() => dispatch(getAllReviews()));
    setIsLike(likeClick);
  }

  const handleRatingChange = (event) => {
    const newRating = event.target.value;
    dispatch(addRating({name: isAuth, _id: id, rating:newRating}));
    dispatch(getFullReview({_id: id}));
    setRating(newRating);
  }

  if (isReviewLoading) {
    return <LoadingScreen />;
  }

  if (isReviewsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container text-dark my-3 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-11 col-lg-4 d-flex flex-column align-items-center mb-1 px-0">
          <div className="full-review__containter d-flex justify-content-center">
            <img src={review.image} className="full-review__poster img-fluid" alt="review_photo"></img>
          </div>
          {isAuth &&
            <FormRatingLikes
            isAuth={isAuth}
            review={review}
            rating={rating}
            handleLikeChange={handleLikeChange}
            handleRatingChange={handleRatingChange}
            isLike={isLike}
            />
          }
        </div>        
        <div className="col-11 col-lg-6 row px-0 d-flex flex-column">
          <div className={`${getColorFullReview(review.grade)} d-flex flex-column px-0 mx-0 mx-lg-2`}>
            <div className="d-flex flex align-items-center justify-content-between">
              <h3 className="p-2 m-0">{review.title}</h3>
              <div className="mx-1 col-3 d-flex justify-content-end">
                <RatingStars
                  allRating={review.ratings}
                />
              </div>
            </div>
            <p className="p-2 m-0">{review.nameOfPiece}</p>
            <div className="d-flex flex-row justify-content-between">
              <div className="col-8 d-flex">
                <p className="p-2 m-0">Автор: {review.name}</p>
                {likesAuthor > 0 &&
                <p className="p-2 my-0">
                  {likesAuthor} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" className="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                  </svg>
                </p>
                }
              </div>
              <p className="p-2 px-md-1 m-0">{review.grade}/10</p>
            </div>
            <p className="p-2 m-0">Оценка автора: {review.grade}</p>
            <p className="p-2 m-0">{review.tags.join(', ')}</p>
            <p className="p-2 m-0">{review.text}</p>
          </div>
          {review.comments.length !== 0 &&
          <div className="mx-0 mx-lg-2 mt-2 px-0">
            <h4 className="p-2 m-0">Комментарии</h4>
            <div className={`${getColorFullReview(review.grade)} comment d-flex flex-column p-0`}>
              {review.comments.slice(0, commentsCount).map((comment) => (
                <Comment
                key={comment._id}
                comment={comment}
                />)
              )}
            </div>
          </div>
          }
          <div className="my-2 d-flex flex-wrap justify-content-between p-0 mx-lg-2 my-0 gap-2">
            {isAuth &&
            <ModalNewComment />
            }
            {review.comments.length > commentsCount &&
            <button className="btn btn-secondary col-4 col-md-5 col-lg-4" onClick={handleMoreComment}>Показать еще...</button>
            }
            {review.comments.length > COMMENTS_STEP &&
            <button className="btn btn-secondary col-2 col-sm-1 m-0 p-0" onClick={scrollOnTop} alt="Наверх" title="К верху страницы">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"></path>
              </svg>
            </button>
            }
          </div>
        </div>  
      </div>
    </div>
  )
}

export default FullReview;