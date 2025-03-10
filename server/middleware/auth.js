import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "User not Authenticated" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token is Invalid or Expired" });
  }
};

export default authMiddleware;
