import express from "express";
import { reviewController } from "../controllers/index.js";

const route = express.Router();

route.get("/", reviewController.getReviews);

export default route;