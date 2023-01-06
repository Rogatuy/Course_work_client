import { gradeGradation, gradeClassNameFullReview, gradeClassNameCard } from "../const";

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

