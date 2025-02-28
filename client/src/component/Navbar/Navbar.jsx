import React from 'react'
// import { Link } from 'react-router-dom'
import { Layout, Menu, Input} from 'antd'
import { MailOutlined, PhoneOutlined, SearchOutlined, ShoppingCartOutlined  } from '@ant-design/icons'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext.jsx"; 
// import { Badge } from "antd";


const { Header } = Layout

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { cartItems } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedUserName = localStorage.getItem('userName');
    setIsLoggedIn(!!token);
    if (storedUserName) {
      setUserName(storedUserName);
    } // Convert token existence to a boolean
  }, []);

  const handleLogout = () => {
    localStorage.setItem("cart", JSON.stringify('cart'));
    localStorage.removeItem("userToken"); // Remove token
    localStorage.removeItem('user'); 
    localStorage.removeItem("cart");
    message.success("Logged out successfully");
    setIsLoggedIn(false);
    setUserName('');
    navigate("/login"); // Redirect to login page
  };
    // const isAuthenticated = localStorage.getItem("token"); // Check if token exists

    // const handleLogout = () => {
    //     localStorage.removeItem("token"); // Remove token from storage
    //     window.location.reload(); // Refresh the page to reflect changes
    // };
    const user = JSON.parse(localStorage.getItem('user'));
    const name = user ? `${user.firstName} ${user.lastName}` : "Guest";

    return (
      <Layout className="navbar">
        <Header className="navbar-top" >
          {/* <div className="navbar-certification">Clean Room Cart</div> */}
          <div className="navbar-contact">
              <span style={{marginRight: '40px' }}>
                Welcome, {name} !
              </span>
            <Link style={{textDecoration: 'none', marginBottom:'10px'}} to="/contact_form"><span>Contact Us</span></Link>
            <span> | </span>
            {isLoggedIn ? (
              <>            
                <span style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</span>
                </>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <span>Login</span>
                </Link>
              )}
            <span> | </span>
            {/* <Link style={{ textDecoration: 'none', paddingRight:'5px', marginRight:'5px'}} to="/cart">
              <span>My Cart</span>
             // <ShoppingCartOutlined style={{ fontSize: '18px' }} />
              <Badge style={{backgroundColor:'#40476D'}} count={cartItems.length} showZero>
                <ShoppingCartOutlined style={{ fontSize: '18px' }} />
              </Badge>
            </Link> */}
            <Link style={{ textDecoration: 'none', paddingRight: '5px', marginRight: '5px', position: 'relative' }} to="/cart">
            <span style={{ marginLeft: "5px" }}>My Cart</span>
              <ShoppingCartOutlined style={{ fontSize: '22px' }} />
              {cartItems.length > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-32px', 
                  right: '-3px', 
                  color: 'red', 
                  fontSize: '14px', 
                  fontWeight: 'bold' 
                }}>
                  {cartItems.length}
                </span>
              )}
             
            </Link>
          </div>
        </Header>
        <Header className="navbar-main" style={{ backgroundColor: '#f0f0f0',marginTop: '10px' }}>
          <h1 className="navbar-logo"></h1>
          {/* <img style={{width:' 120px'}} src={logo} alt='logo'/> */}
          <Link to="/">
            <img style={{ width: "120px", cursor: "pointer", paddingTop:'18px' }} src={logo} alt="logo" />
          </Link>
          <div className="navbar-search">
            <Input
              placeholder="Search by Keyword, Item or Model"
              className="search-input"
              suffix={<SearchOutlined />}
            />
            <Button className="search-button" icon={<SearchOutlined />}></Button>
          </div>
          <div className="navbar-questions">
            
              <PhoneOutlined /> <span>Questions? Call 123-456-7890 </span>
          
            <a href="mailto:info@cleanroomworld.com" className="email-link">
              <MailOutlined /> info@cleanroomcart.com
            </a>
          </div>
        </Header>
        <Menu style={{backgroundColor:'', }} mode="horizontal" className="navbar-links">
          <Menu.Item key="home"><a href="/">Home</a></Menu.Item>
          <Menu.Item key="cleanroom-supplies"><a href="#cleanroom-supplies">Cleanroom Apparel</a></Menu.Item>
          <Menu.Item key="cleanroom-equipment"><a href="#cleanroom-equipment">Cleanroom Equipment</a></Menu.Item>
          <Menu.Item key="lab-supplies"><a href="#lab-supplies">Cleanrom furniture</a></Menu.Item>
          <Menu.Item key="safety-supplies"><a href="#safety-supplies">Cleanroom mats</a></Menu.Item>
          <Menu.Item key="esd-equipment"><a href="#esd-equipment">Sterile supply</a></Menu.Item>
          {/* <Menu.Item key="faqs"><a href="#faqs">FAQs</a></Menu.Item> */}
        </Menu>
      </Layout>
    );
  };
  
  export default Navbar;