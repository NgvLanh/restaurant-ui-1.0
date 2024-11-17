import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Card, ListGroup, Button, Image } from 'react-bootstrap';

const OrderHistory = () => {
  const [key, setKey] = useState('all');

  const tabs = [
    { key: 'all', label: 'Tất cả' },
    { key: 'pending', label: 'Chờ xử lý' },
    { key: 'shipped', label: 'Đang giao' },
    { key: 'delivered', label: 'Hoàn thành' },
    { key: 'cancelled', label: 'Đã hủy' },
  ];

  const orders = [
    {
      id: 1234,
      date: '2023-05-01',
      status: 'pending',
      items: [
        {
          id: 1,
          name: 'Sản phẩm A',
          quantity: 2,
          price: 50000,
          total: 100000,
          imageUrl: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Sản phẩm B',
          quantity: 1,
          price: 75000,
          total: 75000,
          imageUrl: 'https://via.placeholder.com/150',
        },
      ],
      totalAmount: 175000,
    },
    {
      id: 5678,
      date: '2023-04-15',
      status: 'shipped',
      items: [
        {
          id: 3,
          name: 'Sản phẩm C',
          quantity: 1,
          price: 120000,
          total: 120000,
          imageUrl: 'https://via.placeholder.com/150',
        },
      ],
      totalAmount: 120000,
    },
    {
      id: 9012,
      date: '2023-03-20',
      status: 'delivered',
      items: [
        {
          id: 4,
          name: 'Sản phẩm D',
          quantity: 3,
          price: 80000,
          total: 240000,
          imageUrl: 'https://via.placeholder.com/150',
        },
      ],
      totalAmount: 240000,
    },
  ];

  const statusColors = {
    pending: '#ffc107',
    shipped: '#007bff',
    delivered: '#28a745',
    cancelled: '#dc3545',
  };

  return (
    <Container>
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
                    className="px-3 py-2"
                    style={{
                      color: key === tab.key ? '#fff' : '#333',
                      fontWeight: key === tab.key ? 'bold' : 'normal',
                      backgroundColor: key === tab.key ? '#ab7442' : 'transparent', // Chỉnh màu nền khi tab được chọn
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                    }}
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
                  {orders.filter((order) => tab.key === 'all' || order.status === tab.key).length > 0 ? (
                    orders
                      .filter((order) => tab.key === 'all' || order.status === tab.key)
                      .map((order) => (
                        <Card key={order.id} className="mb-4 border-0 rounded-lg shadow-lg" style={{ backgroundColor: '#fff' }}>
                          <Card.Body>
                            <Card.Title className="fw-bold text-dark">Đơn hàng #{order.id}</Card.Title>
                            <Card.Subtitle className="text-muted">
                              Ngày đặt: {order.date}
                            </Card.Subtitle>

                            {/* Trạng thái đơn hàng ở góc trên bên phải */}
                            <div
                              className="d-flex justify-content-end"
                              style={{
                                position: 'absolute',
                                top: '15px',
                                right: '20px',
                                backgroundColor: statusColors[order.status],
                                color: '#fff',
                                padding: '5px 15px',
                                borderRadius: '20px',
                              }}
                            >
                              {order.status === 'delivered'
                                ? 'Hoàn thành'
                                : order.status === 'pending'
                                  ? 'Chờ xử lý'
                                  : order.status === 'shipped'
                                    ? 'Đang giao'
                                    : 'Đã hủy'}
                            </div>

                            <ListGroup variant="flush" className="mt-3">
                              {order.items.map((item) => (
                                <ListGroup.Item key={item.id} className="border-0 px-0">
                                  <Row>
                                    <Col sm={3}>
                                      <Image
                                        src={item.imageUrl}
                                        rounded
                                        fluid
                                        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                                      />
                                    </Col>
                                    <Col sm={7}>
                                      <h6 className="fw-bold">{item.name}</h6>
                                      <p>Số lượng: {item.quantity}</p>
                                      <p>Đơn giá: {item.price.toLocaleString()} VND</p>
                                      <p className="fw-bold">Thành tiền: {item.total.toLocaleString()} VND</p>
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="fw-bold" style={{ color: '#ab7442' }}>
                                <span style={{ float: 'right' }}>Tổng cộng: {order.totalAmount.toLocaleString()} VND</span>
                              </h5>

                              {/* Nút "Mua lại" và "Xem chi tiết" nằm cạnh nhau */}
                              <div className="d-flex gap-3">
                                {order.status === 'delivered' && (
                                 <Button
                                 variant="outline-primary"
                                 style={{
                                   borderRadius: '20px',
                                   fontWeight: 'bold',
                                   backgroundColor: '#ab7442', // Màu nền mặc định
                                   borderColor: '#ab7442', // Màu viền mặc định
                                   color: '#fff', // Màu chữ mặc định
                                   transition: 'background-color 0.3s ease, border-color 0.3s ease', // Hiệu ứng chuyển màu khi hover
                                 }}
                                 onMouseEnter={(e) => {
                                   e.target.style.backgroundColor = '#d0011b'; // Màu nền khi hover
                                   e.target.style.borderColor = '#d0011b'; // Màu viền khi hover
                                 }}
                                 onMouseLeave={(e) => {
                                   e.target.style.backgroundColor = '#ab7442'; // Màu nền khi bỏ hover
                                   e.target.style.borderColor = '#ab7442'; // Màu viền khi bỏ hover
                                 }}
                                 onClick={() => alert('Mua lại')}
                               >
                                 Mua lại
                               </Button>
                               
                                )}
                                <Button
                                  variant="dark"
                                  className="shadow-sm"
                                  style={{
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  Xem chi tiết
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      ))
                  ) : (
                    <Card className="text-center shadow-lg border-0" style={{ background: '#fff' }}>
                      <Card.Body>
                        <Image
                          src="/images/empty-order.png"
                          fluid
                          className="mb-3"
                          style={{ borderRadius: '10px', maxWidth: '50%' }}
                        />
                        <Card.Title className="text-muted">Không có đơn hàng</Card.Title>
                        <Card.Text>Hãy đặt món ngay hôm nay để thưởng thức!</Card.Text>
                      </Card.Body>
                    </Card>
                  )}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default OrderHistory;
