import { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const BranchStatusModal = ({ showModal, closeModal, initialValues, handleData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (initialValues) {
            setValue('name', initialValues?.name);
            setValue('colorCode', initialValues?.colorCode);
        } else {
            reset({
                name: null,
                colorCode: '#FFFFFF'
            })
        }
    }, [initialValues]);

    const onSubmit = (data) => {
        handleData(data);
    };

    const handleReset = async () => {
        if (initialValues) {
            setValue('name', initialValues?.name);
            setValue('colorCode', initialValues?.colorCode);
        } else {
            reset({
                name: '',
                colorCode: '#FFFFFF'
            })
        }
    };


    return (
        <Modal show={showModal} onHide={() => closeModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{initialValues ? 'Cập nhật trạng thái' : 'Thêm trạng thái'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="name">
                        <Form.Label>Tên chi nhánh</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên trạng thái"
                            {...register('name', { required: 'Vui lòng nhập tên trạng thái' })}
                            isInvalid={errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="colorCode">
                        <Form.Label>Chọn màu</Form.Label>
                        <Form.Control
                            type="color"
                            {...register('colorCode')}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <div className="d-flex justify-content-end gap-3">
                            <Button type="button" variant="secondary" onClick={handleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="primary">
                                Lưu
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BranchStatusModal;
