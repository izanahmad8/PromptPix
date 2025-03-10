import express from "express";
import {
  loginUser,
  paymentRazorpay,
  registerUser,
  userCredit,
  verifyPayment,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);
userRouter.get("/credits", authMiddleware, userCredit);
userRouter.post("/payment", authMiddleware, paymentRazorpay);
userRouter.post("/verify-payment", authMiddleware, verifyPayment);

export default userRouter;
