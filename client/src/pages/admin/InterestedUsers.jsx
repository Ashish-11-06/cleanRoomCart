import React, { useEffect, useState } from "react";
import { Table, Card, Spin } from 'antd';

const InterestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const userId = "67b6ffcadd55f21e9666ac95"; 

  useEffect(() => {
  const response =  fetch("http://localhost:5001/api/admin/interested-users")
      // .then(response)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching interested users:", error);
        setLoading(false);
      });
  }, []);
  const userId = localStorage.getItem("userId");
  // useEffect(() => {
  //   if (!userId) {
  //     console.error("User ID is not available");
  //     setLoading(false);
  //     return;
  //   }

  //   fetch(`http://localhost:5001/api/cart/get`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching cart items:", error);
  //       setUsers([]); 
  //       setLoading(false);
  //     });
  // }, [userId]); 

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }
  ];

  const data = []; // Will be populated from API

  return (
    <Card title="Interested Users">
      {loading ? <Spin size="large" /> : 
      <Table columns={columns} dataSource={users ? users: data} />}
    </Card>
  );
};

export default InterestedUsers; 