import React, {useState} from 'react';
import { sortOrderSettings, sortTypeSettings, sortCategory } from '../../const';
import { useDispatch } from 'react-redux';

import './sort.scss';
import { ArrowDownIcon, ArrowUpIcon } from '../icons/icons';
import { changeSortOrder, changeSortType } from '../../redux/features/features';


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
          <ArrowUpIcon/>
        </button>
        <button 
          className={`btn btn-sm my-1 ms-2 ${sortOrder === sortOrderSettings.down ? 'btn-secondary button-sort-active' : 'btn-outline-secondary'}`}
          id={sortOrderSettings.down}
          onClick={() => handleSortOrder(sortOrderSettings.down)}
        >
          <ArrowDownIcon/>
        </button>
      </div>
    </div>
  )
}

export default Sort;