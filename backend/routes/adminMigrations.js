import express from "express";
import Product from "../models/Product.js";
import { requireAuth, requireAdmin } from "./middleware/auth.js";
import path from "path";

const router = express.Router();

// POST /api/admin/migrate-images
// Body: { map: { "1754020861647-Oversized-1.webp": "https://res.cloudinary.com/...", ... } }
router.post("/migrate-images", requireAuth, requireAdmin, async (req, res) => {
  try {
    const mapping = req.body?.map || {};
    if (!mapping || typeof mapping !== "object") {
      return res.status(400).json({ error: "map object is required" });
    }

    const products = await Product.find({});
    let updatedCount = 0;

    for (const product of products) {
      const newImages = (product.images || []).map((img) => {
        try {
          const base = path.basename(img);
          return mapping[base] || img;
        } catch (_e) {
          return img;
        }
      });

      // Only update if changed
      const changed = JSON.stringify(newImages) !== JSON.stringify(product.images || []);
      if (changed) {
        product.images = newImages;
        await product.save();
        updatedCount += 1;
      }
    }

    return res.json({ ok: true, updatedCount });
  } catch (err) {
    console.error("migrate-images error", err);
    return res.status(500).json({ error: err.message || "Migration failed" });
  }
});

export default router;


