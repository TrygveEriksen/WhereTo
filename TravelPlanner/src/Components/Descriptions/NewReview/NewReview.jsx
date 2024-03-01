import React, { useEffect, useState } from "react";
import "./NewReview.css";
import Loading from "../../Loading/Loading";
import { API } from "../../../API/API";

function NewReview(props) {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [destination, setDestination] = useState(props.destinationId);

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setDestination(props.destinationId);
  }, [props.destinationId]);

  const load = async () => {
    setLoading(false);
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

    if (stars < 1 || stars > 5) {
      setErrorMessage("Du må velge antall stjerner");
      return;
    }

    setErrorMessage("");


    try {
      const response = await API.post("/review/new", {
        title,
        comment,
        destination,
        stars,
      });
        //if there is a callback, run it (for refreshing the reviews on the page)
        props.onReviewSubmit?.();
      
    }catch (error) {
      setErrorMessage("Noe gikk galt, prøv igjen");
    }

  };

  return (
    <div className="newReview">
      <h1>Ny vurderinger</h1>
      {isLoading && <Loading />}

      <form onSubmit={handleSubmit} className="newDestinationForm">
        <div className="starRating">
          <input
            type="radio"
            id="star1"
            name="rating"
            className="starCheckbox"
            value="1"
            onChange={handleStars}
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
          />
          <label
            htmlFor="star5"
            className={"fa fa-star " + (stars > 4 ? "filled" : "empty")}
          ></label>
        </div>

        <input
          type="text"
          id="title"
          placeholder="Tittel"
          onChange={handleTitleChange}
          className="newDestinationInput"
        ></input>

        <label className="loginLabel" htmlFor="description">
          Beskrivelse:
        </label>
        <textarea
          id="description"
          placeholder="Beskriv din erfaring med dette stedet"
          value={comment}
          onChange={handleCommentChange}
          className="descriptionInput"
        ></textarea>

        <input type="submit" value="submit" />
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default NewReview;
