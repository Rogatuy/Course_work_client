import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import { changeHobbie } from '../../redux/features/activeHobbie/activeHobbieSlice';
import { getAllReviews } from '../../redux/features/allReviews/allReviewsSlice';

import Card from '../../components/card/card';
import LoadingScreen from '../loading-screen/loading-screen';
import { sectionHobbiesValue, AppRoute } from '../../const';

const MainPage = () => {
  const currentHobbie = useSelector(state => state.activeHobbie.selectedHobbie);
  const allReviews = useSelector(state => state.allReviews.allReviews);
  const isReviewsLoading = useSelector(state => state.allReviews.isLoading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch])

  useEffect(() => {
    dispatch(changeHobbie(currentHobbie));
  }, [currentHobbie, dispatch])
    
  let data;
  if (currentHobbie !== sectionHobbiesValue.All) {
    data = allReviews.filter((element) => element.group === currentHobbie)
  } else {
    data = allReviews;
  }

  if (isReviewsLoading) {
    return <LoadingScreen />;
  }

  if (data.length === 0) {
    return (
    <div className="container mx-auto mt-5 d-flex flex-column justify-content-center">
      <h4 className="col-9 text-center text-dark mx-auto">Пока что в этом разделе нет отзывов</h4>
      <Link 
      type="button" 
      className="btn btn-secondary col mt-3 mx-auto text-center"
      to={AppRoute.Main}
      onClick={() => dispatch(changeHobbie(sectionHobbiesValue.All))}
      >
        На главную
      </Link>
    </div>
    )
  }

  return (
      <div className='container'>
        <div className='row d-flex flex-wrap flex-md-column justify-content-center gap-4'>
          <div className='col'>
          {data.map((review) => (
            <Card
            key={review._id}
            review={review}
            />
          ))}
          </div>
        </div>
      </div>
   );
}

export default MainPage;