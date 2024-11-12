import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formatCurrency } from '../../../utils/FormatUtils';

const AddToCartModal = ({ show, onClose, dish, onAddToCart }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: { quantity: 1 } });

    const onSubmit = (data) => {
        onAddToCart(dish, data.quantity);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        reset();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thông Tin Món Ăn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="img-fluid w-100 rounded-3" src={dish?.image} alt={dish?.name} />
                <div className='mt-3 text-center'>
                    <div className='d-flex gap-1 justify-content-center align-items-center'>
                        <h4>{dish?.name}</h4> /
                        <label>{formatCurrency(dish?.price)}</label>
                    </div>
                    <small>{dish?.category?.name}</small>
                </div>
                <p className='text-center'>{dish?.description}</p>
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="quantity" className='d-flex'>
                            <div className='d-flex justify-content-center mb-1'>
                                <Form.Control
                                    type="number"
                                    className='text-center'
                                    style={{ maxWidth: '100px' }}
                                    {...register("quantity", {
                                        required: "Số lượng không được để trống",
                                        min: {
                                            value: 1,
                                            message: "Số lượng phải lớn hơn hoặc bằng 1"
                                        },
                                        max: {
                                            value: 10,
                                            message: "Số lượng không được vượt quá 10"
                                        },
                                        valueAsNumber: true
                                    })}
                                    isInvalid={!!errors.quantity}
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors.quantity?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Thêm vào Giỏ Hàng
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Form>
                </div>
            </Modal.Body>

        </Modal>
    );
};

export default AddToCartModal;
