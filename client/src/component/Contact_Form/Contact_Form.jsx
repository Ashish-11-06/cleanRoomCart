import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import axios from "axios";
import "./Contact_Form.css";

const { Title, Paragraph } = Typography;

const ContactForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:5001/api/contact/submit", values);
      message.success(response.data.message);
    } catch (error) {
      message.error("Failed to submit query. Please try again.");
    }
  };

  return (
    <div className="container1" style={{ maxWidth: 600, margin: "0 auto", padding: "40px" }}>
      <Title style={{ paddingLeft: "85px", paddingRight: "50px" }} level={2}>
        Contact Us
      </Title>
      <Paragraph>
        We're happy to answer questions or help you with returns. <br />
        Please fill out the form below if you need assistance.
      </Paragraph>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: "Please enter your full name!" }]}>
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item name="phone" label="Phone Number">
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item name="email" label="Email Address" rules={[{ required: true, message: "Email is required!", type: "email" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item name="orderNumber" label="Order Number">
          <Input placeholder="Enter your order number" />
        </Form.Item>

        <Form.Item name="companyName" label="Company Name">
          <Input placeholder="Enter your company name" />
        </Form.Item>

        <Form.Item name="comments" label="Comments/Questions" rules={[{ required: true, message: "Please enter your comments or questions!" }]}>
          <Input.TextArea rows={4} placeholder="Enter your comments or questions here" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit Form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
