import express from "express";
import { productController, reviewController } from "../controllers/index.js";

const route = express.Router();

route.get("/:slug", productController.getProductById);
route.post("/newProduct", productController.addProduct);
route.get("/:slug/reviews", reviewController.getReviews);
route.get("/", productController.getAllProducts);

export default route;
