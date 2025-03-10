import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

const generateImage = async (req, res) => {
  const { userId, prompt } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt is required" });
    }
    if (user.creditBalance < 1) {
      return res.status(403).json({
        success: false,
        message: "Insufficient Credits",
        creditBalance: user.creditBalance,
      });
    }
    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    const updateUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        $inc: { creditBalance: -1 },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Image Generated",
      resultImage,
      creditBalance: updateUser.creditBalance,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { generateImage };
