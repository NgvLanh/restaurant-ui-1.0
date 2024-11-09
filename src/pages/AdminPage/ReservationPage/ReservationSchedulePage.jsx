import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ApiRequest from "../../../configs/ApiRequest/ApiRequest";
import ReservationDetailsModal from "../../../components/Admin/ReservationDetailsModal/ReservationDetailsModal";

const ReservationSchedulePage = () => {
    const [reservations, setReservations] = useState([]);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await ApiRequest({
                path: `table-reservations?branch=${JSON.parse(localStorage.getItem('branch'))?.id}`,
            });
            const data = response.data.content;
            setReservations(data);
            if (data.length > 0) {
                convertReservationsToEvents(data);
            } else {
                x();
            }
        } catch (error) {
            console.error("API error:", error);
            x();
        }
    };

    const x = () => {
        const mockReservations = [
            {
                reservation: {
                    fullName: "Nguyễn Văn A",
                    bookingDate: "2024-11-10",
                    startTime: "18:00:00",
                    endTime: "20:00:00",
                    email: "nguyenvana@example.com",
                    phoneNumber: "0123456789",
                    notes: "Yêu cầu bàn gần cửa sổ",
                    table: { number: 5, seats: 4, zone: { name: "Khu A" } }
                }
            },
            {
                reservation: {
                    fullName: "Trần Thị B",
                    bookingDate: "2024-11-11",
                    startTime: "19:00:00",
                    endTime: "21:00:00",
                    email: "tranthib@example.com",
                    phoneNumber: "0987654321",
                    notes: "Kỷ niệm ngày cưới",
                    table: { number: 10, seats: 2, zone: { name: "Khu B" } }
                }
            }
        ];
        setReservations(mockReservations);
        convertReservationsToEvents(mockReservations);
    };

    const convertReservationsToEvents = (trs) => {
        const formattedEvents = trs.map((tr) => ({
            title: `${tr.reservation.fullName} - Bàn ${tr.reservation.table.number} - ${tr.reservation.table.zone.name}`,
            start: `${tr.reservation.bookingDate}T${tr.reservation.startTime}`,
            end: `${tr.reservation.bookingDate}T${tr.reservation.endTime}`,
            extendedProps: {
                tableNumber: tr.reservation.table.number,
                email: tr.reservation.email,
                phoneNumber: tr.reservation.phoneNumber,
                notes: tr.reservation.notes,
                location: tr.reservation.table.zone.name,
                seats: tr.reservation.table.seats,
            }
        }));
        setEvents(formattedEvents);
    };

    const handleEventClick = (info) => {
        setSelectedEvent({
            title: info.event.title,
            start: info.event.startStr,
            end: info.event.endStr,
            extendedProps: info.event.extendedProps,
        });
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <h1 className="header_title_admin">Lịch đặt bàn</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                editable={false}
                droppable={false}
                eventClick={handleEventClick}
                locale="vi"
                buttonText={{
                    today: "Hôm nay",
                    month: "Tháng",
                    week: "Tuần",
                    day: "Ngày",
                }}
                noEventsContent="Không có đặt bàn trong thời gian này."
                height="auto"
                className="shadow-md rounded-lg border border-gray-200 p-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
            />

            {selectedEvent && (
                <ReservationDetailsModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedEvent={selectedEvent}
                />
            )}
        </div>
    );
};

export default ReservationSchedulePage;
