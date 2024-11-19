import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ReservationDetailsModal from "../../../components/Admin/ReservationDetailsModal/ReservationDetailsModal";
import { getAllReservations } from "../../../services/ReservationService/ReservationService";

const ReservationSchedulePage = () => {
    const [reservations, setReservations] = useState([]);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const response = await getAllReservations();
        console.log(response.data);
        setReservations(response.data);
        convertReservationsToEvents(response.data);
    };


    const convertReservationsToEvents = (trs) => {
        const formattedEvents = trs.map((tr) => {
            const isCanceled = !!tr?.cancelReason;
            return {
                id: `${tr?.id}`,
                title: `${tr?.fullName}`,
                start: `${tr?.bookingDate}T${tr?.startTime}`,
                end: `${tr?.bookingDate}T${tr?.endTime}`,
                email: `${tr?.email}`,
                phoneNumber: `${tr?.phoneNumber}`,
                cancelReason: `${tr?.cancelReason}`,
                backgroundColor: isCanceled && "#f8d7da",
                borderColor: isCanceled && "#721c24",
                textColor: isCanceled && "#721c24",
                extendedProps: {
                    table: tr.table,
                },
            };
        });
        setEvents(formattedEvents);
    };



    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            start: info.event.startStr,
            end: info.event.endStr,
            extendedProps: info.event.extendedProps,
        });
        console.log({
            id: info.event.id,
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
