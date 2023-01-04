import { gradeGradation, gradeClassName } from "../const";

export const getColorReview = (grade) => {
  if (grade <= gradeGradation.Bad) {
    return gradeClassName.Bad;
  } else {
    if (grade <= gradeGradation.Normal) {
      return gradeClassName.Normal;
    } else {
      return gradeClassName.Good;
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

