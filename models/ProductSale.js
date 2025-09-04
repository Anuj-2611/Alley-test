import mongoose from "mongoose";

const productSaleSchema = new mongoose.Schema({
  productId: String,
  date: Date,
  quantitySold: Number,
  stockLeft: Number
});

export default mongoose.model("ProductSale", productSaleSchema);
