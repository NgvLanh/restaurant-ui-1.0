import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const orderOffLineService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'post',
            path: 'orders',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const orderOnLineService = async (request) => {
    try {
        const response = await ApiRequest({
            method: 'post',
            path: 'orders',
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrders = async (orderStatus = "", currentPage, pageSize) => {
    try {
        const branchId = JSON.parse(localStorage.getItem('branch_info'))?.id;
        const path = `orders?branch=${branchId}&orderStatus=${orderStatus}&page=${currentPage}&size=${pageSize}`;
        console.log("API Path:", path);
        const response = await ApiRequest({
            path,
            headers: `Bearer `
        });
        return response;
    } catch (error) {
        console.error(`Lỗi lấy danh sách đơn hàng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi lấy danh sách đơn hàng' };
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

export const cancelOrder = async (orderId, reason) => {
    return await ApiRequest({
        method: 'patch',
        path: `orders/cancel/${orderId}?reason=${reason}`,
        headers: `Bearer `
    });
};