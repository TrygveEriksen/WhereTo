const { default: mongoose } = require("mongoose");
const ReviewModel = require("../models/Review");

const findAllReviewsByDID = async (req, res) => {

};

const findAllReviewsByUID = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(200).json([]);
      }
    const reviews = await ReviewModel
                        .find({user:userId})
                        .populate("destination")
                        .select("destination comment stars")
                                         
    res.json(reviews);
  }
  catch(error){
    //server error om du kommer hit
    res.status(500).json({error:error.message});
  }

}

const createReview = async (req, res) => {
    try {
        const newReview = new ReviewModel(req.body);
        const savedReview = await newReview.save()
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({message: error.message})
    }


}

module.exports = { findAllReviewsByDID, findAllReviewsByUID, createReview };
