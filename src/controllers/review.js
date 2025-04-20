import { associateModels } from "../models/accosiation.js";
import { reviewService } from "../services/index.js";

const getReviews = async (req, res) => {
  const { slug } = req.params;


  try {
    const reviews = await reviewService.getReviews(slug);

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    res.status(200).json(reviews);
  } catch (error) {

    res.status(500).json({
      message: "server Error!!!",
    });
  }
}

export default { getReviews };