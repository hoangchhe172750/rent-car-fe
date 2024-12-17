import { Button, Col, Form, Row } from "react-bootstrap";
import "./css/SignUp.css";
import { React, useState } from "react";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProcessSpinner from "./Spinner";

function SignUp() {
  const [formData, setFormData] = useState({
    nationalId: "",
    name: "",
    birthday: null,
    phone: "",
    email: "",
    password: "",
    address: "",
    drivingLicense: "",
    wallet: 100000000,
    role: "",

  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleReset = () => {
    setFormData({
      ...formData,
      password: "",
      confirmPassword: "",
    });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!'
      });
      return;
    }

    const dataToSend = { ...formData };
    delete dataToSend.confirmPassword;
    delete dataToSend.agreeToTerms;

    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/register", dataToSend);
      console.log(response);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your account has been created successfully!',
        showConfirmButton: true,
        confirmButtonColor: '#28a745'
      }).then((result) => {
        if (result.isConfirmed) {
          handleReset();
          window.location.href = '/login';
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
      });
      setIsProcessing(false);
      console.error("Error signing up:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setFormData({
      ...formData,
      birthday: dateString || null,
    });
  };

  return (
    <div className="register-container">
      <h4>REGISTER NEW ACCOUNT</h4>
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="signupName" className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="text"
              placeholder="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupNatioalId" className="mb-3">
          <Form.Label>Your National ID</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i class="bi bi-person-vcard"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="text"
              placeholder="Your national ID"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupBirthday" className="mb-3">
          <Form.Label>Your Birthday</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i class="bi bi-calendar-date"></i>
            </span>
            <DatePicker
              name="birthday"
              onChange={handleDateChange}
              selected={formData.birthday ? dayjs(formData.birthday) : null}
              format="YYYY-MM-DD"
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupPhone" className="mb-3">
          <Form.Label>Your phone number</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-telephone"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="text"
              placeholder="Your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupEmail" className="mb-3">
          <Form.Label>Your email address</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="email"
              placeholder="Your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupPassword" className="mb-3">
          <Form.Label>Pick a password</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="password"
              placeholder="Pick a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Form.Text className="text-muted">
            Use at least one letter, one number, and seven characters.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupAddress" className="mb-3">
          <Form.Label>Your address</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-house"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="text"
              placeholder="Your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="signupDrivingLicense" className="mb-3">
          <Form.Label>Your driving license number</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-car-front-fill"></i>
            </span>
            <Form.Control
              style={{ marginBottom: '0px' }}
              type="text"
              placeholder="Your driving license"
              name="drivingLicense"
              value={formData.drivingLicense}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Row>
          <Col md={7}>
            <Form.Check
              type="radio"
              label="I want to rent a car"
              name="role"
              value="CUSTOMER"
              onChange={handleChange}
              className="mb-2"
              checked={formData.role === "CUSTOMER"}
            />
          </Col>
          <Col md={5}>
            <Form.Check
              type="radio"
              label="I am a car owner"
              name="role"
              value="OWNER"
              onChange={handleChange}
              className="mb-3"
              checked={formData.role === "OWNER"}
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form.Check
              type="checkbox"
              label="I have read and agree with the Terms and Conditions"
              name="agreeToTerms"
              onChange={handleChange}
              checked={formData.agreeToTerms}
              className="mb-3"
            />
          </Col>
          <Col md={4}>
            <a href="/terms" className="terms-link">
              Terms of Use
            </a>
          </Col>
        </Row>
        <Button variant="success"
          style={{
            color: "white",
            border: "none",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "0.8rem 1.6rem",
            transition: "all 0.3s ease",
          }}
          type="submit"
          className="custom-btn w-100"
          disabled={!formData.agreeToTerms}
        >
          {isProcessing ? (
            <ProcessSpinner message='Registering...' />
          ) : (
            <>
              <i className="bi bi-person-plus-fill"></i>
              {" REGISTER"}
            </>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;