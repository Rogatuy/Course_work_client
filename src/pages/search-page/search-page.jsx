import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/card';
import Pagination from '../../components/pagination/pagination';
import { REVIEWS_PER_PAGE } from '../../const';
import { isInputEmpty, scrollOnTop } from '../../utils/utils';
import { changePaginationSearch } from '../../redux/features/pagination/paginationSlice';
import { getAllReviews } from '../../redux/features/allReviews/allReviewsSlice';
import LoadingScreen from '../loading-screen/loading-screen';

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
  const lastReviewsIndex = currentPagination * REVIEWS_PER_PAGE;
  const firstReviewIndex = lastReviewsIndex - REVIEWS_PER_PAGE;
  const currentReviews = currentSearchReviews.slice(firstReviewIndex, lastReviewsIndex);

  useEffect(() => {
    dispatch(getAllReviews())
    document.title = "Поиск";
  }, [])

  useEffect(() => {
    dispatch(changePaginationSearch(pagination))
  }, [dispatch, pagination])

  const getPagination = (element) => {
    setPagination(element);
    scrollOnTop();
  }
  
  if (isReviewsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='container'>
      <div className="d-flex col-12 col-md-6 col-xl-4 justify-content-center">
        <div className="input-group mt-3 ">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <div className='row d-flex flex-wrap flex-md-column justify-content-center gap-4'>
          <div className='col'>
          {(currentReviews.length === 0 && !isInputEmpty(searchInput))  &&
            <div className="container mx-auto mt-5 d-flex flex-column justify-content-start">
              <h4 className="col-9 text-start text-dark">Нет совпадений</h4>
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
            getPagination={getPagination}
            activeButton={currentPagination}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default SearchPage;