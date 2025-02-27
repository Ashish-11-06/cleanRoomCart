import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Typography, Button, Radio, InputNumber, Image, Spin, message } from "antd";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const { Title, Text } = Typography;

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) {
      message.error("Product ID is missing!");
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/product/get-by/${id}`);
        console.log("Fetched Product Data:", response.data);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error.response?.data || error.message);
        message.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  if (!product) return <h2 style={{ color: "red", textAlign: "center" }}>⚠ Product Not Found</h2>;

  const handleCartClick = () => {
    if (!selectedSize) {
      message.warning("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      key: `${product._id}-${selectedSize}`,
      name: product.productName,
      price: product.price * quantity,
      size: selectedSize,
      quantity,
      image: product.image,
    };

    addToCart(cartItem);
    message.success("Item added to cart!");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "white", marginRight: "20px" }}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Image
            src={`http://localhost:5001/uploads/${product.image}`} 
            alt={product.productName}
            style={{ maxWidth: "100%", borderRadius: "8px" }}
            fallback="https://via.placeholder.com/300" 
          />
        </Col>
        <Col xs={24} md={12}>
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
                : <Text style={{ color: "red" }}> No sizes available </Text>}
            </Radio.Group>
          </div>
          <br />
          <Text>Quantity:</Text>
          <div>
            <InputNumber min={1} value={quantity} onChange={(value) => setQuantity(value)} />
          </div>
          <br />
          <Button
            style={{ backgroundColor: "#40476D" }}
            type="primary"
            onClick={handleCartClick}
            disabled={!selectedSize}
          >
            I'm Interested
          </Button>
        </Col>
      </Row>
      <h2>Details</h2>
      <p style={{ fontSize: "18px" }}>{product?.description || "No Detailed Description Available"}</p>
    </div>
  );
};

export default Product;
