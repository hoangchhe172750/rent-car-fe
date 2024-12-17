import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Homepage from './components/Homepage';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import ViewProfile from './components/ViewProfile';
import Footer from './components/Footer';
import CreateRegisterCarForm from './components/CreateRegisterCarForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomepageForCarOwner from './components/HomePageForCarOwner';
import CarRentalForm from './components/HomepageForCustomer';
import CarDetail from './components/CarDetailForCustomer';
import CarDetailForOwner from './components/CarDetailForCarOwner';
import EmailVerification from "./components/EmailVerification";
import Search from './components/Search';
import MyBooking from './components/Mybooking';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import Review from './components/Review';
import MyCar from './components/MyCar';
import BookingRequest from './components/BookingRequest';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import MyWallet from './components/MyWallet';
import EditCar from './components/EditCar';

function App() {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    if (storedUsername && storedUserRole && storedUserId) {
      setUsername(storedUsername);
      setUserRole(storedUserRole);
      setUserId(storedUserId);
    }
  }, []);

  const noFooterPaths = ['/login', '/signup', '/forgot-password'];

  return (
    <Row className="justify-content-center">
      <Col>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Homepage />} />
          <Route path='/email-verification' element={<EmailVerification/>}/>

          {/* Protected Routes */}
          <Route
            path="/homepagecon"
            element={
              <PrivateRoute allowedRoles={['OWNER']}>
                <HomepageForCarOwner />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute allowedRoles={['OWNER']}>
                <CreateRegisterCarForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/homepagectm"
            element={
              <PrivateRoute allowedRoles={['CUSTOMER']}>
                <CarRentalForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/*"
            element={
              <PrivateRoute allowedRoles={['OWNER', 'CUSTOMER']}>
                <ViewProfile
                  userId={userId}
                  username={username}
                  userRole={userRole}
                  setUsername={setUsername}
                  setUserRole={setUserRole}
                  setUserId={setUserId}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute allowedRoles={['CUSTOMER']}>
                <Search />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/viewprofile/registercar"
            element={
              <PrivateRoute allowedRoles={['OWNER']}>
                <CreateRegisterCarForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/mycar"
            element={
              <PrivateRoute allowedRoles={['OWNER']}>
                <MyCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/bookingrequest"
            element={
              <PrivateRoute allowedRoles={['OWNER']}>
                <BookingRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/mybooking"
            element={
              <PrivateRoute allowedRoles={['CUSTOMER']}>
                <MyBooking />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/account"
            element={
              <PrivateRoute allowedRoles={['OWNER','CUSTOMER']}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/changepass"
            element={
              <PrivateRoute allowedRoles={['OWNER','CUSTOMER']}>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/wallet"
            element={
              <PrivateRoute allowedRoles={['OWNER','CUSTOMER']}>
                <MyWallet />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/car-detail/:carId"
            element={
              <PrivateRoute allowedRoles={['CUSTOMER', 'OWNER']}>
                <CarDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/car-detail/owner/:carId"
            element={
              <PrivateRoute allowedRoles={['OWNER']}>
                <CarDetailForOwner />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-car/:carId"
            element={
              <PrivateRoute allowedRoles={['OWNER']}>
                <EditCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewprofile/mybooking/feedback/:carId"
            element={
              <PrivateRoute allowedRoles={['CUSTOMER']}>
                <Review />
              </PrivateRoute>
            }
          />
          <Route
            path="/reset-password"
            element={<NewPassword />}
          />
        </Routes>
        {!noFooterPaths.includes(location.pathname) && <Footer />}
      </Col>
    </Row>
  );
}

export default App;
