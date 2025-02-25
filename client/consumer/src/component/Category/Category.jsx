import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { id } = useParams(); // Get category ID from the URL
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const { Meta } = Card;
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/category/${id}`);
        const data = await response.json();
        console.log("Fetched Category Data:", data); 
  
        if (data.category) {  // ✅ Ensure the category exists before setting state
          setCategory(data.category);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchSubcategories = async () => {
      try {
        const subcategoriesResponse = await axios.get(`http://localhost:5001/api/subcategory/get/${id}`);
        console.log("Fetched Subcategories Data:", subcategoriesResponse.data);
        setSubcategories(subcategoriesResponse.data.subcategories || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
  
    fetchCategoryDetails();
    fetchSubcategories();
  }, [id]);
  

  

  if (loading) return <p>Loading...</p>;

  if (!category) return <p>Category not found</p>;

  return (
     <div style={{ padding: "0px 20px 20px 20px" }}>
      <h2 style={{paddingLeft:'25%'}}>{category?.name || "No Name Available"}</h2>
      <p style={{fontSize:'18px'}}>{category?.shortDescription || "No Description"}</p>

      {/* ✅ Subcategories Section */}
      <Row gutter={[16, 16]}>
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <Col style={{paddingTop:'30px'}} xs={24} sm={12} md={8} lg={6} key={subcategory._id}>
              <Card
                hoverable
                style={{padding:'7px 7px 7px 7px', width:'230px', height:'250px'}}

                cover={
                  <img
                    alt={subcategory.name}
                    src={`http://localhost:5001/uploads/${subcategory.image}`}
                    style={{ height: "150px", objectFit: "cover", borderRadius:'12px', backgroundColor:'white' }}
                  />
                }
                onClick={() => navigate(`/subcategory/${subcategory._id}`)}
              >
                <Meta title={subcategory.name} style={{textAlign: "center", fontSize: "12px", fontWeight: "bold", padding:'0px 0px 0px 0px' }} />
              </Card>
            </Col>
          ))
        ) : (
          <p>No Subcategories Available</p>
        )}
      </Row>
      <h2 style={{paddingTop:'20px',margin:'0'}}>Details</h2>
      <p style={{fontSize:'18px'}}>{category?.detailedDescription || "No Detailed Description"}</p>
    </div>
  )
} 

export default Category



// import React, { useState } from "react";
// import Sidebar from '../Sidebar/Sidebar'; // Import Sidebar component
// import { Card, Row, Col } from "antd";
// import { useNavigate } from "react-router-dom";

// const Category = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const navigate = useNavigate();

//   const handleCategoryClick = (categoryName, subcategoryList) => {
//     setSelectedCategory(categoryName);
//     setSubcategories(subcategoryList);
//   };

//   const handleSubcategoryClick = (subcategory) => {
//     navigate(`/category/${selectedCategory}/${subcategory.toLowerCase()}`);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar onCategoryClick={handleCategoryClick} />
//       <div style={{ padding: "24px", flex: 1 }}>
//         {selectedCategory && (
//           <>
//             <h2 style={{ marginBottom: "16px" }}>
//               Subcategories in "{selectedCategory}"
//             </h2>
//             <Row gutter={[16, 16]}>
//               {subcategories.length > 0 ? (
//                 subcategories.map((subcategory, index) => (
//                   <Col xs={24} sm={12} md={8} lg={6} key={index}>
//                     <Card
//                       title={subcategory.name}
//                       hoverable
//                       onClick={() => handleSubcategoryClick(subcategory.name)}
//                       style={{ height: "150px" }}
//                     >
//                       <p>View products in {subcategory.name}</p>
//                     </Card>
//                   </Col>
//                 ))
//               ) : (
//                 <p>No subcategories found</p>
//               )}
//             </Row>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Category;



// // import React, { useEffect, useState } from "react";
// // import { Card, Row, Col, Spin, message } from "antd";
// // import { useNavigate, useParams } from "react-router-dom";

// // const Category = () => {
// //   const navigate = useNavigate();
// //   const { categoryName } = useParams(); // Get the category name from the URL
// //   const [subcategories, setSubcategories] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Function to fetch categoryId by categoryName
// //   // const getCategoryIdByName = async (categoryName) => {
// //   //   try {
// //   //     const response = await fetch(`http://localhost:5001/api/category/get`);
// //   //     if (!response.ok) {
// //   //       throw new Error("Failed to fetch categories");
// //   //     }
// //   //     // console.log(categoryName);      //to check response from backend

// //   //     const categories = await response.json();

// //   //     // Find the category object by name
// //   //     const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());

// //   //     return category ? category._id : null; // Return ObjectId if found
// //   //   } catch (error) {
// //   //     message.error("Error fetching categories: " + error.message);
// //   //     return null;
// //   //   }
// //   // };

// //   useEffect(() => {
// //     const fetchSubcategories = async () => {
// //       try {
// //         setLoading(true);

// //         // Get the categoryId from categoryName
// //         const categoryId = categoryName;
// //         if (!categoryId) {
// //           throw new Error("Category not found");
// //         }

// //         // Fetch subcategories using categoryId
// //         const response = await fetch(`http://localhost:5001/api/category/${categoryId}/subcategory`);
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch subcategories");
// //         }

// //         // console.log(response);      //to check responsefrom backend

// //         const data = await response.json();
// //         setSubcategories(data); // Assuming backend returns an array
// //       } catch (error) {
// //         message.error(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchSubcategories();
// //   }, [categoryName]);

// //   const handleSubcategoryClick = (subcategory) => {
// //     navigate(`/category/${categoryName}/${subcategory.toLowerCase()}`);
// //   };

// //   return (
// //     <div style={{ padding: "24px" }}>
// //       <h2 style={{ marginBottom: "16px" }}>
// //         Subcategories in "{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}"
// //       </h2>

// //       {loading ? (
// //         <Spin size="large" />
// //       ) : (
// //         <Row gutter={[16, 16]}>
// //           {subcategories.length > 0 ? (
// //             subcategories.map((subcategory, index) => (
// //               <Col xs={24} sm={12} md={8} lg={6} key={index}>
// //                 <Card
// //                   title={subcategory.name} // Assuming API returns objects with a "name" field
// //                   hoverable
// //                   onClick={() => handleSubcategoryClick(subcategory.name)}
// //                   style={{ height: "150px" }}
// //                 >
// //                   <p>View products in {subcategory.name}</p>
// //                 </Card>
// //               </Col>
// //             ))
// //           ) : (
// //             <p>No subcategories available.</p>
// //           )}
// //         </Row>
// //       )}
// //     </div>
// //   );
// // };

// // export default Category;




// // // import React, { useEffect, useState } from "react";
// // // import { Card, Row, Col, Spin, message } from "antd";
// // // import { useNavigate, useParams } from "react-router-dom";

// // // const Category = () => {
// // //   const navigate = useNavigate();
// // //   const { categoryName } = useParams(); // Get the category from the URL
// // //   const [subcategories, setSubcategories] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchSubcategories = async () => {
// // //       try {
// // //         const response = await fetch(`http://localhost:5001/api/subcategories/${categoryName}`); // Adjust API endpoint
// // //         if (!response.ok) {
// // //           throw new Error("Failed to fetch subcategories");
// // //         }
// // //         const data = await response.json();
// // //         setSubcategories(data); // Assuming backend returns an array
// // //       } catch (error) {
// // //         message.error(error.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchSubcategories();
// // //   }, [categoryName]);

// // //   const handleSubcategoryClick = (subcategory) => {
// // //     navigate(`/category/${categoryName}/${subcategory.toLowerCase()}`);
// // //   };

// // //   return (
// // //     <div style={{ padding: "24px" }}>
// // //       <h2 style={{ marginBottom: "16px" }}>
// // //         Subcategories in "{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}"
// // //       </h2>

// // //       {loading ? (
// // //         <Spin size="large" />
// // //       ) : (
// // //         <Row gutter={[16, 16]}>
// // //           {subcategories.length > 0 ? (
// // //             subcategories.map((subcategory, index) => (
// // //               <Col xs={24} sm={12} md={8} lg={6} key={index}>
// // //                 <Card
// // //                   title={subcategory.name} // Assuming API returns objects with a "name" field
// // //                   hoverable
// // //                   onClick={() => handleSubcategoryClick(subcategory.name)}
// // //                   style={{ height: "150px" }}
// // //                 >
// // //                   <p>View products in {subcategory.name}</p>
// // //                 </Card>
// // //               </Col>
// // //             ))
// // //           ) : (
// // //             <p>No subcategories available.</p>
// // //           )}
// // //         </Row>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Category;
