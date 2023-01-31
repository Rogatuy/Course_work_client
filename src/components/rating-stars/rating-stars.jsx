import { MAX_RATING_STARS } from "../../const";
import { getRatingReview } from "../../utils/utils";
import { StarFillIcon, StarEmptyIcon } from "../icons/icons";

const RatingStars = ({allRating}) => {
  const averageRating = getRatingReview(allRating);
  const starsFill = [];
  const starsEmpty = [];
  for (let i = 0; i < averageRating; i++) {
    starsFill.push(i);
  }
  for (let i = 0; i < MAX_RATING_STARS-starsFill.length; i++) {
    starsEmpty.push(i);
  }

  return (
    <>
    {starsFill.map((item) => (
      <StarFillIcon
        key={item}
        />
    ))}
        {starsEmpty.map((item) => (
      <StarEmptyIcon
        key={item}
        />
    ))}
    </>
  )
}

export default RatingStars;