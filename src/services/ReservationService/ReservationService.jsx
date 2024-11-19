import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả đặt bàn
export const getAllReservations = async () =>
    await ApiRequest({
        path: `reservations?branch=${JSON.parse(localStorage.getItem('branch_info'))?.id}`,
        headers: 'Bearer '
    });

// Tạo mới một đặt bàn
export const createReservation = async (request) =>
    await ApiRequest({
        method: 'POST',
        path: 'reservations',
        data: request,
    });

// Cập nhật một đặt bàn theo ID
export const cancelReservation = async (reservationId, reason) =>
    await ApiRequest({
        method: 'PATCH',
        path: `reservations/cancel/${reservationId}/${reason}`,
        headers: 'Bearer '
    });


// Lấy danh sách tất cả đặt bàn
export const getAllreservationsPageable = async (currentPage, pageSize) => {
    try {
        const response = await ApiRequest({
            path: `reservations?branch=${JSON.parse(localStorage.getItem('branch_info'))?.id}&page=${currentPage}&size=${pageSize}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách đặt bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách đặt bàn' };
    }
};


