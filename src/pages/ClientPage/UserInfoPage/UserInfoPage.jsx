import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal, Container, Row, Col, Image, Card } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Footer from "../../../components/client/footer/Footer";
import PageHeader from "../../../components/Client/PageHeader/PageHeader";
import { BiPlus } from "react-icons/bi";
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
            <PageHeader title="Tài khoản" />
            <Container>
                <Card className="p-3 border-0 shadow-sm mb-3">
                    <h6>Hồ sơ của tôi</h6>
                    <small>Quản lý hồ sơ để bảo mật tài khoản</small>
                </Card>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            {/* Form các thông tin người dùng */}
                            <Form.Group className="mb-3">
                                <Form.Label>Tên người dùng</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={user?.fullName}
                                    {...register("fullName", { required: "Vui lòng nhập tên người dùng" })}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    disabled
                                    value={user?.email}
                                    {...register("email", { required: "Vui lòng nhập email" })}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="tel"
                                    defaultValue={user?.phoneNumber}
                                    {...register("phoneNumber", { required: "Vui lòng nhập số điện thoại" })}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit">Lưu Thông Tin</Button>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3 d-grid">
                                <Form.Label>Ảnh đại diện</Form.Label>
                                <div {...getRootProps()} style={{
                                    border: "1px solid var(--primary)",
                                    padding: "20px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    maxWidth: '250px',
                                    borderRadius: '50%',
                                }}>
                                    <input {...getInputProps()} />
                                    {imagePreview ? (
                                        <Image src={imagePreview}
                                            style={{
                                                margin: 'auto',
                                                maxWidth: '200px',
                                                maxHeight: '200px',
                                                minWidth: '200px',
                                                minHeight: '200px',
                                                borderRadius: '50%'
                                            }} />
                                    ) : (
                                        <p>Kéo thả ảnh vào đây hoặc nhấn để chọn ảnh</p>
                                    )}
                                </div>
                            </Form.Group>
                            <h5>Địa chỉ giao hàng<BiPlus onClick={() => setShowModal(true)} className="ms-2" /></h5>

                            <Row>
                                {addresses?.length > 0 && addresses?.map((address, index) => (
                                    <Col key={index} md={12} className="mb-3">
                                        <Card>
                                            <Card.Body className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <Form.Check
                                                        type="radio"
                                                        label="Mặc định"
                                                        checked={address?.defaultAddress}
                                                        onChange={(e) => handleSelectDefaultAddress(address?.id, e.target.checked)}
                                                    />
                                                    <Card.Text className="mb-0 ms-2">{address?.address}</Card.Text>
                                                </div>
                                                <Button variant="outline-danger" size="sm"
                                                    onClick={() => handleDelete(address?.id)}>Xóa</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Container >

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
