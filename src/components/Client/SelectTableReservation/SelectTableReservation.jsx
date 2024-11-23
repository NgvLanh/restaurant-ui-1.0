import { useEffect, useState } from "react";
import { Modal, Button, Card, Col, Row, Image, Form } from "react-bootstrap";
import { getAllBranches } from "../../../services/BranchService/BranchService";
import { formatDate } from "../../../utils/FormatUtils";
import { createReservation } from "../../../services/ReservationService/ReservationService";
import AlertUtils from "../../../utils/AlertUtils";
import { getTablesByBranchIdAndDate } from "../../../services/TableService/TableService";

const SelectTableReservation = ({ showModal, handleClose, dataRequest }) => {
    const [tables, setTables] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState({});
    const [selectedTables, setSelectedTables] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSelectModal, setShowSelectModal] = useState(showModal);
    const [seats, setSeats] = useState(null);
    const [zones, setZones] = useState(null);
    const [statuses, setStatuses] = useState(null);
    const [filters, setFilters] = useState({
        seats: "",
        zone: "",
        status: ""
    });

    useEffect(() => {
        fetchTables(dataRequest);
    }, [dataRequest]);

    useEffect(() => {
        setShowSelectModal(showModal);
        fetchBranches();
    }, [showModal]);

    const fetchTables = async (dataRequest) => {
        if (dataRequest) {
            const responese = await getTablesByBranchIdAndDate(dataRequest.branch, formatDate(dataRequest.bookingDate));
            setTables(responese.data);
            const seatsNumber = new Set(responese.data.map(e => e.seats));
            setSeats([...seatsNumber]);
            const zones = new Set(responese.data.map(e => e.zone?.name));
            setZones([...zones]);
            const statuses = new Set(responese.data.map(e => e.tableStatus));
            setStatuses([...statuses]);
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredTables = tables.filter((table) => {
        const matchesSeats = filters.seats ? table.seats === parseInt(filters.seats) : true;
        const matchesZone = filters.zone ? table.zone.name === filters.zone : true;
        const matchesStatus = filters.status ? table.tableStatus.toString() === filters.status : true;

        return matchesSeats && matchesZone && matchesStatus;
    });


    const handleConfirm = async () => {
        const { branch, ...data } = dataRequest;

        const request = {
            branchId: branch,
            ...data,
            tableIds: selectedTables.map(t => t.id)
        }

        document.getElementById('spinner').classList.add('show');
        try {
            await createReservation(request);
            setShowConfirmModal(false);
            handleClose();
            AlertUtils.success('Đặt bàn thành công');
        } catch (error) {
            AlertUtils.error('Lỗi đặt bàn');
        } finally {
            setSelectedTables([]);
            document.getElementById('spinner').classList.remove('show');
        }
    };


    return (
        <>
            {/* Modal chọn bàn */}
            <Modal show={showSelectModal} onHide={handleClose} fullscreen>
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

            {/* Modal xác nhận đặt bàn */}
            <Modal show={showConfirmModal} onHide={handleCloseConfirm} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Xác Nhận Đặt Bàn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Card User Information */}
                    <Card className="mb-4 shadow-lg rounded-3">
                        <Card.Body>
                            <div className="text-center mb-3">
                                <h2 className="m-0 text-primary">FooDY</h2>
                                <h5 className="mt-2">{branch?.name}</h5>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <p><strong>Khách hàng:</strong> {dataRequest?.fullName}</p>
                                    <p><strong>Email:</strong> {dataRequest?.email}</p>
                                    <p><strong>Số điện thoại:</strong> {dataRequest?.phoneNumber}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Số lượng bàn:</strong> {selectedTables?.length} bàn</p>
                                    <p><strong>Ngày:</strong> {formatDate(dataRequest?.bookingDate)}</p>
                                    <p><strong>Thời gian:</strong> {dataRequest?.startTime}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Card Reserved Tables Information */}
                    <Card className="shadow-lg rounded-3">
                        <Card.Body>
                            <h5 className="mb-3 text-center">Thông Tin Các Bàn Đặt</h5>
                            <div className="row">
                                {selectedTables.length > 0 ? (
                                    selectedTables.map((table) => (
                                        <div key={table.id} className="col-lg-4 col-md-6 mb-3">
                                            <div className="border border-2 border-success p-3 rounded-3">
                                                <p><strong>Bàn số:</strong> {table.number} / {table.seats} ghế</p>
                                                <p><strong>Vị trí:</strong> {table.zone?.name}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có bàn nào được chọn.</p>
                                )}
                            </div>
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
            </Modal >

        </>
    );
};

export default SelectTableReservation;
