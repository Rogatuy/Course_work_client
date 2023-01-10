import React, {useState} from 'react';
import { sortOrderSettings, sortTypeSettings, sortCategory } from '../../const';
import { useDispatch } from 'react-redux';
import { changeSortOrder, changeSortType } from '../../redux/features/sortReviews/sortReviewsSlice';
import './sort.scss';

const Sort = () => {
  const [sortType, setSortType] = useState(sortTypeSettings.default);
  const [sortOrder, setSortOrder] = useState(sortOrderSettings.default);

  const dispatch = useDispatch();

  const handleSortType = (value) => {
    dispatch(changeSortType(value));
    setSortType(value);
  };

  const handleSortOrder = (value) => {
    if (sortType === sortTypeSettings.default) {
      dispatch(changeSortType(sortTypeSettings.rating));
      setSortType(sortTypeSettings.rating);
    }
    dispatch(changeSortOrder(value));
    setSortOrder(value);
  };

  return (
    <div className="container d-flex flex-row px-0 flex-wrap mt-3 justify-content-end">
      <div className="d-flex flex-row justify-content-start">
        <div className="my-1 me-2 text-start">
          <button
          className={`btn btn-sm ${sortType === sortTypeSettings.rating ? 'btn-secondary button-sort-active' : 'btn-outline-secondary'}`} 
          onClick={() => handleSortType(sortTypeSettings.rating)}            
          >{sortCategory.rating}
          </button>
        </div>
        <div className="my-1 me-2 text-start">
          <button
          className={`btn btn-sm ${sortType === sortTypeSettings.date ? 'btn-secondary button-sort-active' : 'btn-outline-secondary'}`} 
          onClick={() => handleSortType(sortTypeSettings.date)}              
          >{sortCategory.date}
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-end">
        <button 
          className={`btn btn-sm my-1 ms-2 ${sortOrder === sortOrderSettings.up ? 'btn-secondary button-sort-active' : 'btn-outline-secondary'}`}
          id={sortOrderSettings.up}
          onClick={() => handleSortOrder(sortOrderSettings.up)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"></path>
          </svg>
        </button>
        <button 
          className={`btn btn-sm my-1 ms-2 ${sortOrder === sortOrderSettings.down ? 'btn-secondary button-sort-active' : 'btn-outline-secondary'}`}
          id={sortOrderSettings.down}
          onClick={() => handleSortOrder(sortOrderSettings.down)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Sort;