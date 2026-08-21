import RecentlyPlayed from "../models/recentlyPlayed.model.js";

export const addRecentlyPlayed = async (req, res) => {
  try {
    const { trackId } = req.body;

    const existing = await RecentlyPlayed.findOne({ track: trackId });

    if (existing) {
      existing.playedAt = new Date();
      await existing.save();

      return res.status(200).json({
        success: true,
        data: existing,
      });
    }

    const recent = await RecentlyPlayed.create({
      track: trackId,
    });

    res.status(201).json({
      success: true,
      data: recent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
