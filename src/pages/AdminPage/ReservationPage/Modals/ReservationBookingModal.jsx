import { useEffect, useState } from "react";
import { Modal, Button, Card, Col, Row, Image, Form } from "react-bootstrap";
import { getTablesByBranchIdAndSeats } from "../../../../services/TableService/TableService";


const ReservationBookingOrderPage = ({ showModal, handleClose, selectedDate }) => {
    const [tables, setTables] = useState([]);
    const [branch, setBranch] = useState({});
    const [selectedTables, setSelectedTables] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [seats, setSeats] = useState(null);
    const [zones, setZones] = useState(null);
    const [statuses, setStatuses] = useState(null);
    const [filters, setFilters] = useState({
        seats: "",
        zone: "",
        status: ""
    });

    useEffect(() => {
        fetchTables();
    }, [showModal]);

    const fetchTables = async () => {
        const responese = await getTablesByBranchIdAndSeats(JSON.parse(localStorage.getItem('branch_info'))?.id);
        console.log(responese.data);
        setTables(responese.data);
        const seatsNumber = new Set(responese.data.map(e => e.seats));
        setSeats([...seatsNumber]);
        const zones = new Set(responese.data.map(e => e.zone?.name));
        setZones([...zones]);
        const statuses = new Set(responese.data.map(e => e.tableStatus));
        setStatuses([...statuses]);

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
        setShowConfirmModal(true);
    };

    const handleCloseConfirm = () => {
        setShowConfirmModal(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredTables = tables.filter((table) => {
        console.log(table.tableStatus.toString(), filters.status);


        const matchesSeats = filters.seats ? table.seats === parseInt(filters.seats) : true;
        const matchesZone = filters.zone ? table.zone.name === filters.zone : true;
        const matchesStatus = filters.status ? table.tableStatus.toString() === filters.status : true;

        return matchesSeats && matchesZone && matchesStatus;
    });


    const handleConfirm = async () => {

    };


    return (
        <>
            {/* Modal chọn bàn */}
            <Modal show={showModal} onHide={handleClose} fullscreen>
                <Modal.Header className="d-flex flex-column">
                    <Modal.Title>Chọn Bàn Đặt</Modal.Title>
                    <Row className="w-100">
                        <Form>
                            <Row className="mb-4">
                                <Col md={4}>
                                    <Form.Group controlId="filterSeats">
                                        <Form.Label>Số Ghế</Form.Label>
                                        <Form.Select
                                            name="seats"
                                            className="rounded-3"
                                            value={filters.seats}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Tất Cả</option>
                                            {seats?.length > 0 && seats?.map((seat) => (
                                                <option key={seat} value={seat}>{seat} ghế</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="filterZone">
                                        <Form.Label>Vị Trí</Form.Label>
                                        <Form.Select
                                            name="zone"
                                            className="rounded-3"
                                            value={filters.zone}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Tất Cả</option>
                                            {zones?.length > 0 && zones?.map((zone) => (
                                                <option key={zone} value={zone}>{zone}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="filterStatus">
                                        <Form.Label>Trạng Thái</Form.Label>
                                        <Form.Select
                                            name="status"
                                            className="rounded-3"
                                            value={filters.status}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Tất Cả</option>
                                            {statuses?.length > 0 && statuses?.map((status) => (
                                                <option key={status} value={status}>{status ? 'Trống' : 'Đã đặt'}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        {filteredTables?.length > 0 && filteredTables?.map((table) => (
                            <Col md={3} lg={2} key={table.id} className="mb-4">
                                <Card
                                    style={{
                                        cursor: table.tableStatus ? 'pointer' : 'not-allowed',
                                        opacity: table.tableStatus ? '1' : '0.5',
                                        borderWidth: '3px'
                                    }}
                                    className={`h-100 rounded-3 
                                            ${!table.tableStatus ?
                                            "border-danger" :
                                            selectedTables?.some((t) => t.id === table.id) ?
                                                "border-success" :
                                                "border-secondary-subtle"}`}
                                    onClick={() => table.tableStatus && handleSelectTable(table)}
                                >
                                    <Card.Body>
                                        <Card.Title>Bàn số: {table.number}</Card.Title>
                                        <Card.Text>Số ghế: {table.seats}</Card.Text>
                                        <Card.Text>Vị trí: {table.zone?.name}</Card.Text>
                                        <Card.Text>Trạng thái: {table.tableStatus ?
                                            <><span className="text-success">Có sẵn</span></> :
                                            <><span className="text-danger">Đã đặt</span></>}
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
            </Modal >
        </>
    );
};

export default ReservationBookingOrderPage;
