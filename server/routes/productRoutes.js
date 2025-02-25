const express = require("express");
const { addProduct, getProducts, getProductsBySubcategory, getProductBySubId, getById, deleteProduct, updateProduct  } = require("../controllers/productController");

const router = express.Router();
// Add a Product
router.post("/add", addProduct);

// Get All Products
router.get("/get", getProducts);

//get all product by subcatefory id
router.get("/get/:id", getProductBySubId);

//get product by product id
router.get("/get-by/:productId", getById);

//delete a product
router.delete("/delete/:id", deleteProduct);

//update a product
router.put("/update/:id", updateProduct);

// Get Products by Subcategory
// router.get("/subcategory/:subcategory/products", getProductsBySubcategory);

module.exports = router;
