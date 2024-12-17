import "./css/CarDetailforCustormer.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse } from "react-bootstrap";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaStar, FaCar, FaPaintBrush, FaWater, FaBluetooth, FaMapMarkerAlt, FaCamera, FaUsb, FaCompactDisc, FaCarSide, FaLock, FaBaby, FaStickyNote, FaBan, FaCheck, FaIdCard, } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { getCarById } from "./CarService";

function CarDetail() {
  const images = [
    "/images/holdingwheel.jpg",
    "/images/danang.jpg",
    "/images/hanoi.jpg",
  ];

  const [showAll, setShowAll] = useState(false);


  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const [carDetails, setCarDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const { carId } = useParams();
  const userRole = localStorage.getItem("userRole");

  const getCar = async () => {
    setIsLoading(true);
    try {
      const result = await getCarById(carId);
      console.log("The response :", result);
      setCarDetails(result.data);
      setReviews(result.data.reviews);
      setIsLoading(false);
    } catch (error) {
      console.error("The error message :", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCar();
  }, [carId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const Rating = ({ stars }) => {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            color={index < stars ? "gold" : "lightgray"}
            className="me-1"
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <hr className="pb-0 mb-0"></hr>

      <div style={{ backgroundColor: "white" }} className="mt-0 pt-3 pb-3">
        <Container className="mt-5">
          <Row className="align-items-stretch">
            <Col md={7} className="d-flex align-items-center me-5">
              <div
                className="image-container"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "500px",
                  overflow: "hidden",
                }}
              >
                <button
                  className="nav-button prev-button"
                  onClick={handlePrevious}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    cursor: "pointer",
                  }}
                >
                  {"<"}
                </button>
                <img
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <button
                  className="nav-button next-button"
                  onClick={handleNext}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    cursor: "pointer",
                  }}
                >
                  {">"}
                </button>
              </div>
            </Col>
            <Col md={4}>
              <Row className="mb-3 mt-5">
                <Col>
                  <h3 className="" style={{ fontWeight: "700px" }}>
                    {carDetails.name}
                  </h3>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3}>
                  <h5 className="" style={{ fontWeight: "500px" }}>
                    Đánh giá:
                  </h5>
                </Col>
                <Col className="d-flex align-items-center">
                  <Rating stars={carDetails.averageRating} />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3}>
                  <h5 className="" style={{ fontWeight: "500px" }}>
                    Lượt thuê:
                  </h5>
                </Col>
                <Col xs={3}>{carDetails.totalCustomers}</Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3}>
                  <h5 className="" style={{ fontWeight: "500px" }}>
                    Giá:
                  </h5>
                </Col>
                <Col xs={3}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(carDetails.basePrice)}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3}>
                  <h5 className="" style={{ fontWeight: "500px" }}>
                    Vị trí:
                  </h5>
                </Col>
                <Col xs={3}>{carDetails.address}</Col>
              </Row>
              <Row className="mb-3">
                <Col xs={3}>
                  <h5 className="" style={{ fontWeight: "500px" }}>
                    Trạng thái:
                  </h5>
                </Col>
                <Col xs={3} style={{ color: "green" }}>
                  Available
                </Col>
              </Row>
              {userRole === 'OWNER' ? (
                <Row className="mb-3">
                <Col xs={3}>
                  <Link to={`/edit-car/${carId}`}>
                  <Button className="opt-btn2" style={{ width: '150px' }}>Edit Car</Button>
                  </Link>
                </Col>
              </Row>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>

        <Container className="mt-5">
          <Row>
            <Col md={7}>
              <Container>
                <Row className="mb-3">
                  <Col>
                    <h4 style={{ fontWeight: "400" }}>Mô tả</h4>
                    <p>{carDetails.description}</p>
                  </Col>
                </Row>
                <Row>
                  <hr></hr>
                  <Col className="mt-3 mb-3">
                    <h4 style={{ fontWeight: "400" }}>Thông tin cơ bản</h4>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaPaintBrush size={20} color="90ee90" />
                        </Col>
                        <Col>
                          <Container>
                            <Row style={{ color: "grey" }}>Màu</Row>
                            <Row
                              style={{ fontWeight: "500", fontSize: "20px" }}
                            >
                              {carDetails.color}
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaCar size={20} color="90ee90" />
                        </Col>
                        <Col>
                          <Container>
                            <Row style={{ color: "grey" }}>Số ghế</Row>
                            <Row
                              style={{ fontWeight: "500", fontSize: "20px" }}
                            >
                              {carDetails.seats}
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                  {/* <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaGasPump size={20} color="90ee90" />
                        </Col>
                        <Col>
                          <Container>
                            <Row style={{ color: "grey" }}>Bình xăng</Row>
                            <Row
                              style={{ fontWeight: "500", fontSize: "20px" }}
                            >
                              45 lít
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col> */}
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaWater size={20} color="90ee90" />
                        </Col>
                        <Col>
                          <Container>
                            <Row style={{ color: "grey" }}>Tiêu thụ</Row>
                            <Row
                              style={{ fontWeight: "500", fontSize: "20px" }}
                            >
                              {carDetails.fuelConsumption}L/100km
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <hr></hr>
                  <Col className="mt-3">
                    <h4 style={{ fontWeight: "400" }}>Chi tiết</h4>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          style={{ color: "grey", display: "inline" }}
                        >
                          Hãng xe:
                        </Col>
                        <Col
                          md={3}
                          className="ms-3"
                          style={{
                            display: "inline",
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          {carDetails.brand}
                        </Col>
                        <Col
                          md={2}
                          style={{ color: "grey", display: "inline" }}
                        >
                          Biển số:
                        </Col>
                        <Col
                          md={3}
                          className="ms-3"
                          style={{
                            display: "inline",
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          {carDetails.licensePlate}
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md={3}
                          style={{ color: "grey", display: "inline" }}
                        >
                          Năm sản xuất:
                        </Col>
                        <Col
                          md={3}
                          className="ms-3"
                          style={{
                            display: "inline",
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          {carDetails.productionYear}
                        </Col>
                        <Col
                          md={2}
                          style={{ color: "grey", display: "inline" }}
                        >
                          Kiểu:
                        </Col>
                        <Col
                          md={3}
                          className="ms-3"
                          style={{
                            display: "inline",
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >
                          {carDetails.model}
                        </Col>
                      </Row>
                      <Row>
                        <p style={{ color: "grey" }}>Giấy tờ cần thiết:</p>
                        <Col md={1}></Col>
                        <Col
                          md={4}
                          className="border"
                          style={{ borderRadius: "5px" }}
                        >
                          <Container className="pt-3 pb-3">
                            <Row>
                              <Col md={1}>
                                <FaIdCard color="#90ee90" />
                              </Col>
                              <Col>Giấy phép lái xe + Hộ chiếu</Col>
                            </Row>
                          </Container>
                        </Col>
                        <Col
                          md={2}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div>Hoặc</div>
                        </Col>
                        <Col
                          md={4}
                          className="border"
                          style={{ borderRadius: "5px" }}
                        >
                          <Container className="pt-3 pb-3">
                            <Row>
                              <Col md={1}>
                                <FaIdCard color="#90ee90" />
                              </Col>
                              <Col>Giấy phép lái xe + Căn cước công dân</Col>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <hr></hr>
                  <Col className="mt-3">
                    <h4 style={{ fontWeight: "400" }}>Tính năng</h4>
                  </Col>
                </Row>
                <Row className="mb-4 mt-3">
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaBluetooth size={20} color="90ee90" />
                        </Col>
                        <Col>Bluetooth</Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaMapMarkerAlt size={20} color="90ee90" />
                        </Col>
                        <Col>GPS</Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaUsb size={20} color="90ee90" />
                        </Col>
                        <Col>Ổ USB</Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaCompactDisc size={20} color="90ee90" />
                        </Col>
                        <Col>Đầu DVD</Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row className="mb-4 mt-3">
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaCamera size={20} color="90ee90" />
                        </Col>
                        <Col>Camera hành trình</Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaCarSide size={20} color="90ee90" />
                        </Col>
                        <Col>Cửa sổ trời Panorama</Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaLock size={20} color="90ee90" />
                        </Col>
                        <Col>Khoá an toàn cho trẻ</Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaBaby size={20} color="90ee90" />
                        </Col>
                        <Col>Ghế an toàn cho trẻ</Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <hr></hr>
                  <Col className="mt-3">
                    <h4 style={{ fontWeight: "400" }}>Vị trí xe</h4>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <FaMapMarkerAlt size={20} color="90ee90" />
                    &nbsp; {carDetails.address}
                  </Col>
                </Row>
                <Row>
                  <i className="mt-3 pb-4" style={{ color: "#696969" }}>
                    Vị trí cụ thể của xe sẽ được hiện sau khi thanh toán tiền
                    cọc
                  </i>
                  <hr></hr>
                </Row>
                <Row>
                  <Col className="mt-3">
                    <h4 style={{ fontWeight: "400" }}>Đánh giá</h4>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md={1}></Col>
                  <Col md={10}>
                    {reviews.length > 0 ? (
                      reviews.slice(0, showAll ? reviews.length : 2).map((review, index) => (
                        <Row
                          key={index}
                          className="border pt-3 mt-3 pb-3"
                          style={{ borderRadius: "10px" }}
                        >
                          <Col
                            md={2}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <Image
                              src={"../images/ava.jpeg"}
                              roundedCircle
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </Col>
                          <Col className="d-flex align-items-center">
                            <Container>
                              <Row>
                                <Col md={3} className="m-0 p-0">
                                  <div>{review.customerName}</div>
                                  
                                </Col>
                                <Col className="align-items-center">
                                <Rating stars={review.rating} /> 
                                 <div>{review.comment || "Không có nhận xét."} </div> 
                                </Col>
                              </Row>
                            </Container>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <div className="text-center mt-4">Chưa có đánh giá nào.</div>
                    )}
                    {reviews.length > 2 && (
                      <p
                        className="pt-2"
                        onClick={() => setShowAll(!showAll)}
                        style={{
                          cursor: "pointer",
                          color: "green",
                          textAlign: "right",
                        }}
                      >
                        {showAll ? "Ẩn bớt" : "Xem thêm"}
                      </p>
                    )}
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col md={5}>
              <Container
                className="border term"
                style={{ backgroundColor: "#EBFAEB" }}
              >
                <Row>
                  <h4 class="text-center pt-3" style={{ fontWeight: "500" }}>
                    Điều khoản
                  </h4>
                </Row>
                <Row className="pb-3">
                  <Col md={1}></Col>
                  <Col md={10}>
                    <Container>
                      <Row
                        className="border"
                        style={{
                          borderRadius: "5px",
                          borderColor: "white",
                          backgroundColor: "white",
                          borderWidth: "1px",
                        }}
                      >
                        <Col md={12} className="border-end pt-3 pb-3">
                          <Container>
                            <Row>
                              <Col>
                                <div
                                  style={{ fontWeight: "500", color: "grey" }}
                                >
                                  Giá thuê 1 ngày:
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{ textAlign: "right" }}>
                                <span
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(carDetails.basePrice)}
                                </span>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                        {/* <Col md={6} className="pt-3">
                          <Container>
                            <Row>
                              <Col>
                                <div
                                  style={{ fontWeight: "500", color: "grey" }}
                                >
                                  Cọc:
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{ textAlign: "right" }}>
                                <span
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(500000)}
                                </span>
                              </Col>
                            </Row>
                          </Container>
                        </Col> */}
                      </Row>
                      <Row
                        className="border mt-3"
                        style={{
                          borderRadius: "5px",
                          borderColor: "white",
                          backgroundColor: "white",
                          borderWidth: "1px",
                        }}
                      >
                        <Container>
                          <Row>
                            <Col
                              className="pt-3 ps-4"
                              style={{ fontWeight: "500", color: "grey" }}
                            >
                              Giao xe tại:
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              className="text-center"
                              style={{
                                fontSize: "19px",
                                fontWeight: "500",
                              }}
                            >
                              {carDetails.address}
                            </Col>
                          </Row>
                          <Row>
                            <Col className="ps-4 pt-3 pb-3">
                              <FaStickyNote color="#696969" /> &nbsp;
                              <i style={{ color: "#696969" }}>
                                Chủ xe không hỗ trợ giao xe tận nơi
                              </i>
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                      <Row
                        className="border mt-3 pb-3"
                        style={{
                          borderRadius: "5px",
                          borderColor: "white",
                          backgroundColor: "white",
                          borderWidth: "1px",
                        }}
                      >
                        <Col
                          md={4}
                          className="mt-3 ps-4"
                          style={{ fontWeight: "500", color: "grey" }}
                        >
                          Quy định:
                        </Col>
                        <Col md={8} className="mt-3">
                          <Container>
                            <Row
                              className="border pt-1 pb-1"
                              style={{
                                borderRadius: "5px",
                                borderColor: "white",
                                backgroundColor: "white",
                                borderWidth: "1px",
                              }}
                            >
                              <Col md={1}>
                                <FaCheck color="green" />
                              </Col>
                              <Col>Sử dụng xe đúng mục đích</Col>
                            </Row>
                            <Row
                              className="border pt-1 mt-2 pb-1"
                              style={{
                                borderRadius: "5px",
                                borderColor: "white",
                                backgroundColor: "white",
                                borderWidth: "1px",
                              }}
                            >
                              <Col md={1}>
                                <FaBan color="red" />
                              </Col>
                              <Col>Không hút thuốc trên xe</Col>
                            </Row>
                            <p
                              className="pt-2"
                              onClick={() => setOpen(!open)}
                              style={{
                                cursor: "pointer",
                                color: open ? "green" : "green",
                                textAlign: "right",
                              }}
                            >
                              {open ? "Ẩn" : "Xem thêm"}
                            </p>
                            <Collapse in={open}>
                              <div id="collapsible-section">
                                <Row
                                  className="border pt-1 pb-1 mt-2"
                                  style={{
                                    borderRadius: "5px",
                                    borderColor: "white",
                                    backgroundColor: "white",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <Col md={1}>
                                    <FaBan color="red" />
                                  </Col>
                                  <Col>Không đem thú cưng lên xe</Col>
                                </Row>
                                <Row
                                  className="border pt-1 pb-1 mt-2"
                                  style={{
                                    borderRadius: "5px",
                                    borderColor: "white",
                                    backgroundColor: "white",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <Col md={1}>
                                    <FaBan color="red" />
                                  </Col>
                                  <Col>Không ăn uống trong xe</Col>
                                </Row>
                                <Row
                                  className="border pt-1 pb-1 mt-2"
                                  style={{
                                    borderRadius: "5px",
                                    borderColor: "white",
                                    backgroundColor: "white",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <Col md={1}>
                                    <FaBan color="red" />
                                  </Col>
                                  <Col>Không đem xe đi cầm cố, thế chấp</Col>
                                </Row>
                                <Row
                                  className="border pt-1 pb-1 mt-2"
                                  style={{
                                    borderRadius: "5px",
                                    borderColor: "white",
                                    backgroundColor: "white",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <Col md={1}>
                                    <FaBan color="red" />
                                  </Col>
                                  <Col>Không chở hàng cấm, dễ cháy nổ</Col>
                                </Row>
                                <Row
                                  className="border pt-1 pb-1 mt-2"
                                  style={{
                                    borderRadius: "5px",
                                    borderColor: "white",
                                    backgroundColor: "white",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <Col md={1}>
                                    <FaBan color="red" />
                                  </Col>
                                  <Col>Không chở thực phẩm nặng mùi</Col>
                                </Row>
                                <Row
                                  className="border pt-1 pb-1 mt-2"
                                  style={{
                                    borderRadius: "5px",
                                    borderColor: "white",
                                    backgroundColor: "white",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <Col md={1}>
                                    <FaStickyNote color="#FFD700" />
                                  </Col>
                                  <Col>
                                    Khi trả xe, nếu xe bị bẩn hoặc có mùi, sẽ
                                    tính phụ thu phí vệ sinh xe
                                  </Col>
                                </Row>
                              </div>
                            </Collapse>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col md={1}></Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
      <hr className="pt-0 mt-0"></hr>
    </div>
  );
}

export default CarDetail;