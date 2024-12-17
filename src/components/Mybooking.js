import { Card, Container, Form, Row, Col, Carousel, Image, Button, Table, Modal, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/Mybooking.css";
import { useEffect, useState } from "react";
import { getUser } from "./UserService";

import {
  cancelBooking,
  completeBooking,
  getBookingById,
} from "./BookingService";

export default function MyBooking() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(3);
  const indexOfLastCar = currentPage * bookingsPerPage;
  const indexOfFirstCar = indexOfLastCar - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstCar, indexOfLastCar);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const getUserById = async () => {
      try {
        const data = await getUser(userId);
        setUser(data.data);
        setBookings(data.data.bookingDtos);
        console.log("The user data :", data.data);
        console.log(data.data.bookingDtos);
      } catch (error) {
        console.error(error.message);
      }
    };
    getUserById();
  }, [userId]);

  const fetchBooking = async (bookingId) => {
    try {
      const response = await getBookingById(bookingId);
      const updatedBooking = response.data;
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === updatedBooking.id ? updatedBooking : booking
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await cancelBooking(bookingId);
      console.log(response.message);

      fetchBooking(bookingId);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    try {
      const response = await completeBooking(bookingId);
      console.log(response.message);

      fetchBooking(bookingId);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  

  return (
    <Container>
      <h2>My Bookings</h2>
      <Row
        style={{ display: "flex", justifyContent: "end", marginBottom: "40px" }}
      >
        <Form.Select style={{ width: "200px", marginRight: "10px" }}>
          <option>Booking status</option>
          <option>Approved</option>
          <option>Waiting for approval</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </Form.Select>
      </Row>

      <Row>
        {currentBookings && currentBookings.length === 0 ? (
          <div>You do not booked any car before</div>
        ) : (
          currentBookings.map((booking, index) => (
            <Row key={index}>
              <Card className="card-car-item">
                <Card.Text className="card-car-text-container">
                  <Row>
                    <Col lg={12} md={12} xl={6}>
                      <Carousel className="carousel-container">
                        <Carousel.Item>
                          <Image
                            src="/images/holdingwheel.jpg"
                            className="carousel-img"
                          />
                        </Carousel.Item>
                      </Carousel>
                    </Col>
                    <Col
                      style={{
                        paddingTop: "10px",
                        marginBottom: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Row>
                        <Col md={12} lg={12} xl={8}>
                          <h4 className="car-name">{booking.carName}</h4>
                          <p className="car-time">From: {booking.startDate}</p>
                          <p className="car-time">To: {booking.endDate}</p>
                          <Col className="car-table-container">
                            <Table borderless className="car-table">
                              <tbody>
                                <tr>
                                  <td>Bill:</td>
                                  <td>{booking.bill}</td>
                                </tr>
                                <tr>
                                  <td>ID :</td>
                                  <td>{booking.bookingNo}</td>
                                </tr>
                                <tr>
                                  <td>Booking status:</td>
                                  <td>{booking.status}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Col>
                        <Col md={4} style={{ textAlign: "center" }}>
                          <Row>
                            <Link to={`/car-detail/${booking.carId}`}>
                              <Button
                                className="opt-btn1"
                                style={{ width: "150px" }}
                              >
                                View Details
                              </Button>
                            </Link>
                          </Row>
                          <br></br>
                          {booking.status !== "COMPLETED" ? (
                            <div>
                              <Row>
                                <Button
                                  className="opt-btn"
                                  variant="secondary"
                                  onClick={() =>
                                    handleCompleteBooking(booking.id)
                                  }
                                  disabled={booking.status !== "APPROVED"}
                                >
                                  Completed
                                </Button>
                              </Row>
                              <br></br>
                              <Row>
                                <Button
                                  className="opt-btn"
                                  variant="danger"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  disabled={
                                    booking.status !== "WAITING_FOR_APPROVAL"
                                  }
                                >
                                  {" "}
                                  Cancel booking
                                </Button>
                              </Row>
                            </div>
                          ) : (
                            <Link to={`/viewprofile/mybooking/feedback/${booking.carId}`}><Button
                            className="opt-btn1"
                            style={{ width: "150px" }}
                          >
                            Feedback
                          </Button></Link>
                              
                            )
                          }
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Text>
              </Card>
            </Row>
          ))
        )}
        {bookings.length > bookingsPerPage && (
        <Row className="justify-content-center mt-4" style={{textAlign: 'center', marginLeft: '500px'}}>
          <Pagination>
            {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
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
      </Row>
    </Container>
  );
}