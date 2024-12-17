import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/Header.css';

function Header() {
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName");

    return (
        <div className='container-fluid'>
            <div className='header'>

                {userRole && (
                    <>
                        {userRole === 'OWNER' && (
                            <Link to={'/homepagecon'} className='logo'>
                                <img src='/images/1.png' alt='MiCar' />
                            </Link>
                        )}
                        {userRole === 'CUSTOMER' && (
                            <Link to={'/homepagectm'} className='logo'>
                                <img src='/images/1.png' alt='MiCar' />
                            </Link>
                        )}
                    </>
                )}

                {!userRole && (
                    <Link to={'/'} className='logo' replace>
                        <img src='/images/1.png' alt='MiCar' />
                    </Link>
                )}

                <div className='menu-header'>
                    <div className='nav-links'>
                        <Link to={'/about'} className='nav-link'>About Us</Link>
                        {userRole === 'OWNER' && (
                            <Link to={'/viewprofile/registercar'} className='nav-link'>Add A New Car</Link>
                        )}
                        {userRole === 'CUSTOMER' && (
                            <Link to={'/viewprofile/mybooking'} className='nav-link'>My Booking</Link>
                        )}

                    </div>
                    <div className='vertical-line'></div>
                    <div className='buttons'>

                        {userName ? (
                            <Link to="/viewprofile" style={{ fontWeight: '700', textDecoration: 'none', color: 'black', marginTop: '7px' }}>Welcome, {userName}</Link>
                        ) : (
                            <>
                                <button className='btn2'><Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>Sign Up</Link></button>
                                <button className='btn1'><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Log In</Link></button>
                            </>
                        )}
                    </div>
                </div>


            </div>
        </div >
    )
}

export default Header

