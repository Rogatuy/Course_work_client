import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { correctReview } from '../../redux/features/myReviews/myReviewsSlice';
import { deleteUrl, uploadImage } from '../../redux/features/uploadImage/uploadImageSlice';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';

import { gradeValues, groupHobbies } from '../../const';
import './modal-edit-review.scss';

const ModalEditReview = ({review}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(review.title);
  const [nameOfPiece, setNameOfPiece] = useState(review.nameOfPiece);
  const [group, setGroup] = useState(review.group);
  const [grade, setGrade] = useState(review.grade);
  const [text, setText] = useState(review.text);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(review.tags);
  const [imageUrl, setImageUrl] = useState(review.image);

  const name = useSelector((state) => state.auth.name);
  const isImageUpload = useSelector((state) => state.uploadImage.isLoading);

  const handleClose = () => {
    setShow(false);
    setTitle(review.title);
    setNameOfPiece(review.nameOfPiece);
    setGroup(review.group);
    setGrade(review.grade);
    setText(review.text);
    setNewTag('');
    setTags(review.tags);
    setImageUrl(review.image);
    dispatch(deleteUrl());
  }

  const handleShow = () => {
    setShow(true);
  }

  const handleAddNewTag = () => {
    if (newTag.length !== 0) {
      if(newTag[0] !== '#') {       
        tags.find((element) => element === `#${newTag}`) ? setTags(tags) : setTags([...tags, `#${newTag}`]);
      } else {
        tags.find((element) => element === `${newTag}`) ? setTags(tags)  : setTags([...tags, newTag]);
      }
      setNewTag('');
    }
  }

  const handeDeleteTag = (event) => {
    setTags(tags.filter((element) => element !== event.target.value))
  }

  const handleAddImage = (event) => {
    const newFile = event.target.files[0];
    dispatch(uploadImage(newFile)).then((url) => setImageUrl(url.payload));
  }

  const handleEditReview = () => {
    dispatch(correctReview({name, title, nameOfPiece, tags, text, group, image: imageUrl, grade, _id: review._id})); 
    setShow(false);
    setTitle(review.title);
    setGroup(review.group);
    setNameOfPiece(review.nameOfPiece);
    setGrade(review.grade);
    setText(review.text);
    setNewTag('');
    setTags(review.tags);
    setImageUrl(review.image);
    dispatch(deleteUrl());
  }

  return (
    <>
      <Button 
      className="btn mx-2"
      variant="outline-secondary"
      onClick={handleShow} 
      id={review._id}
      alt="Edit review"
      title="Редактировать отзыв">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="border border-dark border-3">
          <Modal.Header className="text-dark">
            <CloseButton onClick={handleClose}></CloseButton>
          </Modal.Header>
          <Modal.Body className="text-dark">
            <Form>
              <div className="row">
                <Form.Group className="mb-3 w-2 col">
                  <Form.Label>Группа</Form.Label>
                    <Form.Select 
                    value={group}
                    onChange={(event) => setGroup(event.target.value)}
                    >
                      {Object.keys(groupHobbies).map((element, index) => (
                        <option key={index} id={element} value={element}>{groupHobbies[element]}</option>
                      ))}
                  </Form.Select>      
                </Form.Group>
                <Form.Group className="mb-3 w-2 col">
                  <Form.Label>Оценка</Form.Label>
                    <Form.Select 
                    value={grade}
                    onChange={(event) => setGrade(event.target.value)}
                    >
                      {gradeValues.map((element, index) => (
                        <option key={index}>{element}</option>
                      ))}
                    </Form.Select>      
                </Form.Group>
              </div>
              <Form.Group className="mb-3 w-2">
                <Form.Control
                  type="text"
                  autoFocus
                  placeholder="Заголовок"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 w-2">
                <Form.Control
                  type="text"
                  placeholder="Название произведения"
                  value={nameOfPiece}
                  onChange={(event) => setNameOfPiece(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 w-2">
                <Form.Label>Загрузить новое изображение</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleAddImage}
                />
              </Form.Group>
              <Form.Group>
                {!isImageUpload ? (
                <img src={imageUrl} 
                className="img-thumbnail" 
                alt="preview_photo" 
                width={200}
                height={200}
                /> ) : (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )
                }
              </Form.Group>
              <Form.Group className="mb-3 w-2">
                {tags.length !== 0 ? <Form.Label>Актуальные тэги: </Form.Label> : ''}
                {tags.map((element, i) => (
                  <Button className="m-2 button-secondary" variant="outline-danger" onClick={handeDeleteTag} value={element} key={i}>
                    {`${element} `}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 mb-1" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                    </svg>
                  </Button>
                ))}
              </Form.Group>
              <Form.Group className="my-3 w-2">
                <div className="container p-0 d-flex">
                  <Form.Control
                    type="text"
                    value={newTag}
                    placeholder="Добавить тэг"
                    className="col"
                    onChange={(event) => setNewTag(event.target.value)}
                  />
                  <Button 
                  className="mx-1 col-1" 
                  variant="outline-secondary" 
                  onClick={handleAddNewTag}
                  alt="Add tag"
                  title="Добавить тэг">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"></path>
                    </svg>
                  </Button>
                </div>
              </Form.Group>
              <Form.Group className="w-2">
                <Form.Control
                  as="textarea" 
                  rows={3}
                  type="text"
                  placeholder="Текст отзыва"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleEditReview} disabled={isImageUpload}>
              Редактировать отзыв
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default ModalEditReview;