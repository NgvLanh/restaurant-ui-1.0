import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllReservations } from "../../../services/ReservationService/ReservationService";
import { formatTime } from "../../../utils/FormatUtils";
import listPlugin from '@fullcalendar/list';
import { getAllTablesPageable } from "../../../services/TableService/TableService";

const ReservationSchedulePage = () => {
    const [reservations, setReservations] = useState([]);
    const [tables, setTables] = useState([]);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchReservations();
        // nodejs socket
        const ws = new WebSocket('ws://localhost:3001');
        ws.onmessage = (event) => {
            if (event) {
                console.log('Received from WebSocket:', event.data);
                const userInfo = event.data;
                //
                fetchReservations();
            }
        };
        //

    }, []);

    const fetchReservations = async () => {
        const responseTable = await getAllTablesPageable();
        const tablesData = responseTable.data.content;
        setTables(tablesData);

        const responseReservations = await getAllReservations();
        const reservationsData = responseReservations.data;
        setReservations(reservationsData);

        convertReservationsToEvents(reservationsData, tablesData);
    };


    const convertReservationsToEvents = (reservations, tables) => {
        const groupedReservations = {};

        reservations.forEach((reservation) => {
            const key = `${reservation?.bookingDate}T${reservation?.startTime}`;
            if (!groupedReservations[key]) {
                groupedReservations[key] = [];
            }
            const table = tables.find((t) =>
                t.reservations.some((r) => r.id === parseInt(reservation.id))
            );
            groupedReservations[key].push({
                reservation,
                tableNumber: table?.number,
                cancelReason: reservation?.cancelReason,
                isDone: !!reservation?.endTime,
            });
        });

        const formattedEvents = Object.entries(groupedReservations).map(([key, group]) => {
            const start = key;
            const end = `${group[0]?.reservation?.bookingDate}T${formatTime(group[0]?.reservation?.endTime)}`;
            const tableNumbers = group.map((item) => item.tableNumber).join(", ");
            const cancelReasons = group
                .filter((item) => item.cancelReason)
                .map((item) => item.cancelReason)
                .join(", ");
            const isCanceled = group.some((item) => !!item.cancelReason);
            const isDone = group.every((item) => item.isDone);

            return {
                id: group[0]?.reservation?.id,
                title: `Bàn: ${tableNumbers} / ${group[0]?.reservation?.fullName}${isCanceled ? ` / Hủy: ${cancelReasons}` : ""
                    }`,
                start,
                end,
                backgroundColor: isCanceled ? "rgba(114, 28, 36, 0.7)" : isDone ? "rgba(21, 87, 36, 0.7)" : undefined,
                borderColor: isCanceled ? "rgba(114, 28, 36, 0.7)" : isDone ? "rgba(21, 87, 36, 0.7)" : undefined,
                extendedProps: {
                    tables: group.map((item) => item.tableNumber),
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
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <h1 className="header_title_admin">Lịch đặt bàn</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
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
                    list: "Danh sách",
                }}
                noEventsContent="Không có đặt bàn trong thời gian này."
                height="auto"
                className="shadow-md rounded-lg border border-gray-200 p-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
            />

        </div>
    );
};

export default ReservationSchedulePage;
