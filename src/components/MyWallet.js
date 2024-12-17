import { Button, Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import './css/MyWallet.css'
import { useEffect, useState } from "react";
import { getUser } from "./UserService";
export default function MyWallet() {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(0);
    const [showTakeMoney, setShowTakeMoney] = useState(false);

    const handleCloseTakeMoney = () => {
        setShowTakeMoney(false);
    }

    useEffect(() => {
        const getUserById = async () => {
            try {
                const data = await getUser(userId);
                setUser(data.data);
                console.log("User: ", data.data);
                setWallet(data.data.wallet);
                console.log(data.data.wallet)
            } catch (error) {
                console.error(error.message);
            }
        };
        getUserById();
    }, [userId]);
    return (
        <Container>
            <h2 className="mywallet-title">Ví của tôi</h2>
            <Card className="mywallet-card-container">
                <Card.Text className="mywallet-card-text">
                    <p className="mywallet-money">
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(wallet)}
                    </p>
                    <p className="mywallet-script">Số dư hiện tại</p>
                </Card.Text>
            </Card>
            <Row style={{ marginTop: '30px' }}>
                <Col md={6} style={{ textAlign: 'center' }}>
                    <Button className="mywallet-take-money" variant="success" >Gửi yêu cầu rút tiền</Button>
                </Col>
                <Col style={{ textAlign: 'center' }}>
                    <Button className="mywallet-deposit" variant="outline-success">Nạp tiền</Button>
                </Col>
            </Row>

            {/* <Modal show={showTakeMoney} onHide={handleCloseTakeMoney} >
                <Modal.Header className="mywallet-header-pop-up-container">
                    <Row>
                        <Col md={12}>
                            <Button variant="link" onClick={handleCloseTakeMoney} className="mywallet-close-popup-btn">
                                <i class="bi bi-x-circle"></i>
                            </Button>
                        </Col>
                        <Col md={12} style={{ textAlign: 'center' }}>
                            <Modal.Title>Yêu cầu rút tiền</Modal.Title>
                        </Col>
                    </Row>

                </Modal.Header>

                <Modal.Body >
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>
                        <Form.Group className="mb-3 password-form" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
                    <Button variant="success" size='lg' style={{ width: "500px" }} >
                        Login
                    </Button>
                </Modal.Footer>
            </Modal> */}



        </Container>
    );
}