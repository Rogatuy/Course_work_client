import React from 'react'
import classNames from 'classnames';
import { RATING_USER_VALUES } from '../../const';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const FormRatingLikes = ({isAuth, review, rating, handleRatingChange, handleLikeChange, isLike}) => {
  return (
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
  )
}

export default FormRatingLikes;