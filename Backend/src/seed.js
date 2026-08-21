import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Track from "./models/Track.js";
import tracks from "./data/track.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Delete existing data
    await Track.deleteMany();

    // Insert new data
    await Track.insertMany(tracks);

    console.log("✅ Database seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();