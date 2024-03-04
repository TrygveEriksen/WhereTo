const {
    findAllReviewsByDID,
    findAllReviewsByUID,
    createReview,
    deleteReview,
    updateReview
  } = require("../controllers/reviewController");
  
  const { Router } = require("express");
  const reviewRouter = Router();
  
  reviewRouter.get("/destination/:id", findAllReviewsByDID);
  reviewRouter.get("/user/:id", findAllReviewsByUID);
  reviewRouter.post("/", createReview)
  reviewRouter.delete("/delete/:id", deleteReview);
  reviewRouter.put("/update/:id", updateReview);
  
  module.exports = { reviewRouter };
  