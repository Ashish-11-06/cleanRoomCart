const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    productCode: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    size: { type: [String], default: [] }, // Default empty array
    image: { type: String }, // Error message if missing
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
