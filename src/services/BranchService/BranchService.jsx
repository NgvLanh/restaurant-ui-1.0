import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả chi nhánh
const getAllBranches = async () => {
    try {
        const response = await ApiRequest({
            path: 'branches',
            headers: 'Bearer '
        });
        return response?.data?.content;
    } catch (error) {
        console.error(`Lỗi lấy danh sách chi nhánh: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách chi nhánh' };
    }
};

// Tạo mới một chi nhánh
const createBranch = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: 'branches',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi tạo chi nhánh: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi tạo chi nhánh' };
    }
};

// Cập nhật một chi nhánh theo ID
const updateBranch = async (branchId, request) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `branches/${branchId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi cập nhật chi nhánh: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi cập nhật chi nhánh' };
    }
};

// Xóa một chi nhánh theo ID
const deleteBranch = async (BranchId) => {
    try {
        const response = await ApiRequest({
            method: 'DELETE',
            path: `branches/${BranchId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi xóa chi nhánh: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi xóa chi nhánh' };
    }
};

// Lấy danh sách tất cả chi nhánh
const getAllBranchesPageable = async (searchKey = '', currentPage, pageSize) => {
    try {
        const response = await ApiRequest({
            path: `branches?name=${searchKey}&page=${currentPage}&size=${pageSize}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách chi nhánh: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách chi nhánh' };
    }
};


export { getAllBranches, createBranch, updateBranch, deleteBranch, getAllBranchesPageable };
