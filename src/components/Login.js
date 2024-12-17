import React, {useEffect, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { loginUser } from './AuthService';
import UseMessageAlerts from './UserMessageAlert';

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
  UseMessageAlerts();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
        if (!credentials.email || !credentials.password) {
            setErrorMessage("Please, enter a valid username and password");
            setShowErrorAlert(true);
            return;
        }
        try {
            const data = await loginUser(credentials.email, credentials.password);
            localStorage.setItem("authToken", data.token);
            const decoded = jwtDecode(data.token);
            console.log(decoded);
            localStorage.setItem("userRoles", JSON.stringify(decoded.roles));
            const userIn4 = await axios.get(`http://localhost:8080/api/v1/user/get/${decoded.id}`);
            console.log(userIn4.data);
            localStorage.setItem("email", decoded.sub);
            localStorage.setItem("userName", userIn4.data.data.name);
            localStorage.setItem("userRole", userIn4.data.data.role);
            localStorage.setItem("userId", userIn4.data.data.id);
            console.log(userIn4.data.data.id);
            clearLoginForm();
            if(userIn4.data.data.role === "OWNER") {
              navigate('/homepagecon');
            }
            if(userIn4.data.data.role === "CUSTOMER") {
              navigate('/homepagectm');
            }
        }  catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Thông tin tài khoản hoặc mật khẩu sai. Vui lòng thử lại.',
      });
      clearLoginForm();
      console.error('Lỗi đăng nhập:', error);
    }
  };

  const clearLoginForm = () => {
    setCredentials({ email: "", password: "" });
    setShowErrorAlert(false);
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <h4>ĐĂNG NHẬP</h4>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email của bạn</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <Form.Control
            style={{marginBottom: '0px'}}
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <Form.Control
            style={{marginBottom: '0px'}}
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <span className="input-group-text" onClick={togglePasswordVisibility}>
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </span>
          </div>
        </Form.Group>
        <div className="d-flex justify-content-between mt-3">
          <Link 
            to="/signup" 
            style={{ 
              color: '#28a745', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Đăng ký tài khoản mới
          </Link>
          <Link 
            to="/forgot-password" 
            style={{ 
              color: '#dc3545', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Quên mật khẩu?
          </Link>
        </div>
        <br></br>
        <Button
          variant="success"
          style={{
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '0.8rem 1.6rem',
            transition: 'all 0.3s ease',
          }}
          type="submit"
          className="custom-btn w-100"
        >
          <i className="bi bi-box-arrow-in-right"></i> ĐĂNG NHẬP
        </Button>
        
      </Form>
    </div>
    
  );
}

export default Login;
