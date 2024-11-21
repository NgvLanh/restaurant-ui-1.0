import { Row } from "react-bootstrap";
import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { BiDish } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import ReservationBookingModal from "./Modals/ReservationBookingModal";
import { useState } from "react";

const ReservationBookingOrderPage = () => {
    const [selectedDate, setSelectDate] = useState(null);
    const [showModalOrder, setShowModalOrder] = useState(false);

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
                    locale="vi"
                    buttonText={{
                        today: "Hôm nay",
                        month: "Tháng",
                    }}
                    dateClick={(e) => {
                        setShowModalOrder(true);
                        setSelectDate(e.dateStr);
                    }}
                    noEventsContent="Không có sự kiện."
                    height="auto"
                />
            </Row>

            <ReservationBookingModal
                showModal={showModalOrder}
                handleClose={setShowModalOrder}
                selectedDate={selectedDate}
            />
        </>
    );
};

export default ReservationBookingOrderPage;
