import { useEffect, useState } from "react";
import { Modal, Button, Card, Col, Row, Form } from "react-bootstrap";
import { getTablesByBranchIdAndDate } from "../../../../services/TableService/TableService";
import { formatDate, formatDateTime } from "../../../../utils/FormatUtils";
import AlertUtils from "../../../../utils/AlertUtils";
import CreateReservationModal from "./CreateReservationModal";
import { useNavigate } from "react-router-dom";
import { cancelReservation } from "../../../../services/ReservationService/ReservationService";
import DishListModal from "../../OrderPage/Modals/DishListModal";

const ReservationBookingModal = ({ showModal, handleClose, selectedDate }) => {
    const [tables, setTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [showMainModal, setShowMainModal] = useState(showModal);
    const [showCreateReservationModal, setShowCreateReservationModal] = useState(false);
    const [showOrderDishReservationModal, setShowOrderDishReservationModal] = useState(false);
    const [seats, setSeats] = useState(null);
    const [zones, setZones] = useState(null);
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState(null);
    const [filters, setFilters] = useState({
        seats: "",
        zone: "",
        status: ""
    });

    useEffect(() => {
        setShowMainModal(showModal);
    }, [showModal]);

    useEffect(() => {
        if (showMainModal) {
            fetchTables();
        }
    }, [showMainModal]);

    const fetchTables = async () => {
        const response = await getTablesByBranchIdAndDate(
            JSON.parse(localStorage.getItem('branch_info'))?.id,
            formatDate(selectedDate) || formatDate(new Date())
        );
        setTables(response.data);

        const seatsNumber = new Set(response.data.map((e) => e.seats));
        setSeats([...seatsNumber]);

        const zones = new Set(response.data.map((e) => e.zone?.name));
        setZones([...zones]);

        const statuses = new Set(response.data.map((e) => e.tableStatus));
        setStatuses([...statuses]);
    };

    const handleSelectTable = (table) => {
        const isTableSelected = selectedTables?.some((t) => t.id === table.id);
        if (isTableSelected) {
            setSelectedTables(selectedTables.filter((t) => t.id !== table.id));
        } else {
            const hasSameReservationCount = selectedTables.some((t) => t?.reservations.length === table.reservations.length);

            if (hasSameReservationCount || selectedTables.length === 0) {
                setSelectedTables((prevSelectedTables) => [...prevSelectedTables, table]);
            }
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleConfirmAction = async (actionType) => {
        if (actionType === "delete") {
            if (selectedTables?.length > 0 && selectedTables.some((t) => t?.reservations.length > 0)) {
                setShowMainModal(false);
                const result = await AlertUtils.input("Bạn có chắc chắn muốn xoá bàn đã chọn!");
                if (result) {
                    const reservationIds = selectedTables?.flatMap(e => e.reservations?.map(i => i.id));
                    const request = {
                        branchId: JSON.parse(localStorage.getItem('branch_info'))?.id,
                        reservationIds: reservationIds,
                        reason: result
                    }
                    try {
                        const response = await cancelReservation(request);
                        if (response.status) {
                            AlertUtils.success("Xoá thành công!");
                        }
                    } catch (error) {
                        AlertUtils.info("Lỗi xoá lịch đặt bàn!");
                    }
                    navigate(0);
                }
            } else if (selectedTables?.length > 0) {
                AlertUtils.info("Bạn chỉ có thể xoá bàn đưa đến giờ hoặc đã đặt!");
            } else {
                AlertUtils.info("Vui lòng chọn bàn để thao tác!");
            }
        } else if (actionType === "addFood") {
            if (selectedTables?.length == 1 && selectedTables.some((t) => t?.reservations.length > 0)) {
                setShowOrderDishReservationModal(true);
            } else if (selectedTables?.length > 1) {
                AlertUtils.info("Vui lòng chỉ chọn 1 bàn!");
            } else if (selectedTables?.length > 0) {
                AlertUtils.info("Bạn chỉ có thể thêm món cho bàn đã đến giờ hoặc đã đặt!");
            } else {
                AlertUtils.info("Vui lòng chọn bàn để thao tác!");
            }
        } else if (actionType === "addTable") {
            setShowMainModal(false);
            setShowCreateReservationModal(true);
        }
        // setSelectedTables([]);
    };

    const filteredTables = tables?.filter((table) => {
        const matchesSeats = filters.seats ? table.seats === parseInt(filters.seats) : true;
        const matchesZone = filters.zone ? table.zone.name === filters.zone : true;
        const matchesStatus = filters.status ? table.tableStatus.toString() === filters.status : true;

        return matchesSeats && matchesZone && matchesStatus;
    });


    return (
        <>
            <Modal show={showMainModal} onHide={handleClose} fullscreen>
                <Modal.Header className="d-flex flex-column">
                    <Modal.Title>Danh sách bàn</Modal.Title>
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
                                            {seats?.length > 0 &&
                                                seats.map((seat) => (
                                                    <option key={seat} value={seat}>
                                                        {seat} ghế
                                                    </option>
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
                                            {zones?.length > 0 &&
                                                zones.map((zone) => (
                                                    <option key={zone} value={zone}>
                                                        {zone}
                                                    </option>
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
                                            {statuses?.length > 0 &&
                                                statuses.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status ? "Trống" : "Đã đặt"}
                                                    </option>
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
                        {filteredTables?.length > 0 &&
                            filteredTables.map((table) => {
                                const reservation = table.reservations?.[0];
                                const bookingDateTime = reservation
                                    ? new Date(`${reservation.bookingDate}T${reservation.startTime}`)
                                    : null;
                                const isPastBookingTime =
                                    bookingDateTime && bookingDateTime >= new Date();

                                let borderColor = "lightgray";
                                let cursorStyle = "not-allowed";
                                let bgColor = "white";
                                if (!reservation) {
                                    if (selectedTables?.some((t) => t.id === table.id)) {
                                        borderColor = "green";
                                    } else {
                                        borderColor = "lightgray";
                                        bgColor = "white";
                                    }
                                    cursorStyle = "pointer";
                                } else if (reservation && !isPastBookingTime) {
                                    borderColor = "#f5c778";
                                    cursorStyle = "pointer";
                                } else if (reservation && isPastBookingTime) {
                                    borderColor = "#3a87f5";
                                    cursorStyle = "pointer";
                                }
                                selectedTables?.some((t) => t.id === table.id) ? bgColor = "#e4f2e4" : null;

                                return (
                                    <Col md={3} lg={2} key={table.id} className="mb-4">
                                        <Card
                                            style={{
                                                cursor: cursorStyle,
                                                borderWidth: "3px",
                                                borderColor: borderColor,
                                                backgroundColor: bgColor,
                                                userSelect: 'none'
                                            }}
                                            className={`h-100 rounded-3`}
                                            onClick={() => handleSelectTable(table)}
                                        >
                                            <Card.Body>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <Card.Title>Bàn số: {table.number}</Card.Title>
                                                    {reservation &&
                                                        <small>{isPastBookingTime ? 'Chưa đến giờ' : 'Đã đến giờ'}</small>}
                                                </div>
                                                <Card.Text>Số ghế: {table.seats}</Card.Text>
                                                <Card.Text>Vị trí: {table.zone?.name}</Card.Text>
                                                <Card.Text>
                                                    Trạng thái:{" "}
                                                    {!reservation ? (
                                                        <b className="text-success">Có sẵn</b>
                                                    ) : (
                                                        <b className="text-danger">Đã đặt</b>
                                                    )}
                                                </Card.Text>
                                                {table.reservations?.length > 0 &&
                                                    <Card.Text>Thời gian: {formatDateTime(`${table.reservations[0]?.bookingDate}T${table.reservations[0]?.startTime}`)}</Card.Text>
                                                }
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        className="rounded-3"
                        onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button
                        variant="warning"
                        className="rounded-3"
                        // disabled={!selectedTables.some((t) => t.reservations)}
                        onClick={() => handleConfirmAction("delete")}
                    >
                        Xóa đặt bàn
                    </Button>
                    <Button
                        variant="primary"
                        className="rounded-3"
                        // disabled={!selectedTables.some((t) => t.reservations)}
                        onClick={() => handleConfirmAction("addFood")}
                    >
                        Thêm món ăn
                    </Button>
                    <Button
                        variant="danger"
                        className="rounded-3"
                        disabled={!selectedTables.some((t) => t.reservations.length == 0)}
                        onClick={() => handleConfirmAction("addTable")}
                    >
                        Thêm bàn
                    </Button>
                </Modal.Footer>

            </Modal>

            {/*  */}
            <CreateReservationModal
                showModal={showCreateReservationModal}
                setShowModal={() => {
                    setShowCreateReservationModal(false);
                    setShowMainModal(true);
                }}
                selectedDate={selectedDate}
                selectTables={selectedTables}
                setSelectTables={() => setSelectedTables([])}
            />

            {/*  */}
            <DishListModal
                showDetailsModal={showOrderDishReservationModal}
                setShowDetailsModal={() => setShowOrderDishReservationModal(false)}
                selectTables={selectedTables}
            />
        </>
    );
};

export default ReservationBookingModal;
