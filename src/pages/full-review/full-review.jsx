import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from '../loading-screen/loading-screen';
import Comment from '../../components/comment/comment';
import RatingStars from '../../components/rating-stars/rating-stars';
import ModalNewComment from '../../components/modal-new-comment/modal-new-comment';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

import { getAllReviews } from '../../redux/features/allReviews/allReviewsSlice';
import { addLike, addRating, getFullReview } from '../../redux/features/fullReview/fullReviewSlice';

import { getColorFullReview, scrollOnTop, getAllLikes } from '../../utils/utils';
import { COMMENTS_STEP, RATING_USER_VALUES } from '../../const';
import classNames from 'classnames';

import './full-review.scss';

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
          <Form className="d-flex flex-row col-12 col-lg-11 col-xl-9 col-xxl-8 justify-content-between">
            {isAuth !== review.name ? (
              <Form.Group className="d-flex col-10 col-sm-7 col-md-5 col-lg-10 flex-row align-items-center">
              <Form.Label className="my-2 col-8">
                {rating ? 'Ваша оценка отзыва' : 'Поставьте оценку'}    
              </Form.Label>
              <Form.Select 
              className="my-2 mx-1"
              value={rating}
              onChange={handleRatingChange}
              >
              {RATING_USER_VALUES.map((element, index) => (
              <option 
              className="bg-darkform-select" 
              key={index} 
              value={element}>{element}</option>
                ))}
              </Form.Select>                           
              </Form.Group>)
            : ('')}
            <Form.Group className="my-2">   
              <Button 
              variant={classNames({'outline-secondary': (!isLike)}, {'secondary': (isLike)})} 
              onClick={handleLikeChange}
              alt={`${!isLike ? 'Add like' : 'Delete like'}`}
              title={`${!isLike ? 'Поставить лайк' : 'Убрать лайк'}`}>
              {isLike ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                </svg>
              )}
              </Button>
            </Form.Group>
          </Form>
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