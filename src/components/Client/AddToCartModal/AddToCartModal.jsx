import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddToCartModal = ({ show, onClose, dish, onAddToCart }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: { quantity: 1 }
    });

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
                <div>
                    <img className="img-fluid w-100 rounded-3" src={dish?.image} alt={dish?.name} />
                    <h4 className='mt-2'>{dish?.name}</h4>
                    <p>{dish?.category?.name}</p>
                    <p>{dish?.description}</p>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="quantity">
                            <Form.Label>Số Lượng</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("quantity", {
                                    required: "Số lượng không được để trống",
                                    min: {
                                        value: 1,
                                        message: "Số lượng phải lớn hơn hoặc bằng 1"
                                    },
                                    max: {
                                        value: 10,
                                        message: "Số lượng không được vượt quá 10"
                                    }
                                })}
                                isInvalid={!!errors.quantity}
                            />
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
