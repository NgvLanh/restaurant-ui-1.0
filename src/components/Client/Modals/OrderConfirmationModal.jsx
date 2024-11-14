import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Row, Col } from "react-bootstrap";
import { formatCurrency, formatDate } from "../../../utils/FormatUtils";

const OrderConfirmationModal = ({ show, onHide, onConfirm, cartItems, total, address }) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const branchInfo = JSON.parse(localStorage.getItem('branch_info'));
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetchCart();
    }, [cartItems]);

    const fetchCart = async () => {
        const cartOrder = cartItems?.filter(e => e.status == true);
        setOrderItems(cartOrder);
    }

    const handleOrder = async () => {
        const orderInfo = {
            branch: JSON.parse(localStorage.getItem('branch_info')),
            address: address,
            discount: null,
            table: null,
        }
        onConfirm(orderInfo);
    }
    return (
        <Modal show={show} onHide={onHide} centered>
            {/* Header with Logo */}
            <Modal.Header className="d-flex flex-column justify-content-between align-items-center">
                <Modal.Title className="d-flex align-items-center">
                    Xác nhận đơn hàng
                </Modal.Title>
                <span style={{ fontSize: '13px' }}>{formatDate(new Date())}</span>
            </Modal.Header>

            <Modal.Body>
                <Row className="px-4 py-3">
                    {/* Thông tin người dùng */}
                    <Row className="mb-4">
                        <Col>
                            <h5 className="text-primary fw-bold">Thông tin khách hàng</h5>
                            <ul className="list-unstyled mb-1">
                                <li><strong>Họ tên:</strong> {userInfo?.fullName}</li>
                                <li><strong>Email:</strong> {userInfo?.email}</li>
                                <li><strong>Số điện thoại:</strong> {userInfo?.phoneNumber}</li>
                            </ul>
                            <p><strong>Địa chỉ giao hàng:</strong> {address?.address}</p>
                        </Col>
                    </Row>

                    {/* Bảng chi tiết đơn hàng */}
                    <Table striped bordered hover responsive className="text-center align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>SL</th>
                                <th>Đơn giá</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-start">{item.dish?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatCurrency(item.dish?.price)}</td>
                                    <td>{formatCurrency(item.dish?.price * item.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} className="text-end fw-bold">Tạm Tính:</td>
                                <td>{formatCurrency(total)}</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="text-end">Phí Vận Chuyển:</td>
                                <td>{formatCurrency(address?.fee)}</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="text-end">Giảm Giá:</td>
                                <td>{formatCurrency(0)}</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="text-end fw-bold">Tổng Thanh Toán:</td>
                                <td className="fw-bold text-danger">{formatCurrency(total + 0 - 0)}</td>
                            </tr>
                        </tfoot>
                    </Table>
                </Row>
            </Modal.Body>

            {/* Footer with Additional Info */}
            <Modal.Footer className="d-block">
                <div className="text-center mb-3">
                    <p><strong>Thông tin nhà hàng:</strong>{branchInfo?.name}</p>
                    <p>Điện thoại: {branchInfo?.phoneNumber}</p>
                    {/* <p>Email: {branchInfo?.email}</p> */}
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={onHide} className="me-2">
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleOrder}>
                        Xác Nhận
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderConfirmationModal;
