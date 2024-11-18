import { useEffect, useState } from "react";
import { Modal, Button, Card, Col, Row, Image } from "react-bootstrap";
import { getTablesByBranchIdAndSeats } from "../../../services/TableService/TableService";
import { getAllBranches } from "../../../services/BranchService/BranchService";
import { formatDateTime } from "../../../utils/FormatUtils";
import { createReservation } from "../../../services/ReservationService/ReservationService";

const SelectTableReservation = ({ showModal, handleClose, dataRequest }) => {
    const [tables, setTables] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState({});
    const [selectedTables, setSelectedTables] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSelectModal, setShowSelectModal] = useState(showModal);

    useEffect(() => {
        fetchTables(dataRequest);
    }, [dataRequest]);

    useEffect(() => {
        setShowSelectModal(showModal);
        fetchBranches();
    }, [showModal]);

    const fetchTables = async (dataRequest) => {
        if (dataRequest) {
            setTables(await getTablesByBranchIdAndSeats(dataRequest.branch, dataRequest.time));
        }
    };

    const fetchBranches = async () => {
        const allBranches = await getAllBranches();
        setBranches(allBranches);
        setBranch(allBranches.find((e) => e.id === parseInt(dataRequest?.branch)));
    };

    const handleSelectTable = (table) => {
        setSelectedTables((prev) => {
            if (prev.some((t) => t.id === table.id)) {
                return prev.filter((t) => t.id !== table.id);
            } else {
                return [...prev, table];
            }
        });
    };

    const handleOpenConfirmModal = () => {
        setShowSelectModal(false);
        setShowConfirmModal(true);
    };

    const handleCloseConfirm = () => {
        setShowConfirmModal(false);
        setShowSelectModal(true);
    };

    const handleConfirm = async () => {
        dataRequest.branch = branches.find(e => e.id === parseInt(dataRequest.branch))
        console.log("Xác nhận đặt bàn:", {
            ...dataRequest,
            tables: selectedTables,
            startTime: dataRequest.bookingDate?.split('T')[1]
        });
        const requsest = {
            ...dataRequest,
            tables: selectedTables,
            startTime: dataRequest.bookingDate?.split('T')[1]
        };
        document.getElementById('spinner').classList.add('show');
        await createReservation(requsest);
        setShowConfirmModal(false);
        document.getElementById('spinner').classList.remove('show');
        handleClose();
    };

    return (
        <>
            {/* Modal chọn bàn */}
            <Modal show={showSelectModal} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn Bàn Để Đặt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {tables?.length > 0 &&
                            tables.map((table) => (
                                <Col md={4} lg={3} key={table.id} className="mb-4">
                                    <Card
                                        style={{
                                            cursor: 'pointer',
                                            borderWidth: '3px'
                                        }}
                                        className={`h-100 rounded-3 ${selectedTables.some((t) => t.id === table.id) ? "border-success" : "border-light"}`}
                                        onClick={() => handleSelectTable(table)}
                                    >
                                        <Card.Body>
                                            <Card.Title>Bàn số: {table.number}</Card.Title>
                                            <Card.Text>Số ghế: {table.seats}</Card.Text>
                                            <Card.Text>Vị trí: {table.zone?.name}</Card.Text>
                                            <Card.Text>
                                                Trạng thái: <span className="text-success">Có sẵn</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOpenConfirmModal}
                        disabled={selectedTables.length === 0}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal xác nhận đặt bàn */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirm} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Xác Nhận Đặt Bàn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Card thông tin người dùng */}
                    <Card className="mb-4">
                        <Card.Body>
                            <div className="text-center mb-3">
                                <h2 className="m-0 text-primary">FooDY</h2>
                                <h5 className="mt-2">{branch?.name}</h5>
                            </div>
                            <p><strong>Khách hàng:</strong> {dataRequest?.name}</p>
                            <p><strong>Email:</strong> {dataRequest?.email}</p>
                            <p><strong>Số điện thoại:</strong> {dataRequest?.phone}</p>
                            <p><strong>Thời gian:</strong> {formatDateTime(dataRequest?.time)}</p>
                        </Card.Body>
                    </Card>

                    {/* Card thông tin các bàn đặt */}
                    <Card>
                        <Card.Body>
                            <h5 className="mb-3">Thông Tin Các Bàn Đặt</h5>
                            {selectedTables.map((table) => (
                                <div key={table.id} className="mb-2">
                                    <p><strong>Bàn số:</strong> {table.number}</p>
                                    <p><strong>Số ghế:</strong> {table.seats}</p>
                                    <p><strong>Vị trí:</strong> {table.zone?.name}</p>
                                    <hr />
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <small className="text-muted">Cảm ơn quý khách đã tin tưởng chúng tôi!</small>
                    <div>
                        <Button variant="secondary" onClick={handleCloseConfirm}>
                            Quay Lại
                        </Button>
                        <Button variant="primary" onClick={handleConfirm} className="ms-2">
                            Xác Nhận
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SelectTableReservation;
