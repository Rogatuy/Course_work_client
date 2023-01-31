import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';

import { formValidate, GRADE_VALUES, groupHobbies } from '../../const';
import './modal-edit-review.scss';
import { BasketIcon, PencilIcon, PlusIcon } from '../icons/icons';
import { correctReview, deleteUrl, uploadImage } from '../../redux/features/features';

const ModalEditReview = ({review}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(review.title);
  const [titleDirty, setTitleDirty] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [nameOfPiece, setNameOfPiece] = useState(review.nameOfPiece);
  const [nameOfPieceDirty, setNameOfPieceDirty] = useState(false);
  const [nameOfPieceError, setNameOfPieceError] = useState('');
  const [group, setGroup] = useState(review.group);
  const [grade, setGrade] = useState(review.grade);
  const [text, setText] = useState(review.text);
  const [textDirty, setTextDirty] = useState(false);
  const [textError, setTextError] = useState('');
  const [formValid, setFormValid] = useState(false);
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
    setTitleDirty(false);
    setNameOfPieceDirty(false);
    setTextDirty(false);
    setFormValid(true);
    setTitleError('');
    setNameOfPieceError('');
    setTextError('');
    dispatch(deleteUrl());
  }

  const handleShow = () => {
    setShow(true);
  }

  const blurHandler = (event) => {
    switch(event.target.name) {
      case `${formValidate.title}`:
        setTitleDirty(true);
        break;
      case `${formValidate.nameOfPiece}`:
        setNameOfPieceDirty(true);
        break;
      case `${formValidate.text}`:
        setTextDirty(true);
        break;
      default:
        break;
    }
  }

  const titleHandler = (event) => {
    setTitle(event.target.value);
    const re = /[^\s]/;
    const inputText = String(event.target.value);
    if (!event.target.value || !re.test(inputText)) {
        setTitleError('Заголовок не может быть пустым')
      } else {
        if (event.target.value.length < 5) {
          setTitleError('Не менее 5 символов в поле')
      } else {
        setTitleError('');
      }
    }
  }

  const nameOfPieceHandler = (event) => {
    setNameOfPiece(event.target.value);
    const re = /[^\s]/;
    const inputText = String(event.target.value);
    if (!event.target.value || !re.test(inputText)) {
      setNameOfPieceError('Название произведения не может быть пустым')
      } else {
        if (event.target.value.length < 1) {
          setNameOfPieceError('Не менее 1 символа в поле')
      } else {
        setNameOfPieceError('');
      }
    }
  }

  const textHandler = (event) => {
    setText(event.target.value);
    const re = /[^\s]/;
    const inputText = String(event.target.value);
    if (!event.target.value || !re.test(inputText)) {
      setTextError('Содержание отзыва не может быть пустым')
      } else {
        if (event.target.value.length < 10) {
          setTextError('Не менее 10 символов в поле');
      } else {
        setTextError('');
      }
    }
  }

  useEffect(() => {
    if(titleError || nameOfPieceError || textError || isImageUpload) {
      setFormValid(false)} else {
        setFormValid(true);
      }
  }, [isImageUpload, nameOfPieceError, textError, titleError]);

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
        <PencilIcon/>
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
                      {GRADE_VALUES.map((element, index) => (
                        <option key={index}>{element}</option>
                      ))}
                    </Form.Select>      
                </Form.Group>
              </div>
              <Form.Group className="mb-3 w-2">
                {(titleDirty && titleError) && <div className="mb-1 mx-2 text-danger">{titleError}</div>}
                <Form.Control
                  type="text"
                  autoFocus
                  placeholder="Заголовок"
                  name="titleReview"
                  value={title}
                  onChange={(event) => titleHandler(event)}
                  onBlur = {(event) => blurHandler(event)}
                />
              </Form.Group>
              <Form.Group className="mb-3 w-2">
                {(nameOfPieceDirty && nameOfPieceError) && <div className="mb-1 mx-2 text-danger">{nameOfPieceError}</div>}
                <Form.Control
                  type="text"
                  placeholder="Название произведения"
                  name="nameOfPieceReview"
                  value={nameOfPiece}
                  onBlur = {(event) => blurHandler(event)}
                  onChange={(event) => nameOfPieceHandler(event)}
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
                    <BasketIcon/>
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
                    <PlusIcon/>
                  </Button>
                </div>
              </Form.Group>
              <Form.Group className="w-2">
                {(textDirty && textError) && <div className="mb-1 mx-2 text-danger">{textError}</div>}
                <Form.Control
                  as="textarea" 
                  rows={3}
                  type="text"
                  placeholder="Текст отзыва"
                  name="textReview"
                  value={text}
                  onBlur = {(event) => blurHandler(event)}
                  onChange={(event) => textHandler(event)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleEditReview} disabled={!formValid}>
              Редактировать отзыв
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default ModalEditReview;