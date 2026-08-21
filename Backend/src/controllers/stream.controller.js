import fs from "fs";
import path from "path";
import Track from "../models/Track.js";

export const streamTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found",
      });
    }

    // const filePath = path.join(process.cwd(), "audio", track.filename);
    const filePath = path.join(
      process.cwd(),
      track.audioFile.replace(/^\/+/, ""),
    );

    console.log("Stored path:", track.audioFile);
    console.log("Resolved path:", filePath);
    
    // Make sure the file actually exists on disk
    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch {
      return res.status(404).json({
        success: false,
        message: "Audio file not found on server",
      });
    }

    const fileSize = stat.size;
    const range = req.headers.range;
    const contentType = track.mimeType || "audio/mpeg"; // fallback if you don't store mimeType

    if (range) {
      // Example: "bytes=32324-"
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, {
          "Content-Range": `bytes */${fileSize}`,
        });
        return res.end();
      }

      const chunkSize = end - start + 1;
      const stream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      });

      stream.on("error", (err) => {
        // Headers are likely already sent at this point, so just end the response
        res.end();
      });

      stream.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
      });

      const stream = fs.createReadStream(filePath);
      stream.on("error", (err) => {
        res.end();
      });

      stream.pipe(res);
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
