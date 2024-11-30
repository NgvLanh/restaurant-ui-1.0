import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const orderOffLineService = async (request) => {
    return await ApiRequest({
        method: 'post',
        path: 'orders',
        data: request,
        headers: 'Bearer '
    });
}

export const orderOnLineService = async (request) => {
    return await ApiRequest({
        method: 'post',
        path: 'orders',
        data: request,
        headers: 'Bearer '
    });
}

export const getAllOrders = async (orderStatus = "", currentPage, pageSize) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    const path = `orders?branch=${branchId}&orderStatus=${orderStatus}&page=${currentPage}&size=${pageSize}`;
    return await ApiRequest({
        path,
        headers: `Bearer `
    });
};

export const updateOrderStatusService = async (orderId) => {
    return await ApiRequest({
        method: 'PATCH',
        path: `orders/${orderId}`,
        headers: 'Bearer ',
    });

}
export const cancelOrderStatusService = async (orderId) => {
    const response = await ApiRequest({
        method: 'PATCH',
        path: `orders/${orderId}/cancel`,
        headers: 'Bearer ',
    });
    return response?.data;

};

export const getAllOrdersByUserId = async (orderStatus) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    const userId = JSON.parse(localStorage.getItem('user_info'))?.id;
    return await ApiRequest({
        path: `orders/status?userId=${userId}&branchId=${branchId}&orderStatus=${orderStatus}`,
        headers: `Bearer `
    });
};

export const cancelOrder = async (orderId, reason) => {
    return await ApiRequest({
        method: 'patch',
        path: `orders/cancel/${orderId}?reason=${reason}`,
        headers: `Bearer `
    });
}

export const getAllOrdersWithTable = async (date) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `orders/table?branchId=${branchId}&date=${date}`,
        headers: `Bearer `
    });
}

export const createOrderManualService = async (data) => {
    return await ApiRequest({
        method: 'post',
        path: `orders/manual`,
        data: data,
        headers: `Bearer `
    });
}

export const updateServedOrder = async (orderId, total) => {
    return await ApiRequest({
        method: 'PATCH',
        path: `orders/served/${orderId}/${total}`,
        headers: 'Bearer ',
    });
}