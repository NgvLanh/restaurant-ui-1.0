import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả trạng thái
const getAllBranchStatus = async () => {
    try {
        const response = await ApiRequest({
            path: 'branch-status',
            headers: 'Bearer '
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh sách trạng thái: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách trạng thái' };
    }
};

// Tạo mới một trạng thái
const createBranchStatus = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'branch-status',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo trạng thái: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo trạng thái' };
    }
};

// Cập nhật một trạng thái theo ID
const updateBranchStatus = async (branchStatusId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `branch-status/${branchStatusId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật trạng thái: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật trạng thái' };
    }
};

// Xóa một trạng thái theo ID
const deleteBranchStatus = async (branchStatusId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `branch-status/${branchStatusId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa trạng thái: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa trạng thái' };
    }
};

// Lấy danh sách tất cả trạng thái
const getAllBranchStatusPageable = async (searchKey = '', currentPage, pageSize) => {
    try {
        const response = await ApiRequest({
            path: `branch-status?name=${searchKey}&page=${currentPage}&size=${pageSize}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách trạng thái: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách trạng thái' };
    }
};


export { getAllBranchStatus, createBranchStatus, updateBranchStatus, deleteBranchStatus, getAllBranchStatusPageable };
