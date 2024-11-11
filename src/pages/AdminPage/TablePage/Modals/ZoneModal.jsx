import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const TableModal = ({ showModal, closeModal, initialValues, handleData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (initialValues) {
            setValue('name', initialValues.name);
            setValue('address', initialValues.address);
        } else {
            reset();
        }
    }, [initialValues]);

    // Xử lý sự kiện gửi form
    const onSubmit = (data) => {
        data = {
            ...data,
            branch: JSON.parse(localStorage.getItem('branch_info'))
        }
        handleData(data);
    };

    // Xử lý reset form
    const handleReset = async () => {
        if (initialValues) {
            setValue('name', initialValues.name);
            setValue('address', initialValues.address);
        } else {
            reset();
        }
    };

    return (
        <Modal show={showModal} onHide={() => closeModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialValues ? 'Cập nhật khu vực' : 'Thêm khu vực'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="name">
                                <Form.Label>Khu vực</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập khu vực"
                                    {...register('name', {
                                        required: 'Khu vực không được để trống',
                                    })}
                                    isInvalid={errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="address">
                                <Form.Label>Khu vực</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Vị trí"
                                    {...register('address', {
                                        required: 'Vị trí không được để trống',
                                    })}
                                    isInvalid={errors.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-3">
                        <Button type="button" variant="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                        <Button type="submit" variant="primary">
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TableModal;
