import express from "express";
import {
  createTrack,
  getAllTracks,
  getTrackById,
  updateTrack,
  deleteTrack,
} from "../controllers/tracks.controller.js";
import upload from "../middleware/uploadMusic.js";
const router = express.Router();

// router.post("/", createTrack);
router.post(
  "/",
  upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "artwork", maxCount: 1 },
  ]),
  createTrack,
);
router.get("/", getAllTracks);

router.get("/:id", getTrackById);

router.put("/:id", updateTrack);

router.delete("/:id", deleteTrack);

// router.get("/mood/:mood", getTrackByMood);

export default router;
