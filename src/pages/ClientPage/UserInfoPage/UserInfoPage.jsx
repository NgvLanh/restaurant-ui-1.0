import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal, Container, Row, Col, Image, Card } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Footer from "../../../components/client/footer/Footer";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";
import { BiPlus, BiUser } from "react-icons/bi";
import { updateUser } from "../../../services/UserService/UserService";
import { uploadFile } from "../../../services/UploadFileService/UploadFileService";
import AlertUtils from "../../../utils/AlertUtils";
import { getUserService } from "../../../services/AuthService/AuthService";
import { useNavigate } from "react-router-dom";
import { createAddress, deleteAddress, getAddressByUserId, updateAddress } from "../../../services/AddressService/AddressService";
import AddressModal from "../../../components/Client/Modals/AddressModal";

const UserInfoPage = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [addresses, setAddresses] = useState([]);
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (user) {
            fetchAddress();
        }
    }, [user]);

    const fetchUserInfo = async () => {
        const response = await getUserService();
        setUser(response);
        setValue('fullName', response?.fullName);
        setValue('email', response?.email);
        setValue('phoneNumber', response?.phoneNumber);
        setImagePreview(response?.image);
    }

    const fetchAddress = async () => {
        const response = await getAddressByUserId(user?.id);
        setAddresses(response);
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", file);
        const request = {
            ...data,
            image: file?.name
        }
        await uploadFile(formData);
        const response = await updateUser(user?.id, request);
        localStorage.setItem('user_info', JSON.stringify(response?.data))
        navigate(0);
        if (response?.status) {
            AlertUtils.success('Cập nhật tài khoản thành công');
        } else {
            AlertUtils.error('Cập nhật tài khoản thất bại');
        }
    };

    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false
    });

    // Xử lý khi chọn địa chỉ mặc định
    const handleSelectDefaultAddress = async (id, status) => {
        const request = {
            defaultAddress: status
        }
        await updateAddress(id, request);
        fetchAddress();
    };

    const handleSaveAddress = async (data) => {
        const request = {
            user: user,
            ...data
        }
        const responese = await createAddress(request);
        if (responese?.status) {
            AlertUtils.success('Thêm địa chỉ thành công');
            setShowModal(false);
        } else {
            navigate(0);
        }
        fetchAddress();
    };

    const handleDelete = async (id) => {
        const result = await AlertUtils.confirm('Bạn có chắc chắn muốn xoá địa chỉ này!');
        if (result) {
            const response = await deleteAddress(id);
            if (response?.status) {
                AlertUtils.success('Xoá địa chỉ thành công');
            }
        }
        fetchAddress();
    }

    return (
        <>
            <PageHeader title="Quản lý tài khoản" />
            <Container className="py-4">
                {/* Phần thông tin tài khoản */}
                <Card className="p-4 mb-4 border-0 shadow-sm rounded">
                    <h5 className="mb-3 text-primary">
                        <BiUser className="me-2" /> Hồ sơ của tôi
                    </h5>
                    <small className="text-muted">Quản lý thông tin tài khoản để bảo mật.</small>

                    <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Tên người dùng</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={user?.fullName}
                                        placeholder="Nhập tên người dùng"
                                        {...register("fullName", { required: "Vui lòng nhập tên người dùng" })}
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        disabled
                                        value={user?.email}
                                        placeholder="Nhập email"
                                        {...register("email")}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        defaultValue={user?.phoneNumber}
                                        placeholder="Nhập số điện thoại"
                                        {...register("phoneNumber", { required: "Vui lòng nhập số điện thoại" })}
                                        isInvalid={!!errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phoneNumber?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={12} className="text-end">
                                <Button variant="primary" type="submit">
                                    Lưu Thông Tin
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                {/* Phần ảnh đại diện và địa chỉ */}
                <Row>
                    <Col md={6} className="mb-4">
                        <Card className="p-4 border-0 shadow-sm rounded">
                            <Form.Group>
                                <Form.Label className="mb-3" style={{ fontSize: '1.2rem', textAlign: 'center', fontWeight: '500', color: '#333' }}>
                                    Ảnh đại diện
                                </Form.Label>
                                <div {...getRootProps()} style={{
                                    display: 'inline-block',
                                    width: '180px',
                                    height: '180px',
                                    backgroundColor: '#fff',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    textAlign: 'center',
                                    margin: 'auto',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
                                    }
                                }}>
                                    <input {...getInputProps()} />
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Avatar"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            color: '#AAA',
                                            fontWeight: '500',
                                            fontSize: '1rem',
                                        }}>Chọn ảnh</div>
                                    )}
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        right: '10px',
                                        bottom: '10px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        zIndex: -1,
                                    }}></div>
                                </div>
                            </Form.Group>

                        </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                        <Card className="p-4 border-0 shadow-sm rounded">
                            <h5 className="mb-3 text-primary">
                                <BiPlus className="me-2" /> Địa chỉ giao hàng
                            </h5>
                            <Button
                                variant="outline-primary"
                                className="mb-3"
                                onClick={() => setShowModal(true)}
                            >
                                Thêm địa chỉ mới
                            </Button>

                            <div className="overflow-auto p-3" style={{ maxHeight: "300px", backgroundColor: "#fdf7f3", borderRadius: "10px" }}>
                                {addresses?.map((address, index) => (
                                    <Card
                                        key={index}
                                        className="mb-3 shadow-sm"
                                        style={{
                                            border: address?.defaultAddress ? "2px solid #AB7442" : "1px solid #dee2e6",
                                            borderRadius: "12px",
                                            transition: "transform 0.2s, box-shadow 0.2s",
                                            backgroundColor: address?.defaultAddress ? "#f9ece5" : "#fff",
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    >
                                        <Card.Body className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-start">
                                                <div className="me-3" style={{ fontSize: "1.5rem", color: "#AB7442" }}>
                                                    <i className="bi bi-geo-alt-fill"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1" style={{ fontWeight: address?.defaultAddress ? "bold" : "normal", color: "#6f4f3a" }}>
                                                        {address?.defaultAddress ? "Địa chỉ chính" : "Địa chỉ phụ"}
                                                    </h6>
                                                    <p className="mb-0 text-muted" style={{ fontSize: "0.9rem", color: "#8c6b54" }}>
                                                        {address?.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <Form.Check
                                                    type="radio"
                                                    name="defaultAddress"
                                                    className="me-3"
                                                    checked={address?.defaultAddress}
                                                    onChange={(e) => handleSelectDefaultAddress(address?.id, e.target.checked)}
                                                    style={{
                                                        cursor: "pointer",
                                                        accentColor: "#AB7442",
                                                    }}
                                                />
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{ borderRadius: "50%", width: "36px", height: "36px" }}
                                                    onClick={() => handleDelete(address?.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <AddressModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSaveAddress}
            />

            <Footer />
        </>
    );

};

export default UserInfoPage;
