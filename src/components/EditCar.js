import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, editCar } from './CarService';
import UseMessageAlerts from './UserMessageAlert';
import Swal from 'sweetalert2';

function EditCar() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    additionalFunction: '',
    address: '',
    basePrice: 0,
    brand: '',
    deposit: 0,
    description: '',
    fuelConsumption: 0,
    fuelType: '',
    licensePlate: '',
    mileage: 0,
    model: '',
    productionYear: 0,
    seats: 0,
    termOfUse: '',
    transmissionType: '',
  });

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

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const result = await getCarById(carId);
        setCar(result.data);
        setFormData(result.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to fetch car details');
        setShowErrorAlert(true);
      }
    };
    fetchCar();
  }, [carId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCar(carId, formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Edit car successfully!',
        showConfirmButton: true,
        confirmButtonColor: '#28a745'
      });
      navigate('/viewprofile/mycar');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update car information');
      setShowErrorAlert(true);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Chỉnh sửa thông tin xe</h2>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên xe</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Màu sắc</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tính năng bổ sung</Form.Label>
              <Form.Control
                as="textarea"
                name="additionalFunction"
                value={formData.additionalFunction}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá thuê</Form.Label>
              <Form.Control
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hãng xe</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tiền cọc</Form.Label>
              <Form.Control
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mức tiêu thụ nhiên liệu</Form.Label>
              <Form.Control
                type="number"
                name="fuelConsumption"
                value={formData.fuelConsumption}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại nhiên liệu</Form.Label>
              <Form.Control
                type="text"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Biển số xe</Form.Label>
              <Form.Control
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số km đã đi</Form.Label>
              <Form.Control
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mẫu xe</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Năm sản xuất</Form.Label>
              <Form.Control
                type="number"
                name="productionYear"
                value={formData.productionYear}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số chỗ ngồi</Form.Label>
              <Form.Control
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Điều khoản sử dụng</Form.Label>
              <Form.Control
                type="text"
                name="termOfUse"
                value={formData.termOfUse}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại hộp số</Form.Label>
              <Form.Control
                type="text"
                name="transmissionType"
                value={formData.transmissionType}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Lưu thay đổi
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditCar;