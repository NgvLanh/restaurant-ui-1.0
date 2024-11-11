import { useEffect, useState } from "react";
import { Modal, Button, Card, Col, Row, Table, Image } from "react-bootstrap";
import { getTablesByBranchIdAndSeats } from "../../../services/TableService/TableService";
import { getAllBranches } from "../../../services/BranchService/BranchService";
import { formatDate } from "../../../utils/FormatUtils";

const SelectTableReservation = ({ showModal, handleClose, dataRequest }) => {
    const [tables, setTables] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState({});
    const [selectedTable, setSelectedTable] = useState(null);
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
            setTables(await getTablesByBranchIdAndSeats(dataRequest.branch, dataRequest.time, dataRequest.seats));
        }
    }

    const fetchBranches = async () => {
        const allBranches = await getAllBranches();
        setBranches(allBranches);
        setBranch(allBranches.find(e => e.id === parseInt(dataRequest?.branch)));
    }

    const handleSelectTable = (table) => {
        setSelectedTable(table);
        setShowConfirmModal(true);
        setShowSelectModal(false);
    };

    const handleConfirm = () => {
        console.log("Xác nhận đặt bàn:", selectedTable);
        setShowConfirmModal(false);
        handleClose();
    };

    const handleCloseConfirm = () => {
        setShowConfirmModal(false);
        setShowSelectModal(true);
    };

    return (
        <>
            <Modal show={showSelectModal} onHide={handleClose} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn Bàn Để Đặt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {tables?.length > 0 && tables?.map((table) => (
                            <Col md={4} lg={3} key={table.id} className="mb-4">
                                <Card className={`h-100 rounded-3`} style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Title>Bàn số: {table.number}</Card.Title>
                                        <Card.Text>Số ghế: {table.seats}</Card.Text>
                                        <Card.Text>Vị trí: {table.zone?.name}</Card.Text>
                                        <Card.Text>
                                            Trạng thái:{" "}
                                            <span className="text-success">Có sẵn</span>
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            className="w-100"
                                            onClick={() => handleSelectTable(table)}
                                        >
                                            Chọn Bàn
                                        </Button>
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
                </Modal.Footer>
            </Modal>

            {/* Modal xác nhận đặt bàn */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirm} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác Nhận Đặt Bàn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-4">
                        <Image src={branch?.logoUrl} roundedCircle width={80} height={80} alt="Logo nhà hàng" />
                        <h5 className="mt-2">{branch?.name}</h5>
                    </div>
                    {selectedTable && (
                        <Table bordered hover>
                            <tbody>
                                <tr>
                                    <th>Khách hàng</th>
                                    <td>{dataRequest?.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{dataRequest?.email}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại</th>
                                    <td>{dataRequest?.phone}</td>
                                </tr>
                                <tr>
                                    <th>Thời gian</th>
                                    <td>{formatDate(dataRequest?.time)}</td>
                                </tr>
                                <tr>
                                    <th>Bàn số</th>
                                    <td>{selectedTable.number}</td>
                                </tr>
                                <tr>
                                    <th>Số ghế</th>
                                    <td>{selectedTable.seats}</td>
                                </tr>
                                <tr>
                                    <th>Vị trí</th>
                                    <td>{selectedTable.zone?.name}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <small className="text-muted">Cảm ơn quý khách đã tin tưởng chúng tôi!</small>
                    <div>
                        <Button variant="secondary" onClick={handleCloseConfirm}>
                            Hủy
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
