import express from "express";
import { userController } from "../controllers/index.js";
import { body } from "express-validator";
import { auth } from "../middlewares/auth.js";

const route = express.Router();

route.post(
  "/login",
  body("username").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);
route.post(
  "/register",
  body("username").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.register
);
route.get("/me", auth, userController.getMe);

export default route;
