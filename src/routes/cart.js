import express from "express";
import { cartController } from "../controllers/index.js";
import { auth } from "../middlewares/auth.js";

const route = express.Router();

route.get("/", auth, cartController.getCartByUserId);
route.post("/", auth, cartController.addToCart);
route.delete("/:productId", auth, cartController.removeCartItemByIdProduct);
route.patch("/:productId", auth, cartController.updateCartItemQuantity);

export default route;