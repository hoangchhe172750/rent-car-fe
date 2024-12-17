import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "./css/CarOwner.css";
import { useNavigate } from "react-router-dom";
const HompageForCarOwner = () => {
  const navigate = useNavigate();
  const handleListCar = () => {
    navigate("/owner-list-car");
  }

  return (
    <div className="big-container">
      <div className="homepage-owner-container">
        <h1>Have a car for rent? Don’t miss out on your benefit</h1>
        <br/>
        <div className="features">
          <div className="feature">
            <h3>💰 How the insurance works</h3>
            <p>
              From the minute you hand the keys over till the second you get
              them back you are covered. Your private insurance is not affected.
            </p>
          </div>
          <div className="feature">
            <h3>🆓 It’s completely free</h3>
            <p>
              We offer both owners and renters free sign ups. It’s only once a
              vehicle is rented out that a share is deducted to cover admin and
              insurance.
            </p>
          </div>
          <div className="feature">
            <h3>💲 You decide the price</h3>
            <p>
              When you list a car you decide the price. We can help with
              recommendations as to price, but ultimately you decide!
            </p>
          </div>
          <div className="feature">
            <h3>🚗 Handing over your vehicle</h3>
            <p>
              You arrange the time and location for the exchange of your vehicle
              with the renter. Both parties will need to agree and sign the
              vehicle rental sheet before and after key handover.
            </p>
          </div>
          <div className="feature">
            <h3>⚠️ You are in charge</h3>
            <p>
              All renters are pre-screened by us to ensure safety and get your
              approval. If you do not feel comfortable with someone you are able
              to decline a booking.
            </p>
          </div>
          <div className="feature">
            <h3>💵 Set payment</h3>
            <p>
              We pay you once a month and you can always view how much your car
              has earned under your user profile.
            </p>
          </div>
        </div>
        <div className="btn-container">
          <h2>Make money on your car right away</h2>
          <br/>
          <button className="cta-button btn-success">List Your Car Today</button>
        </div>
      </div>

    <hr />

  
    </div>
  );
};

export default HompageForCarOwner;