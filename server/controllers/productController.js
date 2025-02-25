const { message } = require("statuses");
const Product = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
  try {
      const { category, subcategory, productName, price, productCode, description, size, image } = req.body;

      console.log("Received Data:", req.body);  

      if (!category || !subcategory || !productName || !price || !productCode || !description || !image) {
          return res.status(400).json({ message: "All required fields must be filled" });
      }

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
          image,
          // message: 'Product added successfully'
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Server error, please try again later" });
  }
};



exports.getProducts = async (req, res) => {
  try {
      const { categoryId, subcategoryId } = req.body;  // Use query instead of body

      if (!categoryId || !subcategoryId) {
          return res.status(400).json({ error: "Category ID and Subcategory ID are required" });
      }

      const products = await Product.find({ category: categoryId, subcategory: subcategoryId });

      return res.status(200).json({
          products,
          message: "Products fetched successfully",
      });

  } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.getProductsBySubcategory = async (req, res) => {
//     try {
//       const { subcategory } = req.params;
      
//       // Find products linked to this subcategory
//       const products = await Product.find({ subcategory });

//       if (!products.length) {
//         return res.status(404).json({ message: "No products found for this subcategory" });
//       }

//       res.json(products);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       res.status(500).json({ message: "Error fetching products", error });
//     }
//   };

exports.getProductBySubId = async (req, res) =>{
        try {
          const subcategoryId = req.params.id; // Get subcategory ID from URL parameter


          if (!subcategoryId) {
              return res.status(400).json({ message: "Subcategory ID is required" });
          }
          
           const products = await Product.find({ subcategory: subcategoryId });

          console.log("Fetched Products:", products);

          res.status(200).json({ 
            success: true, 
            products,
            message:"Product Fetch Successfully",
           });
      } catch (error) {
          console.error("Error fetching products:", error);
          res.status(500).json({ success: false, message: "Server error" });
      }
  }

exports.getById = async (req, res) => {
    try {
        const { productId } = req.params; // Get product ID from URL
        console.log("Received Product ID:", productId); 
  
        const product = await Product.findById(productId); // Find by product ID
        // let sizes = Array.isArray(product.size) ? product.size : product.size?.split(",").map(s => s.trim()) || [];
        console.log("Fetched Product from DB:", product); 
  
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }
  
        res.status(200).json({ 
            success: true, 
            product,  
            message: "Product Fetch Successfully" 
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        updatedProduct,
        message: "Product updated successfully",
      
      });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
}