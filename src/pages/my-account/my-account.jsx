import React, { useEffect, useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CardAccount from '../../components/card-account/card-account';
import ModalNewReview from '../../components/modal-new-review/modal-new-review';
import LoadingScreen from '../loading-screen/loading-screen';
import Pagination from '../../components/pagination/pagination';

import { toast } from 'react-toastify';
import { AppRoute, REVIEWS_PER_PAGE } from '../../const';
import { getReviewsPagination, scrollOnTop } from '../../utils/utils';
import { changePaginationMyAccount, checkIsAuth, getMyReviews } from '../../redux/features/features';

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myName = useSelector((state) => state.auth.name);
  const myReviews = useSelector(state => state.myReviews.myReviews);
  const currentPagination = useSelector(state => state.pagination.paginationMyAccount);
  const isDataLoading = useSelector(state => state.myReviews.isLoading);
  const isAuth = useSelector(checkIsAuth);
  const [pagination, setPagination] = useState(currentPagination);

  useEffect(() => {
    document.title = "Личный кабинет";
  },[]);  

  useEffect(() => {
    if(!isAuth) {
      toast('You need login');
      navigate(`${AppRoute.Login}`);
    };
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(getMyReviews({name: myName}));
  }, [dispatch, myName])

  useEffect(() => {
    dispatch(changePaginationMyAccount(pagination))
  }, [dispatch, pagination])

  const currentReviews = getReviewsPagination(myReviews, currentPagination);

  const changePagination = (element) => {
    setPagination(element);
    scrollOnTop();
  }

  if (isDataLoading) {
    return <LoadingScreen/>; 
  }

  return (
    <div className='container'>
      <ModalNewReview />
        <div className='row d-flex flex-wrap flex-md-column justify-content-center gap-4'>
          { myReviews.length !== 0 ? (
          <>
          {currentReviews.map((review, index) => (
            <CardAccount 
            key={index}
            review={review}
            />
          ))}
          {myReviews.length > REVIEWS_PER_PAGE &&
            <Pagination
            reviews={myReviews}
            changePagination={changePagination}
            activeButton={currentPagination}
            />
          }
          </> ) : (
          <>
            <h3 className="text-secondary my-3 text-center">Вы не оставили ни одного отзыва</h3>
          </>
          )}
        </div>
    </div>
  );
}

export default MyAccount;
