import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../config/validation.js";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        creditBalance: user.creditBalance,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerSchema.validate({ name, email, password });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      user: { name: newUser.name },
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const userCredit = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        credits = 10;
        plan = "Basic";
        amount = 100;
        break;
      case "Advanced":
        credits = 50;
        plan = "Advanced";
        amount = 500;
        break;
      case "Business":
        credits = 100;
        plan = "Business";
        amount = 1000;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid Plan" });
    }
    date = Date.now();
    const transactionData = {
      userId,
      plan,
      credits,
      amount,
      date,
    };
    const newTransaction = await transactionModel.create(transactionData);
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newTransaction._id.toString(),
    };
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err,
        });
      }
      return res.status(200).json({
        success: true,
        order,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res.status(400).json({
          success: false,
          message: "Payment Already Verified",
        });
      }
      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, {
        creditBalance,
      });
      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
      return res.status(200).json({
        success: true,
        message: "Credits Added Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { loginUser, registerUser, userCredit, paymentRazorpay, verifyPayment };
