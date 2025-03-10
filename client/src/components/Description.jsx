import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

export default function Description() {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        Turn your imaginations into visuals
      </p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          className="w-80 xl:w-96 rounded-lg hover:scale-[1.02] transition-all duration-300"
          src={assets.sample_img_3}
          alt="sample_img"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text-to-Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Bring your ideas to life effortlessly with our free AI image
            generator! Whether you need stunning visuals or unique imagery, our
            tool transforms your text into eye-catching images in just a few
            clicks. Simply imagine it, describe it, and watch it come to life
            instantly.
          </p>
          <p className="text-gray-600">
            Just enter a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs, portraits, and even concepts that don't yet
            exist—everything can be visualized effortlessly. Powered by advanced
            AI technology, the creative possibilities are limitless!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
