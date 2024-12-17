// import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
// import { Form } from 'react-router-dom'
// import { resetPassword, validateToken } from './AuthService';
// import ProcessSpinner from './Spinner';

// function NewPassword() {
//     const [newPassword, setNewPassword] = useState("");
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [tokenStatus, setTokenStatus] = useState("PENDING");
//     const [showPassword, setShowPassword] = useState(false);

//     const queryParams = new URLSearchParams(window.location.search);
//     const token = queryParams.get("token");

    
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//       };

//     useEffect(() => {
//         if (token) {
//             validateToken(token)
//                 .then((response) => {
//                     setTokenStatus(response.message);
//                 })
//                 .catch((error) => {
//                     console.log(error.response.data.message);
//                 });
//         }
//     }, [token]);


//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsProcessing(true);
//         try {
//             const data = await resetPassword(token, newPassword);
//             console.log(data.message);
            
//         } catch (error) {
//             console.log(error.response.data.message);
            
//         }
//         setIsProcessing(false);
//     };
//   return (
//     <div className="register-container">
//       <h4>CREATE NEW PASSWORD</h4>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="newPassword" className="mb-3">
//           <Form.Label>New Password</Form.Label>
//           <div className="input-group">
//             <span className="input-group-text">
//               <i className="bi bi-lock"></i>
//             </span>
//             <Form.Control
//             style={{marginBottom: '0px'}}
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Mật khẩu"
//               name="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <span className="input-group-text" onClick={togglePasswordVisibility}>
//               <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//             </span>
//           </div>
//         </Form.Group>
//         <br></br>
//         <Button
//           variant="success"
//           style={{
//             color: 'white',
//             border: 'none',
//             fontWeight: 'bold',
//             borderRadius: '8px',
//             padding: '0.8rem 1.6rem',
//             transition: 'all 0.3s ease',
//           }}
//           type="submit"
//           className="custom-btn w-100"
//         >
//           {isProcessing ? (
//             <ProcessSpinner message='Registering...' />
//           ) : (
//             <>
//               <i className="bi bi-person-plus-fill"></i>
//               {" CREATE"}
//             </>
//           )}
//         </Button>
        
//       </Form>
//     </div>
//   )
// }

// export default NewPassword

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import { resetPassword, validateToken } from './AuthService';
import ProcessSpinner from './Spinner';
import Swal from 'sweetalert2';

function NewPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [tokenStatus, setTokenStatus] = useState("PENDING");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (token) {
            validateToken(token)
                .then((response) => {
                    setTokenStatus(response.message);
                    if (response.message !== "VALID") {
                        setError("Invalid or expired token");
                    }
                })
                .catch((error) => {
                    setError(error.response?.data?.message || "Token validation failed");
                });
        } else {
            setError("No reset token provided");
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Reset previous messages
        setError(null);
        setSuccess(null);

        // Validate password (example validation)
        // if (newPassword.length < 8) {
        //     setError("Password must be at least 8 characters long");
        //     return;
        // }

        // // Check token status before submitting
        // if (tokenStatus !== "VALID") {
        //     setError("Cannot reset password. Invalid or expired token.");
        //     return;
        // }

        setIsProcessing(true);
        try {
            const data = await resetPassword(token, newPassword);
            setSuccess(data.message || "Password reset successfully");
            
            // Redirect to login after successful password reset
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Create new password successfully!',
                showConfirmButton: true,
                confirmButtonColor: '#28a745'
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/login';
                }
              });
        } catch (error) {
            setError(error.response?.data?.message || "Failed to reset password");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="register-container">
            <h4>CREATE NEW PASSWORD</h4>
            
            {/* {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                    {success}
                </Alert>
            )} */}

            <form onSubmit={handleSubmit}>
                <Form.Group controlId="newPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-lock"></i>
                        </span>
                        <Form.Control
                            style={{marginBottom: '0px'}}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                        <span 
                            className="input-group-text" 
                            onClick={togglePasswordVisibility}
                            style={{cursor: 'pointer'}}
                        >
                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </span>
                    </div>
                </Form.Group>
                
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
                    // disabled={isProcessing || tokenStatus !== "VALID"}
                >
                    {isProcessing ? (
                        <ProcessSpinner message='Resetting...' />
                    ) : (
                        <>
                            <i className="bi bi-lock-fill"></i>
                            {" RESET PASSWORD"}
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}

export default NewPassword;