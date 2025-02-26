import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Nav, Row, Tab } from 'react-bootstrap';
import { cancelOrder, getAllOrdersByUserId } from '../../../services/OrderService/OrderService';
import AlertUtils from '../../../utils/AlertUtils';
import { formatCurrency, formatDateTime } from '../../../utils/FormatUtils';

const OrderHistory = () => {
  const [key, setKey] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState('ALL');
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 5; // Số đơn hàng hiển thị trên mỗi trang

  const tabs = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'PENDING', label: 'Chờ xác nhận' },
    { key: 'CONFIRMED', label: 'Đã xác nhận' },
    { key: 'SHIPPED', label: 'Đang giao' },
    { key: 'PAID', label: 'Hoàn thành' },
    { key: 'CANCELLED', label: 'Đã hủy' },
  ];

  useEffect(() => {
    fetchOrder();
  }, [selectedOrder]);

  const fetchOrder = async () => {
    const response = await getAllOrdersByUserId(selectedOrder);
    setOrders(response.data || []);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi bộ lọc
  };

  const handleTabClick = (tabKey) => {
    setSelectedOrder(tabKey);
  };

  const handleCancelOrder = async (order) => {
    const result = await AlertUtils.input(`Bạn có chắc muốn huỷ hoá đơn #${order.id}?`, 'Nhập lý do');
    if (result) {
      try {
        const response = await cancelOrder(order.id, result);
        if (response) {
          AlertUtils.success(`Huỷ hoá đơn thành công`);
          fetchOrder();
        }
      } catch (error) {
        AlertUtils.error(`Lỗi huỷ hoá đơn`, error.response?.data?.message);
        fetchOrder();
      }
    }
  };

  // Tính toán các đơn hàng hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Tab.Container id="order-history-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Row className="justify-content-center">
          <Col sm={12} md={8}>
            <Nav
              variant="pills"
              className="flex-row justify-content-center mb-4 p-2 rounded shadow-sm tab-pills"
              style={{
                gap: '1rem',
                backgroundColor: '#fff',
                color: '#333',
              }}
            >
              {tabs.map((tab) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link
                    eventKey={tab.key}
                    className="px-3 py-2 rounded-3"
                    onClick={() => handleTabClick(tab.key)}
                  >
                    {tab.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={12} md={8}>
            <Tab.Content>
              {tabs.map((tab) => (
                <Tab.Pane eventKey={tab.key} key={tab.key}>
                  {currentOrders?.length > 0 && currentOrders?.map((order) => (
                    <Card
                      key={order.id}
                      className="mb-4 border-0 rounded-lg shadow-lg"
                      style={{ backgroundColor: '#fff' }}
                    >
                      <Card.Body>
                        <Card.Title className="fw-bold text-dark">
                          Đơn hàng #{order.id} | {order.user?.fullName}
                        </Card.Title>
                        <Card.Subtitle className="text-muted">
                          Ngày đặt: {formatDateTime(order.time)} - <small>{order.address.address}</small>
                        </Card.Subtitle>
                        <small className="d-flex justify-content-end">
                          {order.orderStatus === 'PENDING'
                            ? 'Chờ xác nhận'
                            : order.orderStatus === 'CONFIRMED'
                              ? 'Đã xác nhận'
                              : order.orderStatus === 'SHIPPED'
                                ? 'Đang giao'
                                : order.orderStatus === 'DELIVERED' || order.orderStatus === 'PAID'
                                  ? 'Đã giao'
                                  : 'Đã huỷ'}
                        </small>

                        <ListGroup variant="flush" className="mt-3">
                          {order.orderItems?.map((item) => (
                            <ListGroup.Item
                              key={item.id}
                              className="border-0 px-0 py-3"
                              style={{
                                backgroundColor: '#f9f9f9',
                                borderRadius: '10px',
                                marginBottom: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <Row>
                                <Col sm={3} className="d-flex align-items-center justify-content-center">
                                  <Image
                                    src={`http://localhost:8080/api/files/${item.dish?.image}`}
                                    className="rounded-3"
                                    style={{
                                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                      height: '120px',
                                      width: '200px',
                                    }}
                                  />
                                </Col>
                                <Col sm={9}>
                                  <h6 className="fw-bold mb-2" style={{ color: '#333', fontSize: '16px' }}>
                                    {item.dish?.name}
                                  </h6>
                                  <p className="text-muted mb-1" style={{ fontSize: '14px' }}>
                                    <b>Danh mục:</b> {item.dish?.category?.name}
                                  </p>
                                  <p className="text-muted mb-1" style={{ fontSize: '14px' }}>
                                    <b>Đơn giá:</b> {formatCurrency(item.price)}
                                  </p>
                                  <p className="text-muted mb-1" style={{ fontSize: '14px' }}>
                                    <b>Số lượng:</b> {item.quantity}
                                  </p>
                                  <p
                                    className="fw-bold mt-2"
                                    style={{ fontSize: '15px', color: '#ab7442' }}
                                  >
                                    Thành tiền: {formatCurrency(item.price * item.quantity)}
                                  </p>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="fw-bold" style={{ color: '#ab7442' }}>
                            Tổng cộng: {formatCurrency(order.total)}
                          </h5>
                          {order.orderStatus === 'PENDING' && (
                            <Button
                              variant="dark"
                              className="shadow-sm"
                              style={{
                                borderRadius: '20px',
                                fontWeight: 'bold',
                              }}
                              onClick={() => handleCancelOrder(order)}
                            >
                              Huỷ đơn
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                  {currentOrders.length === 0 && (
                    <Card className="text-center shadow-lg border-0" style={{ background: '#fff' }}>
                      <Card.Body>
                        <h2 className="m-2 text-primary">FooDY</h2>
                        <Card.Title className="text-muted">Không có đơn hàng</Card.Title>
                        <Card.Text>Hãy đặt món ngay hôm nay để thưởng thức!</Card.Text>
                      </Card.Body>
                    </Card>
                  )}
                  {/* Phân trang */}
                  {orders.length > itemsPerPage && (
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="dark"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Lui
                      </Button>
                      <Button
                        variant="dark"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, Math.ceil(orders.length / itemsPerPage))
                          )
                        }
                        disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
                      >
                        Tới
                      </Button>
                    </div>
                  )}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default OrderHistory;
