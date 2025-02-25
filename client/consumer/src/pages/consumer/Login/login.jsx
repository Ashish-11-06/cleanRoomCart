
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { loginApi } from '../../../utils/api'; // Ensure this function is correctly implemented
import './login.css';

const Login = () => {
  const navigate = useNavigate(); // Navigation after login

  const handleSubmit = async (values) => {
    try {
      const data = await loginApi(values);

      if (data.token) {
        localStorage.setItem("userToken", data.token);// Store JWT token
        message.success('Login successful');
        navigate("/"); // Redirect to consumer dashboard
      } else {
        message.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error("An error occurred");
    }
  };

  return (
    <div className="container">
      <Form onFinish={handleSubmit}> {/* Ensure this is present */}
        <h2>Login</h2>
        <Form.Item name="email" style={{paddingLeft:'10px', paddingRight:'10px'}} rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" style={{paddingLeft:'10px', paddingRight:'10px'}} rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Login</Button>
        <p style={{paddingLeft:'99px'}}>Don't have an account? <Link to="/signup">Create account</Link></p>
      </Form>
    </div>
  );
};

export default Login;
