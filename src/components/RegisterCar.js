import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RegisterCar() {
    return (
        <Container >
            <h2>Register Car</h2>
            <Row >
                <Col md={12} style={{ textAlign: 'center' }}>
                    <Image src="/images/registercar.png" style={{ width: '500px', height: '355px' }} />
                </Col>
                <Col style={{ textAlign: "center" }}>
                    <Button
                        variant="success"
                        style={{ width: '175px', marginTop: '20px', padding: '16px 24px', fontSize: '17px', fontWeight: '500', marginBottom: '20px' }}
                        as={Link} to={'/create'}
                    >Register Car</Button>
                </Col>

            </Row>
        </Container>
    );
}