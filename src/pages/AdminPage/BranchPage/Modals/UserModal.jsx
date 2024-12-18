import React, { useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UserModal = ({ showModal, closeModal, initialValues, handleData }) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        watch
    } = useForm();

    const password = watch("password");
    useEffect(() => {
        if (!showModal) {
            reset({
                fullName: "",
                email: "",
                phone: "",
                role: "NON_ADMIN",
                password: "",
                confirmPassword: ""
            });
        }
    }, [showModal, reset]);
    useEffect(() => {
        if (showModal) {
            if (initialValues?.email) {
                reset({
                    fullName: initialValues.fullName || "",
                    email: initialValues.email || "",
                    phone: initialValues.phoneNumber || "",
                    role: initialValues.role || "NON_ADMIN",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                reset({
                    fullName: "",
                    email: "",
                    phone: "",
                    role: "NON_ADMIN",
                    password: "",
                    confirmPassword: ""
                });
            }
        }
    }, [showModal, initialValues, reset]);

    const onSubmit = (data) => {
        const { phone, ...restData } = data;
        const transformedData = {
            ...restData,
            phoneNumber: phone,
        };
        handleData(transformedData);
    };

    const handleClose = () => {
        reset({
            fullName: "",
            email: "",
            phone: "",
            role: "NON_ADMIN",
            password: "",
            confirmPassword: ""
        });
        closeModal(false);
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{initialValues?.email ? 'Thông tin người dùng' : 'Cấp quyền'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="fullName">
                                <Form.Label>Họ và Tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    {...register('fullName', { required: 'Vui lòng nhập họ và tên' })}
                                    isInvalid={errors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fullName?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Nhập email"
                                    {...register('email', {
                                        required: 'Vui lòng nhập email',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Email không hợp lệ',
                                        },
                                    })}
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={6}>
                            <Form.Group controlId="phone">
                                <Form.Label>Số Điện Thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    {...register('phone', {
                                        required: 'Vui lòng nhập số điện thoại',
                                        pattern: {
                                            value: /^(03|08|09)\d{8}$/,
                                            message: 'Số điện thoại phải bắt đầu bằng 03, 08, hoặc 09 và có 10 chữ số',
                                        },
                                    })}
                                    isInvalid={errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        {!initialValues?.email && (
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="password">
                                    <Form.Label>Mật Khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                                        isInvalid={errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>

                    {!initialValues?.email && (
                        <Row className="mb-3">
                            <Col xs={12} sm={6}>
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                        {...register('confirmPassword', {
                                            required: 'Vui lòng xác nhận mật khẩu',
                                            validate: (value) => value === password || 'Mật khẩu không khớp',
                                        })}
                                        isInvalid={errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    )}

                    {/* <div className="d-flex justify-content-end gap-3">
                        <Button type="submit" variant="primary">
                            {initialValues?.email ? 'Lưu' : 'Thêm'}
                        </Button>
                    </div> */}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;