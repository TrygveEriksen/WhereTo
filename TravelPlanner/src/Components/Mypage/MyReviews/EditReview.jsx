import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";

function EditReview({
  open,
  handleClose,
  handleStars,
  handleTitleChange,
  handleCommentChange,
  handleSubmit,
  handleDelete,
  stars,
  title,
  comment,
  reviewToEdit,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <ClearIcon onClick={handleClose} />
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
              <input type="submit" className="submitBtn" value="Oppdater" />
              <input
                type="submit"
                className="submitBtn"
                value="Slett"
                onClick={() => handleDelete(reviewToEdit._id)}
              />
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditReview;
