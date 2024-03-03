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
  title: {
    type: String,

  },
  comment: {
    type: String,

  },
  stars: {
    type: Number,
    required: true,
  },
  timestamp: { type: Date, default: Date.now } 
});

const ReviewModel = mongoose.model("reviews", ReviewSchema);
module.exports = ReviewModel;
