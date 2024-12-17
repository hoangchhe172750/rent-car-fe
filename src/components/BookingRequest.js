import React, { useEffect, useState } from 'react'
import { getUser } from './UserService';
import { approveBooking, declineBooking, getBookingById } from './BookingService';
import { Button, Card, Carousel, Col, Container, Form, Image, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./css/Mycar.css";
function BookingRequest() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const getUserById = async () => {
            try {
                const data = await getUser(userId);
                setUser(data.data);
                setBookings(data.data.bookingDtos || []);
                console.log("User: ", data.data);
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

    const handleApproveBooking = async (bookingId) => {
        try {
            const response = await approveBooking(bookingId);
            console.log(response.message);
            
            fetchBooking(bookingId);
        } catch (error) {
            console.log(error.response.data.message);
            
        }
    };
    
    const handleDeclineBooking = async (bookingId) => {
        try {
            const response = await declineBooking(bookingId);
            console.log(response.message);
            
            fetchBooking(bookingId);
        } catch (error) {
            console.log(error.response.data.message);
            
        }
    };
  return (
    <Container>
      <h2>Booking Requests</h2>
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
        {bookings && bookings.length <= 0 ? (
            <div>You do not have any booking request</div>
        ) : (
            bookings.map((booking, index) => (
                <Row key={index}>
                  <Card className="card-car-item">
                    <Card.Text className="card-car-text-container">
                      <Row>
                        <Col lg={12} md={12} xl={6}>
                          <Carousel className="carousel-container">
                            <Carousel.Item>
                              <Image src="/images/holdingwheel.jpg" className="carousel-img" />
                            </Carousel.Item>
                            <Carousel.Item>
                              <Image src="/images/holdingwheel.jpg" className="carousel-img" />
                            </Carousel.Item>
                            <Carousel.Item>
                              <Image src="/images/holdingwheel.jpg" className="carousel-img" />
                            </Carousel.Item>
                          </Carousel>
                        </Col>
                        <Col style={{ paddingTop: "10px", marginBottom: "10px", paddingLeft: "10px", }}>
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
                              
                              <br></br>
                              <Row><Button className="opt-btn" variant="secondary" onClick={() => handleApproveBooking(booking.id)} disabled={booking.status !== 'WAITING_FOR_APPROVAL'}>Approved</Button></Row>
                              <br></br>
                              <Row>
                                <Button className="opt-btn" variant="danger" onClick={() => handleDeclineBooking(booking.id)} disabled={booking.status !== 'WAITING_FOR_APPROVAL'}> Decline booking</Button>
                              </Row>
      
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card>
                </Row>
              ))
        )}
        
      </Row>
    </Container>
  );
}

export default BookingRequest