import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/Search.css'
import { Button, Card, Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import { bookingService } from './BookingService';
import Swal from 'sweetalert2';
import { getUser } from './UserService';

function Search() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [address, setAddress] = useState('');
    const [carData, setCarData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('WALLET');
    const [pickUpTime, setPickUpTime] = useState(null);
    const [dropOffTime, setDropOffTime] = useState(null);
    const [user, setUser] = useState(null);

    const userRole = localStorage.getItem("userRole")
    const customerId = localStorage.getItem("userId");
    
    const navigate = useNavigate();
    const Rating = ({ stars }) => {
        return (
            <div>
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        color={index < stars ? "gold" : "lightgray"}
                        size={15}
                        className="me-1"
                    />
                ))}
            </div>
        );
    };

    useEffect(() => {
        const getUserById = async () => {
            try {
                const data = await getUser(customerId);
                setUser(data.data);
                console.log("The user data :", data.data);
                
            } catch (error) {
                
                console.error(error.message);
            }
        };
        getUserById();
    }, [customerId]);

    const calculateTotalRentalCost = (basePrice, startDate, endDate) => {
        // Tính số ngày thuê xe        
        const oneDay = 24 * 60 * 60 * 1000; // Số milliseconds trong một ngày        
        const diffDays = Math.round(Math.abs((new Date(endDate) - new Date(startDate)) / oneDay));
        // Tính tổng số tiền phải trả        
        const totalRentalCost = basePrice * diffDays;
        return totalRentalCost;
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Ngăn trình duyệt reload khi submit form
        const queryParams = {};
        if (address) queryParams.address = address;

        try {
            const response = await axios.get('http://localhost:8080/api/v1/car/search', { params: queryParams });
            console.log(response)
            setCarData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Lỗi khi tìm kiếm xe:', error);
        }
    };

    const handleBooking = async (carId) => {

        setIsProcessing(true);
        try {
            const response = await bookingService(carId, customerId, startDate, endDate, paymentMethod);
            console.log(response.message || "Booking successful!");
            handleReset();
            Swal.fire({
                icon: 'success',
                title: 'Bạn đã đặt xe thành công!',
                text: 'Yêu cầu của bạn sẽ được gửi tới chủ xe!',
                showConfirmButton: true,
                confirmButtonColor: '#28a745'
            }).then((result) => {
                if (result.isConfirmed) {
                    handleReset();
                    navigate('/viewprofile/mybooking');
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Book Failed',
                text: error.response?.data?.message || 'Something went wrong. Please try again.',
              });
            console.log(error.response?.data?.message || "Booking failed.");
        } finally {
            setIsProcessing(false);
        }
    };
    const handleReset = () => {
        setAddress('');
        setStartDate('');
        setEndDate('');
    };


    return (
        <div className="form-search">
            <h3>Tìm chiếc xe lý tưởng cho chuyến đi của bạn</h3>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label>Địa điểm</label>
                    <input
                        type="text"
                        placeholder="Enter your location"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Ngày thuê xe</label>
                    <div className="datetime">
                        <input
                            type="date"
                            
                            value={startDate}
                            required
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="time"
                            value={pickUpTime}
                            onChange={(e) => setPickUpTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Ngày trả xe</label>
                    <div className="datetime">
                        <input
                            type="date"
                            
                            value={endDate}
                            required
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <input
                            type="time"
                            value={dropOffTime}
                            onChange={(e) => setDropOffTime(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="search-button">
                    Tìm kiếm
                </button>
            </form>
            <br></br>
            {carData.length === 0 ? (
                <div></div>
            ) : (
                carData.map((car) => (
                    <Row key={car.id}>
                        <Col>
                            <Card className="card-car-item1">
                                <Card.Text className="card-car-text-container1">
                                    <Row>
                                        <Col lg={12} md={12} xl={4}>
                                            <Carousel className="carousel-container1">
                                                {car.image && car.image.length > 0 ? (
                                                    car.image.map((imageUrl, index) => (
                                                        <Carousel.Item key={index}>
                                                            <Image
                                                                src={imageUrl}
                                                                className="carousel-img1"
                                                            />
                                                        </Carousel.Item>
                                                    ))
                                                ) : (
                                                    <Carousel.Item>
                                                        <Image
                                                            src="/images/holdingwheel.jpg"
                                                            className="carousel-img1"
                                                        />
                                                    </Carousel.Item>
                                                )}
                                            </Carousel>
                                        </Col>

                                        <Col style={{ paddingTop: "10px", marginBottom: "10px", paddingLeft: "10px" }}>
                                            <Row>
                                                <Col md={12} lg={12} xl={8}>
                                                    <h4 className="text-center" style={{ color: "black" }}>
                                                        {car.name} {car.brand}
                                                    </h4>
                                                    <Container>
                                                        <Row>
                                                            <Col md={6} className="pt-3 pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                ID:
                                                            </Col>
                                                            <Col className="pt-3 pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                {car.id}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                Đánh giá:
                                                            </Col>
                                                            <Col>
                                                                <Rating stars={car.averageRating || 0} size={10} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                Giá thuê:
                                                            </Col>
                                                            <Col className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                {new Intl.NumberFormat("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                }).format(car.basePrice)}<span>/ngày</span>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                Tổng tiền thuê:
                                                            </Col>
                                                            <Col className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                {startDate && endDate ?
                                                                    new Intl.NumberFormat("vi-VN", {
                                                                        style: "currency",
                                                                        currency: "VND",
                                                                    }).format(calculateTotalRentalCost(car.basePrice, startDate, endDate))
                                                                    : 'Chưa chọn ngày'}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6} className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                                                Trạng thái:
                                                            </Col>
                                                            <Col className="pb-3" style={{ fontSize: "17px" }}>
                                                                {car.bookings.length > 0 ? (
                                                                    <span style={{ color: "red" }}>Không khả dụng</span>
                                                                ) : (
                                                                    <span style={{ color: "blue" }}>Khả dụng</span>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Col>

                                                <Col style={{ textAlign: "center" }}>
                                                    <Row>
                                                        <Link to={`/car-detail/${car.id}`}>
                                                            <Button className="btnDetail">Xem chi tiết</Button>
                                                        </Link>
                                                    </Row>
                                                    <br></br>
                                                    {userRole === 'CUSTOMER' ? (
                                                        <Row>
                                                            <Button className="btnDetail" onClick={() => handleBooking(car.id)} style={{ marginLeft: '115px' }} 
                                                            disabled={user.wallet < calculateTotalRentalCost(car.basePrice, startDate, endDate)}>Đặt xe</Button>
                                                        </Row>
                                                    ) : (
                                                        <div>
                                                            
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                ))
            )}
        </div>
    );
}

export default Search;
