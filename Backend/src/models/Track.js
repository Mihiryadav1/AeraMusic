import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
    },

    audioFile: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
    },
    artwork: {
      type: String,
      required: true,
    },

    mood: {
      type: String,
      enum: ["Focus", "Study", "Coffee", "Productivity", "Energy", "Relax"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Track", trackSchema);
