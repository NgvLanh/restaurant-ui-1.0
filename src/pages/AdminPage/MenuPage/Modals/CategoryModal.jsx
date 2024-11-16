import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

const CategoryModal = ({ showModal, closeModal, initialValues, handleData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setFile(file);
            setPreview(URL.createObjectURL(file));  // Tạo URL xem trước ảnh
            register('image').onChange({ target: { name: 'image', value: file } });
        }
    });

    useEffect(() => {
        if (initialValues) {
            setValue('name', initialValues.name);
            setValue('description', initialValues.description);
            setPreview(initialValues.image)
        } else {
            reset();
            setPreview(null);
        }
    }, [initialValues]);

    // Xử lý sự kiện gửi form
    const onSubmit = (data) => {
        handleData({
            ...data,
            image: file
        });
    };

    // Xử lý reset form
    const handleReset = async () => {
        if (initialValues) {
            setValue('name', initialValues.name);
            setValue('description', initialValues.description);
            setPreview(initialValues.image)
        } else {
            reset();
            setPreview(null);
        }
    };

    return (
        <Modal show={showModal} onHide={() => closeModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialValues ? 'Cập nhật danh mục' : 'Thêm danh mục'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="name">
                                <Form.Label>Tên danh mục</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên danh mục"
                                    {...register('name', { required: 'Tên danh mục không được để trống' })}
                                    isInvalid={errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} className='mt-2'>
                            <Form.Group controlId="image">
                                <Form.Label>Ảnh danh mục</Form.Label>
                                <div
                                    {...getRootProps()}
                                    className={`dropzone ${errors.image ? 'is-invalid' : ''}`}
                                    style={{
                                        border: '2px dashed #ccc',
                                        padding: '20px',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {preview ? (
                                        <img src={preview} alt="Xem trước ảnh"
                                            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                                    ) : (
                                        <p>Kéo và thả ảnh vào đây, hoặc nhấp để chọn</p>
                                    )}
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    {errors.image?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="description">
                                <Form.Label>Mô tả danh mục</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Nhập mô tả danh mục"
                                    {...register('description')}
                                    isInvalid={errors.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description?.message}
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

export default CategoryModal;
