import React, { useEffect, useState } from "react";
import { Table, Card } from 'antd';


const InterestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/interested-users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching interested users:", error);
        setLoading(false);
      });
  }, []);

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
      {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={users} />}
    </Card>
  );
};

export default InterestedUsers; 