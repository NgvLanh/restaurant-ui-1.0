import ApiRequest from "../../configs/ApiRequest/ApiRequest";

// Lấy danh sách tất cả chi nhánh
export const getAllBranches = async () => {
    const response = await ApiRequest({
        path: 'branches',
    });
    return response?.data?.content;

};

// Tạo mới một chi nhánh
export const createBranch = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: 'branches',
        data: request,
        headers: 'Bearer '
    });

};

// Cập nhật một chi nhánh theo ID
export const updateBranch = async (branchId, request) => {
    return await ApiRequest({
        method: 'PATCH',
        path: `branches/${branchId}`,
        data: request,
        headers: 'Bearer '
    });

};

export const updateBranch01 = async (branchId, request) => {
    return await ApiRequest({
        method: 'PATCH',
        path: `branches/auth/${branchId}`,
        data: request,
        headers: 'Bearer '
    });
};

// Xóa một chi nhánh theo ID
export const deleteBranch = async (BranchId) => {
    return await ApiRequest({
        method: 'DELETE',
        path: `branches/${BranchId}`,
        headers: 'Bearer '
    });
};

// Lấy danh sách tất cả chi nhánh
export const getAllBranchesPageable = async (searchKey = '', currentPage, pageSize) => {
    return await ApiRequest({
        path: `branches?name=${searchKey}&page=${currentPage}&size=${pageSize}`,
        headers: 'Bearer '
    });

};

export const createNonAdmin = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: `users/roles`,
        headers: 'Bearer ',
        data: request
    });
}

export const getBranchByUserId = async (userId) => {
    return await ApiRequest({
        path: `branches/${userId}`,
        headers: 'Bearer '
    });
};


