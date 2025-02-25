import React from 'react';
import { Table, Card } from 'antd';

const InterestedUsers = () => {
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
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default InterestedUsers; 