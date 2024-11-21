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
const createTable = async (request) =>
    await ApiRequest({
        method: 'POST',
        path: 'tables',
        data: request,
        headers: 'Bearer '
    });

// Cập nhật một bàn theo ID
const updateTable = async (tableId, request) =>
    await ApiRequest({
        method: 'PATCH',
        path: `tables/${tableId}`,
        data: request,
        headers: 'Bearer '
    });


// Xóa một bàn theo ID
const deleteTable = async (tableId) =>
    await ApiRequest({
        method: 'DELETE',
        path: `tables/${tableId}`,
        headers: 'Bearer '
    });


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
