import ApiRequest from "../../configs/ApiRequest/ApiRequest";

export const asyncCartService = async (request, userId) => {
    try {
        const response = await ApiRequest({
            method: 'POST',
            path: `carts/async/${userId}`,
            data: request,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi đồng bộ giỏ hàng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi đồng bộ giỏ hàng' };
    }
}

export const getCartByUserId = async (userId) => {
    try {
        const response = await ApiRequest({
            path: `carts/${userId}`,
            headers: 'Bearer '
        });
        return response;
    } catch (error) {
        console.error(`Lỗi đồng bộ giỏ hàng: ${error?.response?.data?.message || 'Lỗi chưa cấu hình'}`);
        return { status: false, message: error?.response?.data?.message || 'Lỗi đồng bộ giỏ hàng' };
    }
}