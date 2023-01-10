import { gradeGradation, gradeClassNameFullReview, gradeClassNameCard, sortOrderSettings, sortTypeSettings, REVIEWS_PER_PAGE } from "../const";
import dayjs from "dayjs";

export const getColorFullReview = (grade) => {
  if (grade <= gradeGradation.Bad) {
    return gradeClassNameFullReview.Bad;
  } else {
    if (grade <= gradeGradation.Normal) {
      return gradeClassNameFullReview.Normal;
    } else {
      return gradeClassNameFullReview.Good;
    }
  }
}

export const getColorCard = (grade) => {
  if (grade <= gradeGradation.Bad) {
    return gradeClassNameCard.Bad;
  } else {
    if (grade <= gradeGradation.Normal) {
      return gradeClassNameCard.Normal;
    } else {
      return gradeClassNameCard.Good;
    }
  }
}

export const scrollOnTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const getAllLikes = (data, name) => {
  const currentData = data.filter((element) => element.name === name);

  const totalLikes = currentData.reduce(function (total, element) {
    return total + element.likes.length;
  }, 0);

  return totalLikes;
}

export const getTagsSet = (data) => {
  let tags = [];
  data.forEach((element) => {
    element.tags.forEach((tag) => {
      tags.push(tag);
    })    
  })
  
  return Array.from(new Set(tags));
}

export const getFilterTagReviews = (tags, reviews) => {
  if (tags.length === 0) {return reviews};
  const filteredReviews = reviews.filter((element) => {
    let itContains = true;
    tags.forEach((tag) => {
      if (element.tags.indexOf(tag) < 0) {
        itContains = false;
      }
    });
    return itContains;
  })

  return filteredReviews;
}

export const getRatingReview = (ratings) => {
    if(ratings.length === 0) {
      return 0;
    }
  
    const initialValue = 0;
    const sumRating = ratings.reduce((sumRating, item) => sumRating + item.rating, initialValue);
    const averageRating = Math.round(sumRating/ratings.length);

    return averageRating;
}


export const getSortReviews = (reviews, sortParameter, order) => {
  let dataEnd = [];
  if (order !== sortOrderSettings.up && order !== sortOrderSettings.down) {
    return reviews;
  }

  if (order === sortOrderSettings.down) {
    switch (sortParameter) {
      case sortTypeSettings.date:
        dataEnd = reviews.slice().sort((a, b) => (dayjs(b.createDate) - dayjs(a.createDate)));
        break;
      case sortTypeSettings.rating:
        dataEnd = reviews.slice().sort((a, b) => getRatingReview(b.ratings) - getRatingReview(a.ratings));
        break;
      default:
        dataEnd = reviews;
    }
    return dataEnd;
  }

  if (order === sortOrderSettings.up) {
    switch (sortParameter) {
      case sortTypeSettings.date:
        dataEnd = reviews.slice().sort((a, b) => (dayjs(a.createDate) - dayjs(b.createDate)));
        break;
      case sortTypeSettings.rating:
        dataEnd = reviews.slice().sort((a, b) => getRatingReview(a.ratings) - getRatingReview(b.ratings));
        break;
      default:
        dataEnd = reviews;
    }
    return dataEnd;
  }
}

export const isInputEmpty = (str) => {
  if (str.trim() == '') 
    return true;
    
  return false;
}

export const getReviewsPagination = (reviews, pagination) => {
  const lastReviewsIndex = pagination * REVIEWS_PER_PAGE;
  const firstReviewIndex = lastReviewsIndex - REVIEWS_PER_PAGE;
  return reviews.slice(firstReviewIndex, lastReviewsIndex);
}

