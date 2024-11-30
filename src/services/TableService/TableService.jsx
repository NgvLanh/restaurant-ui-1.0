import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const getAllTables = async () => {
    const response = await ApiRequest({
        path: 'tables',
    });
    return response?.data?.content;
};

export const createTable = async (request) => {
    return await ApiRequest({
        method: 'POST',
        path: 'tables',
        data: request,
        headers: 'Bearer '
    });
}

export const updateTable = async (tableId, request) => {
    return await ApiRequest({
        method: 'PATCH',
        path: `tables/${tableId}`,
        data: request,
        headers: 'Bearer '
    });
}

export const deleteTable = async (tableId) => {
    return await ApiRequest({
        method: 'DELETE',
        path: `tables/${tableId}`,
        headers: 'Bearer '
    });
}

export const getAllTablesPageable = async (currentPage, pageSize) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `tables?branch=${branchId}&page=${currentPage}&size=${pageSize}`,
    });
};

export const getTablesByBranchIdAndDate = async (branchId, date) => {
    return await ApiRequest({
        path: `tables/reservations?branch=${branchId}&date=${date}`,
    });
};

export const getTablesByZoneId = async (zoneId) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `tables?branch=${branchId}&zoneId=${zoneId}`,
    });
};

