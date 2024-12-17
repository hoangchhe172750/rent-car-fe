import React from 'react'
import './css/CreateRegisterCarForm.css';
import UseMessageAlerts from './UserMessageAlert';
function AddCarImage() {
    const [file, setFile] = useState(null);
    const [car, setCar] = useState(null);

    const {
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        showSuccessAlert,
        setShowSuccessAlert,
        showErrorAlert,
        setShowErrorAlert,
    } = UseMessageAlerts();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setErrorMessage(""); // Clear error if file is valid
        } else {
            setErrorMessage("Please select a valid image file.");
            setShowErrorAlert(true);
        }
    };

    const getCar = async () => {
        try {
            const result = await getCarById(carId);
            setCar(result.data);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to fetch car details");
            setShowErrorAlert(true);
        }
    };

    useEffect(() => {
        getCar();
    }, [carId]);

    // Handle image upload
    const handleImageUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setErrorMessage("No file selected for upload.");
            setShowErrorAlert(true);
            return;
        }

        try {
            const response = await updateCarPhoto(carId, file);
            setSuccessMessage("Photo uploaded successfully!");
            setCar((prevCar) => ({
                ...prevCar,
                photoUrl: response.data.photoUrl, // Update the image dynamically
            }));
            setShowSuccessAlert(true);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to upload photo");
            setShowErrorAlert(true);
        }
    };

    useEffect(() => {
        if (showSuccessAlert || showErrorAlert) {
            const timeout = setTimeout(() => {
                setShowSuccessAlert(false);
                setShowErrorAlert(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [showSuccessAlert, showErrorAlert]);
  return (
        <Container className="car-infor-container">
            <h6 className="car-register-title">Hình ảnh</h6>
            <span className="script">
                Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của bạn.
            </span>
    
            {/* <Form.Control type="file" multiple className="car-image-input" /> */}
            {/* <input type="file" className="car-image-input"/> */}
            <Form.Group controlId="formFile" className="mb-3 col-md-7">
                <div className="upload-container">
                    <label htmlFor="file-upload" className="upload-label">
                        {imagePreview ? (
                            <div className="preview-box">
                                <img src={imagePreview} alt="Preview" className="preview-img" />
                            </div>
                        ) : (
                            <>
                                <i className="bi bi-cloud-arrow-up"></i>
                                <p>Chọn hình ảnh</p>
                            </>
                        )}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        hidden
                        onChange={handleFileChange} // Handle file upload
                    />
                </div>
            </Form.Group>
        </Container>
    );
}

export default AddCarImage
