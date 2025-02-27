const Product = require("../models/productModel");

exports.addProduct = async(req, res) => {
    try {
        let { category, subcategory, productName, price, productCode, description, size, image } = req.body;

        // Ensure `size` is an array
        if (!Array.isArray(size)) {
            size = typeof size === "string" ? size.split(",").map(s => s.trim()).filter(Boolean) : [];
        } else {
            size = size.filter(s => s.trim() !== "");
        }

        const newProduct = new Product({
            category,
            subcategory,
            productName,
            price,
            productCode,
            description,
            size,
            image
        });

        await newProduct.save();
        res.status(201).json({ success: true, newProduct, message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Error adding product" });
    }
};











// Get all products with optional filtering by category or subcategory
exports.getProducts = async(req, res) => {
    try {
        const { categoryId, subcategoryId } = req.query;
        let filter = {};

        if (categoryId) filter.category = categoryId;
        if (subcategoryId) filter.subcategory = subcategoryId;

        const products = await Product.find(filter);
        res.status(200).json({ success: true, products, message: "Products fetched successfully" });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get products by subcategory ID
exports.getProductBySubId = async(req, res) => {
    try {
        const { id: subcategoryId } = req.params;
        if (!subcategoryId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Subcategory ID" });
        }

        const products = await Product.find({ subcategory: subcategoryId });
        if (!products.length) {
            return res.status(404).json({ message: "No products found for this subcategory" });
        }

        res.status(200).json({ success: true, products, message: "Products fetched successfully" });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get product by ID
exports.getById = async(req, res) => {
    try {
        const { productId } = req.params;
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product, message: "Product fetched successfully" });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete a product
exports.deleteProduct = async(req, res) => {
    try {
        const { id: productId } = req.params;
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a product
exports.updateProduct = async(req, res) => {
    try {
        const { id: productId } = req.params;
        let updateData = req.body;

        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        if (updateData.size && typeof updateData.size === "string") {
            updateData.size = updateData.size.split(",").map(s => s.trim()).filter(Boolean);
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ success: true, updatedProduct, message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error });
    }
};

exports.getProductsForTable = async(req, res) => {
    try {
        const { name } = req.query; // Get product name from query parameters
        let filter = {};

        if (name) {
            filter.productName = { $regex: name, $options: "i" }; // Case-insensitive search
        }

        // Fetch only productName, price, and productCode
        const products = await Product.find(filter).select("productName price productCode");

        res.status(200).json({ success: true, products, message: "Products fetched successfully" });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error });
    }
};