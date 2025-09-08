import app from "../server.js";
import mongoose from "mongoose";

let connectingPromise = null;

async function ensureDbConnected() {
  if (mongoose.connection.readyState === 1) return; // connected
  if (connectingPromise) return connectingPromise;  // already connecting
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce_db";
  connectingPromise = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
  }).finally(() => {
    connectingPromise = null;
  });
  return connectingPromise;
}

export default async function handler(req, res) {
  try {
    await ensureDbConnected();
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ error: "DB connect failed", details: err?.message }));
  }
  return app(req, res);
}


