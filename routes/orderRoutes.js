import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List all orders
router.get("/", async (_req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product", "title price images").sort({ createdAt: -1 });
  res.json(orders);
});

// Get one order
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.product", "title price images");
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// Update order (general edits)
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order status specifically
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json({ message: "Order deleted" });
});

export default router;