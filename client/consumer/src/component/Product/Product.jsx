import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Button, Radio, InputNumber, Image, Spin } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const Product = () => {
  const { id } = useParams();
  console.log("Extracted Product ID:", id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  // const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    if (!id) {
      console.error("Product ID is missing from the URL");
      return;
    }
  
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/product/get-by/${id}`);
        console.log("Fetched Product Data:", response.data);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetails();
  }, [id]);
  

  if (loading) return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  if (!product) return <h2 style={{ color: "red", textAlign: "center" }}>⚠ Product Not Found</h2>;

  const handleCartClick = () => {
    const cartItem = {
      name: product.productName,
      price: product.price * quantity,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    console.log("Cart Item:", cartItem);
    alert("Item added to the cart!");
  };

  return (
    <div>
      <div style={{ padding: "20px", backgroundColor:'pink' }}>
        <Row gutter={24}>
          <Col span={12}>
            <Image
              src={product.image}
              alt={product.productName}
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Col>
          <Col span={12}>
            <Title level={3}>{product.productName}</Title>
            <Title level={4}>₹{product.price}</Title>
            <Text>
              Product Code: <strong>{product.productCode || "N/A"}</strong>
            </Text>
            <br />
            <Text>Size:</Text>
            <div>
              <Radio.Group onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}>
              {Array.isArray(product?.size)
                ? product.size.map((size) => (
                    <Radio.Button key={size} value={size}>
                      {size}
                    </Radio.Button>
                  ))
                    : typeof product?.size === "string"
                ? product.size.split(",").map((size) => (
                    <Radio.Button key={size.trim()} value={size.trim()}>
                      {size.trim()}
                    </Radio.Button>
                  ))
                : (
                  <Text> No sizes available </Text>
                )}
            </Radio.Group>

            </div>
            {/* <br />
            <Text>Color:</Text>
            <div>
              <Radio.Group
                onChange={(e) => setSelectedColor(e.target.value)}
                value={selectedColor}
              >
                {product.color && product.color.length > 0 ? (
                  product.colors.map((color) => (
                    <Radio.Button key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </Radio.Button>
                  ))
                ) : (
                  <Text> No colors available </Text>
                )}
              </Radio.Group>
            </div> */}
            <br />
            <Text>Quantity:</Text>
            <div>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value)}
              />
            </div>
            <br />
            <Button
              style={{ backgroundColor: "#40476D" }}
              type="primary"
              onClick={handleCartClick}
              disabled={!selectedSize || !selectedColor}
            >
              I'm Interested
            </Button>
          </Col>
        </Row>
      </div>
      <h2>Details</h2>
      <p style={{fontSize:'18px'}}>{product?.description || "No Detailed Description Available"}</p>
    </div>
  );
};

export default Product;
