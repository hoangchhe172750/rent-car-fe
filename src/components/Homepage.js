import React, { useEffect, useState } from 'react';
import './css/Homepage.css';
import { DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Button, Col, Row, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Homepage() {

  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/car/get/allcars')
          setCarData(response.data.data);
          console.log(response.data.data)
      } catch(error) {
        console.error('Lỗi khi lấy dữ liệu xe:', error);
      };
    }
    fetchCars();
  }, []);
  const locationData = [
    { name: 'Hà Nội', imageUrl: '/images/hanoi3.jpg' },
    { name: 'Hồ Chí Minh', imageUrl: '/images/hcm2.jpg' },
    { name: 'Đà Nẵng', imageUrl: '/images/danang.jpg' }
  ];

  return (
    <div className="homepage">
      <div className='backgroundImage' style={{
        backgroundImage: 'url("./images/2.jpg")',
        height: '500px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '10px'
      }}>
        <div className='content'>
          <h1>MiCar&nbsp;-&nbsp;Cùng&nbsp;Bạn Đến Mọi Hành&nbsp;Trình</h1>
          <hr style={{ border: '1px solid white', margin: '10px 0' }} />
          <h6 style={{ color: 'white', textAlign: 'center' }}>Trải nghiệm sự khác biệt từ <span style={{ color: 'green', fontWeight: 'bold' }}>hơn 10,000 xe</span> gia đình đời mới khắp Việt Nam</h6>
        </div>
      </div>

      <div className='homepage-content'>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Xe Dành Cho Bạn</h1>
        <div className='homepage-content-items'>
          <Row>
            {
              carData.map((car, index) => (
                <Col sm={12} md={6} lg={6} xl={4} key={`car-${index}`}>
                  <Link to={`/product/${index}`} style={{ textDecoration: 'none' }}>
                    <Card className='card-item'>
                      <Card.Img variant="top" src="/images/2.jpg" />
                      <Card.Body>
                        <Card.Title className='card-car-title'>{car.name}</Card.Title>
                        <Card.Text className='card-car-text'>
                          <i class="bi bi-geo-alt-fill"></i>
                          <span>{car.address}</span>
                        </Card.Text>
                        <hr />
                        <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div >
                            <i class="bi bi-luggage-fill" ></i>
                            <span className='card-car-price-text'>{car.totalCustomers} chuyến</span>
                          </div>
                          <div>
                            <span className='card-car-price'>{car.basePrice / 1000}K</span>
                            <span className='card-car-price-text'>/ngày</span>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            }


            {/* <Col sm={12} md={4} lg={4} xl={3}>
              <Link to={"/product/1"} style={{ textDecoration: 'none' }}>
                <Card className='card-item'>
                  <Card.Img variant="top" src="/images/2.jpg" />
                  <Card.Body>
                    <Card.Title className='card-car-title'>TOYOTA FORTUNER 2013</Card.Title>
                    <Card.Text className='card-car-text'>
                      <i class="bi bi-geo-alt-fill"></i>
                      <span>TP.Hồ Chí Minh</span>
                    </Card.Text>
                    <hr />
                    <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div >
                        <i class="bi bi-luggage-fill" ></i>
                        <span className='card-car-price-text'>10 chuyến</span>
                      </div>
                      <div>
                        <span className='card-car-price'>723K</span>
                        <span className='card-car-price-text'>/ngày</span>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col> */}
          </Row>
        </div>
      </div>

      <div className='top-location-content'>
        <Row className='top-location-title'>
          <h1>Địa Điểm Nổi Bật</h1>
        </Row>
        <div className='location-items-content'>
          <Row>
            {
              locationData.map((locate, index) => (
                <Col xl={4} lg={6} md={6} sm={12} key={`location-${index}`}>
                  <Card className="card-location" >
                    <Card.Img src={locate.imageUrl} className="card-location-image" />
                    <Card.ImgOverlay className="card-overlay">
                      <Card.Title className="card-title">{locate.name}</Card.Title>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>

      <div className='explorer-item'>
        <Row>
          <Col md={12} lg={6}>
            <Card style={{ border: 'none', borderRadius: '16px' }}>
              <Card.Img src="/images/holdingwheel.jpg" className='explorer-item-image' />
              <Card.ImgOverlay className='explorer-item-overlay'>
                <h2 className='explorer-item-title' >Bắt đầu hành trình ngay</h2>
                <p className='explorer-item-text'>Tự tay cầm lái chiếc xe bạn yêu thích
                  cho hành trình thêm hứng khởi.</p>
                <Button className="explorer-item-btn" variant='success' >Thuê xe</Button>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col md={12} lg={6}>
            <Card style={{ border: 'none', borderRadius: '16px' }}>
              <Card.Img src="/images/holdingwheel2.jpg" className='explorer-item-image' />
              <Card.ImgOverlay className='explorer-item-overlay'>
                <h2 className='explorer-item-title' >Bạn muốn cho thuê xe?</h2>

                <p className='explorer-item-text'>Đăng ký trở thành đối tác của chúng tôi ngay hôm nay để gia tăng thu nhập hàng tháng.</p>
                <Button className='explorer-item-btn' variant='success' as={Link} to={'/create'} >Đăng kí xe</Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </div>

      <hr />


    </div>
  );
}


export default Homepage;