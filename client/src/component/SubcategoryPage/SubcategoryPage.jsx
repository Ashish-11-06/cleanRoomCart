import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { Card, Spin, Row, Col  } from "antd";
import axios from "axios";


const SubcategoryPage = () => {
    const { id } = useParams(); 
    // console.log("Subcategory ID from URL:", id);// Get subcategory ID from the URL
    const [subcategory, setSubcategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]); 
    const { Meta } = Card;
    const navigate = useNavigate();


    useEffect(() => {
        const fetchSubcategoryDetails = async () => {
          console.log(id);
          try {
            const response = await axios.get(`http://localhost:5001/api/subcategory/${id}`);
            console.log("Fetched Subcategory Data:", response.data);
            setSubcategory(response.data.subcategory);
          } catch (error) {
            console.error("Error fetching subcategory details:", error);
          } finally {
            setLoading(false);
          }
        };


        const fetchProducts = async () => {
          try {
              const response = await axios.get(`http://localhost:5001/api/product/get/${id}`,
              //  {
              //     params: { subcategoryId: id },
              // }
            );
              console.log("Fetched Products:", response.data);
              setProducts(response.data.products);
          } catch (error) {
              console.error("Error fetching products:", error.response?.data || error.message);
          } finally {
              setLoading(false);
          }
      };
      
    
        fetchSubcategoryDetails();
        fetchProducts();
      }, [id]);

      if (loading) return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
      if (!subcategory) return <p>Subcategory not found</p>;   
    
  return (
    <div>
        <h2 style={{textAlign:'center'}}>{subcategory?.name || "No Name Available"}</h2>
        <p style={{fontSize:'18px'}}>{subcategory?.shortDescription || "No Short Description Available"}</p>

        <Row gutter={[16, 16]}>
        {products.length > 0 ? (
          products.map((product) => (
            <Col style={{ paddingTop: "30px" }} xs={24} sm={12} md={8} lg={6} key={product._id}>
              <Card
                hoverable
                style={{ padding: "12px", width: "230px", height: "250px" }}
                cover={
                  <img
                    alt={product.productName}
                    src={`../uploads/${product.image}`}
                    style={{ height: "150px", objectFit: "cover", borderRadius: "10px", backgroundColor:''}}
                  />
                }
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <Meta title={product.productName} style={{ textAlign: "center", fontSize: "15px", fontWeight: "bold" }} />
              </Card>
            </Col>
          ))
        ) : (
          <p>No Products Available</p>
        )}
      </Row>

        <h2 style={{paddingTop:'20px',margin:'0'}}>Details</h2>
        <p style={{fontSize:'18px'}}>{subcategory?.detailedDescription || "No Detailed Description Available"}</p>
    </div>
  )
}

export default SubcategoryPage