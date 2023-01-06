import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHobbie } from '../../redux/features/activeHobbie/activeHobbieSlice';
import { getAllLikes, getColorCard } from '../../utils/utils';
import RatingStars from '../rating-stars/rating-stars';

import './card.scss';

const Card = ({review}) => {
  const allReviews = useSelector((state) => state.allReviews.allReviews);
  const likes = getAllLikes(allReviews, review.name);
  const dispatch = useDispatch();

  return (
    <div className={`${getColorCard(review.grade)} card col-8 col-sm-5 col-md-10 px-0 border-2 rounded-0 my-4 flex-md-row`} id={review._id}>
      <div className="container-image col-md-4 d-flex justify-content-center p-3">
        <div className="wrapper-image">
          <img src={review.image} className="preimg card-img-top align-self-center img-fluid rounded-0" alt="preview_photo" />
        </div>
      </div>
      <div className="col">
        <div className="d-flex card-body list-group-card flex-column flex-md-row align-items-center justify-content-md-between">
            <h5 className="card-title text-center text-md-start">{review.title}</h5>
            <div className="col-md-3 col-xl-2 d-flex justify-content-end">
              <RatingStars
                allRating={review.ratings}
              />
            </div>
        </div>     
        <div className="col-md-12 d-flex flex-column">
          <ul className="list-group list-group-flush list-group-card">
            <li className="list-group-item border-0 d-flex flex-row justify-content-center justify-content-md-start">
              <p className="card-text">{review.nameOfPiece}</p></li>
            <li className="list-group-item border-0 d-flex flex-row list-group-card justify-content-center justify-content-md-start">
              <p className="p-2 px-md-0 m-0">Автор: {review.name}</p>
              {likes > 0 &&
              <p className="p-2 m-0 col-3 col-md-2 col-lg-1">
                {likes} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                </svg>
              </p>
              }
              <p className="p-2 m-0">{review.grade}/10</p>
            </li>
            <li className="list-group-item border-0 list-group-card d-flex flex-row justify-content-center justify-content-md-start text-italic"><em>{review.tags.join(' ')}</em></li>
          </ul>
        </div> 
        <div className="card-body d-md-flex text-center justify-content-md-end">
          <Link to={`/${review.group}/${review._id}`}
           className="btn btn-secondary"
           onClick={() => dispatch(changeHobbie(review.group))}
           >Подробнее</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;

