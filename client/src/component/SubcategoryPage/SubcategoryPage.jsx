import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Row, Col, message } from "antd";
import axios from "axios";

const SubcategoryPage = () => {
  const { id } = useParams(); // Get subcategory ID from URL
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { Meta } = Card;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subcategory details
        const subcategoryResponse = await axios.get(
          `http://localhost:5001/api/subcategory/${id}`
        );
        console.log("Fetched Subcategory Data:", subcategoryResponse.data);
        setSubcategory(subcategoryResponse.data.subcategory);

        // Fetch products under this subcategory (ensure the correct API route)
        const productsResponse = await axios.get(
          `http://localhost:5001/api/product/subcategory/${id}`
        );

        console.log("Fetched Products:", productsResponse.data);

        // Check if products exist in response
        setProducts(productsResponse.data.products || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;

  if (!subcategory)
    return <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>Subcategory not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Subcategory Title & Description */}
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        {subcategory?.name || "No Name Available"}
      </h2>
      <p style={{ fontSize: "18px", textAlign: "center" }}>
        {subcategory?.shortDescription || "No Short Description Available"}
      </p>

      {/* Product List */}
      {products.length > 0 ? (
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6} style={{ paddingTop: "20px" }}>
              <Card
                hoverable
                style={{ 
                  width: "100%", 
                  maxWidth: "230px", 
                  margin: "auto", 
                  borderRadius: "12px", 
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
                }}
                cover={
                  <div style={{ 
                    width: "100%", 
                    height: "150px", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    backgroundColor: "white",
                    borderRadius: "12px",
                    overflow: "hidden"
                  }}>
                    <img
                      alt={product.productName}
                      src={`http://localhost:5001/uploads/${product.image}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // ✅ Ensures full visibility without cropping
                        display: "block",
                        borderRadius: "12px",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                }
                onClick={() => navigate(`/product/${product._id}`)}
                >
                <Meta
                  title={product.productName}
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px", color: "gray" }}>
          No Products Available
        </p>
      )}

      {/* Detailed Description */}
      <h2 style={{ paddingTop: "20px", marginBottom: "5px" }}>Details</h2>
      <p style={{ fontSize: "18px" }}>
        {subcategory?.detailedDescription || "No Detailed Description Available"}
      </p>
    </div>
  );
};

export default SubcategoryPage;
