import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { requestPasswordReset } from './AuthService';
import ProcessSpinner from './Spinner';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const data = await requestPasswordReset(email);
            console.log(data.message);
            setEmail("");
        } catch (error) {
            console.log(error.response.data.message);
        }
        setIsProcessing(false);
    };
    return (
        <div className="register-container">
            <h4>Request Reset Password</h4>
            <br></br>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Your Email</Form.Label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                        </span>
                        <Form.Control
                            style={{ marginBottom: '0px' }}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </Form.Group>
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
                    {isProcessing ? (
                        <ProcessSpinner message='Registering...' />
                    ) : (
                        <>
                            <i className="bi bi-person-plus-fill"></i>
                            {" SEND LINK"}
                        </>
                    )}
                </Button>

            </Form>
        </div>
    )
}

export default ForgotPassword