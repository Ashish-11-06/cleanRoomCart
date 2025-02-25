import React from 'react'
import './Home.css'
import axios from 'axios';
import { Card, Row, Col } from "antd";
import { useState, useEffect } from 'react';
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
// import "antd/dist/reset.css";
// import one from "../../../assets/1st.jpg"
// import two from '../../../assets/2nd.jpg'
// import three from '../../../assets/3rd.jpg'
// import four from '../../../assets/4th.jpg'
// import five from '../../../assets/5th.jpg'

import one from "../../../assets/1st.jpg";
import two from "../../../assets/2nd.jpg";
import three from "../../../assets/3rd.jpg";
import four from "../../../assets/4th.jpg";
import five from "../../../assets/5th.jpg";


const images = [one, two, three, four, five];

const { Meta} = Card;

const Home = () => {
  // const carouselRef = React.useRef(null);
  const [categories, setCategories] = useState([]);
  const BASE_URL = "http://localhost:5001/uploads/"; 
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch categories from backend
    axios
      .get('http://localhost:5001/api/category/get') 
      .then((response) => {
        console.log("API Response:", response.data); 
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category._id}`); // Navigate to the category page
  };

  return (
    <div>
      <div className="home-container">
        <Carousel autoplay autoplaySpeed={2500} dots={true} infinite effect="scrollx">
          {images.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img src={img}  className="carousel-image" />
            </div>
          ))}
        </Carousel>

      </div>
        <div style={{ padding: "15px" }}>
          <Row gutter={[16, 16]}>
            {categories.map((category) => (
              <Col xs={24} sm={12} md={8} lg={6} key={category._id}>
                <Card
                  hoverable
                  style={{padding:'7px 7px 7px 7px', width:'230px', height:'250px'}}
                  cover={<img alt={category.name} src={`${BASE_URL}${category.image}`}  style={{ height: "150px", objectFit: "cover", borderRadius:'12px', backgroundColor:'white', }} />}
                  onClick={() => handleCategoryClick(category)}
                >
                  <Meta title={category.name} style={{textAlign: "center", fontSize: "12px", fontWeight: "bold", padding:'0px 0px 0px 0px' }} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    </div>
  )
}


export default Home;