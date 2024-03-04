const { default: mongoose } = require("mongoose");
const ReviewModel = require("../models/Review");

const findAllReviewsByDID = async (req, res) => {
  try {
    const destinationId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(destinationId)) {
        return res.status(200).json([]);
      }
    const reviews = await ReviewModel
                        .find({destination:destinationId})
                        .populate("user"," username")
                        .select("user comment stars timestamp title")
                        .sort({timestamp:-1})
                                         
    res.status(200).json(reviews);
  }
  catch(error){
    //server error om du kommer hit
    res.status(500).json({error:error.message});
  }

};

const findAllReviewsByUID = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(200).json([]);
      }
    const reviews = await ReviewModel
                        .find({user:userId})
                        .populate("destination", "place country")
                        .select("destination comment stars timestamp title")
                        .sort({timestamp:-1})
                                         
    res.json(reviews);
  }
  catch(error){
    //server error om du kommer hit
    res.status(500).json({error:error.message});
  }

}

const createReview = async (req, res) => {
    try {

        if (req.user) {
            req.body.user = req.user._id;
          
        }

        const newReview = new ReviewModel(req.body);
        const savedReview = await newReview.save()
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({message: error.message})
    }


}

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await ReviewModel.findByIdAndDelete(
      reviewId
    );
    if (deletedReview) {
      res.status(200).json(deletedReview);
    } else {
      res.status(404).json({ message: "Review Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      reviewId,
      req.body,
      { new: true }
    );
    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: "Destination Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

module.exports = { findAllReviewsByDID, findAllReviewsByUID, createReview, deleteReview, updateReview };
