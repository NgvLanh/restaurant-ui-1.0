import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const orderOffLineService = async (request) =>
    await ApiRequest({
        method: 'post',
        path: 'orders',
        data: request,
        headers: 'Bearer '
    });


export const orderOnLineService = async (request) =>
    await ApiRequest({
        method: 'post',
        path: 'orders',
        data: request,
        headers: 'Bearer '
    });


export const getAllOrders = async (orderStatus = "", currentPage, pageSize) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    const path = `orders?branch=${branchId}&orderStatus=${orderStatus}&page=${currentPage}&size=${pageSize}`;
    return await ApiRequest({
        path,
        headers: `Bearer `
    });
};

export const updateOrderStatusService = async (orderId) =>
    await ApiRequest({
        method: 'PATCH',
        path: `orders/${orderId}`,
        headers: 'Bearer ',
    });


export const cancelOrderStatusService = async (orderId) => {
    try {
        const response = await ApiRequest({
            method: 'PATCH',
            path: `orders/${orderId}/cancel`,
            headers: 'Bearer ',
        });

        // Đảm bảo trả về đúng cấu trúc
        return response?.data || response;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
        throw error;
    }
};

export const getAllOrdersByUserId = async (orderStatus) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    const userId = JSON.parse(localStorage.getItem('user_info'))?.id;
    return await ApiRequest({
        path: `orders/status?userId=${userId}&branchId=${branchId}&orderStatus=${orderStatus}`,
        headers: `Bearer `
    });
};

export const cancelOrder = async (orderId, reason) =>
    await ApiRequest({
        method: 'patch',
        path: `orders/cancel/${orderId}?reason=${reason}`,
        headers: `Bearer `
    });


export const getAllOrdersWithTable = async (date) => {
    const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
    return await ApiRequest({
        path: `orders/table?branchId=${branchId}&date=${date}`,
        headers: `Bearer `
    });
}

export const createOrderManualService = async (data) =>
    await ApiRequest({
        method: 'post',
        path: `orders/manual`,
        data: data,
        headers: `Bearer `
    });

export const updateServedOrder = async (orderId) =>
    await ApiRequest({
        method: 'PATCH',
        path: `orders/Served/${orderId}`,
        headers: 'Bearer ',
    });
