import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả đặt bàn
const getAllreservations = async () => {
    try {
        const response = await ApiRequest({
            path: 'reservations',
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh sách đặt bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách đặt bàn' };
    }
};

// Tạo mới một đặt bàn
const createreservation = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'reservations',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo đặt bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo đặt bàn' };
    }
};

// Cập nhật một đặt bàn theo ID
const updatereservation = async (reservationId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `reservations/${reservationId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật đặt bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật đặt bàn' };
    }
};

// Xóa một đặt bàn theo ID
const deletereservation = async (reservationId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `reservations/${reservationId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa đặt bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa đặt bàn' };
    }
};

// Lấy danh sách tất cả đặt bàn
const getAllreservationsPageable = async (currentPage, pageSize) => {
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


export { getAllreservations, createreservation, updatereservation, deletereservation, getAllreservationsPageable };
