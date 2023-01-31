import React from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getFullReview } from '../../redux/features/features';
import ModalEditComment from '../modal-edit-comment/modal-edit-comment';
import { BasketIcon } from '../icons/icons';

const Comment = ({comment}) => {
  const dispatch = useDispatch();
  const idReview = useSelector((state) => state.fullReview.fullReview._id);
  const authorAuth = useSelector((state) => state.auth.name);
  const currentDate = dayjs(comment.createDate).format('HH:mm MM-DD-YYYY');

  const handleDeleteComment = () => {
    dispatch(deleteComment({userId: idReview, _id: comment._id}))
    dispatch(getFullReview({_id: idReview}));
  }

  return (
    <div className="comment d-flex flex-column p-2 m-0 border-bottom border-dark border-1">
      <div className="my-0 d-flex flex-row justify-content-between">
        <p>{comment.name}</p>
        <p>{currentDate}</p>
      </div>
      <div className="my-1">
        <p className="my-0">{comment.textComment}</p>
      </div>
      {authorAuth === comment.name &&
        <div className="my-1 d-flex flex-row justify-content-end">
          <ModalEditComment comment={comment}/>
          <button 
            className="btn btn-outline-danger col-2 col-lg-1 mx-1" 
            id={comment._id}
            onClick={handleDeleteComment}
            alt="Delete comment"
            title="Удалить комментарий"
            >
            <BasketIcon/>
          </button>
        </div>
      }
    </div>
  )
}

export default Comment;