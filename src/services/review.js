import Review from "../models/review.js";
import User from "../models/user.js";
import { productService } from "./index.js";

const getReviews = async (slug) => {
  try {
    const product = await productService.getProductById(slug);

    const reviews = await Review.findAll({
      where: { productId: product.id },
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      ],
    });


    

     return reviews;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getReviews };
