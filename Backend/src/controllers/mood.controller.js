import Track from "../models/Track.js";

export const getAllMoods = async (req, res) => {
  try {
    const moods = await Track.distinct("mood");

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods,
    });
  } catch (error) {
    console.error("Error fetching moods:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch moods",
    });
  }
};
