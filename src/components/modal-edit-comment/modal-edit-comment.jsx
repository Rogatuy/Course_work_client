import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFullReview, correctComment } from '../../redux/features/fullReview/fullReviewSlice';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';

const ModalEditComment = ({comment}) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [textComment, setTextComment] = useState(comment.textComment);
  const idReview = useSelector((state) => state.fullReview.fullReview._id);

  const handleClose = () => {
    setShow(false);
    setTextComment(comment.textComment);
  }
  
  const handleShow = () => setShow(true);

  const handleCorrectComment = () => {
    const text = textComment;
    dispatch(correctComment({userId: idReview, textComment: text, _id: comment._id}))
    dispatch(getFullReview({_id: idReview}));
    setShow(false);
    setTextComment('');
  }

  return (
    <>
      <Button 
      className="btn col-2 col-lg-1 mx-1"
      variant="outline-secondary"
      onClick={handleShow}
      alt="Edit comment"
      title="Редактировать комментарий">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="border border-dark border-3">
          <Modal.Header className="text-dark">
            <Modal.Title>Редактировать комментарий</Modal.Title>
            <CloseButton onClick={handleClose}></CloseButton>
          </Modal.Header>
          <Modal.Body className="text-dark">
            <Form>
              <Form.Group className="mb-3 w-2" controlId="modalCommentForm.ControlInput1">
                <Form.Control
                  as="textarea" 
                  rows={5}
                  placeholder="Оставьте здесь комментарий"
                  autoFocus
                  className="text-dark"
                  value={textComment}
                  onChange={(event) => setTextComment(event.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="text-dark">

            <Button variant="outline-secondary" onClick={handleCorrectComment}>
              Сохранить
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ModalEditComment;