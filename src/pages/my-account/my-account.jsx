import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMyReviews } from '../../redux/features/myReviews/myReviewsSlice';

import CardAccount from '../../components/card-account/card-account';
import ModalNewReview from '../../components/modal-new-review/modal-new-review';
import LoadingScreen from '../loading-screen/loading-screen';
import { checkIsAuth } from '../../redux/features/auth/authSlice';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myName = useSelector((state) => state.auth.name);
  const myReviews = useSelector(state => state.myReviews.myReviews);
  const isDataLoading = useSelector(state => state.myReviews.isLoading);
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if(!isAuth) {
      toast('You need login');
      navigate(`${AppRoute.Login}`);
    };
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(getMyReviews({name: myName}));
  }, [dispatch, myName])

  if (isDataLoading) {
    return <LoadingScreen/>; 
  }

  return (
    <div className='container'>
      <ModalNewReview />
        <div className='row d-flex flex-wrap flex-md-column justify-content-center gap-4'>
          { myReviews.length !== 0 ? (
          <>
          {myReviews.map((review, index) => (
            <CardAccount 
            key={index}
            review={review}
            />
          ))}
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
