import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Input, Button } from 'antd'
import { MailOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import './Navbar.css'
import logo from '../../assets/logo.png'

const { Header } = Layout

const Navbar = () => {
    const isAuthenticated = localStorage.getItem("token"); // Check if token exists

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from storage
        window.location.reload(); // Refresh the page to reflect changes
    };

    return (
      <Layout className="navbar">
        <Header className="navbar-top" >
          {/* <div className="navbar-certification">Clean Room Cart</div> */}
          <div className="navbar-contact">
            <Link style={{textDecoration: 'none'}} to="/contact_form"><span>Contact Us</span></Link>
            <span> | </span>
            {/* {isAuthenticated ? (
                <button onClick={handleLogout} style={{ textDecoration: "none", cursor: "pointer" }}>
                    Logout
                </button>
            ) : (
                <Link style={{ textDecoration: "none" }} to="/login">
                    <span>Login</span>
                </Link>
            )} */}
            <Link style={{textDecoration: 'none'}} to="/login"><span>Login</span></Link>
            <span> | </span>
            <Link style={{textDecoration: 'none'}} to= "/cart"><span>My Cart</span></Link>
          </div>
        </Header>
        <Header className="navbar-main" style={{ backgroundColor: '#f0f0f0',marginTop: '10px' }}>
          <h1 className="navbar-logo"></h1>
          <img style={{width:' 120px'}} src={logo} alt='logo'/>
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
        <Menu style={{backgroundColor:''}} mode="horizontal" className="navbar-links">
          <Menu.Item key="home"><a href="/">Home</a></Menu.Item>
          <Menu.Item key="cleanroom-supplies"><a href="#cleanroom-supplies">Cleanroom Supplies</a></Menu.Item>
          <Menu.Item key="cleanroom-equipment"><a href="#cleanroom-equipment">Cleanroom Equipment</a></Menu.Item>
          <Menu.Item key="lab-supplies"><a href="#lab-supplies">Lab Supplies</a></Menu.Item>
          <Menu.Item key="safety-supplies"><a href="#safety-supplies">Safety Supplies</a></Menu.Item>
          <Menu.Item key="esd-equipment"><a href="#esd-equipment">ESD Equipment</a></Menu.Item>
          <Menu.Item key="faqs"><a href="#faqs">FAQs</a></Menu.Item>
        </Menu>
      </Layout>
    );
  };
  
  export default Navbar;