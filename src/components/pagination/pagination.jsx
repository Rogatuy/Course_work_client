import React from 'react';
import { REVIEWS_PER_PAGE } from '../../const';

const Pagination = ({reviews, getPagination, activeButton}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / REVIEWS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  console.log(reviews);
  
  return (
    <div className="text-center text-md-end">
        { pageNumbers.map((element) => (
          <button
          key={element}
          className={`btn btn-sm ${activeButton === element ? `btn-secondary` : `btn-outline-secondary`} mx-1 mb-4`}
          value={element}
          onClick={() => getPagination(element)}
          >
          {element}
          </button>
        ))}
    </div>
  )
}

export default Pagination;