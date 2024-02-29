const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "destinations",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

const ReviewModel = mongoose.model("reviews", ReviewSchema);
module.exports = ReviewModel;
