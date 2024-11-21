import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CreateTableModal = ({ showModal, setShowModal, onSubmit, tables }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();
        setShowModal(false);
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm đặt bàn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên"
                            {...register("fullName", { required: "Tên không được để trống" })}
                        />
                        {errors.fullName && (
                            <Form.Text className="text-danger">{errors.fullName.message}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Nhập số điện thoại"
                            {...register("phoneNumber", {
                                required: "Số điện thoại không được để trống",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Số điện thoại phải có 10 chữ số",
                                },
                            })}
                        />
                        {errors.phoneNumber && (
                            <Form.Text className="text-danger">{errors.phoneNumber.message}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Thời gian</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            defaultValue={(() => {
                                const now = new Date(); 
                                const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
                                    .toISOString()
                                    .slice(0, 16); 
                                return localISOTime;
                            })()}
                            {...register("bookingDate", {
                                required: "Thời gian không được để trống",
                            })}
                        />
                        {errors.bookingDate && (
                            <Form.Text className="text-danger">{errors.bookingDate.message}</Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bàn</Form.Label>
                        <Form.Select {...register("table", { required: "Vui lòng chọn bàn" })}>
                            <option value="">Chọn bàn</option>
                            {tables?.length > 0 && tables.map((table) => (
                                <option key={table.id} value={table.id}>
                                    Bàn số {table.number} - {table.zone?.name} - {table.zone?.address}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.table && (
                            <Form.Text className="text-danger">{errors.table.message}</Form.Text>
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Lưu
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateTableModal;
