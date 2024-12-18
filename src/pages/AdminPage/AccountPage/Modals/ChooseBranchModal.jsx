import React, { useEffect, useState } from "react";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import { getAllBranchesPageable } from "../../../../services/BranchService/BranchService";

const ChooseBranchModal = ({ showModal, closeModal, userId, handleData }) => {
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        const response = await getAllBranchesPageable();
        setBranches(response?.data?.content || []);
    };

    const handleSelectBranch = (branchId) => {
        setSelectedBranch(branchId);
    };

    const handleConfirm = () => {
        handleData(selectedBranch, userId);
    };

    return (
        <Modal show={showModal} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chọn Chi Nhánh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {branches.map((branch) => (
                        <Col key={branch.id} sm={12} md={6} lg={4}>
                            <Card
                                className={`mb-3 rounded-3 border-2 ${selectedBranch === branch.id
                                    ? "border-success"
                                    : branch.user?.id
                                        ? "border-warning"
                                        : ""
                                    }`}

                                onClick={() => handleSelectBranch(branch.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <Card.Body>
                                    <Card.Title>{branch.name}</Card.Title>
                                    <Card.Text>{branch.provinceName}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    className="rounded-3"
                    onClick={closeModal}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    className="rounded-3"
                    onClick={handleConfirm}
                    disabled={!selectedBranch}
                >
                    Xác Nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChooseBranchModal;
