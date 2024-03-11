const {
  findAllReviewsByDID,
  findAllReviewsByUID,
  createReview,
  deleteReview,
  updateReview,
  findReviewByUD,
  deleteAllByDestination
} = require("../controllers/reviewController");

const { Router } = require("express");
const reviewRouter = Router();

reviewRouter.get("/destination/:id", findAllReviewsByDID);
reviewRouter.get("/user/:id", findAllReviewsByUID);
reviewRouter.post("/", createReview)
reviewRouter.delete("/delete/:id", deleteReview);
reviewRouter.put("/update/:id", updateReview);
reviewRouter.get("/:id", findReviewByUD);
reviewRouter.delete("/bydestination/:id", deleteAllByDestination)

module.exports = { reviewRouter };
