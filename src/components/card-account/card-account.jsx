import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../redux/features/features';
import { BasketIcon } from '../icons/icons';
import Card from '../card/card';
import ModalEditReview from '../modal-edit-review/modal-edit-review';

const CardAccount = ({review}) => {
  const dispatch = useDispatch();  
  const name = useSelector((state) => state.auth.name);

  const handleDeleteReview = () => {
    dispatch(deleteReview({name, _id: review._id})); 
  }
  
  return (
    <>
    <div className="col">
      <div className="col d-flex flex-row justify-content-end col-md-12">
        <ModalEditReview
          review={review}
        />
        <button 
        className="btn btn-outline-danger mx-2" 
        id={review._id}
        onClick={handleDeleteReview}
        alt="Delete review"
        title="Удалить отзыв">
          <BasketIcon/>
        </button>
      </div>
      <Card
      key={review._id}
      review={review}
      />
    </div>
  </>
  )
}

export default CardAccount;