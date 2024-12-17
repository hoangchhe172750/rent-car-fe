import { Col, Container, Row, Card, Button, Image, Modal, Form } from "react-bootstrap";
import './css/ViewProfile.css';
import { useState, useEffect } from "react";
import { getUser } from "./UserService";
import UseMessageAlerts from "./UserMessageAlert";

function Profile() {
    const [user, setUser] = useState('');

    const userId = localStorage.getItem("userId");
    console.log(userId);

    const {
        errorMessage,
        setErrorMessage,
        showErrorAlert,
        setShowErrorAlert,
    } = UseMessageAlerts();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const data = await getUser(userId);
                setUser(data.data);
                console.log("The user data :", data.data);
                setAccount({
                    name: data.data.name || 'Chưa cập nhật',
                    birthday: data.data.birthday || null,
                    phone: data.data.phone || '',
                    email: data.data.email || 'Chưa cập nhật'
                });
            } catch (error) {
                setErrorMessage(error.response.data.message);
                setShowErrorAlert(true);
                console.error(error.message);
            }
        };
        getUserById();
    }, [userId]);

    const [infor, setInfor] = useState(false);

    const [showEmail, setShowEmail] = useState(false);

    const [showPhone, setShowPhone] = useState(false);

    const [account, setAccount] = useState({
        name: '',
        birthday: null,
        phone: '',
        email: ''
    });

    const [newAccount, setNewAccount] = useState({ ...account });

    const [carLicense, setCarLicense] = useState({
        number: '',
        name: '',
        licenseDob: '',
        image: ''
    })

    const [newCarLicense, setNewCarLicense] = useState({ ...carLicense })

    const [isUpdating, setIsUpdating] = useState(true);


    const handleShowInfor = () => {
        setInfor(true);
    }

    const handleCloseInfor = () => {
        setInfor(false);
    }

    const handleShowEmail = () => {
        setShowEmail(true);
    }

    const handleCloseEmail = () => {
        setShowEmail(false);
    }

    const handleShowPhone = () => {
        setShowPhone(true);
    }

    const handleClosePhone = () => {
        setShowPhone(false);
    }


    const handleChangeAccount = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
    
            // When file is successfully read
            reader.onload = () => {
                setNewCarLicense({ ...newCarLicense, image: reader.result });
            };
    
            reader.readAsDataURL(file); // Read file as a data URL for preview
        }
    };

    //Don't have logic to handle for now
    const updateInfor = () => {
        setAccount({ ...newAccount });
        console.log("Updated account:", account);
        setInfor(false);
        setShowEmail(false);
        setShowPhone(false);
    }

    const handleChangeCarLicense = (e) => {
        setNewCarLicense({ ...newCarLicense, [e.target.name]: e.target.value });
    }

    const updateCarLicense = () => {
        if (isUpdating)
            setIsUpdating(false);
        else {
            setCarLicense({ ...newCarLicense });
            alert(`Updated account: ${JSON.stringify(carLicense)}`);
            setIsUpdating(true);
        }
    }

    const handleCancelUpdate = () => {
        setIsUpdating(true);
        setNewCarLicense({ ...carLicense });
    }

    console.log(account);
    console.log(newCarLicense);


    return (
        <Container>
            {/* Infor */}

            <Card className="card-container">
                <Card.Text className="title-text">
                    <span>Account Information</span> &nbsp;
                    <Button className="title-btn" onClick={handleShowInfor}>
                        <i class="bi bi-pencil"></i>
                    </Button>
                </Card.Text>

                <Card.Text>
                    <Row>
                        <Col md={12} lg={3} sm={12} style={{ textAlign: 'center' }}>
                            <Image src="../images/ava.jpeg" roundedCircle style={{ border: '1px solid black', width: '100%' }} />
                            <h5 style={{ color: 'black', paddingTop: '10px', fontSize: '20px' }}>{account.name}</h5>
                            {/* <p style={{ color: '#666666', fontSize: '12px', paddingTop: '10px' }}>Tham gia: 16/11/2024</p> */}
                        </Col>

                        <Col className="infor-container">
                            <Row>
                                <Col md={12}>
                                    <Card className='card-age-gender' >
                                        <Card.Text>
                                            <Row>
                                                <Col md={12} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                    <div >
                                                        <span style={{ color: '#6F6F6F', fontSize: '14px' }}>Date of birth</span>
                                                    </div>
                                                    <div className="infor-text">
                                                        <span >
                                                            {
                                                                account.birthday == null
                                                                    ? '--/--/----'
                                                                    : new Date(account.birthday).toLocaleDateString('vi-VN')
                                                            }
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card>
                                </Col>


                                <Col md={12} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
                                    <div>
                                        <span style={{ color: '#6F6F6F', fontSize: '14px' }}>Phone Number</span>
                                    </div>
                                    <div className="infor-text">
                                        <span >{account.phone == '' ? "Thêm số điện thoại" : account.phone}</span>
                                        <Button className="infor-btn" onClick={handleShowPhone}>
                                            <i class="bi bi-pencil"></i>
                                        </Button>
                                    </div>
                                </Col>

                                <Col md={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ color: '#6F6F6F', fontSize: '14px' }}>Email</span>
                                    </div>
                                    <div className="infor-text">
                                        <span>{account.email}</span>
                                        <Button className="infor-btn" onClick={handleShowEmail}>
                                            <i class="bi bi-pencil"></i>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Text>
            </Card>

            {/* GPLX */}

            <Card className="card-container">
                <Card.Text className="car-license-container">
                    <h4 className="car-license-title">Driving License</h4> &nbsp;
                    {!isUpdating && <span style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }} onClick={handleCancelUpdate}>Hủy</span>}

                    <Button
                        variant={isUpdating ? "outline-dark" : "success"}
                        className="car-license-btn"
                        onClick={updateCarLicense}
                    >
                        <span className="car-license-btn-text">{isUpdating ? "Edit" : "Update"}</span> &nbsp;
                        <i class="bi bi-pencil"></i>
                    </Button>
                </Card.Text>
                <Card.Text style={{ color: 'black' }}>
                    <Row>
                        <Col md={12} lg={6} sm={12}>
                            <p style={{ fontSize: '17px', fontWeight: '500' }}>Image</p>
                            <Form.Group controlId="formFile" className="mb-3">
                                <div className="car-license-upload">
                                    <label htmlFor="file-upload" className="upload-label">
                                        {newCarLicense.image ? (
                                            <div className="preview-box">
                                                <img src={newCarLicense.image} alt="Preview" className="preview-img" />
                                            </div>
                                        ) : (
                                            <>
                                                <i className="bi bi-cloud-arrow-up"></i>
                                                <p>Choose image</p>
                                            </>
                                        )}
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        hidden
                                        onChange={handleFileChange} // Handle file upload
                                        disabled={isUpdating}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <p style={{ fontSize: '17px', fontWeight: '500' }}>Information</p>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className="car-license-lable">Driving license number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={user.drivingLicense}
                                        name="number"
                                        placeholder="Nhập số GPLX đã cấp"
                                        onChange={handleChangeCarLicense}
                                        disabled={isUpdating}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="car-license-lable">Fullname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={user.name}
                                        name="name"
                                        placeholder="Nhập đầy đủ họ tên"
                                        onChange={handleChangeCarLicense}
                                        disabled={isUpdating}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="car-license-lable">Date of birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={user.birthday}
                                        name="licenseDob"
                                        onChange={handleChangeCarLicense}
                                        disabled={isUpdating}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Card.Text>
            </Card>

            {/* Information-Popup */}
            <Modal show={infor} onHide={handleCloseInfor} >
                <Modal.Header style={{ justifyContent: 'center', borderBottom: 'none' }}>
                    <Row>
                        <Col md={12}>
                            <Button variant="link" onClick={handleCloseInfor} style={{ color: 'black', marginLeft: '430px', marginTop: '-10px' }}><i class="bi bi-x-circle" style={{ fontSize: '22px' }}></i></Button>
                        </Col>
                        <Col md={12} style={{ textAlign: 'center' }}>
                            <Modal.Title>Update information</Modal.Title>
                        </Col>
                    </Row>

                </Modal.Header>

                <Modal.Body >
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Tên tài khoản</Form.Label>
                            <Form.Control type="text" value={newAccount.username} name='username' onChange={(e) => handleChangeAccount(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3 " >
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control type='date' value={newAccount.dob} name='dob' onChange={handleChangeAccount} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
                    <Button variant="success" size='lg' style={{ width: "500px" }} onClick={updateInfor} >
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Email Pop-up */}
            <Modal show={showEmail} onHide={handleCloseEmail} >
                <Modal.Header style={{ justifyContent: 'center', borderBottom: 'none' }}>
                    <Row>
                        <Col md={12}>
                            <Button variant="link" onClick={handleCloseEmail} style={{ color: 'black', marginLeft: '430px', marginTop: '-10px' }}><i class="bi bi-x-circle" style={{ fontSize: '22px' }}></i></Button>
                        </Col>
                        <Col md={12} style={{ textAlign: 'center' }}>
                            <Modal.Title>Cập nhật email</Modal.Title>
                        </Col>
                    </Row>

                </Modal.Header>

                <Modal.Body >
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={newAccount.email} name='email' onChange={handleChangeAccount} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
                    <Button variant="success" size='lg' style={{ width: "500px" }} onClick={updateInfor} >
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Phone Pop-up */}
            <Modal show={showPhone} onHide={handleClosePhone} >
                <Modal.Header style={{ justifyContent: 'center', borderBottom: 'none' }}>
                    <Row>
                        <Col md={12}>
                            <Button variant="link" onClick={handleClosePhone} style={{ color: 'black', marginLeft: '430px', marginTop: '-10px' }}><i class="bi bi-x-circle" style={{ fontSize: '22px' }}></i></Button>
                        </Col>
                        <Col md={12} style={{ textAlign: 'center' }}>
                            <Modal.Title>Cập nhật điện thoại</Modal.Title>
                        </Col>
                    </Row>

                </Modal.Header>

                <Modal.Body >
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Điện thoại</Form.Label>
                            <Form.Control type="text" value={newAccount.phone} name='phone' onChange={handleChangeAccount} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
                    <Button variant="success" size='lg' style={{ width: "500px" }} onClick={updateInfor} >
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default Profile;