import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ReservationBookingModal from "./Modals/ReservationBookingModal";
import SelectActionModal from "./Modals/SelectActionModal"; 
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import { Row } from "react-bootstrap";

const ReservationBookingOrderPage = () => {
    const [showSelectModal, setShowSelectModal] = useState(false); // Modal chọn hành động
    const [showReservationModal, setShowReservationModal] = useState(false); // Modal đặt bàn
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr); // Lưu ngày được chọn
        setShowSelectModal(true); // Hiển thị modal chọn hành động
    };

    const handleSelectAction = (action) => {
        setShowSelectModal(false); // Đóng modal chọn hành động
        if (action === "addReservation") {
            setShowReservationModal(true); // Mở modal đặt bàn
        } else if (action === "addFood") {
            alert("Chức năng Thêm món ăn chưa được triển khai!"); // Ví dụ: Hiển thị thông báo
        }
    };

    return (
        <>
            <PageHeader title="Lịch đặt bàn" />
            <Row className="p-3">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        right: "title",
                        left: "prev,next today",
                    }}
                    dateClick={handleDateClick}
                    locale="vi"
                    buttonText={{
                        today: "Hôm nay",
                        month: "Tháng",
                    }}
                    noEventsContent="Không có sự kiện."
                    height="auto"
                />
            </Row>

            {/* Modal chọn hành động */}
            <SelectActionModal
                show={showSelectModal}
                handleClose={() => setShowSelectModal(false)}
                handleSelect={handleSelectAction}
            />

            {/* Modal đặt bàn */}
            <ReservationBookingModal
                showModal={showReservationModal}
                handleClose={() => setShowReservationModal(false)}
                selectedDate={selectedDate}
            />
        </>
    );
};

export default ReservationBookingOrderPage;
