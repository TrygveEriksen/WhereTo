import React, { useEffect, useState } from "react";
import "./DescriptionReview.css";
import { API } from "../../../API/API";
import Loading from "../../Loading/Loading";
import StarRating from "../../StarRating/StarRating";

function DescriptionReview(props) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [props.destinationId]);

  const load = async () => {
    const link = `/review/destination/${props.destinationId}`;
    const reviewRes = await API.get(link);

    if (reviewRes && reviewRes.data) {
      setReviews(reviewRes.data);
      return setLoading(false);
    } else {
      setReviews([]);
    }
  };

  return (
    <div className="descriptionReviews">
      <h1>Vurderinger</h1>
      {isLoading && <Loading />}
      <ul className="reviewUl">
        {reviews.map((review) => (
          <li className="oneDestination" key={review._id}>
            <div className="userHeader">
              <img
                src="/images/SVG/mypage.svg"
                alt="profilepicture"
                className="userImage"
              />

              <div className="starUsernameDate">
                <p className="username">{review.user.username}</p>

                <div className="starDate">
                  <StarRating stars={review.stars} />
                  <p className="date">
                    {new Date(review.timestamp).toLocaleString('en-GB')}
                  </p>
                </div>
              </div>
            </div>

            <div className="reviewContent">
              {review.title && <h3 className="">{review.title}</h3>}
              {review.comment && <p className="">{review.comment}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DescriptionReview;
