import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "audioFile") {
      cb(null, path.resolve("uploads/music"));
    } else if (file.fieldname === "artwork") {
      cb(null, path.resolve("uploads/artwork"));
    }
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export default multer({ storage });