import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { formatCurrency } from "../../../utils/FormatUtils";

const OrderConfirmationModal = ({ show, onHide, onConfirm, cartItems, total, address }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            {/* Header with Logo */}
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                    <img src="/path/to/logo.png" alt="Logo Nhà Hàng" style={{ width: "40px", marginRight: "10px" }} />
                    Xác Nhận Đơn Hàng
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p><strong>Địa chỉ giao hàng:</strong> {address}</p>

                {/* Order Items Table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td>{formatCurrency(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="text-end fw-bold">Tổng Cộng:</td>
                            <td className="fw-bold">{formatCurrency(total)}</td>
                        </tr>
                    </tfoot>
                </Table>
            </Modal.Body>

            {/* Footer with Additional Info */}
            <Modal.Footer className="d-block">
                <div className="text-center mb-3">
                    <p><strong>Thông tin nhà hàng:</strong> 123 Đường ABC, Quận XYZ, Thành phố</p>
                    <p>Điện thoại: 0123-456-789</p>
                    <p>Email: contact@restaurant.com</p>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={onHide} className="me-2">
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                        Xác Nhận
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderConfirmationModal;
