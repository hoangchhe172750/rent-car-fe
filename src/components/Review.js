import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import axios from "axios";
import Swal from "sweetalert2";
import './css/Review.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

function Review() {
    const {carId} = useParams();
    const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [existingReview, setExistingReview] = useState(null);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const navigate = useNavigate();


  useEffect(() => {
    const fetchExistingReview = async () => {
      try {
          const customerId = localStorage.getItem('userId');
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`http://localhost:8080/api/v1/review/customer/car/${customerId}/${carId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
          setExistingReview(response.data);
          console.log(existingReview)
          setRating(response.data.rating);
          setFeedback(response.data.comment);
      } catch (error) {
          console.log(error.message);
      }
  };
  fetchExistingReview();
}, [carId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
      const reviewInfo = {
        rating: rating,
        comment: feedback,
      };

      try {
        const customerId = localStorage.getItem('userId');
            const token = localStorage.getItem('authToken');
            let response;
            if (existingReview) {
                // Nếu đã có review trước đó, cập nhật review cũ
                response = await axios.put(`http://localhost:8080/api/v1/review/update/${existingReview.id}`, reviewInfo, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            } else {
                // Nếu chưa có review trước đó, tạo review mới
                response = await axios.post(`http://localhost:8080/api/v1/review/add?customerId=${customerId}&carId=${carId}`, reviewInfo, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            }
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Create feedback successfully!',
          showConfirmButton: true,
          confirmButtonColor: '#28a745'
        }).then((result) => {
          if(result.isConfirmed) {
            navigate('/viewprofile/mybooking');
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    
  };
  return (
    <div className="rating-form-container">
  <h3 className="text-center mb-4">Đánh giá</h3>
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="starRating" className="mb-3">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Form.Label style={{ fontSize: "15px", color: "grey" }}>
          Chất lượng của xe:
        </Form.Label>
        <div className="ms-3">
          <ReactStars
            count={5}
            onChange={handleRatingChange}
            size={20}
            activeColor="#ffd700"
            value={rating}
          />
        </div>
      </div>
    </Form.Group>

    <Form.Group controlId="feedbackText" className="mb-3">
      <Form.Label style={{ fontSize: "15px", color: "grey" }}>
        Viết đánh giá
      </Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Để lại đánh giá..."
      />
    </Form.Group>

    <Row>
      <Col md={3}></Col>
      <Col md={6}>
        <Button
          variant="primary"
          type="submit"
          className="mt-3 submitBtn"
          style={{ width: "100%" }}
        >
          Hoàn Thành
        </Button>
      </Col>
    </Row>
  </Form>
</div>

  )
}

export default Review