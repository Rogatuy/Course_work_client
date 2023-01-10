import React from 'react';
import { REVIEWS_PER_PAGE } from '../../const';

const Pagination = ({reviews, changePagination, activeButton}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / REVIEWS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="text-center text-md-end">
        { pageNumbers.map((element) => (
          <button
          key={element}
          className={`btn btn-sm ${activeButton === element ? `btn-secondary` : `btn-outline-secondary`} mx-1 mb-4`}
          value={element}
          onClick={() => changePagination(element)}
          >
          {element}
          </button>
        ))}
    </div>
  )
}

export default Pagination;