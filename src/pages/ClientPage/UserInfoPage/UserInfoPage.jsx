import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { BiPlus, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/client/footer/Footer";
import AddressModal from "../../../components/Client/Modals/AddressModal";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";
import { createAddress, deleteAddress, getAddressByUserId, updateAddress } from "../../../services/AddressService/AddressService";
import { getUserService } from "../../../services/AuthService/AuthService";
import { uploadFile } from "../../../services/UploadFileService/UploadFileService";
import { updateUser } from "../../../services/UserService/UserService";
import AlertUtils from "../../../utils/AlertUtils";

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
        try {
            const response = await updateUser(user?.id, request);
            if (response.status) {
                AlertUtils.success('Cập nhật tài khoản thành công');
                localStorage.setItem('user_info', JSON.stringify(response?.data));
            }
        // navigate(0);
        } catch (error) {
            AlertUtils.error(error.responese?.data?.message||'Cập nhật thất bại');
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
        try {
            const responese = await createAddress(request);
            if (responese?.status) {
                AlertUtils.success('Thêm địa chỉ thành công');
                setShowModal(false);
            } else {
                navigate(0);
            }
        } catch (error) {
            AlertUtils.error(error.response?.data?.message);
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
                {/* Thông tin tài khoản và ảnh đại diện */}
                <Row>
                    {/* Hồ sơ cá nhân */}
                    <Col md={6} className="mb-4">
                        <Card className="p-4 border-0 shadow rounded">
                            <h5 className="mb-3 text-primary fw-bold">
                                <BiUser className="me-2" /> Hồ sơ của tôi
                            </h5>
                            <small className="text-muted">Quản lý thông tin tài khoản để bảo mật.</small>

                            <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                <Row>
                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="fw-semibold">Tên người dùng</Form.Label>
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

                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="fw-semibold">Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                disabled
                                                value={user?.email}
                                                placeholder="Nhập email"
                                                {...register("email")}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6} className="mb-4">
                                        <Form.Group>
                                            <Form.Label className="fw-semibold">Số điện thoại</Form.Label>
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
                                        <Button variant="primary" type="submit" className="px-4 py-2 fw-bold shadow-sm">
                                            Lưu Thông Tin
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>

                    {/* Ảnh đại diện */}
                    <Col md={6} className="mb-4">
                        <Card className="p-4 border-0 shadow rounded text-center">
                            <Form.Group className="d-flex flex-column-reverse">
                                <Form.Label className="fw-semibold fs-5 text-secondary">
                                    Ảnh đại diện
                                </Form.Label>
                                <div {...getRootProps()} style={{
                                    display: 'inline-block',
                                    width: '180px',
                                    height: '180px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '50%',
                                    border: '2px dashed #ccc',
                                    cursor: 'pointer',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    margin: '20px auto',
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
                                        <div className="text-secondary fw-bold d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                            Chọn ảnh
                                        </div>
                                    )}
                                </div>
                            </Form.Group>
                        </Card>
                    </Col>
                </Row>

                {/* Địa chỉ giao hàng */}
                <Row>
                    <Col md={6} className="mb-4">
                        <Card className="p-4 border-0 shadow rounded">
                            <h5 className="mb-3 text-primary fw-bold">
                                <BiPlus className="me-2" /> Địa chỉ giao hàng
                            </h5>
                            <Button
                                variant="outline-primary"
                                className="mb-3 shadow-sm"
                                onClick={() => setShowModal(true)}
                            >
                                Thêm địa chỉ mới
                            </Button>

                            <div className="overflow-auto p-3 bg-light rounded" style={{ maxHeight: "300px" }}>
                                {addresses?.map((address, index) => (
                                    <Card
                                        key={index}
                                        className="mb-3 shadow-sm border-0 rounded"
                                        style={{
                                            backgroundColor: address?.defaultAddress ? "#f8f9fa" : "#fff",
                                        }}
                                    >
                                        <Card.Body className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex">
                                                <div className="me-3 text-primary fs-4">
                                                    <i className="bi bi-geo-alt-fill"></i>
                                                </div>
                                                <div>
                                                    <h6 className={`mb-1 ${address?.defaultAddress ? 'fw-bold' : ''}`}>
                                                        {address?.defaultAddress ? "Địa chỉ chính" : "Địa chỉ phụ"}
                                                    </h6>
                                                    <p className="mb-0 text-muted">
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
                                                />
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    className="rounded-circle"
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
