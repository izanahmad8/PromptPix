import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export default function MagicBtn() {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 text-neutral-800 py-6 md:py-16">
        See the magic, Try Now!
      </h1>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
        className="cursor-pointer inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto"
      >
        Generate Images{" "}
        <img className="h-6" src={assets.star_group} alt="stars" />
      </motion.button>
    </motion.div>
  );
}
