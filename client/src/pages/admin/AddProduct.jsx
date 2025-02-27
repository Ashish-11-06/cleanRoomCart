import React from 'react'
import { EditOutlined, DeleteOutlined,UploadOutlined  } from '@ant-design/icons';
import { Modal, Input, Form, Button, Select, Upload } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

const { TextArea } = Input;


const AddProduct = () => {

  const [categories, setCategories] = useState([]); // Store categories
  const [subcategories, setSubcategories] = useState([]); // Store subcategories
  const [allSubcategories, setAllSubcategories] = useState([]); // Store all subcategories
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(false); // Show loader while fetching
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  


  useEffect(() => {
    axios.get("http://localhost:5001/api/category/get")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  

  // Fetch subcategories based on selected category
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`http://localhost:5001/api/subcategory/get?categoryId=${selectedCategory}`)
        .then((response) => {
          if (response.data.subCategories && Array.isArray(response.data.subCategories)) {
            // 🔥 Filter Subcategories based on Selected Category
            const filtered = response.data.subCategories.filter(
              (sub) => sub.categoryId === selectedCategory
            );
  
            setSubcategories(filtered); // ✅ Set Filtered Subcategories
          } else {
            console.error("Unexpected response format:", response.data);
            setSubcategories([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
          setSubcategories([]);
        });
    } else {
      setSubcategories([]); // Reset when no category is selected
    }
  }, [selectedCategory]);
  
  
  
//   useEffect(() => {
//     if (selectedCategory) {
//         axios.get(http://localhost:5001/api/subcategory/get?categoryId=${selectedCategory})
//             .then((response) => {
//                 setSubcategories(response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching subcategories:", error);
//             });
//     }
//   }, [selectedCategory]);

   // Handle Category Selection
   const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null); // Reset subcategory when category changes
  };
  
  


  // Handle Subcategory Selection
  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
  };
  

  const handleUpdateProduct = async (values, productId) => {
    try {
        const response = await axios.put(`http://localhost:5001/api/product/update/${productId}`, values);
        
        if (response.status === 200) {
            alert("Product updated successfully!");
            setIsEditModalVisible(false); // Close the modal
        }
    } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
    }
  };





  const handleSeeProducts = async () => {
    if (!selectedCategory || !selectedSubcategory) return;

    setLoading(true);
    try {
        const response = await axios.get(
            `http://localhost:5001/api/product/get?categoryId=${selectedCategory}&subcategoryId=${selectedSubcategory}`
        );

        console.log("Fetched Products:", response.data);
        if (Array.isArray(response.data)) {
            setProducts([...response.data]); // Ensure new reference
        } else if (response.data.products) {
            setProducts([...response.data.products]); // If products are nested
        } else {
            setProducts([]);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
    setLoading(false);
};

useEffect(() => {
    console.log("Updated Products State:", products);
}, [products]);







  // Handle Form Submission
  const onFinish = async (values) => {
    try {
        const formData = {
            category: selectedCategory,
            subcategory: selectedSubcategory,
            productName: values.productName,
            price: values.price,
            productCode: values.productCode,
            description: values.description,
            size: values.size || "", // Optional field
            image: values.image.file.name, // Assuming image file is uploaded separately
        };

        const response = await axios.post("http://localhost:5001/api/product/add", formData);
        
        if (response.status === 201) {
            console.log("Product added successfully:", response.data);
            alert("Product added successfully!");
        }

    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    }
  };


  


    // Toggle Form Visibility
    const toggleForm = () => {
      setIsFormVisible(!isFormVisible);
    };

    // Handle Edit Product
    const handleDelete = async (productId) => {
      try {
          const response = await axios.delete(`http://localhost:5001/api/product/delete/${productId}`);
          
          if (response.status === 200) {
              alert("Product deleted successfully!");
              setProducts(products.filter(product => product._id !== productId)); // Remove product from UI
          }
      } catch (error) {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
      }
  };
  
  const handleEdit = (product) => {
    setEditingProduct(product);  // Store the product data
    setIsEditModalVisible(true); // Open the modal
  };


  return (
    <div>
        <div style={{display:'flex', justifyContent:'space-between',paddingRight:'20px', paddingLeft:'20px', backgroundColor:'#d8e4f2', borderRadius:'10px'}}>
        <h1>Add Product</h1>
        </div>
        
        {/* Form for selecting Category and Subcategory */}
        <div style={{ marginTop: "20px", padding: "10px", background: "#fff", borderRadius: "10px" }}>
  <h2 style={{ paddingLeft: '0px' }}>Select Category and Subcategory</h2>

  <Form style={{ backgroundColor: '#d8e4f2', alignItems: 'center', width: '500px', margin: "auto", padding: "inherit" }}>
    {/* Category Dropdown */}
    <Form.Item label="Select Category" style={{ padding: '20px 0px 0px 0px', height: '80px' }}>
      <Select
        style={{ width: '100%' }}
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder="Select a Category"
      >
        {categories.map((category) => (
          <Select.Option key={category._id} value={category._id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>

    {/* Subcategory Dropdown */}
    <Form.Item label="Select Subcategory" style={{ padding: '0px 0px 0px 0px', height: '60px' }}>
      <Select
        style={{ width: '100%' }}
        value={selectedSubcategory}
        onChange={handleSubcategoryChange}
        placeholder="Select a Subcategory"
        disabled={!selectedCategory} // Disable if no category selected
      >
        {subcategories.map((subcategory) => (
          <Select.Option key={subcategory._id} value={subcategory._id}>
            {subcategory.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>

    {/* Buttons */}
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        type="primary"
        onClick={toggleForm}
        style={{ width: '48%', backgroundColor: '#40476D' }}
        disabled={!selectedCategory || !selectedSubcategory}
      >
        {isFormVisible ? "Close Form" : "Add Product"}
      </Button>

      <Button
        type="default"
        onClick={handleSeeProducts}
        style={{ width: '48%' }}
        disabled={!selectedCategory || !selectedSubcategory}
      >
        See Products
      </Button>
    </div>
  </Form>
</div>

            
              <Modal
                  title="Edit Product"
                  open={isEditModalVisible}
                  onCancel={() => setIsEditModalVisible(false)}
                  footer={null}
              >
                  {editingProduct && (
                      <Form
                      style={{margin:'5px', padding:'10px'}}
                          layout="vertical"
                          initialValues={{
                              productName: editingProduct.productName,
                              price: editingProduct.price,
                              description: editingProduct.description,
                              size: editingProduct.size,
                          }}
                          onFinish={(values) => handleUpdateProduct(values, editingProduct._id)}
                      >
                          <Form.Item style={{height:'60px'}} label="Product Name" name="productName" rules={[{ required: true, message: "Enter product name" }]}>
                              <Input placeholder="Enter product name" />
                          </Form.Item>

                          <Form.Item  style={{height:'60px'}}  label="Price (₹)" name="price" rules={[{ required: true, message: "Enter product price" }]}>
                              <Input type="number" placeholder="Enter price" />
                          </Form.Item>

                          <Form.Item style={{height:'105px'}}  label="Description" name="description" rules={[{ required: true, message: "Enter description" }]}>
                              <Input.TextArea rows={3} placeholder="Enter product description" />
                          </Form.Item>

                          <Form.Item style={{height:'60px'}}  label="Size (Optional)" name="size">
                              <Input placeholder="Enter size (if applicable)" />
                          </Form.Item>

                          <Button type="primary" htmlType="submit" style={{ margin:'0px 0px 15px 95px',backgroundColor: '#40476D', width: "50%" }}>
                              Update Product
                          </Button>
                      </Form>
                  )}
              </Modal>















            {isFormVisible && (
                <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ddd" }}>
                    <h2>Enter Product Details</h2>
                    <Form 
                    style={{marginLeft: '31px', padding: '21px'}}
                    layout="vertical" 
                    onFinish={onFinish} 
                    initialValues={{ category: selectedCategory, subcategory: selectedSubcategory }}>
                        
                        {/* Category & Subcategory inside Form */}
                        <Form.Item style={{    height: '60px'}} label="Select Category" name="category">
                            <Select value={selectedCategory} onChange={handleCategoryChange}>
                                {categories.map((category) => (
                                    <Select.Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {/* height: 23px; */}

                        <Form.Item style={{    height: '60px'}} label="Select Subcategory" name="subcategory">
                            <Select value={selectedSubcategory} onChange={handleSubcategoryChange} disabled={!selectedCategory}>
                                {subcategories.map((subcategory) => (
                                    <Select.Option key={subcategory._id} value={subcategory._id}>
                                        {subcategory.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {/* Product Name */}
                        <Form.Item style={{    height: '60px'}} label="Product Name" name="productName" rules={[{ required: true, message: "Please enter product name" }]}>
                            <Input placeholder="Enter product name" />
                        </Form.Item>

                        {/* Price */}
                        <Form.Item style={{    height: '60px'}} label="Price (₹)" name="price" rules={[{ required: true, message: "Please enter product price" }]}>
                            <Input type="number" placeholder="Enter price" />
                        </Form.Item>

                        {/* Product Code */}
                        <Form.Item style={{    height: '60px'}} label="Product Code" name="productCode" rules={[{ required: true, message: "Please enter product code" }]}>
                            <Input placeholder="Enter product code" />
                        </Form.Item>

                        {/* Description */}
                        <Form.Item style={{ height: '105px'}} label="Description" name="description" rules={[{ required: true, message: "Please enter product description" }]}>
                            <TextArea rows={3} 
                            placeholder="Enter product description" />
                        </Form.Item>

                        {/* Size (Optional) */}
                        <Form.Item style={{    height: '60px'}} label="Size (Optional)" name="size">
                            <Input placeholder="Enter size (if applicable)" />
                        </Form.Item>

                        {/* Product Image */}
                        <Form.Item style={{height: '60px'}} label="Product Image" name="image" rules={[{ required: true, message: "Please upload Image" }]}>
                            <Upload beforeUpload={() => false} listType="picture">
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Form.Item>

                        <Button style={{backgroundColor:'#40476D' }} type="primary" htmlType="submit">
                            Add Product
                        </Button>
                    </Form>
                </div>
            )}
            {products.length > 0 && (
                <div style={{ marginTop: "20px", padding: "10px", background: "#fff", borderRadius: "10px" }}>
                    <h2>All Products</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#40476D", color: "#fff" }}>
                                <th style={{ padding: "10px", textAlign: "left" }}>Product Name</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>Size</th>
                                <th style={{ padding: "10px", textAlign: "left" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} style={{ borderBottom: "1px solid #ddd", fontSize:'16px' }}>
                                    <td style={{ padding: "10px"  }}>{product.productName}</td>
                                    <td style={{ padding: "10px" }}>₹{product.price}</td>
                                    <td style={{ padding: "10px" }}>{product.description}</td>
                                    <td style={{ padding: "10px" }}>{product.size || "N/A"}</td>
                                    <td style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
    <div style={{ display: "flex", gap: "5px" }}>
        {/* Edit Button - Green */}
        <Button 
            style={{ backgroundColor: "green", color: "white", border: "none", fontSize: "12px", padding: "3px 8px" }} 
            onClick={() => handleEdit(product)}
        >
            Edit
        </Button>

        {/* Delete Button - Red */}
        <Button 
            style={{ backgroundColor: "red", color: "white", border: "none", fontSize: "12px", padding: "3px 8px" }} 
            onClick={() => handleDelete(product._id)}
        >
            Delete
        </Button>
    </div>

    {/* Add Subproduct Button - Orange (Placed Below) */}
    <Button 
        style={{ backgroundColor: "#E16A54", color: "white", border: "none", fontSize: "12px", padding: "3px 8px" }} 
        onClick={() => handleAddSubproduct(product)}
    >
        Add Subproduct
    </Button>
</td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}







    </div>
  )
}

export default AddProduct