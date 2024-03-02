import React, { useEffect, useState } from "react";
import "../Mypage.css";
import "./MyReviews.css";
import { API } from "../../../API/API";
import Loading from "../../Loading/Loading";
import StarRating from "../../StarRating/StarRating";
import { Link } from "react-router-dom";

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
          <Link to={`/descriptions/${review.destination._id}`} className="linkToDestination" key={review._id}>
          <li className="oneDestination" key={review._id}>
            <p className="">{review.destination.place}, {review.destination.country}</p>
            <div className="starDate">
              <StarRating stars={review.stars}/>
              <p className="date">
                    {new Date(review.timestamp).toLocaleString()}
                  </p>
              </div>
              <div className="reviewContent">
              {review.title && <h3>{review.title}</h3>}
              {review.comment && <p>{review.comment}</p>}
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default MyReviews;
