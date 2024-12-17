import { Card, Container, Row, Form, Button, Col } from "react-bootstrap";
import './css/ChangePassword.css';
import { useState } from "react";
import { changeUserPassword } from "./UserService";
import Swal from "sweetalert2";
import axios from "axios";

export default function ChangePassword() {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordAgain, setShowNewPasswordAggain] = useState(false);
    

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const userId = localStorage.getItem("userId");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'New pasword and Confirm new password do not match.',
              });
              handleReset();
            
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/user/change-password/${userId}`, formData);
            console.log(response.message);
            handleReset();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your password has been changed successfully!',
                showConfirmButton: true,
                confirmButtonColor: '#28a745'
              })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Current password is wrong. Try again!',
              });
              handleReset();
              console.error('Lỗi đăng nhập:', error);
            console.error(error.message);
        }
    }

    const handleReset = () => {
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    };

    return (
        <Container>
            <Row>
                <h2>Change Password</h2>
                <p style={{ fontSize: '17px' }}>Please enter your current password to change password</p>
            </Row>

            <Row>
                <Card>
                    <Card.Text style={{ color: 'black', padding: '20px' }} className="card-text-container">
                        <h4 className="change-pass-title">Enter password</h4>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 current-password-form" >
                                <Form.Label className="form-lable">Current password</Form.Label>
                                <Form.Control
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={formData.currentPassword}
                                    name="currentPassword"
                                    onChange={handleInputChange}
                                    required
                                />
                                <i
                                    className={showCurrentPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                </i>
                            </Form.Group>
                            <Form.Group className="mb-3 new-password-form" >
                                <Form.Label className="form-lable">New password</Form.Label>
                                <Form.Control
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={formData.newPassword}
                                    name="newPassword"
                                    onChange={handleInputChange}
                                    required
                                />
                                <i
                                    className={showNewPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                                    onClick={() => setShowNewPassword(!showNewPassword)}>
                                </i>
                            </Form.Group>
                            <Form.Group className="mb-3 new-password-again-form" >
                                <Form.Label className="form-lable">Confirm new password</Form.Label>
                                <Form.Control
                                    type={showNewPasswordAgain ? 'text' : 'password'}
                                    value={formData.confirmNewPassword}
                                    name="confirmNewPassword"
                                    onChange={handleInputChange}
                                    required
                                />
                                <i
                                    className={showNewPasswordAgain ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                                    onClick={() => setShowNewPasswordAggain(!showNewPasswordAgain)}>
                                </i>
                            </Form.Group>

                            <Col style={{ textAlign: 'right' }}>
                                <Button
                                    variant="success"
                                    className="change-password-btn"
                                    type="submit"
                                    >Confirm</Button>
                            </Col>

                        </Form>
                    </Card.Text>

                </Card>
            </Row>

        </Container>
    );
}