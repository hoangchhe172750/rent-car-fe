import { Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './css/CreateRegisterCarForm.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


export default function CreateRegisterCarForm() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    console.log(userId);

    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        // name: "",
        // color: "gray",
        // additionalFunction: "",
        // address: "",
        // basePrice: 1000000,
        // brand: "",
        // deposit: 600000,
        // description: "",
        // fuelConsumption: 9.0,
        // fuelType: "",
        // licensePlate: "",
        // mileage: 15000,
        // model: "",
        // productionYear: 2022,
        // seats: 5,
        // termOfUse: "No smoking",
        // transmissionType: "",
        name: "BMW X5",
        color: "Gray",
        additionalFunction: "Parking Assist, Surround Sound System",
        address: "Hà Nội",
        basePrice: 1800000,
        brand: "BMW",
        deposit: 600000,
        description: "Luxury SUV with premium features and dynamic performance",
        fuelConsumption: 9.0,
        fuelType: "Diesel",
        licensePlate: "LUX8888",
        mileage: 15000,
        model: "X5 M50i",
        productionYear: 2022,
        seats: 5,
        termOfUse: "Daily, weekly, and monthly rental available",
        transmissionType: "Automatic",
    });

    const [newFormData, setNewFormData] = useState({ ...formData });

    const handleChangeForm = (e) => {
        const { name, value, type } = e.target;

        setNewFormData((prev) => ({
            ...prev,
            [name]:
                type === "number" || (!isNaN(value) && ["seats", "productionYear", "price", "deposit", "mileage"].includes(name))
                    ? +value : value
        }));
    };

    const handleSubmitCar = async () => {
        // Validate form data
        if (!validateFormData()) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Prepare the payload for API submission
            const payload = {
                ...newFormData,
                additionalFunction: Array.isArray(newFormData.additionalFunction)
                    ? newFormData.additionalFunction.join(", ")
                    : newFormData.additionalFunction,
                basePrice: newFormData.price, // Convert to base price
            };

            
                // Make API call to add car
                const response = await axios.post(`http://localhost:8080/api/v1/car/add?ownerId=${userId}`, payload);
                console.log(response.data)

                // Reset form and navigate
                setNewFormData({ ...formData });

                // Optional: Show success message or navigate to car list
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Add new car successfully!',
                    showConfirmButton: true,
                    confirmButtonColor: '#28a745'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = '/viewprofile/mycar';
                    }
                  });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Car Registration Failed',
                text: 'License Plate already',
              });
            // Handle network or unexpected errors
            console.error("Car registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateFormData = () => {
        // Implement comprehensive form validation
        const requiredFields = [
            'licensePlate', 'name', 'brand', 'model', 'seats',
            'productionYear', 'transmissionType', 'fuelType',
            'fuelConsumption', 'description', 'address', 'price',
            'deposit'
        ];

        for (let field of requiredFields) {
            if (!newFormData[field]) {
                setError(`Please fill in the ${field} field`);
                return false;
            }
        }

        // Additional validations
        if (newFormData.price <= 0) {
            setError("Price must be greater than 0");
            return false;
        }

        if (newFormData.deposit <= 0) {
            setError("Deposit must be greater than 0");
            return false;
        }

        return true;
    };

    const handleNextPage = () => {
        if (page === 1) {
            handleSubmitCar();
        } else {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        setPage(page - 1);
    };

    const renderPage = () => {
        switch (page) {
            case 0:
                return <CarInformation newFormData={newFormData} handleChangeForm={handleChangeForm} />;
            case 1:
                return <CarHired newFormData={newFormData} handleChangeForm={handleChangeForm} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <Container fluid className="register-car-page-container">
            <Row>
                <span style={{ marginLeft: '30px' }}>
                    <i class="bi bi-chevron-left" ></i> &nbsp;
                    <Link to={"/viewprofile"} style={{ color: 'black', textDecoration: 'none' }}>Back</Link>
                </span>

            </Row>

            <Row>
                <Col>
                    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Register Car</h2>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Card style={{ border: 'none', borderRadius: '0px' }}>
                        <Card.Text className="card-header-container">
                            <ul>
                                <li className={page == 0 ? "circle-option-active" : "circle-option-deactive"}>1</li>
                                <li>
                                    <i class="bi bi-chevron-right"></i>
                                </li>
                                <li className={page == 1 ? "circle-option-active" : "circle-option-deactive"}>2</li>

                            </ul>
                        </Card.Text>

                        <Card.Text className="card-body-container">
                            {renderPage()}
                        </Card.Text>

                        <Card.Footer className="card-footer-container">
                            <Button disabled={page == 0 ? true : false} variant="outline-success" onClick={handlePreviousPage} className="footer-btn">Previous</Button>
                            <Button variant="success" onClick={handleNextPage} className="footer-btn">{page == 1 ? "Submit" : "Next"}</Button>
                        </Card.Footer>


                    </Card>
                </Col>
            </Row>


        </Container>
    );
}

function CarInformation({ newFormData, handleChangeForm }) {
    const year = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

    const numberOfSeats = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const transmission = ["Số sàn", "Số tự động"];

    const fuel = ["Xăng", "Dầu diesel", "Điện", "Xăng điện"];

    const addFunction = [
        { image: "/map.png", name: "Bản đồ" },
        { image: "/bluetooth.png", name: "Bluetooth" },
        { image: "/cam360.png", name: "Camera 360" },
        { image: "/camht.png", name: "Camera hành trình" },
        { image: "/gps.png", name: "Định vị GPS" },
        { image: "/usb.png", name: "Khe cắm USB" }
    ];

    console.log(newFormData);


    const toggleSelect = (feature) => {
        const updatedFunctions = newFormData.additionalFunction.includes(feature.name)
            ? newFormData.additionalFunction.filter((f) => f !== feature.name) // Deselect
            : [...newFormData.additionalFunction, feature.name]; // Select

        handleChangeForm({
            target: {
                name: "additionalFunction",
                value: updatedFunctions,
            },
        });
    };

    return (
        <Container className="car-infor-container">
            <Form>
                <h6 className="car-register-title">License Plate</h6>
                

                <Form.Group className="mb-5 col-md-6">
                    <Form.Control
                        type="text"
                        name="licensePlate"
                        value={newFormData.licensePlate}
                        onChange={handleChangeForm}
                    />
                </Form.Group>

                <h6 className="car-register-title">Basic Information</h6>
                

                <Row>
                    <Form.Group className="mb-3 col-md-6">
                        <Form.Label className="form-lable-basic-infor">Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newFormData.name}
                            onChange={handleChangeForm}
                        />
                    </Form.Group>

                    {/* Hãng xe */}
                    <Form.Group className="mb-3 col-md-6">
                        <Form.Label className="form-lable-basic-infor">Brand</Form.Label>
                        <Form.Control
                            type="text"
                            name="brand"
                            value={newFormData.brand}
                            onChange={handleChangeForm}
                        />
                    </Form.Group>

                    {/* Mẫu xe */}
                    <Form.Group className="mb-3 col-md-6">
                        <Form.Label className="form-lable-basic-infor">Model</Form.Label>
                        <Form.Control
                            type="text"
                            name="model"
                            value={newFormData.model}
                            onChange={handleChangeForm}
                        />
                    </Form.Group>

                    {/* Số ghế */}
                    <Form.Group className="mb-3 col-md-6">
                        <Form.Label className="form-lable-basic-infor">Seats</Form.Label>

                        <Form.Select onChange={handleChangeForm} name="seats" value={newFormData.seats}>
                            {
                                numberOfSeats.map((seat, index) => (
                                    <option key={`seat-${index}`} value={+seat}>{seat}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    {/* Năm sản xuất */}
                    <Form.Group className="mb-3 col-md-6">
                        <Form.Label className="form-lable-basic-infor">Production Year</Form.Label>

                        <Form.Select onChange={handleChangeForm} name="productionYear"
                            value={newFormData.productionYear}>
                            {
                                year.map((year, index) => (
                                    <option key={`year-${index}`} value={+year}>{year}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    {/* Truyền động */}
                    <Form.Group className="mb-3 col-md-6">
                        <Form.Label className="form-lable-basic-infor">Transmission Type</Form.Label>

                        <Form.Select onChange={handleChangeForm} name="transmissionType"
                            value={newFormData.transmissionType}>
                            {
                                transmission.map((trans, index) => (
                                    <option key={`trans-${index}`} value={trans}>{trans}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    {/* Loại nhiên liệu */}
                    <Form.Group className="mb-3 col-md-6">
                        <Form.Label className="form-lable-basic-infor">Fuel Type</Form.Label>

                        <Form.Select onChange={handleChangeForm} name="fuelType" value={newFormData.fuelType}>
                            {
                                fuel.map((fuel, index) => (
                                    <option key={`fuel-${index}`} value={fuel}>{fuel}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Row>

                {/* Mức tiêu thụ nhiên liệu */}
                <h6 className="car-register-title" style={{ marginTop: "20px" }}>Fuel Consumption</h6>
                <span className="script">
                    Số lít nhiên liệu cho quãng đường 100km.
                </span>
                <Form.Group className="mb-5 col-md-6">
                    <Form.Control
                        type="number"
                        name="fuelConsumption"
                        value={newFormData.fuelConsumption}
                        onChange={handleChangeForm}
                    />
                </Form.Group>

                {/* Mô tả */}
                <h6 className="car-register-title" style={{ marginTop: "20px", marginBottom: '20px' }}>Description</h6>
                <Form.Group className="mb-5 ">
                    <Form.Control
                        as="textarea" rows={3}
                        name="description"
                        value={newFormData.description}
                        onChange={handleChangeForm}
                        type="text"
                    />
                </Form.Group>

                {/* Tính năng */}
                <h6 className="car-register-title" style={{ marginTop: '20px', marginBottom: '20px' }}>Function</h6>
                <Row>
                    {addFunction.map((f, index) => (
                        <Col md={6} lg={4} key={index}>
                            <Card
                                onClick={() => toggleSelect(f)}
                                className={newFormData.additionalFunction.includes(f.name) ? "card-fnc-selected" : "card-fnc-nonselected"}
                            >
                                <Card.Text className="card-fnc-text-container">
                                    <Image src={`/images/${f.image}`} style={{ height: '50%' }} />
                                    <br />
                                    <span style={{ fontSize: '15px', color: 'black' }}>{f.name}</span>
                                </Card.Text>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Container>
    );
}

function CarHired({ newFormData, handleChangeForm }) {

    // const handlePrice = (e) => {
    //     handleChangeForm({
    //         target: {
    //             name: e.target.name,
    //             value: +e.target.value * 1000,
    //         },
    //     });
    // };

    console.log(newFormData);


    // const priceInK = newFormData.price / 1000 || 0;

    return (
        <Container className="car-infor-container">
            <h6 className="car-register-title">Base Price</h6>
            <span className="script" style={{ marginBottom: '15px' }}>
            Price applies to all days
            </span>

            <span className="script" style={{ marginBottom: '20px' }}>
            Suggested price: 470K
            </span>

            <Col className="car-price-container">
                <Form.Group className="col-md-6">
                    <Form.Control
                        type="number"
                        name="price"
                        value={newFormData.price}
                        onChange={handleChangeForm}
                    />
                </Form.Group>
                <span style={{ fontSize: '15px' }}>&nbsp;K</span>
            </Col>

            <h6 className="car-register-title" style={{ marginBottom: '20px' }}>Address</h6>

            <Form.Group className="mb-5">
                <Form.Control
                    type="text"
                    name="address"
                    value={newFormData.address}
                    onChange={handleChangeForm}
                    placeholder="Địa chỉ mặc định để giao nhận xe."
                />
            </Form.Group>

            <h6 className="car-register-title" >Mileage</h6>
            <span className="script">
            Total distance traveled (km)
            </span>

            <Form.Group className="mb-5 col-md-6">
                <Form.Control
                    type="number"
                    name="mileage"
                    value={newFormData.mileage}
                    onChange={handleChangeForm}
                />
            </Form.Group>

            <h6 className="car-register-title" >Deposit</h6>

            <Form.Group className="mb-5 col-md-6 mt-4">
                <Form.Control
                    type="number"
                    name="deposit"
                    value={newFormData.deposit}
                    onChange={handleChangeForm}
                />
            </Form.Group>
        </Container>
    );
}

