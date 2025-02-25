import React from "react";
import { Layout, Menu, Button, Space } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  LoginOutlined,
  MessageOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const isAuthenticated = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "/admin/category",
      icon: <AppstoreOutlined />,
      label: "Category",
      onClick: () => navigate("/admin/category"),
    },
    {
      key: "/admin/Subcategory",
      icon: <FolderOpenOutlined />,
      label: "Subcategories",
      onClick: () => navigate("/admin/Subcategory"),
    },
    {
      key: "/admin/product",
      icon: <ShoppingOutlined />,
      label: "Product",
      onClick: () => navigate("/admin/product"),
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => navigate("/admin/users"),
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders History",
      onClick: () => navigate("/admin/orders"),
    },
    {
      key: "/admin/interested",
      icon: <HistoryOutlined />,
      label: "Interested Users",
      onClick: () => navigate("/admin/interested"),
    },
    {
      key: "/admin/inquiries",
      icon: <MessageOutlined />,
      label: "Inquiries",
      onClick: () => navigate("/admin/inquiries"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          background: "#7C444F",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            height: "50px",
            margin: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]} // Dynamically set active menu item
          items={menuItems}
          style={{
            background: "#7C444F",
            color: "#F5F5F5",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#F39E60",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#7C444F",
              fontSize: "22px",
              fontWeight: "bold",
              padding: "5px 20px",
            }}
          >
            {isAuthenticated ? "Welcome, Admin" : "Please Login"}
          </div>
          <Space style={{ padding: "10px 20px" }}>
            {isAuthenticated ? (
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: "24px",
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
