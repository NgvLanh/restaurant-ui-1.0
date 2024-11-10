import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getAllCategories } from '../../../../services/CategoryService/CategoryService';
import { useDropzone } from 'react-dropzone';

const MenuModal = ({ showModal, closeModal, initialValues, handleData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);

    const [preview, setPreview] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setPreview(URL.createObjectURL(file));
            register('image').onChange({ target: { name: 'image', value: file } });
        }
    });

    useEffect(() => {
        fetchCategories();
        if (initialValues) {
            setValue('name', initialValues.name);
            setValue('price', initialValues.price);
            setValue('description', initialValues.description);
            setValue('category', initialValues.category?.id);
            setPreview(initialValues.image);
        } else {
            reset({
                name: '',
                price: '',
                description: '',
                category: '',
            });
            setPreview(null);
        }
    }, [initialValues]);

    const fetchCategories = async () => {
        setCategories(await getAllCategories());
    }

    const onSubmit = (data) => {
        data.category = categories.find(e => e.id === parseInt(data.category))
        handleData(data);
    };

    const handleReset = () => {
        if (initialValues) {
            setValue('name', initialValues.name);
            setValue('price', initialValues.price);
            setValue('description', initialValues.description);
            setValue('category', initialValues.category?.id);
            setPreview(initialValues.image);
        } else {
            reset({
                name: '',
                price: '',
                description: '',
                category: '',
            });
            setPreview(null);
        }
    };

    return (
        <Modal show={showModal} onHide={() => closeModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{initialValues ? 'Cập nhật món ăn' : 'Thêm món ăn'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Group controlId="name">
                                <Form.Label>Tên món ăn</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên món ăn"
                                    {...register('name', { required: 'Tên món ăn không được để trống' })}
                                    isInvalid={errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} className="mt-2">
                            <Form.Group controlId="price">
                                <Form.Label>Giá</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Nhập giá"
                                    {...register('price', { required: 'Giá không được để trống' })}
                                    isInvalid={errors.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={12} className="mt-2">
                            <Form.Group controlId="category">
                                <Form.Label>Danh mục</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register('category', { required: 'Vui lòng chọn danh mục' })}
                                    isInvalid={errors.category}
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories?.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.category?.message}
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
                        <Col xs={12} className="mt-2">
                            <Form.Group controlId="description">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Nhập mô tả món ăn"
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

export default MenuModal;
