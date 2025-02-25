// import React from 'react'
// // import Cart from '../component/Cart/Cart'

// const Carts = () => {
//   return (
//     <div className='cart'>
//     <h1>Your cart (itemghghghghs)</h1>
//         <div className='cart_format'>
//             <p>Item</p>
//             <p>Price</p>
//             <p>Quantity</p>
//             <p>Total</p>
//         </div>
//         <hr/>

//     </div>
//   )
// }

// export default Carts



import React, { useState } from "react";
import { Table, Typography, Button, InputNumber, Row, Col, Empty } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      key: "1",
      item: {
        image: "https://via.placeholder.com/100", // Replace with the actual image URL
        name: "Motorized Shoe Cleaners: 1 Rotating Brush and 3 Stationary Brushes, HEPA Filter, Internal Vacuum CRW-SC4017-1RB-INV-HE",
      },
      price: 4700,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (value, record) => {
    const updatedItems = cartItems.map((item) =>
      item.key === record.key ? { ...item, quantity: value } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (key) => {
    const updatedItems = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={item.image} alt={item.name} style={{ width: 50, marginRight: 10 }} />
          <Text>{item.name}</Text>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          defaultValue={quantity}
          onChange={(value) => handleQuantityChange(value, record)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => `₹${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleRemoveItem(record.key)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <>
      <Link style={{textDecoration:'none', color:'black'}} to='/'> HOME</Link>
      <div style={{ padding: 20 }}>
        {cartItems.length === 0 ? (
          <Empty description={<Title level={4}>Your cart is empty</Title>} />
        ) : (
          <>
            <Title level={2}>Your Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</Title>
            <Table
              columns={columns}
              dataSource={cartItems}
              pagination={false}
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>
                    <Text strong>Grand Total:</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={2}>
                    <Text strong>₹{calculateTotal().toFixed(2)}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
            <Row justify="end" style={{ marginTop: 20 }}>
              <Col>
                <Button style={{background:'#40476D'}} type="primary" size="large">
                  Check out
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
