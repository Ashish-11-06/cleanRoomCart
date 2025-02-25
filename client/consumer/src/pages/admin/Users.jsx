import React from 'react';
import { Table, Card } from 'antd';

const Users = () => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }
  ];

  const data = []; // Will be populated from API

  return (
    <Card title="User Information">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default Users; 