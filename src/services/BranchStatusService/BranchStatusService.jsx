import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả trạng thái
export const getAllBranchStatus = async () => {
    const response = await ApiRequest({
        path: 'branch-status',
        headers: 'Bearer '
    });
    return response?.data?.content;

};

// Tạo mới một trạng thái 
export const createBranchStatus = async (request) =>
    await ApiRequest({
        method: 'POST',
        path: 'branch-status',
        data: request,
        headers: 'Bearer '
    });

// Cập nhật một trạng thái theo ID
export const updateBranchStatus = async (branchStatusId, request) =>
    await ApiRequest({
        method: 'PATCH',
        path: `branch-status/${branchStatusId}`,
        data: request,
        headers: 'Bearer '
    });

// Xóa một trạng thái theo ID
export const deleteBranchStatus = async (branchStatusId) => {
    return await ApiRequest({
        method: 'DELETE',
        path: `branch-status/${branchStatusId}`,
        headers: 'Bearer '
    });
};

// Lấy danh sách tất cả trạng thái
export const getAllBranchStatusPageable = async (searchKey = '', currentPage, pageSize) => {
    return await ApiRequest({
        path: `branch-status?name=${searchKey}&page=${currentPage}&size=${pageSize}`,
        headers: 'Bearer '
    });
};


