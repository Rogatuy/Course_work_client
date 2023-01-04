import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getFullReview, addComment } from '../../redux/features/fullReview/fullReviewSlice';

const ModalNewComment = () => {
  const dispatch = useDispatch();

  const idReview = useSelector((state) => state.fullReview.fullReview._id);
  const name = useSelector((state) => state.auth.name);
  const [show, setShow] = useState(false);
  const [textComment, setTextComment] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          </Modal.Header>
          <Modal.Body className="text-dark">
            <Form>
              <Form.Group className="mb-3 w-2" controlId="modalCommentForm.ControlInput1">
                <Form.Control
                  type="text"
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
            <Button variant="outline-danger" onClick={handleClose}>
              Закрыть
            </Button>
            <Button variant="outline-secondary" onClick={handleAddComment}>
              Добавить комментарий
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default ModalNewComment;