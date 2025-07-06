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
  "https://hashtag-xoxo-testing.vercel.app", // your actual deployed frontend URL
  "https://www.hashtagxoxo.com", // your actual deployed frontend URL
  "https://hashtagxoxo.com", // your actual deployed frontend URL
  "https://admin.hashtagxoxo.com", // your actual deployed frontend URL
];
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // if you're using cookies or auth headers
  })
);
app.options("*", cors()); // handle preflight for all routes

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
