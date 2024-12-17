import { Card, Container, Form, Row, Col, Carousel, Image, Button, Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./css/Mycar.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyCar() {
  const userId = localStorage.getItem("userId");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(3);

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
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/car/owner/get/${userId}`);
        setCars(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchCars();
    }
  }, [userId]);

  // Tính toán số trang và vị trí bắt đầu và kết thúc của các xe trên mỗi trang
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <h2>My Cars</h2>
      <Row style={{ display: "flex", justifyContent: "end", marginBottom: "40px" }}>
        <Form.Select style={{ width: "200px", marginRight: "10px" }}>
          <option>Car status</option>
          <option>Available</option>
          <option>Not Available</option>
        </Form.Select>
      </Row>

      {currentCars.length === 0 ? (
        <div>You do not have any car</div>
      ) : (
        currentCars.map((car) => (
          
          <Row key={car.id}>
            <Col>
              <Card className="card-car-item">
                <Card.Text className="card-car-text-container">
                  <Row>
                    <Col lg={12} md={12} xl={6}>
                      <Carousel className="carousel-container">
                        {car.image && car.image.length > 0 ? (
                          car.image.map((imageUrl, index) => (
                            <Carousel.Item key={index}>
                              <Image
                                src={imageUrl}
                                className="carousel-img"
                              />
                            </Carousel.Item>
                          ))
                        ) : (
                          <Carousel.Item>
                            <Image
                              src="/images/holdingwheel.jpg"
                              className="carousel-img"
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
                                Car ID:
                              </Col>
                              <Col className="pt-3 pb-3" style={{ color: "black", fontSize: "17px" }}>
                                {car.id}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6} className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                Ratings:
                              </Col>
                              <Col>
                                <Rating stars={car.averageRating || 0} size={10} />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6} className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                Bookings:
                              </Col>
                              <Col className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                {car.totalCustomers || 0}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6} className="pb-3" style={{ color: "black", fontSize: "17px" }}>
                                Status:
                              </Col>
                              <Col className="pb-3" style={{ fontSize: "17px" }}>
                                {/* {car.bookings.length > 0 ? (
                                  <span style={{ color: "red" }}>{car.bookings.status}</span>
                                ) : (
                                  <span style={{ color: "blue" }}>Khả dụng</span>
                                )} */}
                                <span style={{ color: "blue" }}>Available</span>
                              </Col>
                            </Row>
                          </Container>
                        </Col>

                        <Col md={4} style={{ textAlign: "center" }}>
                        <Row><Link to={`/car-detail/${car.id}`}>
                          <Button className="opt-btn2" style={{ width: '150px' }}>View Details</Button>
                        </Link></Row>
                        {/* <br></br>
                        <Row><Button className="opt-btn3" variant="secondary" onClick={() => handleApproveBooking(car.bookings.id)} disabled={car.bookings.status !== 'WAITING_FOR_APPROVAL'}>Approve</Button></Row>
                        <br></br>
                        <Row>
                          <Button className="opt-btn3" variant="danger" onClick={() => handleDeclineBooking(car.bookings.id)} disabled={car.bookings.status !== 'WAITING_FOR_APPROVAL'}> Decline booking</Button>
                        </Row> */}

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
      {cars.length > carsPerPage && (
        <Row className="justify-content-center mt-4" style={{textAlign: 'center', marginLeft: '500px'}}>
          <Pagination>
            {Array.from({ length: Math.ceil(cars.length / carsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
          </Pagination>
        </Row>
      )}
    </Container>
  );
}
