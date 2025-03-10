import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDb from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRoute.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//connect to database
connectToDb();

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
