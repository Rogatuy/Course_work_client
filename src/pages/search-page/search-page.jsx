import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePaginationSearch, getAllReviews } from '../../redux/features/features';
import Card from '../../components/card/card';
import Pagination from '../../components/pagination/pagination';
import LoadingScreen from '../loading-screen/loading-screen';
import { CrossIcon } from '../../components/icons/icons';
import { REVIEWS_PER_PAGE } from '../../const';
import { getReviewsPagination, isInputEmpty, scrollOnTop } from '../../utils/utils';

const SearchPage = () => {
  const dispatch = useDispatch();
  const currentPagination = useSelector(state => state.pagination.paginationSearch);
  const allReviews = useSelector(state => state.allReviews.allReviews);
  const isReviewsLoading = useSelector(state => state.allReviews.isLoading);
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState(currentPagination);

  const filteredReview = allReviews.filter((review) => {
    if (!isInputEmpty(searchInput)) {
      if (review.title.toLowerCase().includes(searchInput.toLowerCase())) return true;
      if (review.name.toLowerCase().includes(searchInput.toLowerCase())) return  true;
      if (review.nameOfPiece.toLowerCase().includes(searchInput.toLowerCase())) return true;
      if (review.text.toLowerCase().includes(searchInput.toLowerCase())) return true;
      
      for (let i = 0; i < review.tags.length; i++ ) {
        if( review.tags[i].toLowerCase().includes(searchInput.toLowerCase())) {
          return true;
        };
      }

      for (let i = 0; i < review.comments.length; i++ ) {
        if( review.comments[i].textComment.toLowerCase().includes(searchInput.toLowerCase())) {
          return true;
        };
      }    
    }
    return false;
  });

  const currentSearchReviews = filteredReview;
  const currentReviews = getReviewsPagination(currentSearchReviews, currentPagination);

  useEffect(() => {
    dispatch(getAllReviews())
   }, [dispatch])

  useEffect(() => {
    document.title = "Поиск";
  }, [] )

  useEffect(() => {
    dispatch(changePaginationSearch(pagination))
  }, [dispatch, pagination])

  const changePagination = (element) => {
    setPagination(element);
    scrollOnTop();
  }
  
  if (isReviewsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='container'>
      <div className="col col-sm-8 col-lg-6 col-xl-4 mx-auto">
        <div className="input-group mt-5 mb-3 col-6">
          <input 
          type="text" 
          className="form-control" 
          placeholder="Текст поиска"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}/>
          <button 
          className="btn btn-outline-secondary" 
          type="button"
          onClick={() => setSearchInput('')}
          title="Очистить"
          alt="Clean input">
            <CrossIcon/>
          </button>
        </div>
      </div>
      <div>
        <div className='row d-flex flex-wrap flex-md-column justify-content-center gap-4'>
          <div className='col'>
          {(currentReviews.length === 0 && !isInputEmpty(searchInput))  &&
            <div className="container">
              <h4 className="col-9 text-dark text-center mx-auto">Нет совпадений</h4>
            </div>
          }
          {currentReviews.map((review) => (
            <Card
            key={review._id}
            review={review}
            />
          ))}
          </div>
            {currentSearchReviews.length > REVIEWS_PER_PAGE &&
            <Pagination
            reviews={currentSearchReviews}
            changePagination={changePagination}
            activeButton={currentPagination}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default SearchPage;