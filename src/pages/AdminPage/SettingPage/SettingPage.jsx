import { useState } from "react";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Form, Button, Card, Col, Row, Container } from "react-bootstrap";

const SettingPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedInfo = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
    };
    setUserInfo(updatedInfo);
    setIsEditing(false);
  };

  return (
    <>
      <PageHeader title="Cài đặt" />
      <Container className="mt-4">
        {/* Thông tin cá nhân */}
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Thông tin cá nhân</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSave}>
                  <Form.Group controlId="name">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userInfo.name}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={userInfo.email}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Form.Group controlId="phone" className="mt-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userInfo.phone}
                      disabled={!isEditing}
                    />
                  </Form.Group>

                  <Col className="text-center mt-4">
                    {isEditing ? (
                      <Button variant="primary" type="submit">
                        Lưu
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={handleEdit}>
                        Chỉnh sửa
                      </Button>
                    )}
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Cài đặt tùy chọn */}
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Cài đặt tùy chọn</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  {/* Ví dụ: Thêm các tùy chọn như đổi mật khẩu */}
                  <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Đổi mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập mật khẩu mới" />
                  </Form.Group>

                  {/* Ví dụ: Thêm các tùy chọn như chọn ngôn ngữ */}
                  <Form.Group controlId="language" className="mt-3">
                    <Form.Label>Chọn ngôn ngữ</Form.Label>
                    <Form.Control as="select">
                      <option>Tiếng Việt</option>
                      <option>Tiếng Anh</option>
                      <option>Tiếng Nhật</option>
                    </Form.Control>
                  </Form.Group>

                  <Col className="text-center mt-4">
                    <Button variant="primary" type="submit">
                      Lưu cài đặt
                    </Button>
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SettingPage;
