import { useEffect, useState } from "react";
import "../Mypage.css";
import "./MyReviews.css";
import { API } from "../../../API/API";
import Loading from "../../Loading/Loading";
import StarRating from "../../StarRating/StarRating";
import EditIcon from "@mui/icons-material/Edit";
import "../../Descriptions/NewReview/NewReview.css";
import EditReview from "./EditReview";

function MyReviews(props) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [stars, setStars] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [destination, setDestination] = useState("");

  const handleEditing = (review) => {
    setOpen(true);
    setReviewToEdit(review);
    setStars(review.stars);
    setDestination(review.destination);
    if (review.title && review.comment) {
      setTitle(review.title);
      setComment(review.comment);
    } else if (review.title) {
      setTitle(review.title);
    } else if (review.comment) {
      setComment(review.comment);
    } else {
      setComment(null);
      setTitle(null);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStars = (e) => {
    setStars(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/review/update/${reviewToEdit._id}`, {
        title,
        comment,
        destination,
        stars,
      });
      console.log("Review has been updated", reviewToEdit._id);
      handleClose();
      load();
    } catch (error) {
      console.log("Error updating review", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (reviewID) => {
    try {
      API.delete(`/review/delete/${reviewID}`);
      console.log("Review has been deleted", reviewID);

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewID)
      );
      handleClose();
    } catch (error) {
      console.log("Error deleting review:", error);
    }
  };
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
      } else {
        setReviews([]);
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
            <p className="">
              {review.destination.place}, {review.destination.country}
            </p>
            <div className="starDate">
              <StarRating stars={review.stars} />
              <p className="date">
                {new Date(review.timestamp).toLocaleString("en-GB")}
              </p>
              <EditIcon
                className="editIcon"
                onClick={() => handleEditing(review)}
              />
            </div>
            <div className="reviewContent">
              {review.title && <h3>{review.title}</h3>}
              {review.comment && <p>{review.comment}</p>}
            </div>
          </li>
        ))}
        <EditReview
          open={open}
          handleClose={handleClose}
          handleStars={handleStars}
          handleTitleChange={handleTitleChange}
          handleCommentChange={handleCommentChange}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          stars={stars}
          title={title}
          comment={comment}
          reviewToEdit={reviewToEdit}
        />
      </ul>
    </div>
  );
}

export default MyReviews;
