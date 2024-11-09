import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddressModal = ({ show, onHide, onSave }) => {
    const [newAddress, setNewAddress] = useState("");

    const handleSave = () => {
        if (newAddress.trim()) {
            onSave(newAddress);
            onHide();
        } else {
            alert("Vui lòng nhập địa chỉ.");
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Quản Lý Địa Chỉ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="addressInput">
                    <Form.Label>Thêm Địa Chỉ Mới</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ mới"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu Địa Chỉ
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddressModal;
