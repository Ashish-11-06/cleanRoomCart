const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    productCode: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    size: { type: [String] },
    image: { type: String, required: true }, // Store image URL
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
