import { Modal, Form, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AlertUtils from "../../../../utils/AlertUtils";
import { createReservationOffline } from "../../../../services/ReservationService/ReservationService";

const CreateReservationModal = ({ showModal, setShowModal, selectTables, selectedDate, setSelectTables }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleFormSubmit = async (data) => {
        const request = {
            branchId: JSON.parse(localStorage.getItem('branch_info'))?.id,
            bookingDate: selectedDate,
            ...data,
            tableIds: selectTables.map(t => t.id)
        }
        try {
            const response = await createReservationOffline(request);
            if (response.status) {
                setShowModal(false);
                setSelectTables(null);
                reset();
                AlertUtils.success(`Thêm đặt bàn thành công!`);

                // nodejs socket
                const ws = new WebSocket('ws://localhost:3001');
                ws.onopen = () => {
                    ws.send(JSON.stringify('admin thêm'));
                };
                //
            }
        } catch (error) {
            AlertUtils.info(error.response?.data?.message);
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm đặt bàn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>

                    <Form.Group className="mb-3">
                        <Form.Label>Tên khách hàng</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên khách hàng"
                            {...register("fullName", { required: "Tên khách hàng là bắt buộc" })}
                            isInvalid={!!errors.fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.fullName?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            {...register("phoneNumber", {
                                required: "Số điện thoại là bắt buộc",
                                pattern: {
                                    value: /^[0-9]{10,11}$/,
                                    message: "Số điện thoại không hợp lệ",
                                },
                            })}
                            isInvalid={!!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Thời gian đặt</Form.Label>
                        <Form.Control
                            type="time"
                            placeholder="Chọn thời gian đặt"
                            {...register("startTime", {
                                required: "Vui lòng chọn thời gian đặt",
                                validate: value => {
                                    const selectedTime = new Date();
                                    const [hours, minutes] = value.split(":");
                                    selectedTime.setHours(Number(hours), Number(minutes), 0, 0);

                                    return selectedTime <= new Date() ? "Thời gian đặt phải lớn hơn thời gian hiện tại" : true;
                                }
                            })}
                            isInvalid={!!errors.startTime}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.startTime?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <hr />
                    <Row>
                        {selectTables?.length > 0 ? (
                            selectTables?.map((table) => (
                                <div key={table.id} className="col-lg-4 col-md-6 mb-3">
                                    <div className="border border-2 border-success p-3 rounded-3">
                                        <span><strong>Bàn số:</strong> {table.number} </span>
                                        <span><strong>Ghế:</strong> {table.seats} ghế</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có bàn nào được chọn.</p>
                        )}
                    </Row>
                    <Button variant="primary" type="submit" className="w-100">
                        Lưu
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateReservationModal;
