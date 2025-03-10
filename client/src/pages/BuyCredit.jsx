import React from "react";
import { assets, plans } from "../assets/assets.js";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function BuyCredit() {
  const { user, backendUrl, creditData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "PromptPix",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        let response;
        try {
          response = await axios.post(
            backendUrl + "/api/user/verify-payment",
            {
              razorpay_order_id: res.razorpay_order_id,
            },
            {
              headers: {
                token,
              },
            }
          );
          const { data } = response;
          if (data.success) {
            creditData();
            navigate("/");
            toast.success(data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const payment = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }
      const { data } = await axios.post(
        backendUrl + "/api/user/payment",
        {
          planId,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {}
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan, index) => (
          <div
            className="bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
            key={index}
          >
            <img width={40} src={assets.favicon} alt="" />
            <p className="mt-3 font-semibold mb-1">{plan.id}</p>
            <p className="text-sm">{plan.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">&#8377;{plan.price}</span>{" "}
              / {plan.credits} credits
            </p>
            <button
              onClick={() => payment(plan.id)}
              className="w-full bg-gray-800 text-white py-2.5 min-w-52 text-sm rounded-md mt-8 cursor-pointer"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
