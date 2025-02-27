import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Button, Radio, InputNumber, Image, Spin, Tooltip  } from "antd";
import axios from "axios";
import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext"; // Uncomment if authentication is required

const { Title, Text } = Typography;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  // const { user } = useAuth(); // Uncomment if user authentication is needed

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

  const handleCartClick1 = () => {
    // if (!user) {
    //   alert("Please log in to add items to the cart!");
    //   return;
    // }

    const user = localStorage.getItem('user');
    const userId = user._id;
    console.log(userId);

    const cartItem = {
      key: `${product._id}-${selectedSize}`,
      name: product.productName,
      price: product.price * quantity,
      size: selectedSize,
      quantity,
      userId: userId
    };

    // API call 
    try {
      const response = axios.post("http://localhost:5001/api/admin/interested-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send data to the server
      });
  
      if (!response.ok) {
        throw new Error("Failed to add interested user");
      }
  
      alert("Item added to the cart & admin notified!");
    } catch (error) {
      console.error("Error adding interested user:", error);
      alert("Failed to notify admin. Please try again.");
    }

        const data = {
          ...user,      //this means extract the info from user
            userId: userId,
            userName: user.name,
            email: user.email,
            phone: user.phone,
            productName:product.productName,

        }
    addToCart(cartItem);

    alert("Item added to cart!");
  };

  return (
    <div>
      <div style={{ padding: "20px", backgroundColor: "pink", marginRight: "20px" }}>
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
            <br />
            <Text>Quantity:</Text>
            <div>
              <InputNumber min={1} value={quantity} onChange={(value) => setQuantity(value)} />
            </div>
            <br />
            {/* <Button
              style={{ backgroundColor: "#40476D", width:'200px', marginLeft:'30%' }}
              type="primary"
              onClick={handleCartClick}
              disabled={!selectedSize}
            >
              I'm Interested
            </Button> */}
            <Tooltip style={{backgroundColor:'white'}} title={!selectedSize ? "Please select a size" : ""}>
            <Button
              style={{ backgroundColor: "#40476D", width: "200px", marginLeft: "30%" }}
              type="primary"
              onClick={ handleCartClick1 }
              disabled={!selectedSize}
            >
              I'm Interested
            </Button>
          </Tooltip>
          </Col>
        </Row>
      </div>
      <h2>Details</h2>
      <p style={{ fontSize: "18px" }}>{product?.description || "No Detailed Description Available"}</p>
    </div>
  );
};

export default Product;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Row, Col, Typography, Button, Radio, InputNumber, Image, Spin } from "antd";
// import axios from "axios";
// import { useCart } from "../../context/CartContext";
// // import { useAuth } from "../../context/AuthContext";

// const { Title, Text } = Typography;

// const Product = () => {
//   const { id } = useParams();
//   // console.log("Extracted Product ID:", id);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSize, setSelectedSize] = useState(null);
//   // const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart(); 
//   // const { user } = useAuth();


//   useEffect(() => {
//     if (!id) {
//       console.error("Product ID is missing from the URL");
//       return;
//     }
  
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/product/get-by/${id}`);
//         console.log("Fetched Product Data:", response.data);
//         setProduct(response.data.product);
//       } catch (error) {
//         console.error("Error fetching product details:", error.response?.data || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchProductDetails();
//   }, [id]);
  

//   if (loading) return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
//   if (!product) return <h2 style={{ color: "red", textAlign: "center" }}>⚠ Product Not Found</h2>;

//   // import { useAuth } from "../../context/AuthContext"; // Import authentication context

// const handleCartClick = async () => {
//   // console.log("useAuth:", useAuth);
//    // Get the logged-in user dynamically
//   //  console.log("Current User:", user);
//   // if (!user) {
//   //   alert("Please log in to add items to the cart!");
//   //   return;
//   // }

//   // const userDetails = {
//   //   userName: user.name, // Assuming 'name' is stored in auth context
//   //   email: user.email,
//   //   phone: user.phone || "N/A", // Handle cases where phone might be missing
//   //   date: new Date().toLocaleString(),
//   //   product: product.productName,
//   // };

//   const cartItem = {
//     key: `${product._id}-${selectedSize}`,
//     name: product.productName,
//     price: product.price * quantity,
//     size: selectedSize,
//     quantity,
//   };

//   // Add item to cart
//   addToCart(cartItem);

//   // Send interested user details to backend
//       try {
//         const response = await fetch("http://localhost:5001/api/interested-users/add", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userDetails),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to add interested user");
//         }

//         alert("Item added to the cart & admin notified!");
//       } catch (error) {
//         console.error("Error adding interested user:", error);
//         alert("Failed to notify admin. Please try again.");
//       }
// };


//   return (
//     <div>
//       <div style={{ padding: "20px", backgroundColor:'white', marginRight:'20px' }}>
//         <Row gutter={24}>
//           <Col span={12}>
//             <Image
//               src={product.image}
//               alt={product.productName}
//               style={{ maxWidth: "100%", borderRadius: "8px" }}
//             />
//           </Col>
//           <Col span={12}>
//             <Title level={3}>{product.productName}</Title>
//             <Title level={4}>₹{product.price}</Title>
//             <Text>
//               Product Code: <strong>{product.productCode || "N/A"}</strong>
//             </Text>
//             <br />
//             <Text>Size:</Text>
//             <div>
//               <Radio.Group onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}>
//               {Array.isArray(product?.size)
//                 ? product.size.map((size) => (
//                     <Radio.Button key={size} value={size}>
//                       {size}
//                     </Radio.Button>
//                   ))
//                     : typeof product?.size === "string"
//                 ? product.size.split(",").map((size) => (
//                     <Radio.Button key={size.trim()} value={size.trim()}>
//                       {size.trim()}
//                     </Radio.Button>
//                   ))
//                 : (
//                   <Text> No sizes available </Text>
//                 )}
//             </Radio.Group>

//             </div>
//             {/* <br />
//             <Text>Color:</Text>
//             <div>
//               <Radio.Group
//                 onChange={(e) => setSelectedColor(e.target.value)}
//                 value={selectedColor}
//               >
//                 {product.color && product.color.length > 0 ? (
//                   product.colors.map((color) => (
//                     <Radio.Button key={color} value={color}>
//                       {color.charAt(0).toUpperCase() + color.slice(1)}
//                     </Radio.Button>
//                   ))
//                 ) : (
//                   <Text> No colors available </Text>
//                 )}
//               </Radio.Group>
//             </div> */}
//             <br />
//             <Text>Quantity:</Text>
//             <div>
//               <InputNumber
//                 min={1}
//                 value={quantity}
//                 onChange={(value) => setQuantity(value)}
//               />
//             </div>
//             <br />
//             <Button
//               style={{ backgroundColor: "#40476D" }}
//               type="primary"
//               onClick={handleCartClick}
//               disabled={!selectedSize }
//             >
//               I'm Interested
//             </Button>
//           </Col>
//         </Row>
//       </div>
//       <h2>Details</h2>
//       <p style={{fontSize:'18px'}}>{product?.description || "No Detailed Description Available"}</p>
//     </div>
//   );
// };

// export default Product;
