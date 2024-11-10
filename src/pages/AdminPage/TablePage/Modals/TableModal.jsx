import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const TableModal = ({ showModal, closeModal, initialValues, handleData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (initialValues) {
            setValue('number', initialValues.number);
            setValue('seats', initialValues.seats);
            setValue('tableStatus', initialValues.status);
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
        reset();
    };

    return (
        <Modal show={showModal} onHide={() => closeModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialValues ? 'Cập nhật bàn' : 'Thêm bàn'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="number">
                                <Form.Label>Số bàn (Không bắt buộc)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập số bàn"
                                    {...register('number')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="seats">
                                <Form.Label>Số ghế</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập số ghế"
                                    {...register('seats', {
                                        required: 'Số ghế không được để trống',
                                        min: { value: 2, message: 'Số ghế phải từ 2 trở lên' },
                                        max: { value: 12, message: 'Số ghế không được vượt quá 12' },
                                        valueAsNumber: true
                                    })}
                                    isInvalid={errors.seats}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.seats?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="status">
                                <Form.Label>Trạng thái bàn</Form.Label>
                                <Form.Select
                                    {...register('status', { required: 'Vui lòng chọn trạng thái bàn' })}
                                    isInvalid={errors.status}
                                >
                                    <option value="AVAILABLE">Còn trống</option>
                                    <option value="OCCUPIED">Đang sử dụng</option>
                                    <option value="RESERVED">Đã đặt trước</option>
                                    <option value="OUT_OF_SERVICE">Không sử dụng được</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.status?.message}
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
