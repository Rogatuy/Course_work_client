import React from 'react'
import classNames from 'classnames';
import { RATING_USER_VALUES } from '../../const';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { LikeEmptyButtonIcon, LikeFillButtonIcon } from '../icons/icons';

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
        <LikeFillButtonIcon/>
      ) : (
        <LikeEmptyButtonIcon/>
      )}
      </Button>
    </Form.Group>
  </Form>
  )
}

export default FormRatingLikes;