import Track from "../models/Track.js";
import mongoose from "mongoose";
// Create Track
export const createTrack = async (req, res) => {
  try {
    const { title, artwork, genre, mood, duration } = req.body;

    // Check audio file first
    if (!req.files?.audioFile) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }

    const track = await Track.create({
      title,
      genre,
      mood,
      duration,
      artwork,

      audioFile: req.files?.audioFile
        ? `/uploads/music/${req.files.audioFile[0].filename}`
        : "",
    });

    res.status(201).json({
      success: true,
      data: track,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Tracks
export const getAllTracks = async (req, res) => {
  try {
    const { mood } = req.query;
    const filter = mood ? { mood } : {};

    const tracks = await Track.find(filter);

    res.status(200).json({
      success: true,
      count: tracks.length,
      data: tracks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Track
export const getTrackById = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    res.status(200).json({
      success: true,
      data: track,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Track
export const updateTrack = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Track ID",
      });
    }

    const updatedTrack = await Track.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Validate updated fields
    });

    if (!updatedTrack) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Track updated successfully",
      data: updatedTrack,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Track
export const deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Track deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const getTrackByMood = async (req, res) => {
//   try {
//     const { mood } = req.params;
//     const tracks = await Track.find({ mood });
//     res.status(200).json({
//       success: true,
//       count: tracks.length,
//       data: tracks,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
