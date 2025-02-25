const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category", 
    required: true 
  },
  shortDescription: { 
    type: String, 
    required: true 
  },
  detailedDescription: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String,  // Path to the uploaded image file
    default: "" 
  }
}, {
  timestamps: true  // Optionally, you can add timestamps for createdAt and updatedAt
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
