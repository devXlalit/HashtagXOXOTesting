import express from "express";
import {
  addHeading,
  listHeading,
  removeHeading,
} from "../controllers/topheadingController.js";

import adminAuth from "../middleware/adminAuth.js";

const headingRoute = express.Router();

headingRoute.post("/add", adminAuth, addHeading);
headingRoute.post("/remove", adminAuth, removeHeading);
headingRoute.get("/list", listHeading);

export default headingRoute;
