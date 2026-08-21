import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import trackRoutes from "./src/routes/tracks.routes.js";
import connectDB from "./src/config/db.js";
import moodRoute from "./src/routes/mood.routes.js";
import streamRoute from "./src/routes/stream.route.js";
const application = express();
//DB
connectDB();

// Middleware
application.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);
application.use(cors());
application.use(morgan("dev")); // details of requests
application.use(express.json());
application.use("/uploads", express.static("uploads"));

//Register all routes
application.use("/api/tracks", trackRoutes);
application.use("/api/moods", moodRoute);
application.use("/api/stream", streamRoute);

// Test route
application.get("/", (req, res) => {
  res.json({ message: "Music Player API 🎵" });
});

//Actual routes
export default application;
