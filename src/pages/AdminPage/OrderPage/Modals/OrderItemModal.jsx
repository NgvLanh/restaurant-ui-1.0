import { Alert, Button, Modal, Table } from 'react-bootstrap';
import { formatCurrency, formatDateTime } from '../../../../utils/FormatUtils';

const OrderStatus = new Map([
    ["PENDING", "Chờ xác nhận"],
    ["CONFIRMED", "Đã xác nhận"],
    ["SHIPPED", "Đang giao (giao hàng)"],
    ["DELIVERED", "Đã giao (giao hàng)"],
    ["CANCELLED", "Đã hủy"],
    ["PAID", "Đã thanh toán"],
    ["READY_TO_SERVE", "Chưa thanh toán"],
]);

export const OrderItemModal = ({ showModal, setShowModal, orderData, handleConfirm }) => {
    const totalAmount = orderData?.orderItems?.reduce((total, item) => total + (item.quantity * item.price), 0) + orderData?.address?.fee;

    

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
            <Modal.Header closeButton>
                <div className="d-flex align-items-top gap-2">
                    <Modal.Title>Chi tiết đơn hàng </Modal.Title><small className='text-primary'>{OrderStatus.get(orderData?.orderStatus)}</small>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="mb-3 col-6">
                        <strong>Họ và tên: </strong>{orderData?.fullName || orderData?.user?.fullName || ''}
                    </div>
                    <div className="mb-3 col-6">
                        <strong>Số điện thoại: </strong>{orderData?.phoneNumber || orderData?.user?.phoneNumber || ''}
                    </div>
                    <div className="mb-3 col-6">
                        <strong>Email: </strong>{orderData?.email || orderData?.user?.email || ''}
                    </div>
                    <div className="mb-3 col-6">
                        <strong>Địa chỉ: </strong>{orderData?.address?.address || ''}
                    </div>
                </div>

                {orderData?.orderStatus !== 'CANCELLED' ? (
                    <>
                        <h5 className="mt-4">Danh sách món ăn</h5>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ảnh</th>
                                    <th>Tên món ăn</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData?.orderItems && orderData?.orderItems.length > 0 ? (
                                    orderData?.orderItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="text-center">
                                                <img
                                                    src={`http://localhost:8080/api/files/${item.dish?.image}`}
                                                    className='rounded-3'
                                                    style={{ maxWidth: '120px', minWidth:'120px', minHeight:'80px', maxHeight:'80px' }}
                                                    alt={item.dish?.image}
                                                />
                                            </td>
                                            <td>{item.dish?.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{formatCurrency(item.price)}</td>
                                            <td>{formatCurrency(item.quantity * item.price)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className='text-center'>
                                        <td colSpan="6">Chưa có món ăn nào được đặt</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <div className="mt-4">
                        <Alert variant="danger" className='rounded-3'>
                            <h5>Lý do hủy đơn hàng</h5>
                            <p><strong>{orderData?.cancelReason || 'Chưa có lý do hủy'}</strong></p>
                            <hr />
                            <div>
                                <strong>Ngày hủy:</strong> {formatDateTime(orderData?.time)}
                            </div>
                            {orderData?.cancelDetails && (
                                <div className="mt-2">
                                    <strong>Chi tiết hủy:</strong>
                                    <p>{orderData?.cancelDetails}</p>
                                </div>
                            )}
                        </Alert>
                    </div>
                )}

                {totalAmount > 0 && (
                    <div className="mt-4 d-flex flex-column me-4 text-end">
                        <strong>Phí giao hàng: {formatCurrency(orderData?.address?.fee)}</strong>
                        <strong>Tổng cộng: {formatCurrency(totalAmount)}</strong>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className='rounded-3' onClick={() => setShowModal(false)}>
                    Đóng
                </Button>
                {orderData?.orderStatus !== 'PAID' && orderData?.orderStatus !== 'READY_TO_SERVE' && orderData?.orderStatus !== 'CANCELLED' &&
                    <Button Button variant="primary" className='rounded-3' onClick={() => handleConfirm(orderData?.id, orderData?.orderStatus)}>
                        Xác nhận
                    </Button>
                }
            </Modal.Footer>
        </Modal >
    );
};
