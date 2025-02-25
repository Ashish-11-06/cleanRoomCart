import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

const Dashboard = () => {
  const [queryCount, setQueryCount] = useState(0);

  useEffect(() => {
    const fetchQueryCount = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/contact/get");
        const data = await response.json();
        setQueryCount(data.length); // Assuming API returns an array of queries
      } catch (error) {
        console.error("Error fetching query count:", error);
      }
    };

    fetchQueryCount();
  }, []);

  return (
    <div className="dashboard-container">
      <Card className="query-card">
        <Title level={4} className="card-title">Total Customer Queries</Title>
        <Title level={2} className="query-count">{queryCount}</Title>
      </Card>
      
    </div>
  );
};

export default Dashboard;
