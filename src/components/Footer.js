import {  Col, Row, Image } from 'react-bootstrap';
import './css/Homepage.css';


export default function Footer() {
    return (
        <div className='footer'>
            <Row>
                <Col sm={12} md={4}>
                    <Image src='/images/1.png' style={{ width: '100%', maxWidth: '320px' }} />

                    <Row style={{ display: 'flex', flexDirection: 'column' }}>
                        <Col className='footer-email-phone'>
                            <p>1900 9217</p>
                            <p style={{ color: '#6F6F6F' }}>Tổng đài hỗ trợ: 7AM - 10PM</p>
                        </Col>
                        <Col className='footer-email-phone'>
                            <p>Email</p>
                            <p style={{ color: '#6F6F6F' }}>Gửi mail cho Micar</p>
                        </Col>
                    </Row>
                </Col>

                <Col sm={12} md={8} style={{ marginTop: '35px' }}>
                    <Row className='footer-item'>
                        <Col sm={4} md={4}>
                            <p className='main'>Chính sách</p>
                            <p className='main-item'>Chính sách và quy định</p>
                            <p className='main-item'>Quy chế hoạt động</p>
                            <p className='main-item'>Bảo mật thông tin</p>
                        </Col>

                        <Col sm={4} md={4}>
                            <p className='main'>Tìm Hiểu Thêm</p>
                            <p className='main-item'>Hướng dẫn chung</p>
                            <p className='main-item'>Hướng dẫn đặt xe</p>
                            <p className='main-item'>Hướng dẫn thanh toán</p>
                        </Col>

                        <Col sm={4} md={4}>
                            <p className='main'>Đối tác</p>
                            <p className='main-item'>Đăng kí chủ xe Micar</p>
                            <p className='main-item'>Đăng kí cho thuê xe dài hạn</p>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}