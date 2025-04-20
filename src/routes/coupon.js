import express from "express";
import { couponController } from "../controllers/index.js";
import { auth } from "../middlewares/auth.js";

const route = express.Router();

route.get("/:code", auth, couponController.getCouponByCode);

export default route;