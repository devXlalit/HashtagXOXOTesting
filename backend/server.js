import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import couponRouter from "./routes/couponRoute.js";
import headingRouter from "./routes/topheading.js";
import { getImagesFromFolder } from "./controllers/HeroController.js";
// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "http://localhost:5174", // for local dev
  "http://192.168.1.8:5173",
  "https://hashtag-xoxo-testing.vercel.app", // your actual deployed frontend URL
  "https://hashtag-xoxo-admin-testing.vercel.app",
  "https://www.hashtagxoxo.com", // your actual deployed frontend URL
  "https://hashtagxoxo.com", // your actual deployed frontend URL
  "https://admin.hashtagxoxo.com", // your actual deployed frontend URL
];
// middlewares
// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Blocked by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Handle preflight with the SAME CORS config
app.options(
  "*",
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Blocked by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/heading", headingRouter);
app.use("/api/get-images", getImagesFromFolder);
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
