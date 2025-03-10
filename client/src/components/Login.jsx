import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (state === "Login") {
        response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
      } else {
        response = await axios.post(backendUrl + "/api/user/signup", {
          name,
          email,
          password,
        });
      }
      const { data } = response;
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        setShowLogin(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-neutral-700 text-2xl font-medium">
          {state}
        </h1>
        <p className="text-sm">
          Welcome Back! Please {state === "Login" ? "Sign in" : "Sign up"} to
          continue.
        </p>
        {state !== "Login" && (
          <div className="px-6 py-2 border flex items-center mt-5 rounded-full gap-2">
            <img width={20} src={assets.profile_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              name="name"
              value={name}
              required
            />
          </div>
        )}
        <div className="px-6 py-2 border flex items-center mt-4 rounded-full gap-2">
          <img src={assets.email_icon} alt="" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none text-sm"
            type="email"
            placeholder="Your Email"
            name="email"
            value={email}
            required
          />
        </div>
        <div className="px-6 py-2 border flex items-center mt-4 rounded-full gap-2">
          <img src={assets.lock_icon} alt="" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none text-sm"
            type="password"
            placeholder="Your Password"
            name="password"
            value={password}
            required
          />
        </div>
        <p className="text-sm text-[#df4c38] my-4 cursor-pointer">
          Forget Password?
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          className="py-2 bg-[#df4c38] text-white rounded-full w-full"
          type="submit"
        >
          {state}
        </motion.button>
        {state !== "Sign up" && (
          <p className="text-sm text-center mt-5">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-[#df4c38] cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
        {state !== "Login" && (
          <p className="text-sm text-center mt-5">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-[#df4c38] cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </motion.form>
    </div>
  );
}
