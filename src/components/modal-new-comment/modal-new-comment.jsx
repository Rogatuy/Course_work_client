import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFullReview, addComment } from '../../redux/features/fullReview/fullReviewSlice';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';

const ModalNewComment = () => {
  const dispatch = useDispatch();

  const idReview = useSelector((state) => state.fullReview.fullReview._id);
  const name = useSelector((state) => state.auth.name);
  const [show, setShow] = useState(false);
  const [textComment, setTextComment] = useState('');
  const [textCommentDirty, setTextCommentDirty] = useState(false);
  const [textCommentError, setTextCommentError] = useState('Комментарий не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTextComment('');
    setTextCommentDirty(false);
    setFormValid(false);
    setTextCommentError('Комментарий не может быть пустым');
  }

  const handleShow = () => setShow(true);

  const blurHandler = (event) => {
    if (event.target.name === 'textComment') {
      setTextCommentDirty(true);
    }
  }

  const textCommentHandler = (event) => {
    setTextComment(event.target.value);
    const re = /[^\s]/;
    const inputText = String(event.target.value);
    if (!event.target.value || !re.test(inputText)) {
      setTextCommentError('Комментарий не может быть пустым')
      } else {
        if (event.target.value.length < 3) {
          setTextCommentError('Не менее 3 символов в поле')
      } else {
        setTextCommentError('');
      }
    }
  }

  useEffect(() => {
    if(textCommentError) {
      setFormValid(false)} else {
        setFormValid(true);
      }
  }, [textCommentError]);

  const handleAddComment = () => {
    const text = textComment;
    dispatch(addComment({name, textComment: text, _id: idReview}))
    dispatch(getFullReview({_id: idReview}));
    setShow(false);
    setTextComment('');
  }

  return (
    <>
      <Button className="btn btn-secondary col-7 col-sm-4 col-md-5 col-lg-4" variant="secondary" onClick={handleShow}>
        Комментировать
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="border border-dark border-3">
          <Modal.Header className="text-dark">
            <Modal.Title>Новый комментарий</Modal.Title>
            <CloseButton onClick={handleClose}></CloseButton>
          </Modal.Header>
          <Modal.Body className="text-dark">
            <Form>
              <Form.Group className="mb-3 w-2">
              {(textCommentDirty && textCommentError) && <div className="mb-2 mx-2 text-danger">{textCommentError}</div>}
                <Form.Control
                  type="text"
                  placeholder="Оставьте здесь комментарий"
                  name="textComment"
                  autoFocus
                  className="text-dark"
                  value={textComment}
                  onBlur={(event) => blurHandler(event)}
                  onChange={(event) => textCommentHandler(event)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="text-dark">
            <Button variant="outline-secondary" onClick={handleAddComment} disabled={!formValid}>
              Добавить
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ModalNewComment;