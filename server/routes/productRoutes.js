const express = require("express");
const { 
    addProduct, 
    getProducts, 
    getProductBySubId, 
    getById, 
    deleteProduct, 
    updateProduct, 
    getProductsForTable // Import the new function
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.get("/get", getProducts);
router.get("/get/:id", getProductBySubId);
router.get("/get-by/:productId", getById);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/search", getProductsForTable); // New route for searching products

module.exports = router;
