import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const ProductList = () => {
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/subcategory/${subcategory}/products/${products}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategory]);

  return (
    <div style={{ padding: "24px" }}>
      <h2>
        Products in "{subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}"
      </h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>⚠ {error}</p>
      ) : products.length > 0 ? (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} />}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>₹{product.price}</strong>
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠ No products found for this subcategory.
        </p>
      )}
    </div>
  );
};

export default ProductList;




// import React from "react";
// import { Card, Row, Col } from "antd";
// import { useParams } from "react-router-dom";

// const products = {
//   cleaning: [
//     {
//       id: 1,
//       name: "Mop",
//       description: "High-quality mop for cleanrooms.",
//       price: "$25.00",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Cleaning Wipes",
//       description: "Lint-free wipes for precision cleaning.",
//       price: "$15.00",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 3,
//       name: "Sanitizer",
//       description: "Effective cleanroom sanitizer.",
//       price: "$10.00",
//       image: "https://via.placeholder.com/150",
//     },
//   ],
//   apparel: [
//     {
//       id: 1,
//       name: "Cleanroom Gown",
//       description: "Protective gown for cleanroom use.",
//       price: "$50.00",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Gloves",
//       description: "Disposable gloves for cleanrooms.",
//       price: "$20.00",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 3,
//       name: "Face Mask",
//       description: "Face mask for dust-free environments.",
//       price: "$5.00",
//       image: "https://via.placeholder.com/150",
//     },
//   ],
// };

// const ProductList = () => {
//   const { subcategory } = useParams(); // Fetch the subcategory from the URL
//   const subcategoryProducts = products[subcategory] || [];

//   return (
//     <div style={{ padding: "24px" }}>
//       <h2 style={{ marginBottom: "16px" }}>
//         Products in "{subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}"
//       </h2>
//       <Row gutter={[16, 16]}>
//         {subcategoryProducts.length > 0 ? (
//           subcategoryProducts.map((product) => (
//             <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
//               <Card
//                 hoverable
//                 cover={<img alt={product.name} src={product.image} />}
//                 style={{ height: "300px" }}
//               >
//                 <h3>{product.name}</h3>
//                 <p>{product.description}</p>
//                 <p><strong>{product.price}</strong></p>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <p>No products found for this subcategory.</p>
//         )}
//       </Row>
//     </div>
//   );
// };

// export default ProductList;


//// when i have product list then uncommect this code

// import React from "react";
// import { Card, Row, Col } from "antd";
// import { useParams } from "react-router-dom";

// const products = {
//   "cleaning": [
//     {
//       id: 1,
//       name: "Mop",
//       description: "High-quality mop for cleanrooms.",
//       price: "$25.00",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Cleaning Wipes",
//       description: "Lint-free wipes for precision cleaning.",
//       price: "$15.00",
//       image: "https://via.placeholder.com/150",
//     },
//   ],
//   "apparel": [
//     {
//       id: 1,
//       name: "Cleanroom Gown",
//       description: "Protective gown for cleanroom use.",
//       price: "$50.00",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Gloves",
//       description: "Disposable gloves for cleanrooms.",
//       price: "$20.00",
//       image: "https://via.placeholder.com/150",
//     },
//   ],
// };

// const ProductList = () => {
//   const { subcategory } = useParams();

//   console.log("Current subcategory from URL:", subcategory);
//   const formattedSubcategory = subcategory?.toLowerCase().replace(/\s+/g, "-");
//   console.log("Formatted subcategory key:", formattedSubcategory);
//   const subcategoryProducts = products[formattedSubcategory];

//   return (
//     <div style={{ padding: "24px" }}>
//       <h2 style={{ marginBottom: "16px" }}>
//         Products in "{subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}"
//       </h2>

//       {subcategoryProducts && subcategoryProducts.length > 0 ? (
//         <Row gutter={[16, 16]}>
//           {subcategoryProducts.map((product) => (
//             <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
//               <Card
//                 hoverable
//                 cover={<img alt={product.name} src={product.image} />}
//                 style={{ height: "300px" }}
//               >
//                 <h3>{product.name}</h3>
//                 <p>{product.description}</p>
//                 <p>
//                   <strong>{product.price}</strong>
//                 </p>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       ) : (
//         <p>No products available for this subcategory.</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;
/////////////////////use this code 

