import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
export default function Result() {
  const [image, setImage] = useState(assets.sample_img_4);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const data = await generateImage(input);
      if (data) {
        setIsImageLoading(true);
        setImage(data);
      }
    }
    setLoading(false);
  };
  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-[90vh]"
    >
      <div>
        <div className="relative">
          <img className="max-w-sm rounded" src={image} alt="" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-[#ff7f3f] ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          ></span>
        </div>
        <div className="flex items-center justify-center">
          <img
            width={70}
            className={loading ? "" : "hidden"}
            src={assets.loading}
            alt=""
          />
        </div>
      </div>
      {!isImageLoading && (
        <div className="flex w-full max-w-xl bg-[#ff7f3f] text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20"
            type="text"
            placeholder="Describe what you want to generate"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 0.5 },
              opacity: { delay: 0.8, duration: 1 },
            }}
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
            type="submit"
          >
            Generate
          </motion.button>
        </div>
      )}
      {isImageLoading && (
        <div className="flex gap-2 flex-wrap justify-center mt-10 text-white text-sm p-0.5 rounded-full">
          <motion.p
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 0.5 },
              opacity: { delay: 0.8, duration: 1 },
            }}
            onClick={() => setIsImageLoading(false)}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 0.5 },
              opacity: { delay: 0.8, duration: 1 },
            }}
            className="bg-zinc-900 cursor-pointer rounded-full px-10 py-3"
            href={image}
            download
          >
            Download
          </motion.a>
        </div>
      )}
    </motion.form>
  );
}
