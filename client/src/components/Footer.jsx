import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Footer() {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <Link to="/">
        <img src={assets.logo} alt="logo" width={150} />
      </Link>
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @IzanAhmad | All right reserved.
      </p>
      <div className="flex gap-2.5">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          href="https://www.facebook.com/izanahmad8/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={assets.facebook_icon} alt="facebook" width={35} />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          href="https://x.com/IzanAhmad10"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={assets.twitter_icon} alt="facebook" width={35} />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          href="https://www.instagram.com/__unheard__me/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={assets.instagram_icon} alt="facebook" width={35} />
        </motion.a>
      </div>
    </div>
  );
}
