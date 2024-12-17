import { Col, Container, Row, Card, Button, Image, Modal, Form, Nav } from "react-bootstrap";
import './css/ViewProfile.css';
import {  useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faWallet } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import MyBooking from "./Mybooking";
import ChangePassword from "./ChangePassword";
import MyCar from "./MyCar";
import RegisterCar from "./RegisterCar";
import MyWallet from "./MyWallet";
import { getUser } from "./UserService";
import BookingRequest from "./BookingRequest";

export default function ViewProfile() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const userRole = localStorage.getItem("userRole");
    const username = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();
    console.log(userId);

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('email');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('isButtonClicked')
        
        navigate('/');
    }
    

    return (
        <Container fluid className='view-profile-container'>
            <Row style={{ width: '90%', margin: 'auto' }}>
                <Col sm={4} md={4} lg={3} className='left-container'>
                    <h2>Hi {username}!</h2>
                    <hr />

                    <Nav className="flex-column left-sidebar-nav">
                        <Nav.Link as={NavLink} to="/viewprofile/account" >
                            <i className="bi bi-person"></i>&nbsp;My Account
                        </Nav.Link>
                        {userRole === 'CUSTOMER' && (
                            <Nav.Link as={NavLink} to="/viewprofile/mybooking" >
                            <i className="bi bi-geo-fill"></i>&nbsp;My Bookings
                        </Nav.Link>
                        )}
                        {userRole === 'OWNER' && (
                            <Nav.Link as={NavLink} to="/viewprofile/mycar" >
                            <i className="bi bi-car-front-fill"></i>&nbsp;My Cars
                        </Nav.Link>
                        )}
                        {userRole === 'OWNER' && (
                            <Nav.Link as={NavLink} to="/viewprofile/bookingrequest" >
                            <i className="bi bi-car-front-fill"></i>&nbsp;Booking Requests
                        </Nav.Link>
                        )}
                        {userRole === 'OWNER' && (
                            <Nav.Link as={NavLink} to="/viewprofile/registercar" >
                            <FontAwesomeIcon icon={faCarSide} />&nbsp;Register Car
                        </Nav.Link>
                        )}
                        <Nav.Link as={NavLink} to="/viewprofile/wallet" >
                            <FontAwesomeIcon icon={faWallet}/>&nbsp;My Wallet
                        </Nav.Link>
                        <hr />
                        <Nav.Link as={NavLink} to="/viewprofile/changepass" >
                            <i className="bi bi-lock"></i>&nbsp;Change Password
                        </Nav.Link>
                        <Nav.Link onClick={handleLogout} style={{ color: 'red' }}>
                            <i className="bi bi-box-arrow-left"></i>&nbsp;Log Out
                        </Nav.Link>
                    </Nav>
                </Col>

                <Col sm={8} md={8} lg={9} className="right-container">
                        <Routes>
                            <Route path="/account" element={<Profile />} />
                            <Route path="/mybooking" element={<MyBooking />} />
                            <Route path="/bookingrequest" element={<BookingRequest/>}/>
                            <Route path="/mycar" element={<MyCar />} />
                            <Route path="/registercar" element={<RegisterCar />} />
                            <Route path="/changepass" element={<ChangePassword />} />
                            <Route path="/wallet" element={<MyWallet/>}/>
                        </Routes>
                </Col>
            </Row>
        </Container>
    );
}