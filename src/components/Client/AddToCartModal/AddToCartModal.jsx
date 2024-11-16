import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formatCurrency } from '../../../utils/FormatUtils';
import { useState } from 'react';

const AddToCartModal = ({ show, onClose, dish, onAddToCart }) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({ defaultValues: { quantity: 1 } });

    const onSubmit = (data) => {
        onAddToCart(dish, data.quantity);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        reset();
    };

    const handleChangeQuantity = (value) => {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue < 1) {
            setValue('quantity', 1);
        } else {
            setValue('quantity', parsedValue);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thông Tin Món Ăn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="img-fluid w-100 rounded-3" src={dish?.image} alt={dish?.name} style={{ objectFit: 'cover', minHeight: '250px', maxHeight: '250px' }} />
                <div className='mt-3 text-center'>
                    <div className='d-flex gap-1 justify-content-center align-items-center'>
                        <h4>{dish?.name}</h4> /
                        <label>{formatCurrency(dish?.price)}</label>
                    </div>
                    <small>{dish?.category?.name}</small>
                </div>
                <p className='text-center'>{dish?.description}</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="quantity">
                        <div className='d-flex justify-content-center' style={{ border: 'none' }}>
                            <div className="border d-flex gap-1">
                                <Button variant='ghost'
                                    onClick={() => handleChangeQuantity(getValues('quantity') - 1)}>
                                    -
                                </Button>
                                <Form.Control
                                    type="text"
                                    {...register("quantity")}
                                    className='text-center border-0'
                                    style={{ maxWidth: '60px' }}
                                    onChange={(e) => handleChangeQuantity(e.target.value)}
                                />
                                <Button variant='ghost'
                                    onClick={() => handleChangeQuantity(getValues('quantity') + 1)}>
                                    +
                                </Button>
                            </div>
                        </div>
                    </Form.Group>
                    <Modal.Footer className='mt-2'>
                        <Button variant="primary" type="submit">
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    );
};

export default AddToCartModal;
