import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả bàn
const getAllTables = async () => {
    try {
        const response = await ApiRequest({
            path: 'tables',
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh sách bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách bàn' };
    }
};

// Tạo mới một bàn
const createTable = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'tables',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo bàn' };
    }
};

// Cập nhật một bàn theo ID
const updateTable = async (tableId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `tables/${tableId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật bàn' };
    }
};

// Xóa một bàn theo ID
const deleteTable = async (tableId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `tables/${tableId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa bàn' };
    }
};

// Lấy danh sách tất cả bàn
const getAllTablesPageable = async (currentPage, pageSize) => {
    return await ApiRequest({
        path: `tables?branch=${JSON.parse(localStorage.getItem('branch_info'))?.id}&page=${currentPage}&size=${pageSize}`,
    });
};

// Lấy bàn để chọn đặt bàn
const getTablesByBranchIdAndSeats = async (branchId) =>
    await ApiRequest({
        path: `tables/reservations?branch=${branchId}`,
    });




export { getAllTables, createTable, updateTable, deleteTable, getAllTablesPageable, getTablesByBranchIdAndSeats };
