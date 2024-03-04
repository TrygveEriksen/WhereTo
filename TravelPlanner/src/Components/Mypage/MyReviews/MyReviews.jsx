import React, { useEffect, useState } from "react";
import "../Mypage.css";
import "./MyReviews.css";
import { API } from "../../../API/API";
import Loading from "../../Loading/Loading";
import StarRating from "../../StarRating/StarRating";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import EditReview from "./EditReview";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../../Descriptions/NewReview/NewReview.css";

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
    console.log("submit");

    // if (stars < 1 || stars > 5) {
    //   setErrorMessage("Du må velge antall stjerner");
    //   return;
    // }

    // setErrorMessage("");
    // setComment("");
    // setStars(0);
    // setTitle("");

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
  }, [props.userId, reviewToEdit, stars, comment, title]);

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
              <EditIcon onClick={() => handleEditing(review)} />
            </div>
            <div className="reviewContent">
              {review.title && <h3>{review.title}</h3>}
              {review.comment && <p>{review.comment}</p>}
            </div>
          </li>
        ))}
        {/* <EditReview {...{ open, handleClose, handleDelete, reviewToEdit }} /> */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Rediger din vurdering</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form onSubmit={handleSubmit} className="newReviewForm">
                <div className="starRating">
                  <input
                    type="radio"
                    id="star1"
                    name="rating"
                    className="starCheckbox"
                    value="1"
                    onChange={handleStars}
                    checked={false}
                  />
                  <label
                    htmlFor="star1"
                    className={"fa fa-star " + (stars > 0 ? "filled" : "empty")}
                  ></label>
                  <input
                    type="radio"
                    id="star2"
                    name="rating"
                    className="starCheckbox"
                    value="2"
                    onChange={handleStars}
                    checked={false}
                  />
                  <label
                    htmlFor="star2"
                    className={"fa fa-star " + (stars > 1 ? "filled" : "empty")}
                  ></label>
                  <input
                    type="radio"
                    id="star3"
                    name="rating"
                    className="starCheckbox"
                    value="3"
                    onChange={handleStars}
                    checked={false}
                  />
                  <label
                    htmlFor="star3"
                    className={"fa fa-star " + (stars > 2 ? "filled" : "empty")}
                  ></label>
                  <input
                    type="radio"
                    id="star4"
                    name="rating"
                    className="starCheckbox"
                    value="4"
                    onChange={handleStars}
                    checked={false}
                  />
                  <label
                    htmlFor="star4"
                    className={"fa fa-star " + (stars > 3 ? "filled" : "empty")}
                  ></label>
                  <input
                    type="radio"
                    id="star5"
                    name="rating"
                    className="starCheckbox"
                    value="5"
                    onChange={handleStars}
                    checked={false}
                  />
                  <label
                    htmlFor="star5"
                    className={"fa fa-star " + (stars > 4 ? "filled" : "empty")}
                  ></label>
                </div>

                <label className="descriptionLabel" htmlFor="title">
                  Tittel:
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Tittel"
                  value={title}
                  onChange={handleTitleChange}
                  className="newReviewInput"
                ></input>

                <label className="descriptionLabel" htmlFor="description">
                  Beskrivelse:
                </label>
                <textarea
                  id="description"
                  placeholder="Beskriv din erfaring med dette stedet"
                  value={comment}
                  onChange={handleCommentChange}
                  className="descriptionInput"
                  rows={5}
                ></textarea>
                {/* <p>{reviewToEdit.stars}</p> */}

                <input type="submit" className="submitBtn" value="Oppdater" />
              </form>
            </DialogContentText>
          </DialogContent>
          <Button onClick={() => handleDelete(reviewToEdit._id)}>Slett</Button>
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
      </ul>
    </div>
  );
}

export default MyReviews;
