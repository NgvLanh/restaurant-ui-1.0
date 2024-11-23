import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { formatDateTime } from '../../../utils/FormatUtils';
import AlertUtils from '../../../utils/AlertUtils';
import { cancelReservation } from '../../../services/ReservationService/ReservationService';

const ReservationDetailsModal = ({ showModal, setShowModal, selectedEvent }) => {

    const handleCancelReservation = async () => {
        setShowModal(false);
        const result = await AlertUtils.input('Nhập lý do huỷ bàn', 'Lý do huỷ bàn');
        if (result) {
            console.log(`${result} - ${selectedEvent.extendedProps.email} - ${selectedEvent.id}`);
            const response = await cancelReservation(selectedEvent.id, result);
            console.log(response);
        }
    }

    return (
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
        >
            <Modal.Header closeButton className="d-flex align-items-center">
                <Modal.Title>Chi tiết Đặt bàn</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column gap-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="card-title">Thông tin khách hàng</h5>
                        <div className="mb-2">
                            <strong>Tên khách hàng:</strong> <span>{selectedEvent.title}</span>
                        </div>
                        <div className="mb-2">
                            {/* <strong>Email:</strong> <span>{selectedEvent.extendedProps.email}</span> */}
                        </div>
                        <div className="mb-2">
                            {/* <strong>Số điện thoại:</strong> <span>{selectedEvent.extendedProps.phoneNumber}</span> */}
                        </div>
                        <div className="mb-2">
                            {/* <strong>Ghi chú:</strong> <span>{selectedEvent.extendedProps.notes}</span> */}
                        </div>
                    </div>
                </div>
                <div className="card shadow-lg border-0">
                    <div className="card-body">
                        <h5 className="card-title">Thông tin bàn</h5>
                        <div className="mb-2">
                            {/* <strong>Số bàn:</strong> <span>{selectedEvent.extendedProps.table.number}</span> */}
                        </div>
                        <div className="mb-2">
                            {/* <strong>Số ghế:</strong> <span>{selectedEvent.extendedProps.table.seats}</span> */}
                        </div>
                        <div className="mb-2">
                            <strong>Vị trí: </strong>
                            <span>
                                {/* {selectedEvent.extendedProps.table.zone.name} -{" "} */}
                                {/* {selectedEvent.extendedProps.table.zone.address} */}
                            </span>
                        </div>
                        <div className="mb-2">
                            <strong>Thời gian:</strong>{" "}
                            <span>{formatDateTime(selectedEvent.start)}</span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                {selectedEvent.extendedProps.cancelReason == 'null' ? (
                    <Button variant="primary" onClick={handleCancelReservation}>
                        Hủy đặt bàn
                    </Button>
                ) : (
                    <Button variant="primary" disabled style={{ cursor: 'not-allowed' }}>
                        Đã huỷ
                    </Button>
                )}
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal >

    );
};

export default ReservationDetailsModal;
