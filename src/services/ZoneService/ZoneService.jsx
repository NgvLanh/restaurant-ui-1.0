import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả bàn
const getAllZones = async () => {
    try {
        const response = await ApiRequest({
            path: 'zones',
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh vị trí: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh vị trí' };
    }
};

// Tạo mới một bàn
const createZone = async (request) =>
    await ApiRequest({
        method: 'POST',
        path: 'zones',
        data: request,
        headers: 'Bearer '
    });


// Cập nhật một bàn theo ID
const updateZone = async (zoneId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `zones/${zoneId}`,
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
const deleteZone = async (zoneId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `zones/${zoneId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa bàn: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa bàn' };
    }
};

// Lấy danh sách tất cả bàn
const getAllZonesPageable = async (searchKey = '', currentPage, pageSize) => {
    try {
        const response = await ApiRequest({
            path: `zones?branch=${JSON.parse(localStorage.getItem('branch_info'))?.id}&name=${searchKey}&page=${currentPage}&size=${pageSize}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh vị trí: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh vị trí' };
    }
};


export { getAllZones, createZone, updateZone, deleteZone, getAllZonesPageable };
