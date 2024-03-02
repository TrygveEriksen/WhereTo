const {
    findAllReviewsByDID,
    findAllReviewsByUID,
    createReview
  } = require("../controllers/reviewController");
  
  const { Router } = require("express");
  const reviewRouter = Router();
  
  reviewRouter.get("/destination/:id", findAllReviewsByDID);
  reviewRouter.get("/user/:id", findAllReviewsByUID);
  reviewRouter.post("/new", createReview)
  
  module.exports = { reviewRouter };
  