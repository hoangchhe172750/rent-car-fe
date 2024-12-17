import "./css/CarDetailforCustormer.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaStar,
  FaCar,
  FaGasPump,
  FaPaintBrush,
  FaWater,
  FaBluetooth,
  FaMapMarkerAlt,
  FaCamera,
  FaUsb,
  FaCompactDisc,
  FaCarSide,
  FaLock,
  FaBaby,
  FaStickyNote,
  FaBan,
  FaCheck,
  FaIdCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function CarDetailForOwner() {
  const images = [
    "/images/holdingwheel.jpg",
    "/images/danang.jpg",
    "/images/hanoi.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleButtonClick = () => {
    if (!isChecked) {
      alert("Vui lòng đồng ý điều khoản trước khi đăng ký thuê xe!");
    }
  };

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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <hr className="pb-0 mb-0"></hr>
      <Container className="mt-4 ms-5">
        <Row>
          <Col md={1}></Col>
          <Col>
            <Link
              to="/viewprofile/mycar"
              style={{
                textDecoration: "none",
                color: isHovered ? "green" : "black",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              &#8592; Quay lại
            </Link>
          </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: "white" }} className="mt-2 pt-3 pb-3">
        <Container className="">
          <Row className="align-items-stretch">
            <Col md={2}></Col>
            <Col md={8} style={{ height: "500px", overflow: "hidden" }}>
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
                  alt={`${currentIndex + 1}`}
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
            <Col md={2}></Col>
          </Row>
          <Row>
            <Col className="text-center mt-4">
              <h3 style={{ fontWeight: "700px", fontSize: "30px" }}>
                TOYOTA FORTUNER 2013
              </h3>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Container>
                <Row className="mb-3">
                  <Col xs={3}>
                    <h4 className="" style={{ fontWeight: "400" }}>
                      Đánh giá:
                    </h4>
                  </Col>
                  <Col className="d-flex align-items-center">
                    <Rating stars={4} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={3}>
                    <h4 className="" style={{ fontWeight: "400" }}>
                      Lượt thuê:
                    </h4>
                  </Col>
                  <Col xs={3} style={{ fontSize: "20px" }}>
                    100
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={3}>
                    <h4 className="" style={{ fontWeight: "400" }}>
                      Trạng thái:
                    </h4>
                  </Col>
                  <Col xs={3} style={{ color: "green", fontSize: "20px" }}>
                    Available
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <h4 style={{ fontWeight: "400" }}>Mô tả</h4>
                    <p>
                      Toyota Fortuner 2013 là một mẫu SUV 7 chỗ được ưa chuộng
                      tại thị trường Việt Nam và nhiều quốc gia khác nhờ vào
                      thiết kế mạnh mẽ, tính thực dụng và độ bền bỉ. Dưới đây là
                      mô tả chi tiết về dòng xe này:
                    </p>
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
                              Đen
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
                              7 chỗ
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
                  </Col>
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
                              8L/100km
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
                          Toyota
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
                          AB-CDE23
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
                          2013
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
                          Fortuner
                        </Col>
                      </Row>
                      <Row>
                        <p style={{ color: "grey" }}>Giấy tờ cần thiết:</p>
                        <Col md={1}></Col>
                        <Col
                          md={4}
                          className="border"
                          style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
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
                          style={{ borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
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
                <p
                  className=""
                  onClick={() => setOpenFirst(!openFirst)}
                  style={{
                    cursor: "pointer",
                    color: openFirst ? "green" : "green",
                    textAlign: "right",
                  }}
                >
                  {openFirst ? "Ẩn" : "Xem thêm"}
                </p>
                <Collapse in={openFirst}>
                  <div id="collapsible-section">
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
                  </div>
                </Collapse>
                <Row>
                  <hr></hr>
                  <Col className="mt-3">
                    <h4 style={{ fontWeight: "400" }}>Vị trí xe</h4>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <FaMapMarkerAlt size={20} color="90ee90" />
                    &nbsp; 123 đường Quang Trung Quận 1, thành phố Hồ Chí Minh
                  </Col>
                </Row>
                <Row className="mt-2 mb-3">
                  <i>Chủ xe không hỗ trợ giao xe tận nơi</i>
                </Row>
              </Container>
            </Col>
            <Col>
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
                        <Col md={6} className="border-end pt-3 pb-3">
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
                                  }).format(700000)}
                                </span>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                        <Col md={6} className="pt-3">
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
                        </Col>
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
                              onClick={() => setOpenSecond(!openSecond)}
                              style={{
                                cursor: "pointer",
                                color: openSecond ? "green" : "green",
                                textAlign: "right",
                              }}
                            >
                              {openSecond ? "Ẩn" : "Xem thêm"}
                            </p>
                            <Collapse in={openSecond}>
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

export default CarDetailForOwner;
