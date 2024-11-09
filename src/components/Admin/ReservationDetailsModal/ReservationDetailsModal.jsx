import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ReservationDetailsModal = ({ showModal, setShowModal, selectedEvent }) => {
    console.log(selectedEvent);

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết Đặt bàn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td><strong>Tên khách hàng:</strong></td>
                            <td>{selectedEvent.title.split(" - ")[0]}</td>
                        </tr>
                        <tr>
                            <td><strong>Số bàn:</strong></td>
                            <td>{selectedEvent.extendedProps.tableNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Số ghế:</strong></td>
                            <td>{selectedEvent.extendedProps.seats}</td>
                        </tr>
                        <tr>
                            <td><strong>Vị trí:</strong></td>
                            <td>{selectedEvent.extendedProps.location}</td>
                        </tr>
                        <tr>
                            <td><strong>Thời gian:</strong></td>
                            <td>
                                {new Date(selectedEvent.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                {new Date(selectedEvent.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{selectedEvent.extendedProps.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Số điện thoại:</strong></td>
                            <td>{selectedEvent.extendedProps.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Ghi chú:</strong></td>
                            <td>{selectedEvent.extendedProps.notes}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReservationDetailsModal;
