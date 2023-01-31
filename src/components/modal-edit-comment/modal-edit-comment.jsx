import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { correctComment, getFullReview } from '../../redux/features/features';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { PencilIcon } from '../icons/icons';

const ModalEditComment = ({comment}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [textComment, setTextComment] = useState(comment.textComment);
  const idReview = useSelector((state) => state.fullReview.fullReview._id);
  const [textCommentDirty, setTextCommentDirty] = useState(false);
  const [textCommentError, setTextCommentError] = useState('');
  const [formValid, setFormValid] = useState(true);

  const handleClose = () => {
    setShow(false);
    setTextComment(comment.textComment);
    setTextCommentDirty(false);
    setFormValid(true);
    setTextCommentError('');
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
        <PencilIcon/>
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
              {(textCommentDirty && textCommentError) && <div className="mb-2 mx-2 text-danger">{textCommentError}</div>}
                <Form.Control
                  as="textarea" 
                  rows={5}
                  placeholder="Оставьте здесь комментарий"
                  autoFocus
                  className="text-dark"
                  name='textComment'
                  value={textComment}
                  onBlur={(event) => blurHandler(event)}
                  onChange={(event) => textCommentHandler(event)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="text-dark">

            <Button variant="outline-secondary" onClick={handleCorrectComment} disabled={!formValid}>
              Сохранить
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ModalEditComment;