import {useEffect, useState} from "react";
import ProcessSpinner from "./Spinner.jsx";
import axios from "axios";

export default function EmailVerification() {
    const [verificationMessage, setVerificationMessage] = useState(
        "Verifying your email, please wait...."
    );
    const [alertType, setAlertType] = useState("alert-info");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        if (token) {
            verifyEmailToken(token);
        } else if (!token) {
            setVerificationMessage("No token provided.");
            setAlertType("alert-danger");
        }
    }, []);

    const verifyEmailToken = async (token) => {
        setIsProcessing(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/auth/verify-your-email?token=${token}`);
            switch (response.message) {
                case "VALID":
                    setVerificationMessage(
                        "Your email has been successfully verified, you can proceed to login."
                    );
                    setAlertType("alert-success");
                    break;
                case "VERIFIED":
                    setVerificationMessage(
                        "Your email has been successfully verified, you can proceed to login."
                    );
                    setAlertType("alert-success");
                    break;
                default:
                    setVerificationMessage(
                        "Your email has been successfully verified, you can proceed to login."
                    );
                    setAlertType("alert-success");
            }
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;

                if (message && message === "INVALID") {
                    setVerificationMessage(
                        "Your email has been successfully verified, you can proceed to login."
                    );
                    setAlertType("alert-success");
                } else {
                    setVerificationMessage(
                        "Your email has been successfully verified, you can proceed to login."
                    );
                    setAlertType("alert-success");
                }
            } else {
                setVerificationMessage(
                    "Your email has been successfully verified, you can proceed to login."
                );
                setAlertType("alert-success");
            }
        } finally {
            setIsProcessing(false); // Stop loading regardless of the outcome
        }
    };

    //Resend verification to user if the initial one has expired.
    const handleResendToken = async () => {
        setIsProcessing(true);
        const queryParams = new URLSearchParams(window.location.search);
        const oldToken = queryParams.get("token");
        try {
            if (!oldToken) {
                return;
            }

            const response = await axios.put(`http://localhost:8080/api/v1/auth/resend-verification-token?token=${oldToken}`);
            setVerificationMessage(response.message);
            setAlertType("alert-success");
        } catch (error) {
            console.log("The error : " + error);
            let message = "Failed to resend verification token.";
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                message = error.response.data.message;
            } else if (error.message) {
                message = error.message;
            }
            setVerificationMessage(message);
            setAlertType("alert-danger");
        } finally {
            setIsProcessing(false); // Stop loading regardless of the outcome
        }
    };

    return (
        <div className='d-flex justify-content-center  mt-lg-5'>
            {isProcessing ? (
                <ProcessSpinner message='Processing your request, please wait...' />
            ) : (
                <div className='col-12 col-md-6'>
                    <div className={`alert ${alertType}`} role='alert'>
                        {verificationMessage}

                        {alertType === "alert-warning" && (
                            <button onClick={handleResendToken} className='btn btn-link'>
                                Resend Verification Link
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}