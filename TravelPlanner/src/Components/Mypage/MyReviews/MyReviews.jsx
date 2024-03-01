import React, { useEffect, useState } from "react";
import "../Mypage.css";
import "./MyReviews.css";
import { API } from "../../../API/API";
import Loading from "../../Loading/Loading";
import StarRating from "../../StarRating/StarRating";

function MyReviews(props) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [props.userId]);

  const load = async () => {

    if (props.userId) {
      
      const link = `/review/user/${props.userId}`;
      const reviewRes = await API.get(link);
      
      if (reviewRes && reviewRes.data) {
        setReviews(reviewRes.data);
        return setLoading(false);
      }else{
        setReviews([])
      }
    }
  };

  return (
    
    <div className="myReviews">
      <h1>Mine vurderinger</h1>
      {isLoading && <Loading />}
      <ul className="reviewUl">
        {reviews.map((review) => (
          <li className="oneDestination" key={review._id}>
            <p className="">{review.destination.place}, {review.destination.country}</p>

              <StarRating stars={review.stars}/>
            <p className="">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyReviews;
