import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/", upload.array("image", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(200).json({ imagePaths: [] });
    }

    const folder = process.env.CLOUDINARY_FOLDER || "alley-products";

    const uploadFromBuffer = (buffer, filename) => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image", public_id: filename?.split(".")?.[0] },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const uploads = await Promise.all(
      req.files.map(file => uploadFromBuffer(file.buffer, file.originalname))
    );

    const imagePaths = uploads.map(u => u.secure_url);
    res.json({ imagePaths });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

export default router;
