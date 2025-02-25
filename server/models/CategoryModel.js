const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    image: { type: String }, // Store the image filename
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;